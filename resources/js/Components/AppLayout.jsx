import { Link, router, useForm, usePage } from "@inertiajs/react";
import { LayoutDashboard, History, Soup, ScanLine } from "lucide-react";

export default function AppLayout({ children }) {
    const { url, props } = usePage();
    const user = props.auth?.user;
    const { post } = useForm();

    const handleLogout = () => {
        post("/logout");
    };

    const menus = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: <LayoutDashboard size={25} />,
        },
        {
            name: "Scan Makanan",
            href: "/scan",
            icon: <ScanLine size={25} />,
        },
        {
            name: "Riwayat",
            href: "/riwayat",
            icon: <History size={25} />,
        },
        {
            name: "Rekomendasi",
            href: "/rekomendasi",
            icon: <Soup size={25} />,
        },
    ];

    const isActive = (path) => url.startsWith(path);

    return (
        <div className="min-h-screen flex bg-[#F1F3E0]">
            {/* SIDEBAR */}
            <aside className="lg:max-w-[300px] max-w-[270px] fixed top-0 left-0 bottom-0 w-full p-6 md:flex hidden flex-col justify-between bg-secondary">
                {/* Logo + Brand */}
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        {/* <div className="w-10 h-10 rounded-full bg-quartenary" /> */}
                        <span className="text-2xl font-semibold">NutriQ</span>
                    </div>

                    {/* Menu Items */}
                    <nav className="space-y-5">
                        {menus.map((item, i) => (
                            <Link
                                key={i}
                                href={item.href}
                                className={
                                    "flex items-center text-lg gap-4 px-2 py-[10px] rounded-lg transition " +
                                    (isActive(item.href)
                                        ? "bg-tertiary shadow-md font-medium"
                                        : "hover:bg-tertiary/80")
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
                    <div className="w-14 h-14 rounded-full bg-quartenary flex items-center justify-center text-white font-semibold">
                        <span className="text-xl">
                            {user?.name?.slice(0, 2).toUpperCase() ?? "US"}
                        </span>
                    </div>
                    <div>
                        <p className="font-semibold text-lg">
                            {user?.name ?? "User"}
                        </p>
                        <button
                            className="text-gray-700 hover:underline "
                            onClick={() => router.visit("/profil")}
                        >
                            View profile
                        </button>
                    </div>
                </div>
            </aside>

            {/* CONTENT */}
            <main className="flex-1 lg:ml-[19rem] sm:ml-[17rem] ml-0 md:px-[4rem] py-[3rem] p-[2rem] w-full">
                {children}
            </main>
        </div>
    );
}
