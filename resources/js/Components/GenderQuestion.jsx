import { Mars, Venus } from "lucide-react";
import Title from "./Title";
import SelectBox from "./SelectBox";

export default function GenderQuestion({ setGender }) {
    return (
        <div className="flex flex-col items-center  pb-[3rem]">
            <span className="text-2xl opacity-80">Pertanyaan 2/4</span>
            <Title text={"Apa jenis kelamin Anda?"} />
            <div className="flex gap-[3rem] items-center mt-[2rem] ">
                <SelectBox label={"Laki-laki"} icon={Mars} />
                <SelectBox label={"Perempuan"} icon={Venus} />
            </div>
        </div>
    );
}
