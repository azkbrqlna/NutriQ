import { useState } from "react"; // 1. Import useState
import { Mars } from "lucide-react";
import Title from "../Title";
import SelectBox from "../SelectBox";


export default function Aktivitas({ setData, data }) {
    // 2. State untuk melacak opsi yang saat ini dipilih
    const [selectedAktivitas, setSelectedAktivitas] = useState(null);

    // 3. Fungsi untuk menangani klik tombol
    const handleAktivitasSelect = (aktivitas) => {
        setSelectedAktivitas(aktivitas); // Perbarui state aktif
        setData("aktivitas", aktivitas); // Perbarui data formulir
    };

    return (
        <div className="flex flex-col items-center justify-center pb-[1rem]">
            <span className="text-xl opacity-80">Pertanyaan 4/4</span>
            <Title
                text={"Apa tingkat aktivitas Anda?"}
                className="text-center"
            />
            <div className="flex flex-col gap-[1.5rem] mt-[2.5rem]">
                <div className="flex items-center gap-[3rem]">
                    {/* SelectBox 1: Sangat Rendah */}
                    <SelectBox
                        label={"Sangat rendah"}
                        icon={Mars}
                        // 4. Tambahkan prop 'active' untuk menentukan styling
                        active={
                            selectedAktivitas === "Sangat rendah" ||
                            data.aktivitas === "Sangat rendah"
                        }
                        // 5. Ubah onClick untuk memanggil handler baru
                        onClick={() => handleAktivitasSelect("Sangat rendah")}
                    />

                    {/* SelectBox 2: Ringan */}
                    <SelectBox
                        label={"Ringan"}
                        icon={Mars}
                        active={
                            selectedAktivitas === "Ringan" ||
                            data.aktivitas === "Ringan"
                        }
                        onClick={() => handleAktivitasSelect("Ringan")}
                    />

                    {/* SelectBox 3: Sedang */}
                    <SelectBox
                        label={"Sedang"}
                        icon={Mars}
                        active={
                            selectedAktivitas === "Sedang" ||
                            data.aktivitas === "Sedang"
                        }
                        onClick={() => handleAktivitasSelect("Sedang")}
                    />
                </div>

                <div className="flex justify-center items-center gap-[3rem]">
                    {/* SelectBox 4: Berat */}
                    <SelectBox
                        label={"Berat"}
                        icon={Mars}
                        active={
                            selectedAktivitas === "Berat" ||
                            data.aktivitas === "Berat"
                        }
                        onClick={() => handleAktivitasSelect("Berat")}
                    />

                    {/* SelectBox 5: Ekstra Berat */}
                    <SelectBox
                        label={"Ekstra berat"}
                        icon={Mars}
                        active={
                            selectedAktivitas === "Ekstra berat" ||
                            data.aktivitas === "Ekstra berat"
                        }
                        onClick={() => handleAktivitasSelect("Ekstra berat")}
                    />
                </div>
            </div>
        </div>
    );
}
