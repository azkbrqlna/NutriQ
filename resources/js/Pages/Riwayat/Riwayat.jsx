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
import { Search, CalendarDays, XCircle } from "lucide-react";

export default function Riwayat({ makanans, filters }) {
    const [search, setSearch] = React.useState(filters?.search || "");
    const [tanggal, setTanggal] = React.useState(filters?.tanggal || "");

    const inputTanggalRef = React.useRef(null);

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

    const resetTanggal = () => {
        setTanggal("");
        router.get(
            "/riwayat",
            { search, tanggal: "" },
            { preserveState: true, replace: true }
        );
    };

    return (
        <AppLayout>
            <Head title="Riwayat Makanan" />

            <div className="max-w-6xl w-full">
                <h1 className="text-4xl font-bold mb-6">Riwayat</h1>

                {/* Search & Date Filter */}
                <div className="flex items-center justify-between mb-6">
                    {/* SEARCH */}
                    <div className="relative w-1/2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                        <Input
                            placeholder="Ketikkan makanan..."
                            className="pl-10 border-green-400 bg-white"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* DATE FILTER (container clickable + reset terpisah) */}
                    <div className="flex items-center gap-2">
                        {/* Date Picker Box */}
                        <div
                            className="relative flex items-center gap-2 border border-green-400 bg-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-100 transition"
                            onClick={() => inputTanggalRef.current.showPicker()}
                        >
                            <CalendarDays className="h-5 w-5 text-black" />

                            <span className="text-black">
                                {tanggal ? tanggal : "Filter Tanggal"}
                            </span>

                            {/* Hidden input date */}
                            <input
                                ref={inputTanggalRef}
                                type="date"
                                value={tanggal}
                                onChange={(e) => setTanggal(e.target.value)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>

                        {/* RESET BUTTON — terpisah */}
                        {tanggal && (
                            <button
                                onClick={resetTanggal}
                                className="p-2 rounded-lg border border-red-400 text-red-500 hover:bg-red-100 transition"
                            >
                                <XCircle className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* TABLE */}
                <div className="rounded-xl border border-green-300 shadow-md overflow-hidden bg-white">
                    <Table>
                        <TableHeader className="bg-[#A6BF9D]">
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
                                                <Button className="bg-[#6E8F5C] text-white hover:bg-[#5d7d4d]">
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

                {/* PAGINATION — pojok kanan */}
                <div className="flex justify-end items-center gap-2 mt-6">
                    {makanans.links.map((link, index) => {
                        const isActive = link.active;
                        const isDisabled = !link.url;

                        const label = link.label.includes("Previous")
                            ? "<"
                            : link.label.includes("Next")
                            ? ">"
                            : link.label;

                        return (
                            <Link
                                key={index}
                                href={isDisabled ? "#" : link.url}
                                className={`
                                    flex items-center justify-center
                                    w-10 h-10 rounded-lg text-sm transition-all
                                    ${
                                        isActive
                                            ? "bg-green-600 text-white shadow"
                                            : "bg-white border border-green-300 text-black hover:bg-green-100"
                                    }
                                    ${
                                        isDisabled
                                            ? "opacity-40 cursor-not-allowed"
                                            : ""
                                    }
                                `}
                                dangerouslySetInnerHTML={{ __html: label }}
                            />
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}
