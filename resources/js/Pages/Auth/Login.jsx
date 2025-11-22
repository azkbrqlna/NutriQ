import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function Login() {
    const [isNotFilled, setIsnotFilled] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    const handeLogin = () => {
        if (!data.email && !data.password) {
            setIsNotFilled(true);
            return;
        }
        post("/login");
    };

    return (
        <div className="h-screen flex flex-col  justify-center items-center gap-[1rem]">
            <div className="logo">
                <h1 className="font-bold text-4xl">NutriQ</h1>
            </div>
            <div className="card rounded-lg p-[1rem]">
                <label htmlFor="">Email</label>
                <form action={handeLogin} className="flex flex-col ">
                    <input
                        type="text"
                        onChange={(e) => setData("email", e.target)}
                    />
                    <label htmlFor="">Password</label>
                    <input
                        type="text"
                        onChange={(e) => setData("password", e.target)}
                    />
                    <button type="submit" className="mt-[2rem]">Login</button>
                </form>

                {isNotFilled && (
                    <div>
                        <p>Harap isi semua field!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
