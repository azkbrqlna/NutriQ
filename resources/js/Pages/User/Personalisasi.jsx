import React from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Personalisasi() {
    const { data, setData, post, processing, errors } = useForm({
        umur: "",
        jenis_kelamin: "",
        tinggi: "",
        berat: "",
        aktivitas: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/personalisasi");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-full max-w-lg p-4">
                <CardHeader>
                    <CardTitle className="text-xl text-center">
                        Personalisasi Data Tubuh
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <Label>Umur</Label>
                            <Input
                                type="number"
                                value={data.umur}
                                onChange={(e) =>
                                    setData("umur", e.target.value)
                                }
                            />
                            {errors.umur && (
                                <p className="text-red-600 text-sm">
                                    {errors.umur}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label>Jenis Kelamin</Label>
                            <Select
                                onValueChange={(v) =>
                                    setData("jenis_kelamin", v)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Laki-laki">
                                        Laki-laki
                                    </SelectItem>
                                    <SelectItem value="Perempuan">
                                        Perempuan
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.jenis_kelamin && (
                                <p className="text-red-600 text-sm">
                                    {errors.jenis_kelamin}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label>Tinggi (cm)</Label>
                            <Input
                                type="number"
                                value={data.tinggi}
                                onChange={(e) =>
                                    setData("tinggi", e.target.value)
                                }
                            />
                            {errors.tinggi && (
                                <p className="text-red-600 text-sm">
                                    {errors.tinggi}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label>Berat (kg)</Label>
                            <Input
                                type="number"
                                value={data.berat}
                                onChange={(e) =>
                                    setData("berat", e.target.value)
                                }
                            />
                            {errors.berat && (
                                <p className="text-red-600 text-sm">
                                    {errors.berat}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label>Aktivitas</Label>
                            <Select
                                onValueChange={(v) => setData("aktivitas", v)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Aktivitas" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ringan">
                                        Ringan
                                    </SelectItem>
                                    <SelectItem value="sedang">
                                        Sedang
                                    </SelectItem>
                                    <SelectItem value="berat">Berat</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.aktivitas && (
                                <p className="text-red-600 text-sm">
                                    {errors.aktivitas}
                                </p>
                            )}
                        </div>

                        <Button className="w-full" disabled={processing}>
                            {processing ? "Processing..." : "Simpan"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
