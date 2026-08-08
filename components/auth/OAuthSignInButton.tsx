"use client";

import posthog from "posthog-js";
import type { ComponentProps } from "react";

const isPostHogConfigured = Boolean(
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN &&
  process.env.NEXT_PUBLIC_POSTHOG_HOST,
);

type OAuthSignInButtonProps = ComponentProps<"button"> & {
  provider: "google" | "github";
};

export function OAuthSignInButton({
  provider,
  onClick,
  ...props
}: OAuthSignInButtonProps) {
  return (
    <button
      {...props}
      onClick={(event) => {
        if (isPostHogConfigured) {
          posthog.capture("sign_in_started", { provider });
        }
        onClick?.(event);
      }}
    />
  );
}
