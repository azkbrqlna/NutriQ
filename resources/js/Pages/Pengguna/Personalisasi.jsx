import { useEffect, useState } from "react";
import {
    CircleChevronLeft,
    X,
    CircleChevronRight,
    CheckCircle2,
} from "lucide-react";
import { useForm } from "@inertiajs/react";

import AgeQuestion from "@/Components/Personalisasi/Umur";
import WeightHeightQuestion from "@/Components/Personalisasi/TinggiBerat";
import ActivityQuestion from "@/Components/Personalisasi/Aktivitas";
import GenderQuestion from "@/Components/Personalisasi/JenisKelamin";
import Title from "@/Components/Title";
import Analisis from "@/Components/Personalisasi/LoadingAnalisis";
import { Button } from "@/Components/ui/button";
import Alert from "@/Components/Alert"; // Pastikan path benar

const contents = [
    AgeQuestion,
    GenderQuestion,
    WeightHeightQuestion,
    ActivityQuestion,
];

export default function Personalisasi() {
    const [questionNumber, setQuestionNumber] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [isNotFilled, setIsNotFilled] = useState(false);
    const CurrentQuestion = contents[questionNumber];

    const { data, setData, post, processing } = useForm({
        umur: "",
        jenis_kelamin: "",
        aktivitas: "",
        berat: "",
        tinggi: "",
    });

    const moveToNextQuestion = () => {
        if (questionNumber < contents.length - 1) {
            setQuestionNumber(questionNumber + 1);
        } else {
            setShowModal(true);
        }
    };

    const moveToPrevQuestion = () => {
        if (questionNumber !== 0) {
            setQuestionNumber(questionNumber - 1);
        }
    };

    const handleSubmit = () => {
        if (
            !data.tinggi ||
            !data.berat ||
            !data.aktivitas ||
            !data.umur ||
            !data.jenis_kelamin
        ) {
            setIsNotFilled(true);
            setShowModal(false);
            return;
        }
        post("/personalisasi");
        setShowModal(false);
    };

    // Auto-hide alert setelah 3 detik
    useEffect(() => {
        if (isNotFilled) {
            const timer = setTimeout(() => {
                setIsNotFilled(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isNotFilled]);

    const progress = ((questionNumber + 1) / contents.length) * 100;

    return (
        <div className="min-h-screen w-full bg-[#F7F9F0] text-[#2C3A2C] font-sans relative overflow-hidden transition-colors duration-500">
            {/* --- ALERT FIX --- */}
            {/* Menggunakan fixed dengan z-index tinggi agar selalu di atas */}

            {/* Background Accents */}
            <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-[#E9EFDB] rounded-full blur-3xl opacity-50 pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-64 h-64 bg-[#7A9E7E] rounded-full blur-3xl opacity-20 pointer-events-none animate-pulse"></div>

            {processing ? (
                <Analisis />
            ) : (
                <div className="h-screen flex flex-col justify-between py-10 relative z-10 animate-in fade-in duration-500">
                    {/* Header: Progress Bar */}
                    <div className="w-full max-w-xl mx-auto px-6 pt-6">
                        <div className="flex justify-between text-sm font-medium text-[#5C6F5C] mb-2">
                            <span>
                                Langkah {questionNumber + 1} dari{" "}
                                {contents.length}
                            </span>
                            <span>{Math.round(progress)}% Selesai</span>
                        </div>
                        <div className="w-full bg-[#D5E1C3] h-2 rounded-full overflow-hidden shadow-inner">
                            <div
                                className="bg-[#4A624E] h-full transition-all duration-500 ease-out rounded-full"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 overflow-y-auto flex flex-col justify-center items-center w-full max-w-4xl mx-auto px-4 pt-8 pb-8">
                        <CurrentQuestion setData={setData} data={data} />
                    </div>

                    {/* Footer Buttons */}
                    <div className="w-full max-w-4xl mx-auto px-6 pb-6 flex justify-between items-center">
                        <button
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                                questionNumber === 0
                                    ? "opacity-0 cursor-default pointer-events-none"
                                    : "text-[#5C6F5C] hover:bg-[#E9EFDB] hover:text-[#2C3A2C] active:scale-95"
                            }`}
                            onClick={moveToPrevQuestion}
                            disabled={questionNumber === 0}
                        >
                            <CircleChevronLeft size={24} />
                            <span>Kembali</span>
                        </button>

                        <button
                            className="bg-[#4A624E] hover:bg-[#3B4F3E] text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-[#4A624E]/20 flex items-center gap-3 transition-all transform active:scale-95 hover:shadow-xl"
                            onClick={moveToNextQuestion}
                        >
                            <span>
                                {questionNumber === contents.length - 1
                                    ? "Selesai"
                                    : "Lanjut"}
                            </span>
                            {questionNumber === contents.length - 1 ? (
                                <CheckCircle2 size={24} />
                            ) : (
                                <CircleChevronRight size={24} />
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* CONFIRMATION MODAL */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C3A2C]/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 border border-[#D5E1C3] animate-in zoom-in-95 duration-300 transform scale-100">
                        <button
                            className="absolute top-4 right-4 p-2 rounded-full text-[#5C6F5C] hover:bg-[#F2F5E8] hover:text-[#2C3A2C] transition-colors"
                            onClick={() => setShowModal(false)}
                        >
                            <X size={24} />
                        </button>
                        <div className="text-center space-y-4 pt-2">
                            <div className="w-20 h-20 bg-[#E9EFDB] text-[#4A624E] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                                <CheckCircle2 size={40} />
                            </div>
                            <Title
                                text="Siap memulai perjalanan sehat Anda?"
                                className="text-2xl font-bold text-[#2C3A2C]"
                            />
                            <p className="text-[#5C6F5C] leading-relaxed text-base px-2">
                                Data yang Anda masukkan akan digunakan untuk
                                menghitung target nutrisi harian.
                            </p>
                            <Button
                                className="w-full bg-[#4A624E] hover:bg-[#3B4F3E] text-white py-6 text-lg rounded-xl font-bold shadow-md mt-6 transition-transform active:scale-95"
                                onClick={handleSubmit}
                            >
                                Hitung Kebutuhan Saya
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {isNotFilled && (
                <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 ">
                    <Alert variant="warning" title="Lengkapi data!" />
                </div>
            )}
        </div>
    );
}
