import { useState } from "react"; 
import { Link, router, useForm, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    History,
    Soup,
    ScanSearch,
    LogOut,
    Menu, 
    X,
    Carrot, 
} from "lucide-react";
import { Toaster } from "sonner";
import AvocadoIcon from "./AvocadoIcon";

export default function AppLayout({ children }) {
    const { url, props } = usePage();
    const user = props.auth?.user;
    const { post } = useForm();

    // 4. State untuk kontrol sidebar mobile
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        post("/logout");
    };

    const menus = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: <LayoutDashboard size={22} />,
        },
        {
            name: "Scan Makanan",
            href: "/scan-makanan",
            icon: <ScanSearch size={22} />,
        },
        { name: "Riwayat", href: "/riwayat", icon: <History size={22} /> },
        { name: "Rekomendasi", href: "/rekomendasi", icon: <Soup size={22} /> },
    ];

    const isActive = (path) => url.startsWith(path);

    return (
        <>
            <Toaster richColors closeButton position="top-center" />

            <div className="min-h-screen flex flex-col md:flex-row bg-[#F7F9F0] text-[#2C3A2C] font-sans">
                {/* --- MOBILE HEADER (Hanya muncul di layar kecil) --- */}
                <div className="md:hidden bg-[#E9EFDB] p-4 flex items-center justify-between border-b border-[#D5E1C3] sticky top-0 z-40">
                    <div className="flex items-center gap-2">
                        <div className="bg-[#7A9E7E] rounded-lg flex items-center justify-center w-8 h-8 text-white">
                            <Carrot className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-lg text-[#2C3A2C]">
                            NutriQ
                        </span>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 hover:bg-[#D5E1C3] rounded-lg transition"
                    >
                        <Menu size={24} />
                    </button>
                </div>

                {/* --- OVERLAY (Background Gelap saat menu terbuka di HP) --- */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* --- SIDEBAR --- */}
                <aside
                    className={`
                        fixed md:fixed inset-y-0 left-0 z-50
                        w-[280px] bg-[#E9EFDB] border-r border-[#D5E1C3] p-6
                        flex flex-col justify-between
                        transition-transform duration-300 ease-in-out
                        ${
                            isSidebarOpen
                                ? "translate-x-0"
                                : "-translate-x-full"
                        } 
                        md:translate-x-0
                    `}
                >
                    <div>
                        {/* Header Sidebar & Close Button for Mobile */}
                        <div className="flex items-center justify-between mb-10 px-2">
                            <div className="flex items-center gap-3">
                                <div className="bg-[#7A9E7E] rounded-lg flex items-center justify-center w-10 h-10 text-white">
                                    <Carrot className="w-6 h-6 " />
                                </div>
                                <span className="text-2xl font-bold tracking-tight text-[#2C3A2C]">
                                    NutriQ
                                </span>
                            </div>

                            {/* Tombol Close (X) hanya di Mobile */}
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="md:hidden text-[#5C6F5C] hover:text-red-500 transition"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <nav className="space-y-2">
                            {menus.map((item, i) => {
                                const active = isActive(item.href);
                                return (
                                    <Link
                                        key={i}
                                        href={item.href}
                                        // Tutup sidebar saat menu diklik di mobile
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={`flex items-center text-sm font-medium gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                            active
                                                ? "bg-[#7A9E7E] text-white shadow-md shadow-[#7A9E7E]/20"
                                                : "text-[#5C6F5C] hover:bg-[#D5E1C3] hover:text-[#2C3A2C]"
                                        }`}
                                    >
                                        {item.icon}
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Profile Section */}
                    <div className="border-t border-[#D5E1C3] pt-6">
                        <div className="flex items-center justify-between gap-3 mb-4 ">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#7A9E7E] flex items-center justify-center text-white font-bold text-sm">
                                    {user?.name?.slice(0, 2).toUpperCase() ??
                                        "US"}
                                </div>
                                <div className="overflow-hidden w-24">
                                    <p className="font-semibold text-sm truncate text-[#2C3A2C]">
                                        {user?.name ?? "User"}
                                    </p>
                                    <button
                                        onClick={() => router.visit("/profil")}
                                        className="text-xs text-[#5C6F5C] hover:text-[#7A9E7E] transition text-left"
                                    >
                                        Lihat Profil
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-sm font-medium text-red-600 hover:bg-red-50 px-2 py-2 rounded-lg transition"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    </div>
                </aside>

                {/* --- MAIN CONTENT --- */}
                <main className="flex-1 md:ml-[280px] p-4 md:p-10 w-full overflow-x-hidden">
                    {children}
                </main>
            </div>
        </>
    );
}
