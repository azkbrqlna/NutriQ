import { useState } from "react";
import { CircleChevronLeft, X, CircleChevronRight } from "lucide-react";
import { useForm } from "@inertiajs/react";

import AgeQuestion from "@/Components/Personalisasi/Umur";
import WeightHeightQuestion from "@/Components/Personalisasi/TinggiBerat";
import ActivityQuestion from "@/Components/Personalisasi/Aktivitas";
import GenderQuestion from "@/Components/Personalisasi/JenisKelamin";
import Title from "@/Components/Title";
import Analisis from "@/Components/Personalisasi/Analisis";
import { Button } from "@/Components/ui/button";

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
            console.log(data);
            return;
        }

        post("/personalisasi");
        setShowModal(false);
    };

    return (
        <div>
            {processing ? (
                <Analisis />
            ) : (
                <div className="h-screen flex flex-col justify-center items-center z-0">
                    {/* pertanyaan dinamis */}
                    <CurrentQuestion setData={setData} data={data} />

                    <div className="max-w-6xl w-full fixed flex justify-between bottom-12 md:px-0 px-[2rem]">
                        <button
                            className=" fill-tertiary p-[1rem] rounded-xl flex items-center gap-[0.5rem] hover:opacity-70"
                            onClick={moveToPrevQuestion}
                            disabled={questionNumber == 0}
                        >
                            <CircleChevronLeft size={20}/>
                            <span className="font-medium ">Kembali</span>
                        </button>

                        <button
                            className=" fill-tertiary p-[1rem] rounded-xl flex items-center gap-[0.5rem] hover:opacity-70"
                            onClick={moveToNextQuestion}
                        >
                            <span className="font-medium">Lanjut</span>
                            <CircleChevronRight size={20}/>
                        </button>
                    </div>
                </div>
            )}

            {/* analisis */}

            {/* modal */}
            {showModal && (
                <div className="w-full h-full fixed top-0 right-0 black-0 left-0 z-50 flex items-center justify-center bg-black/80">
                    <div className="card relative md:max-w-md max-w-xs w-full flex flex-col gap-[0.5rem] items-center justify-center rounded-xl py-[1.2rem] px-[1rem] bg-secondary">
                        <Title
                            text={"Siap memulai perjalanan sehat Anda?"}
                            className="text-center max-w-[80%] w-full"
                        />
                        <p className="text-center opacity-80 text-xl">
                            Anda masih bisa mengubah data-data ini kapan saja
                            melalui menu Profil.
                        </p>
                        <Button
                            className="bg-quartenary py-[1.6rem] px-[1.3rem] text-lg rounded-lg font-semibold text-white mt-[1rem] hover:bg-quartenary/80"
                            onClick={handleSubmit}
                        >
                            Hitung kebutuhan saya
                        </Button>

                        {/* close button */}
                        <button
                            className="rounded-full p-[0.7rem] bg-primary absolute right-[-15px] top-[-15px] cursor-pointer"
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
