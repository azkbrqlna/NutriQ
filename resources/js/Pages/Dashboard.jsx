import React from "react";
import AppLayout from "@/Components/AppLayout";
import DashboardCard from "@/Components/DashboardCard"; // Pastikan path benar
import {
    Beef,
    Candy,
    Wheat,
    Droplet,
    Flame,
    Leaf,
    Calendar,
    Sparkles,
} from "lucide-react";
import { Head, usePage } from "@inertiajs/react";

export default function Dashboard() {
    // Langsung destructure data dari props
    const { user, kebutuhan, makananHariIni, tanggal } = usePage().props;

    // Pastikan objek ada agar tidak error saat mengakses properti
    const kbt = kebutuhan || {};
    const mkn = makananHariIni || {};

    return (
        <AppLayout>
            <Head title="Dashboard" />
            <div className="max-w-[980px] w-full">
                <div className="w-full flex justify-between items-center ">
                    <h1 className="md:text-4xl text-3xl font-bold">
                        Dashboard
                    </h1>
                    <button className="bg-tertiary hover:bg-tertiary/80 p-[0.6rem] rounded-xl flex items-center gap-[0.5rem]">
                        <Calendar size={18} />
                        <span className="md:text-lg">Hari ini</span>
                    </button>
                </div>
                <p className="md:text-xl text-lg opacity-80 md:max-w-[65%] w-full mt-[1rem]">
                    Halo {user?.name ?? "Pengguna"}! Pantau nutrisi makro dan
                    mikro Anda hari ini untuk mencapai target kesehatan Anda.
                </p>

                {/* Bagian Makronutrisi */}
                <div className="mt-[2rem]">
                    <h2 className="md:text-2xl text-xl font-bold">
                        Makronutrisi
                    </h2>
                    <div className="container flex md:gap-[2rem] gap-[1.5rem] flex-wrap justify-between items-center mt-[1.5rem]">
                        {/* 1. Protein */}
                        <DashboardCard
                            icon={Beef}
                            label="Protein (g)"
                            makananHariIni={mkn.protein}
                            kebutuhan={kbt.protein}
                            className="lg:w-[47%]"
                            satuan="g"
                        />

                        {/* 2. Karbohidrat */}
                        <DashboardCard
                            icon={Wheat}
                            label="Karbohidrat (g)"
                            makananHariIni={mkn.karbohidrat}
                            kebutuhan={kbt.karbohidrat}
                            className="lg:w-[47%]"
                            satuan="g"
                        />

                        {/* 3. Lemak */}
                        <DashboardCard
                            icon={Droplet}
                            label="Lemak (g)"
                            makananHariIni={mkn.lemak}
                            kebutuhan={kbt.lemak}
                            className="lg:w-[47%]"
                            satuan="g"
                        />

                        {/* 4. Kalori */}
                        <DashboardCard
                            icon={Flame}
                            label="Kalori (Kkal)"
                            makananHariIni={mkn.kalori}
                            kebutuhan={kbt.kalori}
                            className="lg:w-[47%]"
                            satuan="Kkal"
                        />
                    </div>
                </div>

                {/* Bagian Nutrisi Tambahan */}
                <div className="mt-[3rem] ">
                    <h2 className="md:text-2xl text-xl font-bold">
                        Nutrisi Tambahan
                    </h2>
                    <div className="container flex md:gap-[1.5rem] gap-[1.5rem] flex-wrap justify-between items-center mt-[1.5rem]">
                        {/* 5. Natrium */}
                        <DashboardCard
                            icon={Sparkles}
                            label="Natrium (mg)"
                            makananHariIni={mkn.natrium}
                            kebutuhan={kbt.natrium}
                            className="lg:w-[30%]"
                            satuan="mg"
                        />

                        {/* 6. Serat */}
                        <DashboardCard
                            icon={Leaf}
                            label="Serat (g)"
                            makananHariIni={mkn.serat}
                            kebutuhan={kbt.serat}
                            className="lg:w-[30%]"
                            satuan="g"
                        />

                        {/* 7. Gula */}
                        <DashboardCard
                            icon={Candy}
                            label="Gula (g)"
                            makananHariIni={mkn.gula_tambahan}
                            kebutuhan={kbt.gula_tambahan}
                            className="lg:w-[30%]"
                            satuan="g"
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
