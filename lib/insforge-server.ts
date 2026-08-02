import { createClient } from "@insforge/sdk";
import { cookies } from "next/headers";

export const createInsforgeServer = async () => {
    const cookieStore = await cookies();
    const url = process.env.NEXT_PUBLIC_INSFORGE_URL;
    const anonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY;

    return createClient({
        baseUrl: url,
        anonKey,
        headers: {
            Cookie: cookieStore
                .getAll()
                .map((cookie) => `${cookie.name}=${cookie.value}`)
                .join("; "),
        },
    });
};
