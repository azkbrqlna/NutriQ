import Title from "../Title";

export default function WeightHeightQuestion({ setData, data }) {
    return (
        <div className="flex flex-col items-center  pb-[5rem]">
            <span className="text-2xl opacity-80">Pertanyaan 3/4</span>
            <Title text={"Berapa tinggi dan berat badan Anda?"} />
            <input
                type="text"
                className="md:max-w-xs max-w-[250px] w-full fill-secondary rounded-xl p-[1rem] text-black mt-[2rem]"
                placeholder="Masukkan tinggi Anda (cm)"
                onChange={(e) => setData("tinggi", e.target.value)}
                value={data.tinggi}
            />
            <input
                type="text"
                className="md:max-w-xs max-w-[250px] w-full fill-secondary rounded-xl p-[1rem] text-black mt-[2rem]"
                placeholder="Masukkan berat Anda (kg)"
                onChange={(e) => setData("berat", e.target.value)}
                value={data.berat}
            />
        </div>
    );
}
