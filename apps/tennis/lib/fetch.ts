export async function getApi(url: string, options?: {}): Promise<any> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_BASE_URL}${url}`, {
        ...options
    });
    return await response.json();
}

export async function postApi(url: string, data: {}, options?: {}): Promise<any> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_BASE_URL}${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        ...options,
    });

    return await response.json();
}

export async function putApi(url: string, data: {}, options?: {}): Promise<any> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_BASE_URL}${url}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        ...options,
    });

    return await response.json();
}

export async function deleteApi(url: string, options?: {}): Promise<any> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_BASE_URL}${url}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        ...options,
    });

    return await response.json();
}