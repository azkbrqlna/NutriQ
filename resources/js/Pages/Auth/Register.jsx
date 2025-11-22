import React from "react";
import { useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        umur: "",
        jenis_kelamin: "",
        tinggi: "",
        berat: "",
        aktivitas: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/register"); // route name yg kamu pakai di web.php
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Register
                </h2>

                <form onSubmit={submit} className="space-y-4">
                    {/* Nama */}
                    <div>
                        <label className="block font-medium">Nama</label>
                        <input
                            type="text"
                            className="w-full border rounded p-2"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        {errors.name && (
                            <p className="text-red-600 text-sm">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block font-medium">Email</label>
                        <input
                            type="email"
                            className="w-full border rounded p-2"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        {errors.email && (
                            <p className="text-red-600 text-sm">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block font-medium">Password</label>
                        <input
                            type="password"
                            className="w-full border rounded p-2"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        {errors.password && (
                            <p className="text-red-600 text-sm">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Umur */}
                    <div>
                        <label className="block font-medium">Umur</label>
                        <input
                            type="number"
                            className="w-full border rounded p-2"
                            value={data.umur}
                            onChange={(e) => setData("umur", e.target.value)}
                        />
                        {errors.umur && (
                            <p className="text-red-600 text-sm">
                                {errors.umur}
                            </p>
                        )}
                    </div>

                    {/* Jenis Kelamin */}
                    <div>
                        <label className="block font-medium">
                            Jenis Kelamin
                        </label>
                        <select
                            className="w-full border rounded p-2"
                            value={data.jenis_kelamin}
                            onChange={(e) =>
                                setData("jenis_kelamin", e.target.value)
                            }
                        >
                            <option value="">Pilih</option>
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                        {errors.jenis_kelamin && (
                            <p className="text-red-600 text-sm">
                                {errors.jenis_kelamin}
                            </p>
                        )}
                    </div>

                    {/* Tinggi */}
                    <div>
                        <label className="block font-medium">
                            Tinggi Badan (cm)
                        </label>
                        <input
                            type="number"
                            className="w-full border rounded p-2"
                            value={data.tinggi}
                            onChange={(e) => setData("tinggi", e.target.value)}
                        />
                        {errors.tinggi && (
                            <p className="text-red-600 text-sm">
                                {errors.tinggi}
                            </p>
                        )}
                    </div>

                    {/* Berat */}
                    <div>
                        <label className="block font-medium">
                            Berat Badan (kg)
                        </label>
                        <input
                            type="number"
                            className="w-full border rounded p-2"
                            value={data.berat}
                            onChange={(e) => setData("berat", e.target.value)}
                        />
                        {errors.berat && (
                            <p className="text-red-600 text-sm">
                                {errors.berat}
                            </p>
                        )}
                    </div>

                    {/* Aktivitas */}
                    <div>
                        <label className="block font-medium">
                            Aktivitas Harian
                        </label>
                        <select
                            className="w-full border rounded p-2"
                            value={data.aktivitas}
                            onChange={(e) =>
                                setData("aktivitas", e.target.value)
                            }
                        >
                            <option value="">Pilih Aktivitas</option>
                            <option value="ringan">
                                Ringan (jarang olahraga)
                            </option>
                            <option value="sedang">
                                Sedang (3x olahraga/minggu)
                            </option>
                            <option value="berat">Berat (latihan rutin)</option>
                        </select>
                        {errors.aktivitas && (
                            <p className="text-red-600 text-sm">
                                {errors.aktivitas}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                        disabled={processing}
                    >
                        {processing ? "Processing..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
}
