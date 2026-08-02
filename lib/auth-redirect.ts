const protectedPrefixes = ["/dashboard", "/find-jobs", "/profile"];

export const isProtectedPath = (pathname: string) => {
    return protectedPrefixes.some(
        (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
    );
};

export const getSafeRedirectPath = (value: string | null | undefined) => {
    if (!value) {
        return "/dashboard";
    }

    if (!value.startsWith("/")) {
        return "/dashboard";
    }

    if (value.startsWith("//")) {
        return "/dashboard";
    }

    if (value === "/login") {
        return "/dashboard";
    }

    return value;
};
