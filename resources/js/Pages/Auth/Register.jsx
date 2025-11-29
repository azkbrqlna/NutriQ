import React, { useState } from "react";
import { router, useForm } from "@inertiajs/react";

export default function Register() {
    const [isNotFilled, setIsnotFilled] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
    });

    const handleRegister = () => {
        if (!data.email && !data.password) {
            setIsNotFilled(true);
            return;
        }
        post("/register");
    };

    return (
        <div className="h-screen flex flex-col  justify-center items-center gap-[2rem]">
            <div className="logo">
                <h1 className="font-bold text-4xl">NutriQ</h1>
            </div>
            <div className="card max-w-[350px] w-full p-[1.5rem] rounded-xl fill-secondary shadow-lg">
                <form action={handleRegister} className="flex flex-col">
                    <div className="flex flex-col gap-[0.5rem] ">
                        <label htmlFor="">Nama</label>
                        <input
                            type="text"
                            onChange={(e) => setData("name", e.target.value)}
                            className="fill-primary outline-none rounded-md"
                        />
                    </div>

                    <div className="flex flex-col gap-[0.5rem] mt-[1rem]">
                        <label htmlFor="">Email</label>
                        <input
                            type="text"
                            onChange={(e) => setData("email", e.target.value)}
                            className="fill-primary outline-none rounded-lg"
                        />
                    </div>

                    <div className="flex flex-col gap-[0.5rem] mt-[1rem]">
                        <label htmlFor="">Password</label>
                        <input
                            type="text"
                            onChange={(e) => setData("password", e.target.value)}
                            className="fill-primary outline-none rounded-lg"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-[2rem] fill-quartenary text-white p-[0.5rem] rounded-lg font-semibold"
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
