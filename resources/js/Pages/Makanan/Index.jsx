import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { Calendar, Clock, Image as ImageIcon, Loader2 } from "lucide-react";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import AppLayout from "@/Components/AppLayout";

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
            <div className="min-h-screen p-10 bg-black">
                <Head title="Scan Makanan" />

                <div className="max-w-5xl mx-auto w-full">
                    <h1 className="text-3xl font-semibold mb-10">
                        Scan Makanan
                    </h1>

                    <form
                        onSubmit={submit}
                        className="w-full space-y-10"
                        encType="multipart/form-data"
                    >
                        {/* Input Tanggal & Jam */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                            {/* Tanggal */}
                            <div className="space-y-2 w-full">
                                <Label className="text-lg">Tanggal</Label>
                                <div className="relative w-full">
                                    <Input
                                        type="date"
                                        className="w-full bg-[#CDDCAD] border-none rounded-lg text-black placeholder:text-gray-700"
                                        value={data.tanggal}
                                        onChange={(e) =>
                                            setData("tanggal", e.target.value)
                                        }
                                    />
                                    <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-700" />
                                </div>
                            </div>

                            {/* Jam */}
                            <div className="space-y-2 w-full">
                                <Label className="text-lg">Jam</Label>
                                <div className="relative w-full">
                                    <Input
                                        type="time"
                                        className="w-full bg-[#CDDCAD] border-none rounded-lg text-black placeholder:text-gray-700"
                                        value={data.jam}
                                        onChange={(e) =>
                                            setData("jam", e.target.value)
                                        }
                                    />
                                    <Clock className="absolute right-3 top-3 h-5 w-5 text-gray-700" />
                                </div>
                            </div>
                        </div>

                        {/* Upload Area */}
                        <div
                            className="border-2 border-dashed rounded-xl bg-[#DDE8BE] p-10 w-full flex flex-col items-center text-center cursor-pointer hover:bg-[#d4e0b0] transition"
                            onClick={() =>
                                document.getElementById("foodImage").click()
                            }
                        >
                            {preview ? (
                                <img
                                    src={preview}
                                    className="max-h-64 rounded-lg object-cover shadow"
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
                        <div className="flex justify-end w-full">
                            <Button
                                className="bg-[#6E8F5C] text-white px-10 py-6 text-lg rounded-xl hover:bg-[#5d7d4d]"
                                disabled={processing}
                                type="submit"
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                                        Menganalisis...
                                    </>
                                ) : (
                                    "Analisa Sekarang"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
