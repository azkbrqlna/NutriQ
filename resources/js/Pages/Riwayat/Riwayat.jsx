import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import AppLayout from "@/Components/AppLayout";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Search, CalendarDays } from "lucide-react";

export default function Riwayat({ makanans, filters }) {
    const [search, setSearch] = React.useState(filters?.search || "");
    const [tanggal, setTanggal] = React.useState(filters?.tanggal || "");

    // SEARCH realtime
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                "/riwayat",
                { search, tanggal },
                { preserveState: true, replace: true }
            );
        }, 400);

        return () => clearTimeout(timeout);
    }, [search]);

    // FILTER TANGGAL realtime
    React.useEffect(() => {
        if (!tanggal) return;

        router.get(
            "/riwayat",
            { search, tanggal },
            { preserveState: true, replace: true }
        );
    }, [tanggal]);

    return (
        <AppLayout>
            <Head title="Riwayat Makanan" />

            <div className="max-w-6xl w-full">
                <h1 className="text-4xl font-bold mb-6">Riwayat</h1>

                {/* Search & Date Filter */}
                <div className="flex items-center justify-between mb-6">
                    {/* SEARCH */}
                    <div className="relative w-1/2">
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                        <Input
                            placeholder="Ketikkan makanan..."
                            className="pl-10 border-green-400 bg-white"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* DATE FILTER BUTON */}
                    <div className="relative">
                        {/* Invisible input date */}
                        <input
                            type="date"
                            value={tanggal}
                            onChange={(e) => setTanggal(e.target.value)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
                        />

                        <Button className="border border-green-400 bg-white text-black hover:bg-green-100 flex items-center">
                            <CalendarDays className="h-5 w-5 mr-2" />
                            Filter Tanggal
                        </Button>
                    </div>
                </div>

                {/* TABLE */}
                <div className="rounded-xl border border-green-300 shadow-md overflow-hidden bg-white">
                    <Table>
                        <TableHeader className="bg-green-200/70">
                            <TableRow>
                                <TableHead className="font-semibold text-black">
                                    Foto
                                </TableHead>
                                <TableHead className="font-semibold text-black">
                                    Tanggal
                                </TableHead>
                                <TableHead className="font-semibold text-black">
                                    Waktu
                                </TableHead>
                                <TableHead className="font-semibold text-black">
                                    Menu
                                </TableHead>
                                <TableHead className="font-semibold text-black">
                                    Kalori
                                </TableHead>
                                <TableHead className="font-semibold text-black">
                                    Protein
                                </TableHead>
                                <TableHead className="font-semibold text-black">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {makanans.data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="text-center py-10 text-gray-500"
                                    >
                                        Belum ada riwayat makanan.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                makanans.data.map((item) => (
                                    <TableRow
                                        key={item.id}
                                        className="hover:bg-green-50 transition-all"
                                    >
                                        <TableCell>
                                            <img
                                                src={item.foto}
                                                className="h-14 w-14 rounded-full object-cover shadow"
                                            />
                                        </TableCell>

                                        <TableCell className="text-gray-800">
                                            {item.tanggal}
                                        </TableCell>

                                        <TableCell className="text-gray-800">
                                            {item.jam}
                                        </TableCell>

                                        <TableCell className="font-medium">
                                            {item.nama}
                                        </TableCell>
                                        <TableCell>
                                            {item.total_kalori} kcal
                                        </TableCell>
                                        <TableCell>
                                            {item.total_protein} g
                                        </TableCell>

                                        <TableCell>
                                            <Link
                                                href={`/riwayat/${item.slug}`}
                                            >
                                                <Button className="bg-green-600 text-white hover:bg-green-700">
                                                    Detail
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>

                        <TableCaption className="text-gray-600 mt-4">
                            Daftar makanan yang pernah kamu scan.
                        </TableCaption>
                    </Table>
                </div>

                {/* PAGINATION */}
                <div className="flex justify-center items-center gap-2 mt-6">
                    {makanans.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || "#"}
                            className={`
                                px-4 py-2 rounded-full text-sm transition
                                ${
                                    link.active
                                        ? "bg-green-600 text-white shadow"
                                        : "bg-green-100 text-black hover:bg-green-200"
                                }
                            `}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
