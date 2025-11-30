import { Mars } from "lucide-react";
import Title from "../Title";
import SelectBox from "../SelectBox";

export default function Aktivitas({ setData }) {
    return (
        <div className="flex flex-col items-center justify-center ">
            <span className="text-2xl opacity-80">Pertanyaan 4/4</span>
            <Title text={"Apa tingkat aktivitas Anda?"} className="text-center" />
            <div className="flex flex-col gap-[2rem] mt-[2rem]">
                <div className="flex items-center gap-[3rem]">
                    <SelectBox
                        label={"Sangat rendah"}
                        icon={Mars}
                        onClick={() => setData("aktivitas", "Sangat rendah")}
                    />
                    <SelectBox
                        label={"Ringan"}
                        icon={Mars}
                        onClick={() => setData("aktivitas", "Ringan")}
                    />
                    <SelectBox
                        label={"Sedang"}
                        icon={Mars}
                        onClick={() => setData("aktivitas", "Sedang")}
                    />
                </div>

                <div className="flex justify-center items-center gap-[3rem]">
                    <SelectBox
                        label={"Berat"}
                        icon={Mars}
                        onClick={() => setData("aktivitas", "Berat")}
                    />
                    <SelectBox
                        label={"Ekstra berat"}
                        icon={Mars}
                        onClick={() => setData("aktivitas", "Ekstra berat")}
                    />
                </div>
            </div>
        </div>
    );
}
