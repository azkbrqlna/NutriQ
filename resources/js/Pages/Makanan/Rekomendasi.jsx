// Rekomendasi.jsx
import React from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import {
    Search,
    Wallet,
    Utensils,
    Flame,
    Beef,
    ChefHat,
    Loader2,
    ArrowRight,
} from "lucide-react";
import AppLayout from "@/Components/AppLayout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

// Hapus MOCK_RECOMMENDATIONS

export default function Rekomendasi({ rekomendasi, budget: initialBudget }) {
    // Mengambil errors dari props Inertia
    const { errors } = usePage().props;

    // Inisialisasi useForm untuk mengelola input budget dan proses submit
    const { data, setData, post, processing } = useForm({
        // Gunakan initialBudget yang dikirim Controller setelah pencarian
        budget: initialBudget || "",
    });

    // Gunakan props 'rekomendasi' untuk menampilkan hasil
    const recommendations = rekomendasi;

    const handleSearch = (e) => {
        e.preventDefault();

        // Validasi sisi klien sederhana
        if (!data.budget || data.budget < 5000) {
            alert("Budget minimal Rp 5.000");
            return;
        }

        // Inertia POST request ke route 'rekomendasi.generate'
        // Tambahkan callback onError
        post(route("rekomendasi.generate"), {
            preserveScroll: true,
            // LOGGING: Tampilkan pesan saat proses dimulai dan selesai
            onStart: () => {
                console.log("--- Mulai Pencarian Rekomendasi ---");
            },
            onFinish: () => {
                console.log("--- Pencarian Selesai ---");
            },
            // LOGGING: Tampilkan semua error yang dikembalikan oleh Controller
            onError: (err) => {
                console.error("--- ERROR DARI BACKEND (INERTIA PROPS) ---");
                console.log(err);

                // Jika error spesifik dari Gemini ada, log juga:
                if (err.gemini) {
                    console.error("ERROR GEMINI (MESSAGE):", err.gemini);
                }

                // Jika error validasi budget ada:
                if (err.budget) {
                    console.error("ERROR VALIDASI BUDGET:", err.budget);
                }
            },
        });
    };

    const formatRupiah = (number) => {
        if (!number) return "Rp 0";
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(number);
    };

    // --- Efek untuk logging errors saat komponen dirender ulang ---
    // Efek ini akan berjalan setiap kali komponen dirender, termasuk saat ada errors baru dari Inertia.
    React.useEffect(() => {
        if (Object.keys(errors).length > 0) {
            console.error("--- ERROR PROPS DITERIMA SAAT RENDER ---");
            console.table(errors);
        }
    }, [errors]);
    // ----------------------------------------------------------------

    return (
        <AppLayout>
            <Head title="Rekomendasi Menu" />

            <div className="min-h-screen w-full bg-[#F7F9F0] pb-20">
                <div className="max-w-6xl mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-[#2C3A2C] mb-3 tracking-tight">
                            Rekomendasi Menu
                        </h1>
                        <p className="text-[#5C6F5C]">
                            Cari menu sehat dan hemat sesuai budget Anda.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-lg mx-auto bg-white p-3 rounded-2xl shadow-lg shadow-[#4A624E]/5 border border-[#D5E1C3] mb-12 relative z-10">
                        {/* Tampilkan Error dari Controller (Budget atau Gemini) */}
                        {(errors.budget || errors.gemini) && (
                            <div className="text-red-600 bg-red-100 border border-red-300 p-3 rounded-xl mb-4 text-sm font-medium">
                                {errors.budget || errors.gemini}
                            </div>
                        )}

                        <form onSubmit={handleSearch} className="flex gap-2">
                            <div className="relative flex-1">
                                <Wallet
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5C6F5C]"
                                    size={18}
                                />
                                <Input
                                    type="number"
                                    placeholder="Contoh: 25000"
                                    className="pl-11 py-5 text-base border-transparent bg-[#F9FAEF] focus:bg-white focus:ring-2 focus:ring-[#7A9E7E] rounded-xl w-full text-[#2C3A2C]"
                                    value={data.budget}
                                    onChange={(e) =>
                                        setData("budget", e.target.value)
                                    }
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={processing || !data.budget}
                                className="py-5 px-6 bg-[#4A624E] hover:bg-[#3B4F3E] text-white rounded-xl font-semibold shadow-md transition-all"
                            >
                                {processing ? (
                                    <Loader2
                                        className="animate-spin"
                                        size={20}
                                    />
                                ) : (
                                    <Search size={20} />
                                )}
                            </Button>
                        </form>
                    </div>

                    {/* Content Area */}
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                        {processing && (
                            <div className="flex flex-col items-center justify-center py-16 text-center opacity-80">
                                <ChefHat
                                    size={48}
                                    className="text-[#4A624E] animate-bounce mb-4"
                                />
                                <p className="text-[#5C6F5C] font-medium">
                                    Sedang memilihkan menu terbaik...
                                </p>
                            </div>
                        )}

                        {!processing && !recommendations && (
                            <div className="text-center opacity-40 py-10">
                                <Utensils
                                    size={64}
                                    className="mx-auto mb-3 text-[#D5E1C3]"
                                />
                                <p className="text-[#5C6F5C] text-sm">
                                    Masukkan budget untuk memulai pencarian.
                                </p>
                            </div>
                        )}

                        {/* HASIL REKOMENDASI */}
                        {!processing &&
                            recommendations &&
                            recommendations.length > 0 && (
                                <div>
                                    <div className="flex items-center justify-between mb-6 px-1">
                                        <h2 className="text-xl font-bold text-[#2C3A2C]">
                                            Hasil Pencarian
                                        </h2>
                                        <span className="text-[#5C6F5C] text-sm bg-white px-3 py-1 rounded-full border border-[#D5E1C3] font-medium">
                                            Budget: {formatRupiah(data.budget)}
                                        </span>
                                    </div>

                                    {/* Grid 2 Kolom (Card Lebar) */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {recommendations.map((item) => (
                                            <div
                                                key={item.nama_menu}
                                                className="group bg-white rounded-2xl border border-[#D5E1C3] overflow-hidden hover:shadow-xl hover:shadow-[#4A624E]/10 transition-all duration-300 flex flex-col h-full"
                                            >
                                                {/* Area Gambar placeholder */}
                                                <div className="h-48 w-full relative bg-[#E9EFDB] overflow-hidden shrink-0 flex items-center justify-center">
                                                    <Utensils
                                                        size={64}
                                                        className="text-[#D5E1C3]"
                                                    />
                                                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-bold text-[#4A624E] shadow-sm">
                                                        {/* Menggunakan estimasi_harga dari API */}
                                                        {formatRupiah(
                                                            item.estimasi_harga
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Content Section */}
                                                <div className="p-6 flex-1 flex flex-col justify-between text-left">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-[#2C3A2C] mb-2 leading-snug group-hover:text-[#4A624E] transition-colors">
                                                            {item.nama_menu}
                                                        </h3>

                                                        <p className="text-[#5C6F5C] text-sm mb-4 leading-relaxed line-clamp-2">
                                                            {
                                                                item.alasan_rekomendasi
                                                            }
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center justify-between mt-2 pt-4 border-t border-[#F2F5E8]">
                                                        {/* Nutrisi */}
                                                        <div className="flex gap-3 flex-wrap">
                                                            <div className="flex items-center gap-1.5 bg-orange-50 text-orange-700 px-2.5 py-1.5 rounded-lg text-xs font-bold border border-orange-100">
                                                                <Flame
                                                                    size={14}
                                                                />
                                                                {/* Akses kandungan_gizi.kalori */}
                                                                {
                                                                    item
                                                                        .kandungan_gizi
                                                                        .kalori
                                                                }{" "}
                                                                Kcal
                                                            </div>
                                                            <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2.5 py-1.5 rounded-lg text-xs font-bold border border-blue-100">
                                                                <Beef
                                                                    size={14}
                                                                />
                                                                {/* Akses kandungan_gizi.protein */}
                                                                {
                                                                    item
                                                                        .kandungan_gizi
                                                                        .protein
                                                                }
                                                                g Pro
                                                            </div>
                                                        </div>

                                                        <a
                                                            href={item.maps_url} // Menggunakan URL Maps dari API
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-1 text-[#4A624E] text-sm font-semibold hover:text-[#3B4F3E] transition-colors whitespace-nowrap"
                                                        >
                                                            Cari Lokasi
                                                            <ArrowRight
                                                                size={14}
                                                                className="group-hover:translate-x-1 transition-transform"
                                                            />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                        {/* Jika hasil pencarian kosong */}
                        {!processing &&
                            recommendations &&
                            recommendations.length === 0 && (
                                <div className="text-center py-10">
                                    <p className="text-[#5C6F5C] text-base">
                                        😔 Tidak ada menu yang ditemukan dalam
                                        budget **{formatRupiah(data.budget)}**
                                        yang memenuhi kebutuhan nutrisi Anda
                                        saat ini.
                                    </p>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
