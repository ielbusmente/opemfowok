import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Opemfowok | Modern Job Hunt Assistance Platform",
    description: "Discover exciting opportunities with Opemfowok.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full antialiased" suppressHydrationWarning>
            <body
                className="min-h-full flex flex-col bg-background text-text-primary"
                suppressHydrationWarning
            >
                {children}
            </body>
        </html>
    );
}
