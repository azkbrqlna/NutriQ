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
import {
    Search,
    CalendarDays,
    XCircle,
    ChevronLeft,
    ChevronRight,
    Eye,
} from "lucide-react";

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

            <div className="max-w-7xl mx-auto w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-[#2C3A2C]">
                            Riwayat Makan
                        </h1>
                        <p className="text-[#5C6F5C] mt-1">
                            Daftar semua makanan yang telah kamu scan.
                        </p>
                    </div>
                </div>

                {/* Search & Filter Toolbar */}
                <div className="bg-white p-4 rounded-xl border border-[#D5E1C3] shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* SEARCH */}
                    <div className="relative w-full md:w-1/3">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5C6F5C]" />
                        <Input
                            placeholder="Cari nama makanan..."
                            className="pl-10 border-[#D5E1C3] bg-[#F9FAEF] focus:ring-[#7A9E7E] focus:border-[#7A9E7E] placeholder:text-[#8D9F8D] text-[#2C3A2C]"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* DATE FILTER */}
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <div
                            className="relative flex items-center gap-2 border border-[#D5E1C3] bg-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[#F2F5E8] hover:border-[#7A9E7E] transition w-full md:w-auto group"
                            onClick={() => inputTanggalRef.current.showPicker()}
                        >
                            <CalendarDays className="h-4 w-4 text-[#5C6F5C] group-hover:text-[#4A624E]" />
                            <span className="text-sm font-medium text-[#2C3A2C]">
                                {tanggal
                                    ? new Date(tanggal).toLocaleDateString(
                                          "id-ID",
                                          { dateStyle: "medium" }
                                      )
                                    : "Filter Tanggal"}
                            </span>

                            <input
                                ref={inputTanggalRef}
                                type="date"
                                value={tanggal}
                                onChange={(e) => setTanggal(e.target.value)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>

                        {tanggal && (
                            <button
                                onClick={resetTanggal}
                                className="p-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition"
                                title="Hapus Filter Tanggal"
                            >
                                <XCircle className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* TABLE CARD */}
                <div className="bg-white rounded-xl border border-[#D5E1C3] shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader className="bg-[#E9EFDB]">
                            <TableRow className="hover:bg-[#E9EFDB]">
                                <TableHead className="w-[100px] font-bold text-[#2C3A2C]">
                                    Foto
                                </TableHead>
                                <TableHead className="font-bold text-[#2C3A2C]">
                                    Tanggal
                                </TableHead>
                                <TableHead className="font-bold text-[#2C3A2C]">
                                    Waktu
                                </TableHead>
                                <TableHead className="font-bold text-[#2C3A2C]">
                                    Menu
                                </TableHead>
                                <TableHead className="font-bold text-[#2C3A2C]">
                                    Kalori
                                </TableHead>
                             
                                <TableHead className="text-right font-bold text-[#2C3A2C]">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {makanans.data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="text-center py-16"
                                    >
                                        <div className="flex flex-col items-center justify-center text-[#5C6F5C]">
                                            <div className="bg-[#F2F5E8] p-4 rounded-full mb-3">
                                                <Search
                                                    size={30}
                                                    className="opacity-50"
                                                />
                                            </div>
                                            <p className="font-medium">
                                                Tidak ada data ditemukan
                                            </p>
                                            <p className="text-sm opacity-70">
                                                Coba ubah filter atau scan
                                                makanan baru.
                                            </p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                makanans.data.map((item) => (
                                    <TableRow
                                        key={item.id}
                                        className="hover:bg-[#F9FAEF] transition-colors border-b border-[#F2F5E8]"
                                    >
                                        <TableCell>
                                            <div className="h-12 w-12 rounded-lg overflow-hidden border border-[#D5E1C3]">
                                                <img
                                                    src={item.foto}
                                                    alt={item.nama}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-[#2C3A2C] font-medium">
                                            {item.tanggal}
                                        </TableCell>
                                        <TableCell className="text-[#5C6F5C]">
                                            {item.jam}
                                        </TableCell>
                                        <TableCell className="text-[#2C3A2C] font-semibold">
                                            {item.nama}
                                        </TableCell>
                                        <TableCell>
                                            <span className="bg-orange-50 text-orange-700 px-2 py-1 rounded-md text-xs font-medium border border-orange-100">
                                                {item.total_kalori} kcal
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium border border-blue-100">
                                                {item.total_protein} g
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Link
                                                href={`/riwayat/${item.slug}`}
                                            >
                                                <Button
                                                    size="sm"
                                                    className="bg-[#7A9E7E] hover:bg-[#4A624E] text-white shadow-sm transition-all"
                                                >
                                                    <Eye
                                                        size={16}
                                                        className="mr-1"
                                                    />
                                                    Detail
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* PAGINATION */}
                {makanans.data.length > 0 && (
                    <div className="flex justify-end items-center gap-2 mt-6">
                        {makanans.links.map((link, index) => {
                            const isDisabled = !link.url;
                            const isActive = link.active;

                            // Clean labels
                            let label = link.label;
                            if (label.includes("Previous"))
                                label = <ChevronLeft size={16} />;
                            else if (label.includes("Next"))
                                label = <ChevronRight size={16} />;

                            return (
                                <Link
                                    key={index}
                                    href={isDisabled ? "#" : link.url}
                                    className={`
                                        flex items-center justify-center min-w-[2.5rem] h-10 px-3 rounded-lg text-sm font-medium transition-all
                                        ${
                                            isActive
                                                ? "bg-[#4A624E] text-white shadow-md shadow-[#4A624E]/20"
                                                : "bg-white border border-[#D5E1C3] text-[#5C6F5C] hover:bg-[#F2F5E8] hover:text-[#2C3A2C]"
                                        }
                                        ${
                                            isDisabled
                                                ? "opacity-40 cursor-not-allowed hover:bg-white"
                                                : ""
                                        }
                                    `}
                                >
                                    {typeof label === "string" ? (
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: label,
                                            }}
                                        />
                                    ) : (
                                        label
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
