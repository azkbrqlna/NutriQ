import { useState } from "react";
import {
    Armchair, // Sangat rendah (Sofa)
    PersonStanding, // Ringan (Berdiri/Jalan santai)
    Bike, // Sedang (Olahraga ringan)
    Dumbbell, // Berat (Gym/Lari)
    Trophy, // Ekstra Berat (Atlet)
} from "lucide-react";
import Title from "../Title";
import SelectBox from "../SelectBox";

export default function Aktivitas({ setData, data }) {
    const [selectedAktivitas, setSelectedAktivitas] = useState(
        data.aktivitas || null
    );

    const handleAktivitasSelect = (aktivitas) => {
        setSelectedAktivitas(aktivitas);
        setData("aktivitas", aktivitas);
    };

    const activityOptions = [
        {
            value: "Sangat rendah",
            icon: Armchair,
            desc: "Jarang berolahraga, banyak duduk",
        },
        {
            value: "Rendah",
            icon: PersonStanding,
            desc: "Olahraga 1-3 hari/minggu",
        },
        {
            value: "Sedang",
            icon: Bike,
            desc: "Olahraga 3-5 hari/minggu",
        },
        {
            value: "Berat",
            icon: Dumbbell,
            desc: "Olahraga 6-7 hari/minggu",
        },
        {
            value: "Ekstra berat",
            icon: Trophy,
            desc: "Latihan fisik sangat berat/atlet",
        },
    ];

    return (
        <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500 md:mt-0 mt-[25rem]">
            {/* Icon Visual */}

            <Title
                text="Seberapa aktif Anda sehari-hari?"
                className="text-3xl md:text-4xl font-bold text-center text-[#2C3A2C] mb-4 mt-8"
            />

            {/* Grid Layout untuk Opsi */}
            <div className="flex flex-wrap justify-center gap-6 w-full max-w-5xl px-4 mt-8">
                {activityOptions.map((option, index) => (
                    <div
                        key={option.value}
                        className="w-full sm:w-[45%] lg:w-[30%]"
                    >
                        <SelectBox
                            label={option.value}
                            desc={option.desc}
                            icon={option.icon}
                            active={selectedAktivitas === option.value}
                            onClick={() => handleAktivitasSelect(option.value)}
                            iconSize={28}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
