import { Mars, Venus } from "lucide-react";
import Title from "../Title";
import SelectBox from "../SelectBox";

export default function GenderQuestion({ setData }) {
    return (
        <div className="flex flex-col items-center  pb-[5rem]">
            <span className="text-2xl opacity-80">Pertanyaan 2/4</span>
            <Title text={"Apa jenis kelamin Anda?"} />
            <div className="flex md:gap-[3rem] gap-[2rem] items-center mt-[2rem] ">
                <SelectBox
                    label={"Laki-laki"}
                    icon={Mars}
                    onClick={() => setData("jenis_kelamin", "Laki-laki")}
                />
                <SelectBox
                    label={"Perempuan"}
                    icon={Venus}
                    onClick={() => setData("jenis_kelamin", "Perempuan")}
                />
            </div>
        </div>
    );
}
