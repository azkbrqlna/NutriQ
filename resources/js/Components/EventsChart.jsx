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
// Import komponen UI untuk Dropdown/Select dan Button
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Flame } from "lucide-react";

// Mengubah EventsChart menjadi komponen yang menerima props
export default function EventsChart({
    data,
    chartDates,
    nutritionKeys,
    kebutuhan,
}) {
    // State untuk nutrisi yang sedang difilter (Default: Kalori)
    const [activeNutrient, setActiveNutrient] = React.useState("Kalori");

    // Data dan Config untuk chart
    // Data berasal dari props `data` (makananRentangTanggal)
    const chartData = data;

    // Config berdasarkan nutrisi yang aktif
    const activeConfig = nutritionKeys[activeNutrient];
    const chartConfig = {
        [activeNutrient]: {
            label: activeConfig?.label || activeNutrient,
            color: activeConfig?.color || "#7A9E7E",
        },
    };

    // Nilai Kebutuhan Harian untuk nutrisi aktif (untuk garis referensi atau total)
    const dailyTarget = kebutuhan?.[activeNutrient.toLowerCase()] || 0;

    // Hitung Total Asupan selama rentang waktu
    const totalIntake = chartData.reduce(
        (sum, entry) => sum + (entry[activeNutrient] || 0),
        0
    );

    return (
        <Card className="bg-white border border-[#D5E1C3] shadow-sm mt-8">
            <CardHeader>
                <div className="flex justify-between items-start flex-wrap gap-4">
                    <div>
                        <CardTitle className="text-[#2C3A2C] text-xl font-bold">
                            Tren Asupan Nutrisi ({activeConfig?.label})
                        </CardTitle>
                        <CardDescription className="text-[#5C6F5C]">
                            {chartDates.startDate} sampai {chartDates.endDate}
                        </CardDescription>
                    </div>

                    {/* Filter Nutrisi */}
                    <div className="flex items-center gap-3">
                        {/* Komponen Select (sesuaikan dengan implementasi Select Anda) */}
                        <Select
                            value={activeNutrient}
                            onValueChange={setActiveNutrient}
                        >
                            <SelectTrigger className="w-[180px] bg-[#E9EFDB] border-[#D5E1C3] text-[#2C3A2C] font-semibold">
                                <Flame size={16} className="text-[#7A9E7E]" />
                                <SelectValue placeholder="Pilih Nutrisi" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(nutritionKeys).map(
                                    ([key, config]) => (
                                        <SelectItem key={key} value={key}>
                                            <div className="flex items-center gap-2">
                                                {React.createElement(
                                                    config.icon,
                                                    {
                                                        size: 16,
                                                        className: `text-[${config.color}]`,
                                                    }
                                                )}
                                                {config.label} ({config.satuan})
                                            </div>
                                        </SelectItem>
                                    )
                                )}
                            </SelectContent>
                        </Select>

                        {/* Stat Ringkas di Pojok Kanan */}
                        <div className="text-right ml-4">
                            <span className="block text-[#5C6F5C] text-xs uppercase tracking-wider font-semibold">
                                Total Asupan
                            </span>
                            <span className="block text-3xl font-bold text-[#2C3A2C]">
                                {totalIntake.toLocaleString()}
                                <span className="text-lg font-normal text-[#5C6F5C] ml-1">
                                    {activeConfig?.satuan}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="aspect-[16/9] w-full max-h-[350px]"
                >
                    <AreaChart
                        accessibilityLayer
                        data={chartData} // Menggunakan data rentang tanggal
                        margin={{
                            left: 0,
                            right: 12,
                            top: 12,
                            bottom: 12,
                        }}
                    >
                        {/* Garis Referensi untuk Kebutuhan Harian (Optional, jika relevan untuk tren) */}
                        {/* Jika Anda ingin menampilkan garis target harian, Anda perlu data target per hari juga */}
                        <CartesianGrid
                            vertical={false}
                            stroke="#E9EFDB"
                            strokeDasharray="3 3"
                        />

                        {/* Sumbu X (Tanggal) */}
                        <XAxis
                            dataKey="date" // Menggunakan key 'date' dari Controller
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            tickFormatter={(value) => {
                                // Format tanggal (YYYY-MM-DD) menjadi DD/MM
                                const [year, month, day] = value.split("-");
                                return `${day}/${month}`;
                            }}
                            stroke="#5C6F5C"
                            style={{ fontSize: "12px", fontWeight: 500 }}
                        />

                        {/* Sumbu Y (Angka Nutrisi) */}
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            stroke="#5C6F5C"
                            style={{ fontSize: "12px" }}
                            tickFormatter={(value) => `${value}`}
                        />

                        {/* Tooltip Kustom */}
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    indicator="line"
                                    className="bg-white border border-[#D5E1C3] text-[#2C3A2C] shadow-md"
                                    nameKey={activeNutrient} // Tampilkan label nutrisi yang aktif
                                    labelFormatter={(label) =>
                                        `Tanggal: ${label}`
                                    } // Format label tooltip
                                    formatter={(value) => [
                                        `${value.toLocaleString()} ${
                                            activeConfig?.satuan || ""
                                        }`,
                                        activeConfig?.label,
                                    ]}
                                />
                            }
                        />

                        {/* DEFINISI GRADASI WARNA */}
                        <defs>
                            <linearGradient
                                id="fillNutrient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor={`var(--color-${activeNutrient})`}
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor={`var(--color-${activeNutrient})`}
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>

                        {/* AREA UTAMA (Nutrisi Aktif) */}
                        <Area
                            dataKey={activeNutrient} // Menggunakan key nutrisi yang aktif
                            type="monotone"
                            fill="url(#fillNutrient)"
                            fillOpacity={0.4}
                            stroke={`var(--color-${activeNutrient})`}
                            strokeWidth={3}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

// Catatan: Pastikan Anda telah membuat atau menggunakan komponen Select/Dropdown yang sesuai
// (seperti dari library Shadcn UI jika Anda menggunakannya) dan mengimpornya dengan benar.
