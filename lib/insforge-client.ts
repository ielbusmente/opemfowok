"use client";

import { createBrowserClient } from "@insforge/sdk/ssr";
import posthog from "posthog-js";
import { createElement, useEffect } from "react";

const isPostHogConfigured = Boolean(
    process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN && process.env.NEXT_PUBLIC_POSTHOG_HOST,
);

export const insforge = createBrowserClient();

type AuthenticatedUser = {
    id: string;
    email: string;
    name?: string;
};

export function PostHogIdentify({ user }: { user: AuthenticatedUser }) {
    useEffect(() => {
        if (isPostHogConfigured) {
            posthog.identify(user.id, {
                email: user.email,
                ...(user.name ? { name: user.name } : {}),
            });
        }
    }, [user.email, user.id, user.name]);

    return null;
}

export function PostHogResetButton() {
    return createElement(
        "button",
        {
            type: "submit",
            onClick: () => {
                if (isPostHogConfigured) {
                    posthog.capture("sign_out");
                    posthog.reset();
                }
            },
            className:
                "rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-text-dark transition hover:border-accent hover:text-accent",
        },
        "Sign out",
    );
}
