import React from "react";
import { Head, useForm } from "@inertiajs/react";
import {
    Search,
    Wallet,
    Utensils,
    Flame,
    Beef,
    Wheat,
    Droplet,
    Leaf,
    Waves,
    Candy,
    ChefHat,
    Loader2,
    MapPin,
    Info,
} from "lucide-react";
import AppLayout from "@/Components/AppLayout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

// Import Custom Hook Toast
import useNotify from "@/Components/ToastNotification";

export default function Rekomendasi({ rekomendasi, sisaKebutuhan, errors }) {
    // 1. Panggil Hook Notify
    const { notifyError } = useNotify();

    // Setup Form Inertia
    const { data, setData, post, processing } = useForm({
        budget: "",
    });

    const handleSearch = (e) => {
        e.preventDefault();

        post(route("rekomendasi.generate"), {
            preserveScroll: true,
            onSuccess: () => {
                const element = document.getElementById("hasil-pencarian");
                if (element) element.scrollIntoView({ behavior: "smooth" });
            },
            onError: (err) => {
                if (err.budget) {
                    notifyError("Budget Tidak Valid", err.budget);
                } else if (err.gemini) {
                    notifyError("Gagal Memuat Rekomendasi", err.gemini);
                } else {
                    notifyError(
                        "Terjadi Kesalahan Sistem",
                        "Mohon muat ulang halaman atau coba lagi beberapa saat lagi."
                    );
                }
            },
        });
    };

    // Fungsi Format Rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(number);
    };

    return (
        <AppLayout>
            {processing && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 999999,
                        backgroundColor: "transparent",
                        pointerEvents: "auto",
                        touchAction: "none",
                        cursor: "wait",
                    }}
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                />
            )}
            <Head title="Rekomendasi Menu" />

            <div className="min-h-screen w-full bg-[#F7F9F0] pb-20">
                <div className="max-w-6xl mx-auto px-4 py-8">
                    {/* --- HEADER SECTION --- */}
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-[#2C3A2C] mb-3 tracking-tight">
                            Rekomendasi Makanan
                        </h1>
                        <p className="text-[#5C6F5C] leading-relaxed">
                            AI kami akan mencarikan menu yang pas dengan{" "}
                            <br className="hidden md:block" />
                            <b>sisa kebutuhan nutrisi</b> harian dan{" "}
                            <b>budget</b> Anda
                        </p>
                    </div>

                    {/* --- SEARCH BAR --- */}
                    <div className="max-w-lg mx-auto bg-white p-3 rounded-2xl shadow-xl shadow-[#4A624E]/5 border border-[#D5E1C3] mb-12 relative z-10">
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <div className="relative flex-1">
                                <Wallet
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5C6F5C]"
                                    size={18}
                                />

                                {/* --- INPUT BUDGET --- */}
                                <Input
                                    type="text"
                                    placeholder="Masukkan Budget (Rp)"
                                    className={`pl-11 py-6 text-base border-transparent bg-[#F9FAEF] focus:bg-white focus:ring-2 focus:ring-[#7A9E7E] rounded-xl w-full text-[#2C3A2C] font-medium transition-all ${
                                        errors.budget
                                            ? "ring-2 ring-red-200 bg-red-50"
                                            : ""
                                    }`}
                                    value={
                                        data.budget
                                            ? formatRupiah(data.budget)
                                            : ""
                                    }
                                    onChange={(e) => {
                                        const rawValue = e.target.value.replace(
                                            /\D/g,
                                            ""
                                        );
                                        setData("budget", rawValue);
                                    }}
                                    disabled={processing}
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={processing || !data.budget}
                                className="h-auto py-4 px-6 bg-[#4A624E] hover:bg-[#3B4F3E] text-white rounded-xl font-semibold shadow-md transition-all active:scale-95"
                            >
                                {processing ? (
                                    <Loader2
                                        className="animate-spin"
                                        size={24}
                                    />
                                ) : (
                                    <Search size={24} />
                                )}
                            </Button>
                        </form>

                        {/* Inline Error */}
                        {errors.budget && (
                            <div className="text-red-500 text-xs mt-2 px-2 flex items-center gap-1 animate-in slide-in-from-top-1 font-medium">
                                <Info size={12} /> {errors.budget}
                            </div>
                        )}
                    </div>

                    {/* --- CONTENT AREA --- */}
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                        {processing && (
                            <div className="flex flex-col items-center justify-center py-16 text-center opacity-80">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-[#4A624E] blur-xl opacity-20 animate-pulse rounded-full"></div>
                                    <ChefHat
                                        size={64}
                                        className="text-[#4A624E] animate-bounce relative z-10"
                                    />
                                </div>
                                <p className="text-[#5C6F5C] font-medium mt-6 text-lg">
                                    Sedang menganalisis nutrisi & mencari warung
                                    terdekat...
                                </p>
                            </div>
                        )}

                        {!processing && !rekomendasi && (
                            <div className="text-center opacity-40 py-10 border-2 border-dashed border-[#D5E1C3] rounded-3xl mx-auto max-w-2xl bg-[#F9FAEF]/50">
                                <Utensils
                                    size={64}
                                    className="mx-auto mb-4 text-[#D5E1C3]"
                                />
                                <p className="text-[#5C6F5C] font-medium">
                                    Siap mencari makanan? Masukkan budget di
                                    atas.
                                </p>
                            </div>
                        )}

                        {!processing && rekomendasi && (
                            <div id="hasil-pencarian">
                                {/* Summary Header */}
                                <div className="bg-[#E9EFDB] border border-[#D5E1C3] rounded-2xl p-5 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
                                    <div>
                                        <h2 className="text-xl font-bold text-[#2C3A2C] flex items-center gap-2">
                                            <Utensils size={20} /> Hasil
                                            Rekomendasi
                                        </h2>
                                        {sisaKebutuhan && (
                                            <p className="text-sm text-[#5C6F5C] mt-1">
                                                Target: Penuhi{" "}
                                                <b>
                                                    {sisaKebutuhan.protein}g
                                                    Protein
                                                </b>{" "}
                                                &{" "}
                                                <b>
                                                    {sisaKebutuhan.kalori} Kkal
                                                </b>{" "}
                                                lagi.
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-[#D5E1C3] shadow-sm">
                                        <Wallet
                                            size={16}
                                            className="text-[#4A624E]"
                                        />
                                        <span className="text-[#5C6F5C] text-sm font-semibold">
                                            Max: {formatRupiah(data.budget)}
                                        </span>
                                    </div>
                                </div>

                                {/* Grid Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {rekomendasi.map((item, index) => (
                                        <div
                                            key={index}
                                            className="group bg-white rounded-2xl border border-[#D5E1C3] overflow-hidden hover:shadow-xl hover:shadow-[#4A624E]/10 transition-all duration-300 flex flex-col h-full relative"
                                        >
                                            {/* Label Harga */}
                                            <div className="absolute top-4 right-4 z-10">
                                                <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-bold text-[#4A624E] shadow-sm border border-[#D5E1C3]">
                                                    {formatRupiah(
                                                        item.estimasi_harga
                                                    )}
                                                </span>
                                            </div>

                                            {/* Header Card */}
                                            <div className="p-6 pb-4 bg-gradient-to-b from-[#F9FAEF] to-white">
                                                <h3 className="text-xl font-bold text-[#2C3A2C] leading-snug pr-20 mb-2 group-hover:text-[#4A624E] transition-colors">
                                                    {item.nama_menu}
                                                </h3>
                                                <p className="text-[#5C6F5C] text-sm italic leading-relaxed border-l-2 border-[#D5E1C3] pl-3">
                                                    "{item.alasan_rekomendasi}"
                                                </p>
                                            </div>

                                            {/* Body: Nutrisi */}
                                            <div className="px-6 py-2 flex-1">
                                                <div className="flex gap-3 mb-4">
                                                    <div className="flex-1 flex items-center gap-2 bg-orange-50 text-orange-700 px-3 py-2.5 rounded-xl text-sm font-bold border border-orange-100 shadow-sm">
                                                        <Flame
                                                            size={18}
                                                            className="fill-orange-700/20"
                                                        />
                                                        {
                                                            item.kandungan_gizi
                                                                .kalori
                                                        }{" "}
                                                        Kcal
                                                    </div>
                                                    <div className="flex-1 flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2.5 rounded-xl text-sm font-bold border border-blue-100 shadow-sm">
                                                        <Beef
                                                            size={18}
                                                            className="fill-blue-700/20"
                                                        />
                                                        {
                                                            item.kandungan_gizi
                                                                .protein
                                                        }
                                                        g Prot
                                                    </div>
                                                </div>

                                                {/* Micro Nutrients Grid */}
                                                <div className="grid grid-cols-3 gap-2 mb-4">
                                                    <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-yellow-50 border border-yellow-100 text-yellow-800">
                                                        <Wheat
                                                            size={14}
                                                            className="mb-1 opacity-70"
                                                        />
                                                        <span className="text-xs font-semibold">
                                                            {
                                                                item
                                                                    .kandungan_gizi
                                                                    .karbohidrat
                                                            }
                                                            g
                                                        </span>
                                                        <span className="text-[10px] opacity-60">
                                                            Karbo
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-rose-50 border border-rose-100 text-rose-800">
                                                        <Droplet
                                                            size={14}
                                                            className="mb-1 opacity-70"
                                                        />
                                                        <span className="text-xs font-semibold">
                                                            {
                                                                item
                                                                    .kandungan_gizi
                                                                    .lemak
                                                            }
                                                            g
                                                        </span>
                                                        <span className="text-[10px] opacity-60">
                                                            Lemak
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-green-50 border border-green-100 text-green-800">
                                                        <Leaf
                                                            size={14}
                                                            className="mb-1 opacity-70"
                                                        />
                                                        <span className="text-xs font-semibold">
                                                            {
                                                                item
                                                                    .kandungan_gizi
                                                                    .serat
                                                            }
                                                            g
                                                        </span>
                                                        <span className="text-[10px] opacity-60">
                                                            Serat
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-pink-50 border border-pink-100 text-pink-800">
                                                        <Candy
                                                            size={14}
                                                            className="mb-1 opacity-70"
                                                        />
                                                        <span className="text-xs font-semibold">
                                                            {
                                                                item
                                                                    .kandungan_gizi
                                                                    .gula_tambahan
                                                            }
                                                            g
                                                        </span>
                                                        <span className="text-[10px] opacity-60">
                                                            Gula
                                                        </span>
                                                    </div>
                                                    <div className="col-span-2 flex items-center justify-center gap-2 p-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-600">
                                                        <Waves
                                                            size={14}
                                                            className="opacity-70"
                                                        />
                                                        <div className="flex flex-col leading-none">
                                                            <span className="text-xs font-semibold">
                                                                {
                                                                    item
                                                                        .kandungan_gizi
                                                                        .natrium
                                                                }
                                                                mg
                                                            </span>
                                                            <span className="text-[10px] opacity-60">
                                                                Natrium (Garam)
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Footer: Maps */}
                                            <div className="p-4 pt-0 mt-auto">
                                                <a
                                                    href={item.maps_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#E9EFDB] hover:bg-[#D5E1C3] text-[#4A624E] rounded-xl font-bold transition-all text-sm hover:shadow-md border border-[#D5E1C3]"
                                                >
                                                    <MapPin size={18} />
                                                    Cari Lokasi Terdekat
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 text-center">
                                    <p className="text-xs text-[#5C6F5C]/60">
                                        *Data nutrisi adalah estimasi AI
                                        berdasarkan resep umum di Indonesia.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
