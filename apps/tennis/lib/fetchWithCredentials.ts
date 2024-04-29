'use server'

import { cookies } from "next/headers";

export async function postApiWithCredentials(url: string, data: {}, options?: {}): Promise<any> {
    const token = cookies().get("token")?.value;

    const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_BASE_URL}${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Cookie': `token=${token}`
        },
        body: JSON.stringify(data),
        ...options,
    });

    return await response.json();
}

export async function deleteApiWithCredentials(url: string, options?: {}): Promise<any> {
    const token = cookies().get("token")?.value;

    const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_BASE_URL}${url}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Cookie': `token=${token}`
        },
        ...options,
    });

    return await response.json();
}

export async function putApiWithCredentials(url: string,  data: {}, options?: {}): Promise<any> {
    const token = cookies().get("token")?.value;

    const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_BASE_URL}${url}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'Cookie': `token=${token}`
        },
        body: JSON.stringify(data),
        ...options,
    });

    return await response.json();
}