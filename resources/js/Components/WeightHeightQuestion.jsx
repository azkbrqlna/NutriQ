import Title from "./Title";

export default function WeightHeightQuestion({ setWeight, setHeight }) {
    return (
        <div className="flex flex-col items-center  pb-[3rem]">
            <span className="text-2xl opacity-80">Pertanyaan 3/4</span>
            <Title text={"Berapa tinggi dan berat badan Anda?"} />
            <input
                type="text"
                className="max-w-xs w-full fill-secondary rounded-md p-[1rem] text-black mt-[2rem]"
                placeholder="Masukkan tinggi Anda (cm)"
                onChange={(e) => setHeight(e.target.value)}
            />
            <input
                type="text"
                className="max-w-xs w-full fill-secondary rounded-md p-[1rem] text-black mt-[2rem]"
                placeholder="Masukkan berat Anda (kg)"
                onChange={(e) => setWeight(e.target.value)}
            />
        </div>
    );
}
