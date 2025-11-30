import React, { useState } from "react";
import { router, useForm, usePage } from "@inertiajs/react";

export default function Register() {
    const [isNotFilled, setIsnotFilled] = useState(false);
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

    return (
        <div className="h-screen flex flex-col  justify-center items-center gap-[2rem]">
            <div className="logo">
                <h1 className="font-bold text-4xl">NutriQ</h1>
            </div>
            <div className="card md:max-w-[350px] max-w-xs w-full p-[1.5rem] rounded-xl fill-secondary shadow-lg">
                <form onSubmit={handleRegister} className="flex flex-col">
                    <div className="flex flex-col gap-[0.5rem] ">
                        <label htmlFor="" className="font-medium">
                            Nama
                        </label>
                        <input
                            type="text"
                            onChange={(e) => setData("name", e.target.value)}
                            className="fill-primary outline-none rounded-md"
                        />
                    </div>

                    <div className="flex flex-col gap-[0.5rem] mt-[1rem]">
                        <label htmlFor="" className="font-medium">
                            Email
                        </label>
                        <input
                            type="text"
                            onChange={(e) => setData("email", e.target.value)}
                            className="fill-primary outline-none rounded-lg"
                        />
                    </div>

                    <div className="flex flex-col gap-[0.5rem] mt-[1rem]">
                        <label htmlFor="" className="font-medium">
                            Password
                        </label>
                        <input
                            type="text"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="fill-primary outline-none rounded-lg"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-[2rem] fill-quartenary text-white p-[0.6rem] rounded-lg font-semibold"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center mt-[1rem]">
                    Sudah punya akun?{" "}
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
