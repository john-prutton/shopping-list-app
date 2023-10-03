import { MenuIcon } from "lucide-react"

export function Navbar() {
	return (
		<nav className="flex flex-row justify-between items-center p-2 w-full bg-slate-400 rounded-md h-12 shadow-md">
			<p className="font-bold text-2xl text-white">SH</p>

			<MenuIcon />
		</nav>
	)
}
