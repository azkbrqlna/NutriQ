import React from "react";
// Import DatePickerDropdown sesuai permintaan
import { DatePickerDropdown } from "@/Components/ui/date-picker-dropdown";
// Import 'router' dari Inertia untuk menangani filter tanggal
import { Head, usePage, router } from "@inertiajs/react";
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
    // TimePickerDropdown tidak diperlukan karena Anda hanya ingin tanggal
} from "lucide-react";
import EventsChart from "@/Components/EventsChart";

export default function Dashboard() {
    // Ambil prop baru
    const {
        user,
        kebutuhan,
        makananHariIni,
        tanggal,
        makananRentangTanggal,
        chartDates,
    } = usePage().props;

    // State untuk tanggal hari ini (dipakai di header)
    const [tanggalHeader, setTanggalHeader] = React.useState(new Date(tanggal));

    // Fungsi untuk mengubah tanggal pada header 'Hari Ini'
    const handleDateChange = (date) => {
        if (!date) return; // Pastikan tanggal valid
        setTanggalHeader(date);

        // Format tanggal ke string YYYY-MM-DD
        const formattedDate = date.toISOString().split("T")[0];

        // Lakukan request Inertia baru dengan tanggal yang dipilih
        router.get(
            route("dashboard"),
            { tanggal: formattedDate },
            { preserveState: true } // Pertahankan state lokal (seperti scroll position)
        );
    };

    const opsiFormat = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    const tanggalTerformat = tanggalHeader.toLocaleDateString(
        "id-ID",
        opsiFormat
    );

    // Definisi 7 Kebutuhan Harian untuk dipakai di Chart dan Card
    const nutritionKeys = {
        Kalori: {
            icon: Flame,
            color: "#7A9E7E",
            label: "Kalori",
            satuan: "Kkal",
        },
        Protein: {
            icon: Beef,
            color: "#7A9E7E",
            label: "Protein",
            satuan: "g",
        },
        Karbohidrat: {
            icon: Wheat,
            color: "#7A9E7E",
            label: "Karbohidrat",
            satuan: "g",
        },
        Lemak: { icon: Droplet, color: "#7A9E7E", label: "Lemak", satuan: "g" },
        Natrium: {
            icon: Sparkles,
            color: "#A6C19D",
            label: "Natrium",
            satuan: "mg",
        },
        Serat: { icon: Leaf, color: "#A6C19D", label: "Serat", satuan: "g" },
        Gula_tambahan: {
            icon: Candy,
            color: "#A6C19D",
            label: "Gula Tambahan",
            satuan: "g",
        },
    };

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

                    {/* Tombol Date Picker untuk Filter 'Hari Ini' */}
                    <div className="self-start md:self-center">
                        <DatePickerDropdown
                            value={tanggalHeader}
                            onChange={handleDateChange}
                            align="end" // Dropdown muncul di kanan
                        >
                            {/* Konten yang akan menjadi tombol/trigger dropdown */}
                            <div className="bg-white border border-[#D5E1C3] py-2 px-4 rounded-full flex items-center gap-2 text-sm font-medium text-[#5C6F5C] shadow-sm cursor-pointer">
                                <Calendar size={16} />
                                <span>{tanggalTerformat}</span>
                            </div>
                        </DatePickerDropdown>
                    </div>
                </div>

                {/* BAGIAN MAKRONUTRISI */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-[#2C3A2C] mb-6 flex items-center gap-2">
                        <span className="w-1 h-6 bg-[#7A9E7E] rounded-full block"></span>
                        Makronutrisi
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Object.entries({
                            Kalori: mkn.kalori,
                            Protein: mkn.protein,
                            Karbohidrat: mkn.karbohidrat,
                            Lemak: mkn.lemak,
                        }).map(([key, value]) => {
                            const config = nutritionKeys[key];
                            return (
                                <DashboardCard
                                    key={key}
                                    icon={config.icon}
                                    label={config.label}
                                    makananHariIni={value}
                                    kebutuhan={kbt[key.toLowerCase()]}
                                    satuan={config.satuan}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* BAGIAN NUTRISI TAMBAHAN */}
                <div>
                    <h2 className="text-xl font-bold text-[#2C3A2C] mb-6 flex items-center gap-2">
                        <span className="w-1 h-6 bg-[#A6C19D] rounded-full block"></span>
                        Nutrisi Tambahan
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Object.entries({
                            Natrium: mkn.natrium,
                            Serat: mkn.serat,
                            Gula_tambahan: mkn.gula_tambahan,
                        }).map(([key, value]) => {
                            const config = nutritionKeys[key];
                            // Khusus untuk Gula_tambahan, key di prop adalah gula_tambahan
                            const propKey =
                                key === "Gula_tambahan"
                                    ? "gula_tambahan"
                                    : key.toLowerCase();

                            return (
                                <DashboardCard
                                    key={key}
                                    icon={config.icon}
                                    label={config.label}
                                    makananHariIni={value}
                                    kebutuhan={kbt[propKey]}
                                    satuan={config.satuan}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* EventsChart Baru */}
                <EventsChart
                    data={makananRentangTanggal}
                    chartDates={chartDates}
                    nutritionKeys={nutritionKeys}
                    kebutuhan={kebutuhan}
                />
            </div>
        </AppLayout>
    );
}
