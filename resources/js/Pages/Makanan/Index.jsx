import React, { useState } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Upload, Loader2, Camera, Utensils, AlertCircle } from "lucide-react";

// Import komponen Shadcn (Pastikan path sesuai)
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

export default function MakananIndex({ auth, makanans }) {
    // PERBAIKAN DI SINI: Kita ambil props dengan cara aman
    const { props } = usePage();
    // Jika flash atau errors tidak ada, kita ganti dengan object kosong {} agar tidak crash
    const flash = props.flash || {};
    const serverErrors = props.errors || {};

    const [preview, setPreview] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        image: null,
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("image", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("makanan.generate"), {
            forceFormData: true,
            onSuccess: () => {
                reset("image");
                setPreview(null);
            },
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
            <Head title="Analisis Makanan" />

            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-600 rounded-lg text-white">
                        <Utensils className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Analisis Nutrisi Makanan
                        </h1>
                        <p className="text-slate-500">
                            Upload foto makanan Anda, biarkan AI menghitung
                            kalorinya.
                        </p>
                    </div>
                </div>

                {/* Notifikasi Sukses (Menggunakan Optional Chaining ?. agar tidak crash) */}
                {flash?.success && (
                    <Alert className="bg-green-50 border-green-200 text-green-800">
                        <AlertTitle>Sukses</AlertTitle>
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                )}

                {/* Notifikasi Error */}
                {Object.keys(serverErrors).length > 0 && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            {serverErrors.image ||
                                serverErrors.error ||
                                "Terjadi kesalahan."}
                        </AlertDescription>
                    </Alert>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* SECTION 1: FORM UPLOAD */}
                    <Card className="lg:col-span-1 h-fit">
                        <CardHeader>
                            <CardTitle>Upload Foto</CardTitle>
                            <CardDescription>
                                Format: JPG, PNG (Max 5MB)
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Foto Makanan</Label>
                                    <div
                                        className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                                            preview
                                                ? "border-blue-500 bg-blue-50"
                                                : "border-slate-300 hover:bg-slate-100"
                                        }`}
                                        onClick={() =>
                                            document
                                                .getElementById("fileInput")
                                                .click()
                                        }
                                    >
                                        {preview ? (
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="max-h-48 rounded-md object-contain"
                                            />
                                        ) : (
                                            <div className="py-8">
                                                <Camera className="h-10 w-10 text-slate-400 mx-auto mb-2" />
                                                <span className="text-sm text-slate-500">
                                                    Klik untuk pilih foto
                                                </span>
                                            </div>
                                        )}
                                        <Input
                                            id="fileInput"
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                    {errors.image && (
                                        <p className="text-xs text-red-500">
                                            {errors.image}
                                        </p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700"
                                    disabled={processing || !data.image}
                                >
                                    {processing ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Menganalisis...
                                        </>
                                    ) : (
                                        "Analisis Sekarang"
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* SECTION 2: LIST RIWAYAT MAKANAN */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-xl font-semibold text-slate-800">
                            Riwayat Makanan
                        </h2>

                        {!makanans || makanans.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                                <p className="text-slate-500">
                                    Belum ada data makanan yang dianalisis.
                                </p>
                            </div>
                        ) : (
                            makanans.map((item) => (
                                <Card key={item.id} className="overflow-hidden">
                                    <div className="flex flex-col md:flex-row">
                                        {/* Tampilan Gambar */}
                                        <div className="md:w-1/3 bg-slate-100 relative">
                                            {item.foto ? (
                                                <img
                                                    src={item.foto}
                                                    alt={item.nama}
                                                    className="w-full h-full object-cover absolute inset-0"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full min-h-[200px] text-slate-400">
                                                    No Image
                                                </div>
                                            )}
                                        </div>

                                        {/* Tampilan Detail Nutrisi */}
                                        <div className="md:w-2/3 p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-lg font-bold text-slate-900 capitalize">
                                                        {item.nama}
                                                    </h3>
                                                    <p className="text-sm text-slate-500">
                                                        {item.tanggal} •{" "}
                                                        {item.jam}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-2xl font-bold text-blue-600">
                                                        {item.total_kalori}
                                                    </span>
                                                    <span className="text-xs text-slate-500 block">
                                                        kkal
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-4 gap-2 mb-4 text-center">
                                                <div className="bg-orange-50 p-2 rounded-lg">
                                                    <p className="text-xs text-orange-600 font-semibold">
                                                        Protein
                                                    </p>
                                                    <p className="text-sm font-bold text-slate-700">
                                                        {item.total_protein}g
                                                    </p>
                                                </div>
                                                <div className="bg-yellow-50 p-2 rounded-lg">
                                                    <p className="text-xs text-yellow-600 font-semibold">
                                                        Lemak
                                                    </p>
                                                    <p className="text-sm font-bold text-slate-700">
                                                        {item.total_lemak}g
                                                    </p>
                                                </div>
                                                <div className="bg-green-50 p-2 rounded-lg">
                                                    <p className="text-xs text-green-600 font-semibold">
                                                        Karbo
                                                    </p>
                                                    <p className="text-sm font-bold text-slate-700">
                                                        {item.total_karbohidrat}
                                                        g
                                                    </p>
                                                </div>
                                                <div className="bg-purple-50 p-2 rounded-lg">
                                                    <p className="text-xs text-purple-600 font-semibold">
                                                        Gula
                                                    </p>
                                                    <p className="text-sm font-bold text-slate-700">
                                                        {
                                                            item.total_gula_tambahan
                                                        }
                                                        g
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <h4 className="text-xs font-semibold uppercase text-slate-500 mb-2">
                                                    Rincian Komponen:
                                                </h4>
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow className="hover:bg-transparent">
                                                            <TableHead className="h-8 py-0">
                                                                Item
                                                            </TableHead>
                                                            <TableHead className="h-8 py-0 text-right">
                                                                Kalori
                                                            </TableHead>
                                                            <TableHead className="h-8 py-0 text-right">
                                                                P
                                                            </TableHead>
                                                            <TableHead className="h-8 py-0 text-right">
                                                                L
                                                            </TableHead>
                                                            <TableHead className="h-8 py-0 text-right">
                                                                K
                                                            </TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {item.detail_makanans &&
                                                            item.detail_makanans.map(
                                                                (
                                                                    detail,
                                                                    idx
                                                                ) => (
                                                                    <TableRow
                                                                        key={
                                                                            idx
                                                                        }
                                                                        className="hover:bg-slate-50"
                                                                    >
                                                                        <TableCell className="py-2 font-medium">
                                                                            {
                                                                                detail.nama
                                                                            }
                                                                        </TableCell>
                                                                        <TableCell className="py-2 text-right">
                                                                            {
                                                                                detail.kalori
                                                                            }
                                                                        </TableCell>
                                                                        <TableCell className="py-2 text-right text-xs">
                                                                            {
                                                                                detail.protein
                                                                            }
                                                                        </TableCell>
                                                                        <TableCell className="py-2 text-right text-xs">
                                                                            {
                                                                                detail.lemak
                                                                            }
                                                                        </TableCell>
                                                                        <TableCell className="py-2 text-right text-xs">
                                                                            {
                                                                                detail.karbohidrat
                                                                            }
                                                                        </TableCell>
                                                                    </TableRow>
                                                                )
                                                            )}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
