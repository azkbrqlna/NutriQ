import { DatePickerDropdown } from "@/Components/ui/date-picker-dropdown";
import { TimePickerDropdown } from "@/Components/ui/time-picker-dropdown";

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
            <Head title="Scan Makanan" />
            <div className="max-w-3xl w-full">
                {/* Title */}
                <div className="flex items-center gap-[1rem]">
                    <div className="bg-tertiary p-[0.8rem] rounded-lg shadow-md">
                        <ScanLine size={25} />
                    </div>
                    <Title text="Scan Makaanan"/>
                </div>

                <p className="md:text-xl text-lg opacity-80 md:max-w-[80%] w-full mt-[1.5rem]">
                    Unggah gambar makanan Anda dan kami akan menganalisis
                    nutrisi yang ada pada makanan secara otomatis!
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

                            {/* Jam */}
                            <div className="flex flex-col gap-[0.6rem] relative w-full">
                                <Label className="text-[15px] text-lg font-medium text-black">
                                    Jam
                                </Label>

                                <TimePickerDropdown
                                    value={data.jam}
                                    onChange={(val) => setData("jam", val)}
                                />
                            </div>
                        </div>

                    {/* Upload Area */}
                    <div
                        className="border-2 border-dashed border-tertiary bg-white rounded-xl w-full min-h-[300px] flex flex-col justify-center items-center text-center cursor-pointer hover:bg-secondary/50 transition"
                        onClick={() =>
                            document.getElementById("foodImage").click()
                        }
                    >
                        {preview ? (
                            <img
                                src={preview}
                                className="max-h-56 rounded-lg object-cover shadow"
                            />
                        ) : (
                            <div>
                                <ImageIcon className="mx-auto mb-3 h-12 w-12 text-gray-600" />
                                <p className="font-medium text-gray-800 ">
                                    Seret atau klik untuk memasukkan gambar
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                    Support JPG, PNG, WebP (max 5MB)
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
