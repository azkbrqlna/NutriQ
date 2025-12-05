import React from "react";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import AppLayout from "@/Components/AppLayout";

export default function HasilScan({ makanan }) {
    return (
        <AppLayout>
            <div className="w-full min-h-screen bg-[#F1F3E0]">
                <Head title="Hasil Scan" />

                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <Link href={route("riwayat.index")}>
                        <Button className="bg-[#6E8F5C] text-white px-4 rounded-lg hover:bg-[#5d7d4d]">
                            Kembali
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-semibold">
                        Hasil Scan Makanan
                    </h1>

                    <Link href={route("scan.index")}>
                        <Button className="bg-[#6E8F5C] text-white px-6 rounded-xl hover:bg-[#5d7d4d]">
                            Scan Lagi
                        </Button>
                    </Link>
                </div>

                {/* FOTO + WAKTU + ITEM */}
                <div className="flex flex-col md:flex-row gap-6 mb-10">
                    <img
                        src={makanan.foto}
                        className="w-64 rounded-xl shadow object-cover"
                        alt="Foto makanan"
                    />

                    <div className="space-y-2 text-black">
                        <div>
                            <p className="text-sm text-gray-600">Waktu scan</p>
                            <p className="font-semibold text-lg">
                                {makanan.tanggal_formatted ?? makanan.tanggal},{" "}
                                {makanan.jam}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-600">
                                Item terdeteksi
                            </p>
                            <p className="font-semibold text-lg">
                                {makanan.detail_makanans.length} item makanan
                            </p>
                        </div>
                    </div>
                </div>

                {/* TOTAL NUTRISI */}
                <h2 className="text-xl font-semibold mb-4">
                    Total nutrisi makanan
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6 mb-10 text-center">
                    <Nutrisi
                        label="Karbohidrat"
                        value={makanan.total_karbohidrat}
                        unit="g"
                    />
                    <Nutrisi
                        label="Kalori"
                        value={makanan.total_kalori}
                        unit="kkal"
                    />
                    <Nutrisi
                        label="Lemak"
                        value={makanan.total_lemak}
                        unit="g"
                    />
                    <Nutrisi
                        label="Protein"
                        value={makanan.total_protein}
                        unit="g"
                    />
                    <Nutrisi
                        label="Serat"
                        value={makanan.total_serat}
                        unit="g"
                    />
                    <Nutrisi
                        label="Natrium"
                        value={makanan.total_natrium}
                        unit="mg"
                    />
                    <Nutrisi
                        label="Gula"
                        value={makanan.total_gula_tambahan}
                        unit="g"
                    />
                </div>

                {/* RINCIAN NUTRISI MAKANAN */}
                <h2 className="text-xl font-semibold mb-4">
                    Rincian nutrisi makanan
                </h2>

                <div className="space-y-6">
                    {makanan.detail_makanans.map((d, i) => {
                        // --- Hitung berat otomatis kalau tidak ada ---
                        const beratOtomatis =
                            parseFloat(d.karbohidrat || 0) +
                            parseFloat(d.protein || 0) +
                            parseFloat(d.lemak || 0);

                        const beratFinal = d.berat ?? beratOtomatis.toFixed(1);

                        return (
                            <div
                                key={i}
                                className="bg-white rounded-xl border shadow-sm p-5"
                            >
                                {/* HEADER */}
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-lg font-semibold">
                                        {d.nama}
                                    </p>
                                    <p className="text-sm font-medium text-gray-600">
                                        {beratFinal}g
                                    </p>
                                </div>

                                {/* GRID NUTRISI */}
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                    <NutrisiItem
                                        label="Kalori"
                                        value={d.kalori}
                                    />
                                    <NutrisiItem
                                        label="Protein (g)"
                                        value={d.protein}
                                    />
                                    <NutrisiItem
                                        label="Lemak (g)"
                                        value={d.lemak}
                                    />
                                    <NutrisiItem
                                        label="Karbo (g)"
                                        value={d.karbohidrat}
                                    />
                                    <NutrisiItem
                                        label="Natrium (mg)"
                                        value={d.natrium}
                                    />
                                    <NutrisiItem
                                        label="Serat (g)"
                                        value={d.serat}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}

/* ==== COMPONENT MINI UNTUK TOTAL NUTRISI ==== */
function Nutrisi({ label, value, unit }) {
    return (
        <div className="flex flex-col items-center">
            <p className="text-gray-700">{label}</p>
            <p className="text-2xl font-bold flex items-end gap-[2px]">
                {value}
                <span className="text-sm text-gray-600 font-normal">
                    {unit}
                </span>
            </p>
        </div>
    );
}

/* ==== COMPONENT MINI RINCIAN MAKANAN ==== */
function NutrisiItem({ label, value }) {
    return (
        <div className="flex flex-col bg-white border rounded-lg p-3">
            <p className="text-xs text-gray-500">{label}</p>
            <p className="mt-1 font-semibold text-black text-sm">{value}</p>
        </div>
    );
}
