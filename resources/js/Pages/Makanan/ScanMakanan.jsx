import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { Calendar, Clock, Image as ImageIcon, Loader2 } from "lucide-react";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import AppLayout from "@/Components/AppLayout";
import Title from "@/Components/Title";

export default function ScanMakanan() {
    const [preview, setPreview] = useState(null);

    const { data, setData, post, processing, errors } = useForm({
        tanggal: "",
        jam: "",
        image: null,
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("image", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("makanan.generate"), {
            forceFormData: true,
        });
    };

    return (
        <AppLayout>
            <div>
                <Head title="Scan Makanan" />
                <div className="max-w-3xl w-full">
                    {/* Title */}
                    <h1 className="md:text-4xl text-3xl font-bold">
                        Scan Makanan
                    </h1>

                    <p className="md:text-xl text-lg opacity-80 md:max-w-[85%] w-full mt-[1rem]">
                        Unggah gambar makanan Anda dan kami akan menganalisis
                        nutrisi yang ada pada makanan secara otomatis!
                    </p>

                    <form
                        onSubmit={submit}
                        className="w-full space-y-8 mt-[1rem]"
                        encType="multipart/form-data"
                    >
                        {/* Input Tanggal & Jam */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
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
                                        text-black py-[1.4rem] px-[1rem] placeholder:text-gray-600
                                        appearance-none
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
                                        text-black py-[1.4rem] px-[1rem] placeholder:text-gray-600
                                        appearance-none
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

                        {/* Upload Area */}
                        <div
                            className="border-2 border-dashed border-[#A8C48C] bg-white rounded-xl w-full min-h-[260px] flex flex-col justify-center items-center text-center cursor-pointer hover:bg-secondary/50 transition"
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
                                    <p className="font-medium text-gray-800">
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

                        {/* Button */}
                        <div className="flex justify-end">
                            <Button
                                className="bg-quartenary text-white p-[1.5rem] text-[15px] rounded-lg hover:bg-quartenary/80 mt-[1rem] font-semibold"
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
