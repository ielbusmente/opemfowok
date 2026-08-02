import test from "node:test";
import assert from "node:assert/strict";
import { getSafeRedirectPath, isProtectedPath } from "./auth-redirect.js";

test("keeps safe internal paths", () => {
    assert.equal(getSafeRedirectPath("/dashboard"), "/dashboard");
    assert.equal(getSafeRedirectPath("/find-jobs/123"), "/find-jobs/123");
});

test("rejects external and unsafe paths", () => {
    assert.equal(getSafeRedirectPath("https://evil.test/path"), "/dashboard");
    assert.equal(getSafeRedirectPath("//evil.test/path"), "/dashboard");
    assert.equal(getSafeRedirectPath("/login"), "/dashboard");
});

test("detects protected app routes", () => {
    assert.equal(isProtectedPath("/dashboard"), true);
    assert.equal(isProtectedPath("/find-jobs/123"), true);
    assert.equal(isProtectedPath("/"), false);
    assert.equal(isProtectedPath("/login"), false);
});
