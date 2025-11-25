import { Mars } from "lucide-react";
import Title from "./Title";
import SelectBox from "./SelectBox";

export default function ActivityQuestion({ setActivity }) {
    return (
        <div className="flex flex-col items-center justify-center">
            <span className="text-2xl opacity-80">Pertanyaan 4/4</span>
            <Title text={"Apa tingkat aktivitas Anda?"} />
            <div className="flex flex-col gap-[2rem] mt-[2rem]">
                <div className="flex items-center gap-[3rem]">
                    <SelectBox label={"Sangat rendah"} icon={Mars} />
                    <SelectBox label={"Ringan"} icon={Mars} />
                    <SelectBox label={"Sedang"} icon={Mars} />
                </div>

                <div className="flex justify-center items-center gap-[3rem]">
                    <SelectBox label={"Berat"} icon={Mars} />
                    <SelectBox label={"Ekstra berat"} icon={Mars} />
                </div>
            </div>
        </div>
    );
}
