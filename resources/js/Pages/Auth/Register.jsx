import React, { useEffect, useState } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Title from "@/Components/Title";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";

export default function Register() {
    const [isNotFilled, setIsNotFilled] = useState(false);
    const [hidePassword, setHidePassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
    });

    const handleRegister = (e) => {
        e.preventDefault();

        if (!data.name || !data.email || !data.password) {
            setIsNotFilled(true);
            return;
        }

        if (data.password.length < 8) {
            alert("Password minimal 8 karakter!");
            return;
        }
        post("/register");
    };

    useEffect(() => {
        if (isNotFilled) {
            const timer = setTimeout(() => {
                setIsNotFilled(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isNotFilled]);

    // **Class yang Diperbarui untuk Input**
    const inputWrapperClass =
        "relative flex items-center bg-white rounded-lg border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:ring-offset-0 transition-all duration-200";
    const inputFieldClass =
        "bg-transparent outline-none rounded-lg w-full py-2 pl-10 pr-4 text-gray-800 placeholder:text-gray-400 focus:ring-0 focus:border-0";
    const iconClass = "w-5 h-5 ml-3 text-gray-400 absolute";

    return (
        <div className="h-screen flex flex-col justify-center items-center gap-[1.5rem]">
            <div className="logo text-center">
                <Title text="NutriQ" className="text-quartenary text-4xl"/>
                <p className="text-lg">Mulai perjalanan sehat Anda!</p>
            </div>
            {/* Mengubah bg-secondary menjadi bg-white/bg-card jika ada di theme Anda */}
            <div className="card md:max-w-[330px] max-w-xs w-full p-[1.5rem] rounded-2xl bg-white shadow-xl">
                <form onSubmit={handleRegister} className="flex flex-col">
                    <div className="flex flex-col gap-[0.5rem] ">
                        <Label className="font-medium text-gray-700">
                            Nama
                        </Label>
                        {/* Wrapper Nama dengan gaya Shadcn */}
                        <div className={inputWrapperClass}>
                            <User className={iconClass} />
                            <Input
                                type="text"
                                className="pl-[2.5rem] py-[1.4rem]"
                                onChange={(e) =>
                                    setData("nama", e.target.value)
                                }
                                placeholder="example@gmail.com"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-[0.5rem] mt-[1rem]">
                        <Label className="font-medium text-gray-700">
                            Email
                        </Label>
                        <div className={inputWrapperClass}>
                            <Mail className={iconClass} /> {/* Ikon Mail */}
                            <Input
                                type="text"
                                className="pl-[2.5rem] py-[1.4rem]"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                placeholder="example@gmail.com"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-[0.5rem] mt-[1rem]">
                        <Label className="font-medium text-gray-700">
                            Password
                        </Label>
                        <div className={inputWrapperClass}>
                            <Lock className={iconClass} /> {/* Ikon Lock */}
                            <Input
                                type={hidePassword ? "password" : "text"}
                                className="pl-[2.5rem] py-[1.4rem]"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                placeholder="masukkan password..."
                            />
                            {/* hide password button */}
                            <button
                                onClick={() => setHidePassword(!hidePassword)}
                                className="w-5 h-5 cursor-pointer opacity-60 absolute right-3 " // right-3 untuk posisi tombol mata
                                type="button"
                            >
                                {hidePassword ? (
                                    <Eye className="w-full h-full" />
                                ) : (
                                    <EyeOff className="h-full w-full" />
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`mt-[2rem] fill-quartenary text-white p-[0.6rem] rounded-lg font-semibold hover:bg-quartenary/80 flex items-center justify-center transition-colors duration-200`}
                        disabled={processing}
                    >
                        {!processing ? (
                            "Register"
                        ) : (
                            <Spinner className="w-7 h-7 " />
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

            {/* Alert message */}
            {isNotFilled && (
                <Alert variant="error" msg="Harap isi semua field!" />
            )}
            {Object.keys(errors) > 0 && (
                <Alert variant="error" msg={errors.email} />
            )}
        </div>
    );
}
