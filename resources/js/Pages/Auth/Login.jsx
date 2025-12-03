import React, { useEffect, useState } from "react";
import { router, useForm } from "@inertiajs/react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react"; // Import Mail dan Lock
import { Spinner } from "@/Components/ui/spinner";
import Alert from "@/Components/Alert";

export default function Login() {
    const [isNotFilled, setIsNotFilled] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    console.log(errors);

    const handeLogin = (e) => {
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
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isNotFilled]);

    // **Definisi Class yang Konsisten dengan Halaman Register (Shadcn-like)**
    const inputWrapperClass =
        "relative flex items-center bg-white rounded-lg border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:ring-offset-0 transition-all duration-200";
    const inputFieldClass =
        "bg-transparent outline-none rounded-lg w-full py-2 pl-10 pr-4 text-gray-800 placeholder:text-gray-400 focus:ring-0 focus:border-0";
    const iconClass = "w-5 h-5 ml-3 text-gray-400 absolute";

    return (
        <div className="h-screen flex flex-col justify-center items-center gap-[1.5rem]">
            <div className="logo text-center">
                <h1 className="font-bold text-4xl">NutriQ</h1>
                <p className="text-lg">Lanjutkan perjalanan sehat Anda!</p>
            </div>
            <div className="card md:max-w-[330px] max-w-xs w-full p-[1.5rem] rounded-2xl bg-white shadow-lg">
                <form onSubmit={handeLogin} className="flex flex-col">
                    {/* Input Email */}
                    <div className="flex flex-col gap-[0.5rem]">
                        <label htmlFor="" className="font-medium text-gray-700">
                            Email
                        </label>
                        <div className={inputWrapperClass}>
                            <Mail className={iconClass} /> {/* Ikon Mail */}
                            <input
                                type="text"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className={inputFieldClass} // Class dengan pl-10
                                placeholder="example@gmail.com"
                            />
                        </div>
                    </div>
                    {/* Input Password */}
                    <div className="flex flex-col gap-[0.5rem] mt-[1rem]">
                        <label htmlFor="" className="font-medium text-gray-700">
                            Password
                        </label>
                        <div className={inputWrapperClass}>
                            <Lock className={iconClass} /> {/* Ikon Lock */}
                            <input
                                type={hidePassword ? "password" : "text"}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className={`${inputFieldClass} pr-12`} // pl-10 untuk ikon Lock, pr-12 untuk tombol Eye
                                placeholder="masukkan password..."
                            />
                            {/* hide password button */}
                            <button
                                onClick={() => setHidePassword(!hidePassword)}
                                className="w-5 h-5 cursor-pointer opacity-60 absolute right-3 transition-opacity duration-200 hover:opacity-100" // right-3 untuk posisi tombol mata
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
                            "Login"
                        ) : (
                            <Spinner className="w-7 h-7 " />
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

            {isNotFilled && <Alert msg="Harap isi semua field!" />}
            {Object.keys(errors) > 0 && <Alert msg={errors.email} />}
        </div>
    );
}
