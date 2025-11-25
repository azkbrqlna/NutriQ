import Title from "./Title";

export default function AgeQuestion({ setAge }) {
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center pb-[3rem] ">
            <span className="text-2xl opacity-80">Pertanyaan 1/4</span>
            <Title text={"Berapa umur Anda?"} />
            <input
                type="text"
                className="w-full max-w-xs fill-secondary rounded-md p-[1rem] text-black mt-[2rem]"
                placeholder="Masukkan umur Anda (tahun)"
                onChange={(e) => setAge(e.target.value)}
            />
        </div>
    );
}
