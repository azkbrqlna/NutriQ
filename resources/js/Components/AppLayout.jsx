import { Link, usePage } from "@inertiajs/react";
import { LayoutDashboard, ScanSearch, History, Soup } from "lucide-react";

export default function AppLayout({ children }) {
    const { url, props } = usePage();
    const user = props.auth?.user;

    const menus = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: <LayoutDashboard className="w-5 h-5" />,
        },
        {
            name: "Scan Makanan",
            href: "/scan",
            icon: <ScanSearch className="w-5 h-5" />,
        },
        {
            name: "Riwayat",
            href: "/riwayat",
            icon: <History className="w-5 h-5" />,
        },
        {
            name: "Rekomendasi",
            href: "/rekomendasi",
            icon: <Soup className="w-5 h-5" />,
        },
    ];

    const isActive = (path) => url.startsWith(path);

    return (
        <div className="min-h-screen flex bg-[#F1F3E0]">
            {/* SIDEBAR */}
            <aside className="w-64 p-6 flex flex-col justify-between bg-[#D6E0B4]">
                {/* Logo + Brand */}
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-full bg-[#8A9B73]" />
                        <span className="text-xl font-semibold">NutriQ</span>
                    </div>

                    {/* Menu Items */}
                    <nav className="space-y-1">
                        {menus.map((item, i) => (
                            <Link
                                key={i}
                                href={item.href}
                                className={
                                    "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition " +
                                    (isActive(item.href)
                                        ? "bg-[#AFCB8D]"
                                        : "hover:bg-[#BFD9A1]")
                                }
                            >
                                {item.icon}
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* User Section */}
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#8A9B73] flex items-center justify-center text-white font-semibold">
                        {user?.name?.slice(0, 2).toUpperCase() ?? "US"}
                    </div>
                    <div>
                        <p className="font-semibold">{user?.name ?? "User"}</p>
                        <Link
                            href="/profile"
                            className="text-sm text-gray-700 hover:underline"
                        >
                            View profile
                        </Link>
                    </div>
                </div>
            </aside>

            {/* CONTENT */}
            <main className="flex-1 p-10">{children}</main>
        </div>
    );
}
