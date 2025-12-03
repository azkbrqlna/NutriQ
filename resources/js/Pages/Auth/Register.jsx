import React, { useEffect, useState } from "react";
import { router, useForm } from "@inertiajs/react";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { Spinner } from "@/Components/ui/spinner";
import Alert from "@/Components/Alert"; // Pastikan path import sama dengan Login
import Title from "@/Components/Title";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";

export default function Register() {
    const [isNotFilled, setIsNotFilled] = useState(false);
    const [hidePassword, setHidePassword] = useState(true); // Default true agar aman

    // Setup form sesuai dengan kebutuhan Controller Laravel
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
    });

    const handleRegister = (e) => {
        e.preventDefault();

        // Validasi frontend sederhana
        if (!data.name || !data.email || !data.password) {
            setIsNotFilled(true);
            return;
        }

        if (data.password.length < 8) {
            alert("Password minimal 8 karakter!"); // Bisa diganti Alert UI jika mau
            return;
        }

        post("/register");
    };

    useEffect(() => {
        if (isNotFilled) {
            const timer = setTimeout(() => {
                setIsNotFilled(false);
            }, 3000); // Diperlama sedikit agar user sempat baca
            return () => clearTimeout(timer);
        }
    }, [isNotFilled]);

    // **Style Class (Konsisten dengan Login)**
    const inputWrapperClass =
        "relative flex items-center bg-white rounded-lg border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:ring-offset-0 transition-all duration-200";
    const iconClass = "w-5 h-5 ml-3 text-gray-400 absolute";

    return (
        <div className="h-screen flex flex-col justify-center items-center gap-[1.5rem]">
            <div className="logo text-center">
                <Title text="NutriQ" className="text-quartenary text-4xl" />
                <p className="text-lg">Mulai perjalanan sehat Anda!</p>
            </div>

            <div className="card md:max-w-[330px] max-w-xs w-full p-[1.5rem] rounded-2xl bg-white shadow-lg">
                <form onSubmit={handleRegister} className="flex flex-col">
                    {/* Input Nama */}
                    <div className="flex flex-col gap-[0.5rem]">
                        <Label className="font-medium text-gray-700">
                            Nama
                        </Label>
                        <div className={inputWrapperClass}>
                            <User className={iconClass} />
                            <Input
                                type="text"
                                className="pl-[2.5rem] py-[1.4rem] bg-transparent border-none focus-visible:ring-0"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                } // Perbaikan: "name" bukan "nama"
                                placeholder="Nama Lengkap"
                            />
                        </div>
                        {errors.name && (
                            <span className="text-red-500 text-xs">
                                {errors.name}
                            </span>
                        )}
                    </div>

                    {/* Input Email */}
                    <div className="flex flex-col gap-[0.5rem] mt-[1rem]">
                        <Label className="font-medium text-gray-700">
                            Email
                        </Label>
                        <div className={inputWrapperClass}>
                            <Mail className={iconClass} />
                            <Input
                                type="email"
                                className="pl-[2.5rem] py-[1.4rem] bg-transparent border-none focus-visible:ring-0"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                placeholder="example@gmail.com"
                            />
                        </div>
                        {errors.email && (
                            <span className="text-red-500 text-xs">
                                {errors.email}
                            </span>
                        )}
                    </div>

                    {/* Input Password */}
                    <div className="flex flex-col gap-[0.5rem] mt-[1rem]">
                        <Label className="font-medium text-gray-700">
                            Password
                        </Label>
                        <div className={inputWrapperClass}>
                            <Lock className={iconClass} />
                            <Input
                                type={hidePassword ? "password" : "text"}
                                className="pl-[2.5rem] py-[1.4rem] bg-transparent border-none focus-visible:ring-0"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                placeholder="masukkan password..."
                            />
                            <button
                                onClick={() => setHidePassword(!hidePassword)}
                                className="w-5 h-5 cursor-pointer opacity-60 absolute right-3"
                                type="button"
                            >
                                {hidePassword ? (
                                    <Eye className="w-full h-full" />
                                ) : (
                                    <EyeOff className="h-full w-full" />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <span className="text-red-500 text-xs">
                                {errors.password}
                            </span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`mt-[2rem] bg-quartenary text-white p-[0.6rem] rounded-lg font-semibold hover:bg-quartenary/80 flex items-center justify-center transition-colors duration-200`}
                        disabled={processing}
                    >
                        {!processing ? (
                            "Register"
                        ) : (
                            <Spinner className="w-7 h-7 text-white" />
                        )}
                    </button>
                </form>

                <p className="text-center mt-[1rem]">
                    Sudah punya akun?
                    <span
                        className="text-quartenary font-semibold hover:underline cursor-pointer ml-[0.2rem]"
                        onClick={() => router.visit("/login")}
                    >
                        Login
                    </span>
                </p>
            </div>

            {/* Global Alert */}
            {isNotFilled && (
                <Alert variant="error" msg="Harap isi semua field!" />
            )}

            {/* Menampilkan error general jika ada */}
            {errors.error && <Alert variant="error" msg={errors.error} />}
        </div>
    );
}
