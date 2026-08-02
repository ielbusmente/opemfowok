import { createClient } from "@insforge/sdk";

const url = process.env.NEXT_PUBLIC_INSFORGE_UR;
const anonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY;

export const insforge = createClient({
    baseUrl: url,
    anonKey,
});
