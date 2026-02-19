import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Hramelot",
    description: "Welcome to Hramelot website",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
        <body className={`flex min-h-screen flex-col ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
        </Providers>
        </body>
        </html>
    );
}