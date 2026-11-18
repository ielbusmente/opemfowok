const protectedPrefixes = ["/dashboard", "/find-jobs", "/profile"];

export const isProtectedPath = (pathname: string) => {
    return protectedPrefixes.some(
        (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
    );
};

export const getSafeRedirectPath = (value: string | null | undefined) => {
    if (!value) {
        return "/profile";
    }

    if (!value.startsWith("/")) {
        return "/profile";
    }

    if (value.startsWith("//")) {
        return "/profile";
    }

    if (value === "/login") {
        return "/profile";
    }

    return value;
};
