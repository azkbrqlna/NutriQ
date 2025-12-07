import React from "react";
import AppLayout from "@/Components/AppLayout";
import DashboardCard from "@/Components/DashboardCard";
import {
    Beef,
    Candy,
    Wheat,
    Droplet,
    Flame,
    Leaf,
    Calendar,
    Sparkles,
    LayoutDashboard,
} from "lucide-react";
import { Head, usePage } from "@inertiajs/react";
import EventsChart from "@/Components/EventsChart";

export default function Dashboard() {
    const { user, kebutuhan, makananHariIni } = usePage().props;

    const kbt = kebutuhan || {};
    const mkn = makananHariIni || {};

    return (
        <AppLayout>
            <Head title="Dashboard" />

            <div className="max-w-7xl mx-auto w-full">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="bg-[#E9EFDB] p-2 rounded-lg text-[#7A9E7E]">
                                <LayoutDashboard size={24} />
                            </div>
                            <h1 className="text-3xl font-bold text-[#2C3A2C] tracking-tight">
                                Dashboard
                            </h1>
                        </div>
                        <p className="text-[#5C6F5C] md:text-lg">
                            Halo,{" "}
                            <span className="font-bold text-[#2C3A2C]">
                                {user?.name ?? "Pengguna"}
                            </span>
                            ! Pantau progres nutrisimu hari ini.
                        </p>
                    </div>

                    <div className="self-start md:self-center bg-white border border-[#D5E1C3] py-2 px-4 rounded-full flex items-center gap-2 text-sm font-medium text-[#5C6F5C] shadow-sm">
                        <Calendar size={16} />
                        <span>12 Desember 2025</span>
                    </div>
                </div>

                {/* BAGIAN MAKRONUTRISI */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-[#2C3A2C] mb-6 flex items-center gap-2">
                        <span className="w-1 h-6 bg-[#7A9E7E] rounded-full block"></span>
                        Makronutrisi
                    </h2>

                    {/* Menggunakan Grid untuk Responsif yang Lebih Baik */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <DashboardCard
                            icon={Flame}
                            label="Kalori"
                            makananHariIni={mkn.kalori}
                            kebutuhan={kbt.kalori}
                            satuan="Kkal"
                        />
                        <DashboardCard
                            icon={Beef}
                            label="Protein"
                            makananHariIni={mkn.protein}
                            kebutuhan={kbt.protein}
                        />
                        <DashboardCard
                            icon={Wheat}
                            label="Karbohidrat"
                            makananHariIni={mkn.karbohidrat}
                            kebutuhan={kbt.karbohidrat}
                        />
                        <DashboardCard
                            icon={Droplet}
                            label="Lemak"
                            makananHariIni={mkn.lemak}
                            kebutuhan={kbt.lemak}
                        />
                    </div>
                </div>

                {/* BAGIAN NUTRISI TAMBAHAN */}
                <div>
                    <h2 className="text-xl font-bold text-[#2C3A2C] mb-6 flex items-center gap-2">
                        <span className="w-1 h-6 bg-[#A6C19D] rounded-full block"></span>
                        Nutrisi Tambahan
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <DashboardCard
                            icon={Sparkles}
                            label="Natrium"
                            makananHariIni={mkn.natrium}
                            kebutuhan={kbt.natrium}
                            satuan="mg"
                        />
                        <DashboardCard
                            icon={Leaf}
                            label="Serat"
                            makananHariIni={mkn.serat}
                            kebutuhan={kbt.serat}
                        />
                        <DashboardCard
                            icon={Candy}
                            label="Gula"
                            makananHariIni={mkn.gula_tambahan}
                            kebutuhan={kbt.gula_tambahan}
                        />
                    </div>
                </div>

                <EventsChart />
            </div>
        </AppLayout>
    );
}
