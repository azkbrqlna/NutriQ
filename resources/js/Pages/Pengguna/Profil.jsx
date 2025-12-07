import React from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import {
    Ruler,
    Weight,
    Pencil,
    Loader2,
    Save,
    X,
    MarsStroke,
    User,
    Cake,
} from "lucide-react";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Card } from "@/Components/ui/card"; // Pastikan path ini benar
import AppLayout from "@/Components/AppLayout";
import useNotify from "@/Components/ToastNotification"; // Asumsi Anda punya ini dari step sebelumnya

export default function Profil() {
    // Mengambil data pengguna dari props (jika ada data awal)
    const { user } = usePage().props;
    console.log(user);

    const { notifySuccess, notifyError } = useNotify();

    const { data, setData, put, processing, errors } = useForm({
        nama: user?.name || "",
        tinggi: user?.tinggi || "",
        berat: user?.berat || "",
        jenis_kelamin: user?.jenis_kelamin || "",
        umur: user?.umur || "",
    });

    const handleUpdate = (e) => {
        e.preventDefault();

        put(route("profile.update"), {
            // Sesuaikan route Anda
            onSuccess: () => {
                notifySuccess("Berhasil", "Profil berhasil diperbarui!");
            },
            onError: () => {
                notifyError("Gagal", "Periksa kembali inputan Anda.");
            },
        });
    };

    // Style Class Helpers
    const iconClass =
        "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5C6F5C]";
    const inputClass =
        "pl-10 bg-[#F9FAEF] border-[#D5E1C3] focus:border-[#7A9E7E] focus:ring-[#7A9E7E] text-[#2C3A2C] placeholder:text-[#8D9F8D]";
    const labelClass = "text-base font-semibold text-[#2C3A2C] mb-1.5";

    return (
        <AppLayout>
            <Head title="Profil" />

            <div className="min-h-screen w-full bg-[#F7F9F0] pb-10">
                <div className="max-w-3xl mx-auto w-full pt-6">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 border-b border-[#D5E1C3] pb-6">
                        <div className="bg-[#E9EFDB] p-3 rounded-xl text-[#4A624E]">
                            <Pencil size={28} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[#2C3A2C] tracking-tight">
                                Edit Profil
                            </h1>
                            <p className="text-[#5C6F5C] mt-1 max-w-2xl">
                                Perbarui data fisik Anda agar kalkulasi nutrisi
                                harian menjadi lebih akurat.
                            </p>
                        </div>
                    </div>

                    {/* Form Card */}
                    <Card className="p-6 md:p-8 rounded-2xl border border-[#D5E1C3] shadow-sm bg-white">
                        <form onSubmit={handleUpdate} className="space-y-6">
                            {/* NAMA */}
                            <div className="space-y-1">
                                <Label className={labelClass}>Nama</Label>
                                <div className="relative">
                                    <User className={iconClass} />
                                    <Input
                                        type="text"
                                        className={inputClass}
                                        placeholder="Masukkan nama"
                                        value={data?.nama}
                                        onChange={(e) =>
                                            setData("nama", e.target.value)
                                        }
                                    />
                                </div>
                                {errors.nama && (
                                    <span className="text-red-500 text-sm">
                                        {errors.nama}
                                    </span>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* TINGGI BADAN */}
                                <div className="space-y-1">
                                    <Label className={labelClass}>
                                        Tinggi Badan (cm)
                                    </Label>
                                    <div className="relative">
                                        <Ruler className={iconClass} />
                                        <Input
                                            type="number"
                                            className={inputClass}
                                            placeholder="Contoh: 170"
                                            value={data?.tinggi}
                                            onChange={(e) =>
                                                setData(
                                                    "tinggi",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    {errors.tinggi && (
                                        <span className="text-red-500 text-sm">
                                            {errors.tinggi}
                                        </span>
                                    )}
                                </div>

                                {/* BERAT BADAN */}
                                <div className="space-y-1">
                                    <Label className={labelClass}>
                                        Berat Badan (kg)
                                    </Label>
                                    <div className="relative">
                                        <Weight className={iconClass} />
                                        <Input
                                            type="number"
                                            className={inputClass}
                                            placeholder="Contoh: 60"
                                            value={data?.berat}
                                            onChange={(e) =>
                                                setData("berat", e.target.value)
                                            }
                                        />
                                    </div>
                                    {errors.berat && (
                                        <span className="text-red-500 text-sm">
                                            {errors.berat}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* UMUR */}
                                <div className="space-y-1">
                                    <Label className={labelClass}>
                                        Umur (Tahun)
                                    </Label>
                                    <div className="relative">
                                        <Cake className={iconClass} />
                                        <Input
                                            type="number"
                                            className={inputClass}
                                            placeholder="Contoh: 25"
                                            value={data?.umur}
                                            onChange={(e) =>
                                                setData("umur", e.target.value)
                                            }
                                        />
                                    </div>
                                    {errors.umur && (
                                        <span className="text-red-500 text-sm">
                                            {errors.umur}
                                        </span>
                                    )}
                                </div>

                                {/* JENIS KELAMIN - Menggunakan Select Native agar lebih UX friendly */}
                                <div className="space-y-1">
                                    <Label className={labelClass}>
                                        Jenis Kelamin
                                    </Label>
                                    <div className="relative">
                                        <MarsStroke className={iconClass} />
                                        <select
                                            className={`flex h-12 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 ${inputClass} appearance-none`}
                                            value={data?.jenis_kelamin}
                                            onChange={(e) =>
                                                setData(
                                                    "jenis_kelamin",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="" disabled>
                                                Pilih Jenis Kelamin
                                            </option>
                                            <option value="Laki-laki">
                                                Laki-laki
                                            </option>
                                            <option value="Perempuan">
                                                Perempuan
                                            </option>
                                        </select>
                                    </div>
                                    {errors.jenis_kelamin && (
                                        <span className="text-red-500 text-sm">
                                            {errors.jenis_kelamin}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* ACTION BUTTONS */}
                            <div className="flex md:flex-row flex-col justify-end items-center gap-4 pt-4 border-t border-[#D5E1C3] mt-6">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="border-[#D5E1C3] text-[#5C6F5C] hover:bg-[#F2F5E8] hover:text-[#2C3A2C] w-full md:w-auto px-6 py-5 rounded-xl font-medium"
                                >
                                    <X size={18} className="mr-2" />
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-[#4A624E] hover:bg-[#3B4F3E] text-white w-full md:w-auto px-8 py-5 rounded-xl font-semibold shadow-md shadow-[#4A624E]/20 transition-all"
                                >
                                    {processing ? (
                                        <>
                                            <Loader2
                                                size={18}
                                                className="mr-2 animate-spin"
                                            />
                                            Menyimpan...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={18} className="mr-2" />
                                            Simpan Perubahan
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
