"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/Components/ui/chart";

// Data Mockup (pura-pura data events/kalori harian)
const chartData = [
    { time: "06:00", value: 0 },
    { time: "08:00", value: 350 }, // Sarapan
    { time: "10:00", value: 120 }, // Snack pagi
    { time: "12:00", value: 650 }, // Makan siang
    { time: "14:00", value: 0 },
    { time: "16:00", value: 200 }, // Snack sore
    { time: "18:00", value: 0 },
    { time: "20:00", value: 550 }, // Makan malam
    { time: "22:00", value: 0 },
];

// Konfigurasi Label & Warna (SAGE GREEN THEME)
const chartConfig = {
    value: {
        label: "Kalori",
        color: "#7A9E7E", // Warna Sage Green Utama
    },
};

export default function EventsChart() {
    return (
        // CARD: Background Putih, Border Sage Muda (Sesuai DashboardCard lain)
        <Card className="bg-white border border-[#D5E1C3] shadow-sm mt-8">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-[#2C3A2C] text-xl font-bold">
                            Aktivitas Nutrisi
                        </CardTitle>
                        <CardDescription className="text-[#5C6F5C]">
                            Grafik asupan kalori Anda sepanjang hari ini.
                        </CardDescription>
                    </div>

                    {/* Stat Ringkas di Pojok Kanan */}
                    <div className="text-right">
                        <span className="block text-[#5C6F5C] text-xs uppercase tracking-wider font-semibold">
                            Total Hari Ini
                        </span>
                        <span className="block text-3xl font-bold text-[#2C3A2C]">
                            1,870
                        </span>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="aspect-[16/9] w-full max-h-[300px]"
                >
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 0,
                            right: 12,
                            top: 12,
                            bottom: 12,
                        }}
                    >
                        {/* Grid horizontal tipis warna sage sangat muda */}
                        <CartesianGrid
                            vertical={false}
                            stroke="#E9EFDB"
                            strokeDasharray="3 3"
                        />

                        {/* Sumbu X (Waktu) */}
                        <XAxis
                            dataKey="time"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            tickFormatter={(value) => value}
                            stroke="#5C6F5C" // Warna teks sumbu
                            style={{ fontSize: "12px", fontWeight: 500 }}
                        />

                        {/* Sumbu Y (Angka) */}
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            stroke="#5C6F5C"
                            style={{ fontSize: "12px" }}
                            tickFormatter={(value) => `${value}`}
                        />

                        {/* Tooltip Kustom (Theme Light/Cream) */}
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    indicator="line"
                                    className="bg-white border border-[#D5E1C3] text-[#2C3A2C] shadow-md"
                                />
                            }
                        />

                        {/* DEFINISI GRADASI WARNA (SAGE GREEN) */}
                        <defs>
                            <linearGradient
                                id="fillValue"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-value)" // Mengambil dari config (#7A9E7E)
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-value)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>

                        {/* AREA UTAMA */}
                        <Area
                            dataKey="value"
                            type="monotone" // Garis melengkung halus
                            fill="url(#fillValue)"
                            fillOpacity={0.4}
                            stroke="var(--color-value)"
                            strokeWidth={3} // Garis sedikit lebih tebal
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
