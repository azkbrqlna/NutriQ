import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
// 1. Import icon yang dibutuhkan di sini
import {
    Calendar,
    User,
    Ruler,
    Weight,
    Users,
    Pencil, // Digunakan untuk jenis kelamin
} from "lucide-react";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import AppLayout from "@/Components/AppLayout";

export default function Profil() {
    const [preview, setPreview] = useState(null);

    const { data, setData, put, patch, processing, errors } = useForm({
        nama: "",
        tinggi: "",
        berat: null,
        jenis_kelamin: null,
        umur: null,
    });

    const handleUpdate = (e) => {
        e.preventDefault(); // Jangan lupa preventDefault pada submit form
        alert("mengupdate profil");
        put("/profile");
    };

    // Helper class untuk icon agar konsisten
    const iconClass =
        "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500";
    // Helper class untuk input agar text tidak menabrak icon (padding-left)
    const inputWithIconClass = "pl-10 bg-white";

    return (
        <AppLayout>
            <Head title="NutriQ | Profil" />
            <div className="max-w-3xl w-full ">
                <div className="flex items-center gap-[1rem]">
                    <div className="bg-tertiary p-[0.8rem] rounded-lg">
                        <Pencil size={25} />
                    </div>
                    <h1 className="md:text-4xl text-3xl font-bold">
                        Edit Profil
                    </h1>
                </div>

                <p className="md:text-xl text-lg opacity-80 md:max-w-[80%] w-full mt-[1rem]">
                    Perbarui data diri Anda agar perhitungan target nutrisi
                    tetap akurat.
                </p>

                <form
                    onSubmit={handleUpdate}
                    className="max-w-xl w-full b mt-[1.5rem] flex flex-col gap-[1.5rem]"
                >
                    {/* Field Nama */}
                    <div className="flex flex-col gap-[0.5rem]">
                        <Label className="text-lg font-medium">Nama</Label>
                        <div className="relative">
                            <User className={iconClass} />
                            <Input
                                type="text"
                                className={inputWithIconClass}
                                placeholder="masukkan nama"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        {/* Field Tinggi Badan */}
                        <div className="flex flex-col gap-[0.5rem] w-[47%]">
                            <Label className="text-lg font-medium">
                                Tinggi badan
                            </Label>
                            <div className="relative">
                                <Ruler className={iconClass} />
                                <Input
                                    type="number"
                                    className={inputWithIconClass}
                                    placeholder="masukkan tinggi badan (cm)"
                                />
                            </div>
                        </div>

                        {/* Field Berat Badan */}
                        <div className="flex flex-col gap-[0.5rem] w-[47%]">
                            <Label className="text-lg font-medium">
                                Berat badan
                            </Label>
                            <div className="relative">
                                <Weight className={iconClass} />
                                <Input
                                    type="number"
                                    placeholder="masukkan berat badan (kg)"
                                    className={inputWithIconClass}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        {/* Field Umur */}
                        <div className="flex flex-col gap-[0.5rem] w-[47%]">
                            <Label className="text-lg font-medium">Umur</Label>
                            <div className="relative">
                                <Calendar className={iconClass} />
                                <Input
                                    type="number"
                                    className={inputWithIconClass}
                                    placeholder="masukkan umur"
                                />
                            </div>
                        </div>

                        {/* Field Jenis Kelamin */}
                        <div className="flex flex-col gap-[0.5rem] w-[47%]">
                            <Label className="text-lg font-medium">
                                Jenis kelamin
                            </Label>
                            <div className="relative">
                                <Users className={iconClass} />
                                <Input
                                    type="text"
                                    className={inputWithIconClass}
                                    placeholder="masukkan jenis kelamin"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Button group  */}
                    <div className="flex md:flex-row flex-col justify-end items-center gap-[1.5rem] mt-[1.5rem]">
                        <Button
                            type="button"
                            className="bg-quartenary md:w-auto w-full md:order-1 order-2 p-[1.6rem] text-lg text-white hover:bg-tertiary/80"
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            className="bg-quartenary md:w-auto w-full md:order-2 order-1 p-[1.6rem] text-lg text-white hover:bg-tertiary/80"
                        >
                            Simpan
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
