import React, { useEffect, useState } from "react";
import { router, useForm } from "@inertiajs/react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
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
        // Fixed typo: handeLogin -> handleLogin
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
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isNotFilled]);

    const inputWrapperClass =
        "relative flex items-center bg-white rounded-lg border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:ring-offset-0 transition-all duration-200";
    const iconClass = "w-5 h-5 ml-3 text-gray-400 absolute";

    return (
        <div className="h-screen flex flex-col justify-center items-center gap-[1.5rem]">
            <div className="logo text-center">
                <Title text="NutriQ" className="text-quartenary text-4xl" />
                <p className="text-lg">Lanjutkan perjalanan sehat Anda!</p>
            </div>

            <div className="card md:max-w-[330px] max-w-xs w-full p-[1.5rem] rounded-2xl bg-white shadow-lg">
                <form onSubmit={handleLogin} className="flex flex-col">
                    {/* Input Email */}
                    <div className="flex flex-col gap-[0.5rem]">
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
                                className="w-5 h-5 cursor-pointer opacity-60 absolute right-3 "
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

                    <button
                        type="submit"
                        className={`mt-[2rem] bg-quartenary text-white p-[0.6rem] rounded-lg font-semibold hover:bg-quartenary/80 flex items-center justify-center transition-colors duration-200`}
                        disabled={processing}
                    >
                        {!processing ? (
                            "Login"
                        ) : (
                            <Spinner className="w-7 h-7 text-white" />
                        )}
                    </button>
                </form>

                <p className="text-center mt-[1rem] ">
                    Belum punya akun?
                    <span
                        className="text-quartenary font-semibold hover:underline cursor-pointer ml-[0.2rem]"
                        onClick={() => router.visit("/register")}
                    >
                        Register
                    </span>
                </p>
            </div>

            {isNotFilled && (
                <Alert variant="error" msg="Harap isi semua field!" />
            )}
        </div>
    );
}
