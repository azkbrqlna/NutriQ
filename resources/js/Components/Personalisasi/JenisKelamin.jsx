import { useState } from "react"; // 1. Import useState
import { Mars, Venus } from "lucide-react";
import Title from "../Title";
import SelectBox from "../SelectBox";

export default function JenisKelamin({ setData, data }) {
    // 2. State untuk menyimpan pilihan yang aktif
    const [selectedGender, setSelectedGender] = useState(null);

    // 3. Fungsi untuk menangani klik tombol
    const handleGenderSelect = (gender) => {
        // alert("memilih kelamin")
        setSelectedGender(gender); // Perbarui state aktif
        setData("jenis_kelamin", gender); // Perbarui data formulir induk
    };

    return (
        <div className="flex flex-col items-center pb-[5rem]">
            <span className="text-2xl opacity-80">Pertanyaan 2/4</span>
            <Title text={"Apa jenis kelamin Anda?"} className="text-center" />
            <div className="flex md:gap-[3rem] gap-[2rem] items-center mt-[2rem] ">
                <SelectBox
                    label={"Laki-laki"}
                    icon={Mars}
                    // 4. Tentukan apakah tombol ini aktif
                    active={
                        selectedGender == "Laki-laki" ||
                        data.jenis_kelamin === "Laki-laki"
                    }
                    // 5. Panggil handler baru saat diklik
                    onClick={() => handleGenderSelect("Laki-laki")}
                />
                <SelectBox
                    label={"Perempuan"}
                    icon={Venus}
                    // 4. Tentukan apakah tombol ini aktif
                    active={
                        selectedGender == "Perempuan" ||
                        data.jenis_kelamin === "Perempuan"
                    }
                    // 5. Panggil handler baru saat diklik
                    onClick={() => handleGenderSelect("Perempuan")}
                />
            </div>
        </div>
    );
}
