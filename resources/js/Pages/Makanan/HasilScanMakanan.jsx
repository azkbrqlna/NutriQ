import React from "react";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import AppLayout from "@/Components/AppLayout";

export default function HasilScan({ makanan }) {
    return (
        <AppLayout>
            <div className="min-h-screen p-10 bg-[#F1F3E0]">
                <Head title="Hasil Scan" />

                {/* Header */}
                <div className="flex justify-between items-start mb-8">
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
                    {/* Foto */}
                    <img
                        src={makanan.foto}
                        className="w-64 rounded-xl shadow object-cover"
                        alt="Foto makanan"
                    />

                    {/* Detail */}
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
                        unit="g"
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

                <div className="bg-white rounded-xl overflow-hidden border">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-100">
                                <TableHead>Item</TableHead>
                                <TableHead className="text-right">
                                    Kalori
                                </TableHead>
                                <TableHead className="text-right">P</TableHead>
                                <TableHead className="text-right">L</TableHead>
                                <TableHead className="text-right">K</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {makanan.detail_makanans.map((d, i) => (
                                <TableRow key={i} className="hover:bg-gray-50">
                                    <TableCell className="font-medium">
                                        {d.nama}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {d.kalori}
                                    </TableCell>
                                    <TableCell className="text-right text-sm">
                                        {d.protein}
                                    </TableCell>
                                    <TableCell className="text-right text-sm">
                                        {d.lemak}
                                    </TableCell>
                                    <TableCell className="text-right text-sm">
                                        {d.karbohidrat}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}

/* ==== COMPONENT MINI UNTUK BOX NUTRISI ==== */

function Nutrisi({ label, value, unit }) {
    return (
        <div className="flex flex-col items-center">
            <p className="text-gray-700">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-gray-600">{unit}</p>
        </div>
    );
}
