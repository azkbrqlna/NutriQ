import React, { useState, useRef } from "react";
import { Head, useForm } from "@inertiajs/react";
import { Calendar, Clock, Image as ImageIcon, Loader2 } from "lucide-react";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import AppLayout from "@/Components/AppLayout";
import useNotify from "@/Components/ToastNotification"; // <-- TOAST

export default function ScanMakanan() {
    const [preview, setPreview] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    const timeoutRef = useRef(null);

    const { notifySuccess, notifyError } = useNotify(); // <-- TOAST HOOK

    const { data, setData, post, processing } = useForm({
        tanggal: "",
        jam: "",
        image: null,
    });

    // ERROR 5MB → TOAST
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

            // HANDLE ERROR DARI VALIDASI LARAVEL
            onError: (errors) => {
                if (errors.image) notifyError("Upload Gagal", errors.image);
                if (errors.tanggal)
                    notifyError("Tanggal Salah", errors.tanggal);
                if (errors.jam) notifyError("Jam Salah", errors.jam);
                if (errors.error) notifyError("Analisis Gagal", errors.error);
            },

            // HANDLE SUKSES
            onSuccess: () => {
                notifySuccess("Berhasil!", "Gambar berhasil dianalisis 🎉");
            },
        });
    };

    return (
        <AppLayout>
            <div>
                <Head title="Scan Makanan" />

                <div className="max-w-3xl w-full">
                    <h1 className="md:text-4xl text-3xl font-bold">
                        Scan Makanan
                    </h1>

                    <p className="md:text-xl text-lg opacity-80 md:max-w-[80%] mt-[1rem]">
                        Unggah gambar makanan Anda dan kami akan menganalisis
                        nutrisi secara otomatis!
                    </p>

                    <form
                        onSubmit={submit}
                        className="w-full space-y-8 mt-[1rem]"
                        encType="multipart/form-data"
                    >
                        {/* DATE & TIME */}
                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-6">
                            {/* Tanggal */}
                            <div className="flex flex-col gap-[0.6rem] relative w-full">
                                <Label className="text-[15px] text-lg font-medium text-black">
                                    Tanggal
                                </Label>
                                <div className="relative w-full">
                                    <Input
                                        id="tanggalInput"
                                        type="date"
                                        className="w-full bg-white border border-[#C7D2AB] rounded-lg 
                                        text-black py-[1.4rem] px-[1rem] 
                                        [&::-webkit-calendar-picker-indicator]:opacity-0"
                                        value={data.tanggal}
                                        onChange={(e) =>
                                            setData("tanggal", e.target.value)
                                        }
                                    />
                                    <Calendar
                                        className="absolute right-3 top-3.5 h-5 w-5 text-gray-600 cursor-pointer"
                                        onClick={() =>
                                            document
                                                .getElementById("tanggalInput")
                                                .showPicker()
                                        }
                                    />
                                </div>
                            </div>

                            {/* Jam */}
                            <div className="flex flex-col gap-[0.6rem] relative w-full">
                                <Label className="text-[15px] text-lg font-medium text-black">
                                    Jam
                                </Label>
                                <div className="relative w-full flex items-center">
                                    <Input
                                        id="jamInput"
                                        type="time"
                                        className="w-full bg-white border border-[#C7D2AB] rounded-lg 
                                        text-black py-[1.4rem] px-[1rem]
                                        [&::-webkit-calendar-picker-indicator]:opacity-0
                                        [&::-webkit-inner-spin-button]:appearance-none"
                                        value={data.jam}
                                        onChange={(e) =>
                                            setData("jam", e.target.value)
                                        }
                                    />

                                    <Clock
                                        className="absolute right-3 top-3.5 h-5 w-5 text-gray-600 cursor-pointer"
                                        onClick={() =>
                                            document
                                                .getElementById("jamInput")
                                                .showPicker()
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        {/* UPLOAD */}
                        <div
                            className={`
                                border-2 border-dashed rounded-xl w-full min-h-[260px] 
                                flex flex-col justify-center items-center text-center cursor-pointer 
                                transition-all duration-300 bg-white shadow-sm
                                ${
                                    dragActive
                                        ? "border-green-400 bg-green-50 scale-[1.02]"
                                        : "border-[#A8C48C] hover:bg-secondary/50"
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
                                <img
                                    src={preview}
                                    className="max-h-56 rounded-lg object-cover shadow-md"
                                />
                            ) : (
                                <div className="transition-all">
                                    <ImageIcon
                                        className={`mx-auto mb-3 h-12 w-12 ${
                                            dragActive
                                                ? "text-green-600 animate-bounce"
                                                : "text-gray-600"
                                        }`}
                                    />
                                    <p className="font-medium text-gray-800">
                                        Seret & jatuhkan gambar di sini
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        atau klik untuk memilih (max 5MB)
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

                        {/* BUTTON */}
                        <div className="flex justify-end">
                            <Button
                                className="bg-quartenary md:w-auto w-full text-white p-[1.5rem] text-[15px] rounded-lg hover:bg-quartenary/80 mt-[1rem] font-semibold"
                                disabled={processing}
                                type="submit"
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                                        Menganalisis...
                                    </>
                                ) : (
                                    "Analisa Nutrisi"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
