import React, { useState } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function Register() {
    const [isNotFilled, setIsnotFilled] = useState(false);
    const [hidePassword, setHidePassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
    });
    const { flash } = usePage().props;

    const handleRegister = (e) => {
        e.preventDefault();
        alert("mendaftarkan akun");

        if (!data.name || !data.email || !data.password) {
            alert("isi semua field!");
            return;
        }

        if (data.password.length < 8) {
            alert("Password minimal 8 karakter!");
            return;
        }
        post("/register");
    };

    // **Class yang Diperbarui untuk Input**
    const inputWrapperClass =
        "relative flex items-center bg-white rounded-lg border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:ring-offset-0 transition-all duration-200";
    const inputFieldClass =
        "bg-transparent outline-none rounded-lg w-full py-2 pl-10 pr-4 text-gray-800 placeholder:text-gray-400 focus:ring-0 focus:border-0";
    const iconClass = "w-5 h-5 ml-3 text-gray-400 absolute";

    return (
        <div className="h-screen flex flex-col justify-center items-center gap-[1.5rem]">
            <div className="logo text-center">
                <h1 className="font-bold text-4xl">NutriQ</h1>
                <p>Mulai perjalanan sehat Anda!</p>
            </div>
            {/* Mengubah bg-secondary menjadi bg-white/bg-card jika ada di theme Anda */}
            <div className="card md:max-w-[340px] max-w-xs w-full p-[1.5rem] rounded-2xl bg-secondary shadow-xl">
                <form onSubmit={handleRegister} className="flex flex-col">
                    <div className="flex flex-col gap-[0.5rem] ">
                        <label htmlFor="" className="font-medium text-gray-700">
                            Nama
                        </label>
                        {/* Wrapper Nama dengan gaya Shadcn */}
                        <div className={inputWrapperClass}>
                            <User className={iconClass} />
                            <input
                                type="text"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className={inputFieldClass}
                                placeholder="masukkan nama..."
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-[0.5rem] mt-[1rem]">
                        <label htmlFor="" className="font-medium text-gray-700">
                            Email
                        </label>
                        {/* Wrapper Email dengan gaya Shadcn */}
                        <div className={inputWrapperClass}>
                            <Mail className={iconClass} />
                            <input
                                type="text"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className={inputFieldClass}
                                placeholder="example@gmail.com"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-[0.5rem] mt-[1rem]">
                        <label htmlFor="" className="font-medium text-gray-700">
                            Password
                        </label>
                        {/* Wrapper Password dengan gaya Shadcn */}
                        <div className={inputWrapperClass}>
                            <Lock className={iconClass} />
                            <input
                                type={hidePassword ? "password" : "text"}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                placeholder="masukkan password..."
                                className={`${inputFieldClass} pr-12`} // pr-12 untuk memberi ruang tombol mata
                            />
                            {/* hide password button */}
                            <button
                                onClick={() => setHidePassword(!hidePassword)}
                                className="w-5 h-5 cursor-pointer opacity-60 absolute right-3 transition-opacity duration-200 hover:opacity-100" // right-3 agar sedikit menjauh dari border
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
                        className={`mt-[2rem] fill-quartenary text-white p-[0.6rem] rounded-lg font-semibold hover:bg-quartenary/80  flex items-center justify-center transition-colors duration-200`}
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

                {isNotFilled && (
                    <div>
                        <p>Harap isi semua field!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
