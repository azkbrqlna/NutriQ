import React, { useEffect, useState } from "react";
import { router, useForm } from "@inertiajs/react";

export default function Login() {
    const [isNotFilled, setIsNotFilled] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    const handeLogin = (e) => {
        e.preventDefault();
        if (!data.email && !data.password) {
            setIsNotFilled(true);
            return;
        }

        post("/login");
    };

    useEffect(() => {
        console.log(isNotFilled);
    }, [isNotFilled]);

    return (
        <div className="h-screen flex flex-col  justify-center items-center gap-[2rem]">
            <div className="logo">
                <h1 className="font-bold text-4xl">NutriQ</h1>
            </div>
            <div className="card max-w-[350px] w-full p-[1.5rem] rounded-xl fill-secondary shadow-lg">
                <form onSubmit={handeLogin} className="flex flex-col">
                    <div className="flex flex-col gap-[0.5rem]">
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
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="fill-primary outline-none rounded-lg"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-[2rem] bg-quartenary text-white p-[0.5rem] rounded-lg font-semibold hover:bg-quartenary/80"
                    >
                        Login
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
        </div>
    );
}
