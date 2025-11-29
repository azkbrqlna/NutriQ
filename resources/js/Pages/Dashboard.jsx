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
import { usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { kebutuhan } = usePage().props;
    console.log(kebutuhan);

    return (
        <AppLayout>
            <div className=" max-w-5xl w-full flex justify-between items-center ">
                <h1 className="md:text-4xl text-3xl font-bold">Dashboard</h1>
                <button className="bg-tertiary p-[0.8rem] rounded-xl flex items-center gap-[0.5rem]">
                    <Calendar />
                    <span className="md:text-lg">Hari ini</span>
                </button>
            </div>
            {/* card */}
            <div className="mt-[2rem] max-w-5xl w-full">
                <h2 className="md:text-3xl text-2xl font-bold">Makronutrisi</h2>
                <div className="container flex md:gap-[3rem] gap-[1.5rem] flex-wrap justify-between items-center mt-[1.5rem]">
                    <div className="lg:w-[47%] w-full rounded-xl bg-secondary md:p-[2rem] p-[1.5rem] flex items-center justify-between">
                        <div className="">
                            <div className="flex items-center gap-[0.8rem]">
                                <div className="bg-tertiary rounded-xl p-[0.6rem]">
                                    <Wheat />
                                </div>
                                <span className="text-xl">Karbohidrat</span>
                            </div>
                            <h3 className="md:text-4xl text-3xl font-semibold mt-[2rem]">
                                150
                                <span className="text-lg font-normal">
                                    /250g
                                </span>
                            </h3>
                        </div>
                        <CircularProgress
                            stroke={10}
                            textSize="text-2xl"
                            className="w-[100px] h-[100px] md:w-[120px] md:h-[120px]"
                        />
                    </div>
                    <div className="lg:w-[47%] w-full rounded-xl bg-secondary md:p-[2rem] p-[1.5rem] flex items-center justify-between">
                        <div className="">
                            <div className="flex items-center gap-[0.8rem]">
                                <div className="bg-tertiary rounded-xl p-[0.6rem]">
                                    <Wheat />
                                </div>
                                <span className="text-xl">Karbohidrat</span>
                            </div>
                            <h3 className="md:text-4xl text-3xl font-semibold mt-[2rem]">
                                150
                                <span className="text-lg font-normal">
                                    /250g
                                </span>
                            </h3>
                        </div>
                        <CircularProgress
                            stroke={10}
                            textSize="text-2xl"
                            className="w-[100px] h-[100px] md:w-[120px] md:h-[120px]"
                        />
                    </div>
                    <div className="lg:w-[47%] w-full rounded-xl bg-secondary md:p-[2rem] p-[1.5rem] flex items-center justify-between">
                        <div className="">
                            <div className="flex items-center gap-[0.8rem]">
                                <div className="bg-tertiary rounded-xl p-[0.6rem]">
                                    <Wheat />
                                </div>
                                <span className="text-xl">Karbohidrat</span>
                            </div>
                            <h3 className="md:text-4xl text-3xl font-semibold mt-[2rem]">
                                150
                                <span className="text-lg font-normal">
                                    /250g
                                </span>
                            </h3>
                        </div>
                        <CircularProgress
                            stroke={10}
                            textSize="text-2xl"
                            className="w-[100px] h-[100px] md:w-[120px] md:h-[120px]"
                        />
                    </div>
                    <div className="lg:w-[47%] w-full rounded-xl bg-secondary md:p-[2rem] p-[1.5rem] flex items-center justify-between">
                        <div className="">
                            <div className="flex items-center gap-[0.8rem]">
                                <div className="bg-tertiary rounded-xl p-[0.6rem]">
                                    <Wheat />
                                </div>
                                <span className="text-xl">Karbohidrat</span>
                            </div>
                            <h3 className="md:text-4xl text-3xl font-semibold mt-[2rem]">
                                150
                                <span className="text-lg font-normal">
                                    /250g
                                </span>
                            </h3>
                        </div>
                        <CircularProgress
                            stroke={10}
                            textSize="text-2xl"
                            className="w-[100px] h-[100px] md:w-[120px] md:h-[120px]"
                        />
                    </div>
                </div>
            </div>

            {/* nutrsi tambahan section */}
            <div className="mt-[3rem] max-w-5xl w-full">
                <h2 className="md:text-3xl text-2xl font-bold">
                    Nutrisi tambahan
                </h2>
                <div className="container flex gap-[1.5rem] flex-wrap justify-between items-center mt-[1.5rem]">
                    <div className="card lg:w-[30%] w-full rounded-xl bg-secondary p-[1.5rem] flex items-center justify-between">
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
                        </div>
                        <CircularProgress
                            stroke={10}
                            textSize="text-2xl"
                            className="w-[100px] h-[100px] md:w-[100px] md:h-[100px]"
                        />
                    </div>
                    <div className="card lg:w-[30%] w-full rounded-xl bg-secondary p-[1.5rem] flex items-center justify-between">
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
                        </div>
                        <CircularProgress
                            stroke={10}
                            textSize="text-2xl"
                            className="w-[100px] h-[100px] md:w-[100px] md:h-[100px]"
                        />
                    </div>
                    <div className="card lg:w-[30%] w-full rounded-xl bg-secondary p-[1.5rem] flex items-center justify-between">
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
                        </div>
                        <CircularProgress
                            stroke={10}
                            textSize="text-2xl"
                            className="w-[100px] h-[100px] md:w-[100px] md:h-[100px]"
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
