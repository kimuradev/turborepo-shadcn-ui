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

export async function updateUserPassword({ user_id, name, phone, category, current_password }: { user_id: string, name: string, phone: string, category: string, current_password: string }) {
    try {
        const response = await postApi('/users/update', { user_id, name, phone, category, current_password }, { cache: 'no-store' });

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

export async function removeUser({ id }: { id: string }) {
    try {
        const response = await deleteApiWithCredentials(`/users/remove/${id}`);

        if (!response.success) {
            throw new Error(response.message);
        }
    } catch (err: any) {
        return { error: err.message };
    }

    revalidatePath('/admin/users/management');
}

export async function removeTournament({ key, year, classId }: { key: string, year: string, classId: string}) {
    try {
        const response = await putApiWithCredentials(`/tournaments/remove-game-tournament`, { key, year, classId });

        if (!response.success) {
            throw new Error(response.message);
        }
    } catch (err: any) {
        return { error: err.message };
    }

    revalidatePath('/admin/tournaments/management');
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

export async function editActiveTournament({ description, tournaments, year }: { description: string, tournaments: any, year: string}) {
    try {
        const response = await putApiWithCredentials(`/tournaments/activate`, { description, tournaments, year });
       
        if (!response.success) {
            throw new Error(response.message);
        }
    } catch (err: any) {
        return { error: err.message };
    }

    revalidatePath('/');
}

export async function editActiveTournamentSubscription({ startDate, endDate, tournaments, year }: { startDate: string, endDate: string, tournaments: any, year: string}) {
    try {
        const response = await putApiWithCredentials(`/tournaments/subscription-open`, { startDate, endDate, tournaments, year });
       
        if (!response.success) {
            throw new Error(response.message);
        }
    } catch (err: any) {
        return { error: err.message };
    }

    revalidatePath('/');
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
