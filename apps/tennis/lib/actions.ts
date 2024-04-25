'use server';

import { cookies } from 'next/headers'
import { redirect } from "next/navigation";
import { deleteApiWithCredentials, postApiWithCredentials, putApiWithCredentials } from "./fetchWithCredentials";
import { postApi } from "./fetch";
import { COOKIE_NAME } from './constants';
import { revalidatePath } from 'next/cache';

export async function authenticate(formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const response = await postApi('/users/login', { email, password }, { credentials: "include", cache: 'no-store' });

        if (!response.token) {
            throw new Error(response.message);
        }

        cookies().set({
            name: COOKIE_NAME,
            value: response.token,
            maxAge: 86400,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        })

        return response;
    } catch (err: any) {
        return { error: err.message };
    }
}

export async function registerUser(formData: FormData) {
    const cpf = formData.get('cpf');
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const response = await postApi('/users/create', { cpf, email, password }, { cache: 'no-store' });

        if (!response.success) {
            throw new Error(response.message);
        }

        return response;

    } catch (err: any) {
        return { error: err.message };
    }
}

export async function forgotUser(formData: FormData) {
    const email = formData.get('email');

    try {
        const response = await postApi('/users/forgot', { email }, { cache: 'no-store' });

        if (!response.success) {
            throw new Error(response.message);
        }

        return response;

    } catch (err: any) {
        return { error: err.message };
    }
}

export async function updateUserPassword({ user_id, name, phone, current_password }: { user_id: string, name: string, phone: string, current_password: string }) {
    try {
        const response = await postApi('/users/update', { user_id, name, phone, current_password }, { cache: 'no-store' });

        if (!response.success) {
            throw new Error(response.message);
        }

        return response;

    } catch (err: any) {
        return { error: err.message };
    }
}

export async function changePassword(formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const response = await postApi('/users/change-password', { email, password }, { cache: 'no-store' });

        if (!response.success) {
            throw new Error(response.message);
        }

        return response;

    } catch (err: any) {
        return { error: err.message };
    }
}

export async function userLogout() {
    cookies().delete(COOKIE_NAME)
}

export async function addPlayer(data: any) {
    try {
        const response = await postApiWithCredentials('/players', { ...data });

        if (!response.success) {
            throw new Error(response.message);
        }
    } catch (err: any) {
        return { error: err.message };
    }

    revalidatePath('/players');
}

export async function editPlayer({ id, name, status, phone = '' }: { id: string, name: string, status: string, phone?: string }) {
    try {
        const response = await putApiWithCredentials(`/players/${id}`, { name, status, phone });

        if (!response.success) {
            throw new Error(response.message);
        }
    } catch (err: any) {
        return { error: err.message };
    }
    revalidatePath('/players');
    redirect('/players')
}

export async function removePlayer({ id }: { id: string }) {
    try {
        const response = await deleteApiWithCredentials(`/players/${id}`);

        if (!response.success) {
            throw new Error(response.message);
        }
        // return response;
    } catch (err: any) {
        return { error: err.message };
    }

    revalidatePath('/players');
}

export async function addTournament(url: string, values: any) {
    try {
        const response = await postApiWithCredentials(url, { ...values });

        if (!response.success) {
            throw new Error(response.message);
        }
    } catch (err: any) {
        return { error: err.message };
    }
}

export async function tournamentSubscribe(url: string, values: any) {
    try {
        const response = await postApiWithCredentials(url, { ...values });

        if (!response.success) {
            throw new Error(response.message);
        }
    } catch (err: any) {
        return { error: err.message };
    }

    redirect('/')
}

export async function addRule(url: string, data: any) {
    try {
        const response = await postApiWithCredentials(url, data);

        if (!response.success) {
            throw new Error(response.message);
        }
    } catch (err: any) {
        return { error: err.message };
    }

    revalidatePath('/rules');
}

export async function editActiveTournament({ id, isActive }: { id: string, isActive: boolean}) {
    try {
        const response = await putApiWithCredentials(`/tournaments/${id}`, { isActive });
       
        if (!response.success) {
            throw new Error(response.message);
        }
    } catch (err: any) {
        return { error: err.message };
    }

    revalidatePath('/tournaments');
}

export async function updateFinanceSettings(data: any) {
    try {
        const response = await putApiWithCredentials('/settings/finance', { ...data });

        if (!response.success) {
            throw new Error(response.message);
        }
    } catch (err: any) {
        return { error: err.message };
    }

    revalidatePath('/admin/settings');
}
