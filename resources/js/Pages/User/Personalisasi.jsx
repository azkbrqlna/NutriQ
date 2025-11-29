import { useState } from "react";
import { ChevronRight, X } from "lucide-react";
import { ChevronLeft } from "lucide-react";

import AgeQuestion from "@/Components/Pertanyaan/AgeQuestion";
import WeightHeightQuestion from "@/Components/Pertanyaan/WeightHeightQuestion";
import ActivityQuestion from "@/Components/Pertanyaan/ActivityQuestion";
import GenderQuestion from "@/Components/Pertanyaan/GenderQuestion";
import { useForm } from "@inertiajs/react";
import Title from "@/Components/Title";

const contents = [
    AgeQuestion,
    GenderQuestion,
    WeightHeightQuestion,
    ActivityQuestion,
];

export default function Personalisasi() {
    const [questionNumber, setQuestionNumber] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const CurrentQuestion = contents[questionNumber];
    // const [jenis_kelamin, setJenisKelamin] = useState("");
    // const [berat, setBerat] = useState(0);
    // const [tinggi, setTinggi] = useState(0);
    // const [aktivitas, setAktivitas] = useState("");
    // const [umur, setUmur] = useState(0);

    const { data, setData, post, processing, errors } = useForm({
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
        console.log("pindah halaman berikutnya");
        console.log("nomor : ", questionNumber);

        if (questionNumber != 0) {
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
            alert("isi semua field!");
        }
        console.log(data);

        post("/personalisasi");
    };

    return (
        <div>
            <div className="h-screen flex flex-col justify-center items-center z-0">
                <CurrentQuestion setData={setData} data={data} />
                <div className="max-w-6xl w-full fixed flex justify-between bottom-12 md:px-0 px-[2rem]">
                    <button
                        className=" fill-tertiary p-[1rem] rounded-xl flex items-center gap-[0.2rem] hover:opacity-70"
                        onClick={moveToPrevQuestion}
                        disabled={questionNumber == 0}
                    >
                        <ChevronLeft />
                        <span className="font-semibold ">Kembali</span>
                    </button>

                    <button
                        className=" fill-tertiary p-[1rem] rounded-xl flex items-center gap-[0.2rem] hover:opacity-70"
                        onClick={moveToNextQuestion}
                    >
                        <span className="font-semibold">Lanjut</span>
                        <ChevronRight />
                    </button>
                </div>
            </div>

            {/* modal */}
            {showModal && (
                <div className="w-full h-full fixed top-0 right-0 black-0 left-0 z-50 flex items-center justify-center bg-black/80">
                    <div className="card relative md:max-w-md max-w-xs w-full flex flex-col gap-[0.5rem] items-center justify-center rounded-xl md:p-[1.5rem] py-[1.5rem] px-[1rem] fill-secondary">
                        <Title text={"Siap memulai perjalanan sehat Anda?"} />
                        <p className="text-center opacity-80 text-xl">
                            Anda masih bisa mengubah data-data ini kapan saja
                            melalui menu Profil.
                        </p>
                        <button
                            className="fill-quartenary p-[1rem] rounded-lg font-semibold text-white mt-[1rem] hover:bg-quartenary/80"
                            onClick={handleSubmit}
                        >
                            Hitung kebutuhan saya
                        </button>

                        {/* close button */}
                        <button
                            className="rounded-full p-[0.8rem] bg-primary absolute right-[-15px] top-[-15px] cursor-pointer"
                            onClick={() => setShowModal(false)}
                        >
                            <X size={30} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
