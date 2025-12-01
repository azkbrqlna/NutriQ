import Title from "../Title";

export default function Umur({ setData, data }) {
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center pb-[5rem] ">
            <span className="text-2xl opacity-80">Pertanyaan 1/4</span>
            <Title text={"Berapa umur Anda?"} className="text-center" />
            <input
                type="text"
                className="w-full md:max-w-xs max-w-[250px] bg-white rounded-xl p-[1rem] text-black mt-[1.5rem]"
                placeholder="Masukkan umur Anda (tahun)"
                onChange={(e) => setData("umur", e.target.value)}
                value={data.umur}
            />
        </div>
    );
}
