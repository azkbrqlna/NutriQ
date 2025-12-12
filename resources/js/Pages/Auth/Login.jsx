import React, { useEffect, useState } from "react";
import { router, useForm } from "@inertiajs/react";
import { Eye, EyeOff, Mail, Lock, Carrot } from "lucide-react";
import { Spinner } from "@/Components/ui/spinner";
import Alert from "@/Components/Alert";
import Title from "@/Components/Title";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

export default function Login() {
    const [isNotFilled, setIsNotFilled] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);

    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    const handleLogin = (e) => {
        e.preventDefault();

        if (!data.email || !data.password) {
            setIsNotFilled(true);
            return;
        }

        post("/login");
    };

    useEffect(() => {
        if (isNotFilled) {
            const timer = setTimeout(() => {
                setIsNotFilled(false);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [isNotFilled]);

    const inputWrapperClass =
        "relative flex items-center bg-white rounded-xl border border-[#D5E1C3] focus-within:border-[#7A9E7E] focus-within:ring-2 focus-within:ring-[#7A9E7E]/20 focus-within:ring-offset-0 transition-all duration-200";

    const iconClass = "w-5 h-5 ml-3 text-[#5C6F5C] absolute";

    return (
        <div className="min-h-screen flex flex-col justify-center items-center gap-[1.5rem] bg-[#F7F9F0] text-[#2C3A2C] font-sans p-4">
            <div className="logo text-center">
                <div className="flex items-center justify-center gap-3">
                    <div className="bg-[#E9EFDB] p-3 rounded-xl text-[#4A624E]">
                        <Carrot className="w-8 h-8" />
                    </div>
                    <span className="font-bold text-3xl text-[#4A624E]">
                        Nutri<span className="text-[#2C3A2C]">Q</span>
                    </span>
                </div>
                <p className="text-lg text-[#5C6F5C] mt-2">
                    Lanjutkan perjalanan sehat Anda!
                </p>
            </div>

            {/* Card Putih dengan Shadow Halus */}
            <div className="card md:max-w-[380px] max-w-xs w-full p-8 rounded-2xl bg-white shadow-xl shadow-[#7A9E7E]/10 border border-[#D5E1C3]">
                <form onSubmit={handleLogin} className="flex flex-col">
                    {/* Input Email */}
                    <div className="flex flex-col gap-[0.5rem]">
                        <Label className="font-semibold text-[#2C3A2C]">
                            Email
                        </Label>
                        <div className={inputWrapperClass}>
                            <Mail className={iconClass} />
                            <Input
                                type="email"
                                className="pl-[2.5rem] py-6 bg-transparent border-none focus-visible:ring-0 text-[#2C3A2C] placeholder:text-[#9CA3AF]"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                placeholder="example@gmail.com"
                            />
                        </div>
                        {errors.email && (
                            <span className="text-red-500 text-xs mt-1">
                                {errors.email}
                            </span>
                        )}
                    </div>

                    {/* Input Password */}
                    <div className="flex flex-col gap-[0.5rem] mt-5">
                        <Label className="font-semibold text-[#2C3A2C]">
                            Password
                        </Label>
                        <div className={inputWrapperClass}>
                            <Lock className={iconClass} />
                            <Input
                                type={hidePassword ? "password" : "text"}
                                className="pl-[2.5rem] py-6 bg-transparent border-none focus-visible:ring-0 text-[#2C3A2C] placeholder:text-[#9CA3AF]"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                placeholder="masukkan password..."
                            />
                            <button
                                onClick={() => setHidePassword(!hidePassword)}
                                className="w-5 h-5 cursor-pointer text-[#5C6F5C] hover:text-[#2C3A2C] absolute right-3 transition-colors"
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
                            <span className="text-red-500 text-xs mt-1">
                                {errors.password}
                            </span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={`mt-8 bg-[#7A9E7E] text-white py-3 rounded-xl font-bold hover:bg-[#5C6F5C] hover:shadow-lg hover:shadow-[#7A9E7E]/20 flex items-center justify-center transition-all duration-200 active:scale-95`}
                        disabled={processing}
                    >
                        {!processing ? (
                            "Login"
                        ) : (
                            <Spinner className="w-6 h-6 text-white" />
                        )}
                    </button>
                </form>

                <p className="text-center mt-6 text-[#5C6F5C] text-sm">
                    Belum punya akun?
                    <span
                        className="text-[#7A9E7E] font-bold hover:underline cursor-pointer ml-1 hover:text-[#2C3A2C] transition-colors"
                        onClick={() => router.visit("/register")}
                    >
                        Register
                    </span>
                </p>
            </div>

            {isNotFilled && (
                <div className="fixed top-10 z-50">
                    <Alert variant="warning" title="Harap isi semua field!" />
                </div>
            )}
        </div>
    );
}
