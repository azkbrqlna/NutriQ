import Title from "../Title";
import AnalysisSvg from '@/assets/images/Analysis.svg'; // Sesuaikan path alias jika perlu

export default function Analisis() {
    return (
        <div className="h-screen flex flex-col justify-center items-center py-[10rem]">
            <Title text="Mempersiapkan kebutuhan nutrisi yang sesuai dengan diri Anda..." className="max-w-[30%] text-center" />
            <img
                src={AnalysisSvg}
                alt="Logo Statis"
                className="w-[400px] h-[400px]"
            />
            <p className="text-xl flex justify-center items-center flex-col">
                "Makanan adalah obat, dan obat adalah makanan."
                <span className="block">- Hippocrates</span>
            </p>
        </div>
    );
}
