import { DatePickerDropdown } from "@/Components/ui/date-picker-dropdown";
import { TimePickerDropdown } from "@/Components/ui/time-picker-dropdown";

import React, { useState, useRef } from "react";
import { Head, useForm } from "@inertiajs/react";
import {
    Calendar,
    Clock,
    Image as ImageIcon,
    Loader2,
    UploadCloud,
} from "lucide-react";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import AppLayout from "@/Components/AppLayout";
import useNotify from "@/Components/ToastNotification";

export default function ScanMakanan() {
    const [preview, setPreview] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    const { notifySuccess, notifyError } = useNotify();

    const { data, setData, post, processing } = useForm({
        tanggal: "",
        jam: "",
        image: null,
    });

    const triggerError = (msg) => {
        notifyError("Gagal", msg);
    };

    const processFile = (file) => {
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            triggerError("Ukuran file melebihi batas maksimal 5MB!");
            return;
        }

        setData("image", file);
        setPreview(URL.createObjectURL(file));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        processFile(file);
    };

    // DRAG EVENTS
    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer.files[0];
        processFile(file);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("scan.generate"), {
            forceFormData: true,
            onError: (errors) => {
                if (errors.image) notifyError("Upload Gagal", errors.image);
                if (errors.tanggal)
                    notifyError("Tanggal Salah", errors.tanggal);
                if (errors.jam) notifyError("Jam Salah", errors.jam);
                if (errors.error) notifyError("Analisis Gagal", errors.error);
            },
            onSuccess: () => {
                notifySuccess("Berhasil!", "Gambar berhasil dianalisis 🎉");
            },
        });
    };

    return (
        <AppLayout>
            <div className="w-full min-h-screen bg-[#F7F9F0]">
                <Head title="Scan Makanan" />

                <div className="max-w-4xl mx-auto w-full pt-6">
                    {/* Header Text */}
                    <div className="mb-8">
                        <h1 className="md:text-4xl text-3xl font-bold text-[#2C3A2C] tracking-tight">
                            Scan Makanan
                        </h1>
                        <p className="md:text-lg text-[#5C6F5C] mt-2 max-w-2xl leading-relaxed">
                            Unggah foto makananmu, biar AI kami yang menghitung
                            nutrisinya untukmu.
                        </p>
                    </div>

                    <form
                        onSubmit={submit}
                        className="w-full bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-[#D5E1C3] space-y-8"
                        encType="multipart/form-data"
                    >
                        {/* DATE & TIME SECTION */}
                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-6">
                            {/* Tanggal */}
                            <div className="flex flex-col gap-2 relative w-full">
                                <Label className="text-base font-semibold text-[#2C3A2C]">
                                    Tanggal Makan
                                </Label>
                                <div className="p-1 rounded-lg hover:bg-[#F7F9F0] transition-colors">
                                    <DatePickerDropdown
                                        value={
                                            data.tanggal
                                                ? new Date(data.tanggal)
                                                : null
                                        }
                                        onChange={(date) => {
                                            if (!date) {
                                                setData("tanggal", "");
                                                return;
                                            }
                                            const formatted = date
                                                .toISOString()
                                                .split("T")[0];
                                            setData("tanggal", formatted);
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Jam */}
                            <div className="flex flex-col gap-2 relative w-full">
                                <Label className="text-base font-semibold text-[#2C3A2C]">
                                    Waktu Makan
                                </Label>
                                <div className="p-1 rounded-lg hover:bg-[#F7F9F0] transition-colors">
                                    <TimePickerDropdown
                                        value={data.jam}
                                        onChange={(val) => setData("jam", val)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* UPLOAD AREA */}
                        <div className="space-y-2">
                            <Label className="text-base font-semibold text-[#2C3A2C]">
                                Foto Makanan
                            </Label>
                            <div
                                className={`
                                    border-2 border-dashed rounded-xl w-full min-h-[320px] 
                                    flex flex-col justify-center items-center text-center cursor-pointer 
                                    transition-all duration-300 relative overflow-hidden group
                                    ${
                                        dragActive
                                            ? "border-[#4A624E] bg-[#E9EFDB]/50 scale-[1.01]"
                                            : "border-[#D5E1C3] bg-[#F9FAEF] hover:border-[#7A9E7E] hover:bg-[#F2F5E8]"
                                    }
                                `}
                                onClick={() =>
                                    document.getElementById("foodImage").click()
                                }
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                {preview ? (
                                    <div className="relative w-full h-full p-4 flex items-center justify-center">
                                        <img
                                            src={preview}
                                            className="max-h-[280px] rounded-lg object-contain shadow-md z-10"
                                            alt="Preview"
                                        />
                                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl z-20">
                                            <p className="text-white bg-black/50 px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                                                Klik untuk ganti
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center p-6 transition-all group-hover:-translate-y-1">
                                        <div className="w-16 h-16 bg-[#E9EFDB] rounded-full flex items-center justify-center mb-4 text-[#4A624E] group-hover:scale-110 transition-transform">
                                            <UploadCloud
                                                size={32}
                                                strokeWidth={1.5}
                                            />
                                        </div>
                                        <p className="text-lg font-semibold text-[#2C3A2C]">
                                            Seret & jatuhkan gambar di sini
                                        </p>
                                        <p className="text-sm text-[#5C6F5C] mt-2">
                                            Format JPG, PNG (Maks. 5MB)
                                        </p>
                                    </div>
                                )}

                                <Input
                                    id="foodImage"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <div className="flex justify-end pt-4">
                            <Button
                                className="bg-[#4A624E] hover:bg-[#3B4F3E] text-white py-6 px-8 text-base rounded-xl font-semibold shadow-lg shadow-[#4A624E]/20 transition-all w-full md:w-auto"
                                disabled={processing}
                                type="submit"
                            >
                                {processing ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Sedang Menganalisis...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <ImageIcon size={20} />
                                        <span>Analisa Nutrisi Sekarang</span>
                                    </div>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
