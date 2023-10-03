import { Navbar } from "@/components/navbar"
import "./globals.css"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"

const font = Poppins({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	subsets: ["latin"],
})

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
				{children}
			</body>
		</html>
	)
}
