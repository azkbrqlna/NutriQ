import React from "react";
import { Link, useForm } from "@inertiajs/react";

export default function Dashboard() {
    const { post } = useForm();

    function handleLogout(e) {
        e.preventDefault();
        post(route("logout"));
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

            <form onSubmit={handleLogout}>
                <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Logout
                </button>
            </form>
        </div>
    );
}
