import { createServerClient } from "@insforge/sdk/ssr";
import { cookies } from "next/headers";

export const createInsforgeServer = async () => {
    const cookieStore = await cookies();
    return createServerClient({ cookies: cookieStore });
};

export const getCurrentUser = async () => {
    const client = await createInsforgeServer();
    const { data, error } = await client.auth.getCurrentUser();

    if (error) {
        return null;
    }

    return data?.user ?? null;
};
