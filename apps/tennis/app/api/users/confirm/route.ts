import { postApi } from "@tennis/lib/fetch";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const BASE_URL = process.env.NEXT_PUBLIC_ENV_MODE === 'development' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_ENV_BASE_FRONT_URL;
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    const response = await postApi('/users/confirm', { token });

    if (response?.error) {
        return NextResponse.redirect(`${BASE_URL}/users/confirm?valid=false`)
    }

    return NextResponse.redirect(`${BASE_URL}/users/confirm?valid=${response.success}`)
}