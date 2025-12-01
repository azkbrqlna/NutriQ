import React from "react";
import AppLayout from "@/Components/AppLayout";
import Title from "@/Components/Title";
import CircularProgress from "@/Components/CircularProgress";
import {
    Beef,
    Candy,
    Wheat,
    Droplet,
    Flame,
    Leaf,
    Calendar,
} from "lucide-react";
import { Head, usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { kebutuhan } = usePage().props;
    console.log(kebutuhan);

    return (
        <AppLayout>
            <Head title="Dashboard" />
            <div className="max-w-[950px] w-full">
                <div className="w-full flex justify-between items-center ">
                    <h1 className="md:text-4xl text-3xl font-bold">
                        Dashboard
                    </h1>
                    <button className="bg-tertiary hover:bg-tertiary/80 p-[0.6rem] rounded-xl flex items-center gap-[0.5rem]">
                        <Calendar size={18} />
                        <span className="md:text-lg">Hari ini</span>
                    </button>
                </div>
                <p className="md:text-xl text-lg opacity-80 md:max-w-[65%] w-full mt-[1rem]">
                    Halo Dhlih! Pantau nutrisi makro dan mikro Anda hari ini
                    untuk mencapai target kesehatan Anda.
                </p>

                <div className="mt-[2rem]">
                    <h2 className="md:text-2xl text-xl font-bold">
                        Makronutrisi
                    </h2>
                    <div className="container flex md:gap-[2rem] gap-[1.5rem] flex-wrap justify-between items-center mt-[1.5rem]">
                        <div className="card lg:w-[47%] w-full rounded-xl bg-white border border-gray-200 hover:border-tertiary transition p-[1.5rem] shadow-sm flex items-center justify-between">
                            <div className="">
                                <div className="flex items-center gap-[0.8rem]">
                                    <div className="bg-tertiary rounded-xl p-[0.6rem]">
                                        <Wheat />
                                    </div>
                                    <span className="text-xl">Karbohidrat</span>
                                </div>
                                <h3 className="md:text-4xl text-3xl font-semibold mt-[1.5rem]">
                                    150
                                    <span className="text-lg font-normal">
                                        /250g
                                    </span>
                                </h3>
                                <span className="block mt-[0.7rem] text-lg opacity-80">
                                    Tersisa 100 g
                                </span>
                            </div>
                            <CircularProgress
                                stroke={10}
                                textSize="text-2xl"
                                className="w-[100px] h-[100px] md:w-[100px] md:h-[100px]"
                            />
                        </div>

                        <div className="lg:w-[47%] w-full rounded-xl bg-white border border-gray-200 hover:border-tertiary transition p-[1.5rem] shadow-sm flex items-center justify-between">
                            <div className="">
                                <div className="flex items-center gap-[0.8rem]">
                                    <div className="bg-tertiary rounded-xl p-[0.6rem]">
                                        <Wheat />
                                    </div>
                                    <span className="text-xl">Karbohidrat</span>
                                </div>
                                <h3 className="md:text-4xl text-3xl font-semibold mt-[1.5rem]">
                                    150
                                    <span className="text-lg font-normal">
                                        /250g
                                    </span>
                                </h3>
                                <span className="block mt-[0.7rem] text-lg opacity-80">
                                    Tersisa 100 g
                                </span>
                            </div>
                            <CircularProgress
                                stroke={10}
                                textSize="text-2xl"
                                className="w-[100px] h-[100px] md:w-[100px] md:h-[100px]"
                            />
                        </div>

                        <div className="lg:w-[47%] w-full rounded-xl bg-white border border-gray-200 hover:border-tertiary transition p-[1.5rem] shadow-sm flex items-center justify-between">
                            <div className="">
                                <div className="flex items-center gap-[0.8rem]">
                                    <div className="bg-tertiary rounded-xl p-[0.6rem]">
                                        <Wheat />
                                    </div>
                                    <span className="text-xl">Karbohidrat</span>
                                </div>
                                <h3 className="md:text-4xl text-3xl font-semibold mt-[1.5rem]">
                                    150
                                    <span className="text-lg font-normal">
                                        /250g
                                    </span>
                                </h3>
                                <span className="block mt-[0.7rem] text-lg opacity-80">
                                    Tersisa 100 g
                                </span>
                            </div>
                            <CircularProgress
                                stroke={10}
                                textSize="text-2xl"
                                className="w-[100px] h-[100px] md:w-[100px] md:h-[100px]"
                            />
                        </div>

                        <div className="lg:w-[47%] w-full rounded-xl bg-white border border-gray-200 hover:border-tertiary transition p-[1.5rem] shadow-sm flex items-center justify-between">
                            <div className="">
                                <div className="flex items-center gap-[0.8rem]">
                                    <div className="bg-tertiary rounded-xl p-[0.6rem]">
                                        <Wheat />
                                    </div>
                                    <span className="text-xl">Karbohidrat</span>
                                </div>
                                <h3 className="md:text-4xl text-3xl font-semibold mt-[1.5rem]">
                                    150
                                    <span className="text-lg font-normal">
                                        /250g
                                    </span>
                                </h3>
                                <span className="block mt-[0.7rem] text-lg opacity-80">
                                    Tersisa 100 g
                                </span>
                            </div>
                            <CircularProgress
                                stroke={10}
                                textSize="text-2xl"
                                className="w-[100px] h-[100px] md:w-[100px] md:h-[100px]"
                            />
                        </div>
                    </div>
                </div>

                {/* nutrsi tambahan section */}
                <div className="mt-[3rem] ">
                    <h2 className="md:text-2xl text-xl font-bold">
                        Nutrisi tambahan
                    </h2>
                    <div className="container flex gap-[1.5rem] flex-wrap justify-between items-center mt-[1.5rem]">
                        <div className="card lg:w-[30%] w-full rounded-xl bg-white  border border-gray-200 hover:border-tertiary transition p-[1.5rem] shadow-sm flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-[0.8rem]">
                                    <div className="bg-tertiary rounded-xl p-[0.6rem]">
                                        <Wheat />
                                    </div>
                                    <span className="text-xl">Natrium</span>
                                </div>
                                <h3 className="md:text-4xl text-3xl font-semibold mt-[1.5rem]">
                                    150
                                    <span className="text-lg font-normal">
                                        /250g
                                    </span>
                                </h3>
                                <span className="block mt-[0.7rem] text-lg opacity-80">
                                    Tersisa 100 g
                                </span>
                            </div>
                            <CircularProgress
                                stroke={10}
                                textSize="text-xl"
                                className="w-[100px] h-[100px] md:w-[75px] md:h-[75px]"
                            />
                        </div>
                        <div className="card lg:w-[30%] w-full rounded-xl bg-white  border border-gray-200 hover:border-tertiary transition p-[1.5rem] shadow-sm flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-[0.8rem]">
                                    <div className="bg-tertiary rounded-xl p-[0.6rem]">
                                        <Wheat />
                                    </div>
                                    <span className="text-xl">Natrium</span>
                                </div>
                                <h3 className="md:text-4xl text-3xl font-semibold mt-[1.5rem]">
                                    150
                                    <span className="text-lg font-normal">
                                        /250g
                                    </span>
                                </h3>
                                <span className="block mt-[0.7rem] text-lg opacity-80">
                                    Tersisa 100 g
                                </span>
                            </div>
                            <CircularProgress
                                stroke={10}
                                textSize="text-xl"
                                className="w-[100px] h-[100px] md:w-[75px] md:h-[75px]"
                            />
                        </div>
                        <div className="card lg:w-[30%] w-full rounded-xl bg-white  border border-gray-200 hover:border-tertiary transition p-[1.5rem] shadow-sm flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-[0.8rem]">
                                    <div className="bg-tertiary rounded-xl p-[0.6rem]">
                                        <Wheat />
                                    </div>
                                    <span className="text-xl">Natrium</span>
                                </div>
                                <h3 className="md:text-4xl text-3xl font-semibold mt-[1.5rem]">
                                    150
                                    <span className="text-lg font-normal">
                                        /250g
                                    </span>
                                </h3>
                                <span className="block mt-[0.7rem] text-lg opacity-80">
                                    Tersisa 100 g
                                </span>
                            </div>
                            <CircularProgress
                                stroke={10}
                                textSize="text-xl"
                                className="w-[100px] h-[100px] md:w-[75px] md:h-[75px]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
