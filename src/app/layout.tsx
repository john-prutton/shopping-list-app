import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { Toaster } from "@/components/ui/toaster"
import { Navbar } from "@/components/layout/navbar"
import NextAuthProvider from "@/lib/auth/Provider";

const font = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Shopping List App",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={font.className + " p-2"}>
				<Navbar />
				
<NextAuthProvider>{children}</NextAuthProvider>

				<Toaster />
			</body>
		</html>
	)
}
