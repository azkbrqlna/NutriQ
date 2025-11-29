import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";

import AgeQuestion from "@/Components/AgeQuestion";
import WeightHeightQuestion from "@/Components/WeightHeightQuestion";
import ActivityQuestion from "@/Components/ActivityQuestion";
import GenderQuestion from "@/Components/GenderQuestion";
import { useForm } from "@inertiajs/react";
import Title from "@/Components/Title";

const contents = [
    AgeQuestion,
    GenderQuestion,
    WeightHeightQuestion,
    ActivityQuestion,
];

export default function Question() {
    const [questionNumber, setQuestionNumber] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [gender, setGender] = useState("");
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [activity, setActivity] = useState("");

    const totalQuestions = contents.length - 1;
    const CurrentQuestion = contents[questionNumber];

    const { data, setData, post, processing, errors } = useForm({
        gender: "",
        weight: "",
        height: "",
        activity: "",
    });

    const moveToNextQuestion = () => {
        console.log("pindah halaman berikutnya");
        console.log("nomor : ", questionNumber);

        if (questionNumber < totalQuestions) {
            setQuestionNumber(questionNumber + 1);
        }
        if (questionNumber == 3) {
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
        setData("gender", gender);
        setData("activity", activity);
        setData("weight", weight);
        setData("height", height);

        // debugging
        console.log(height);
        console.log(gender);
        console.log(activity);
        console.log(weight);

        post("/register");
    };

    return (
        <div>
            <div className="h-screen flex flex-col justify-center items-center z-0">
                <CurrentQuestion
                    setGender={setGender}
                    setWeight={setWeight}
                    setHeight={setHeight}
                    setActivity={setActivity}
                />
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
                    <div className="max-w-md w-full flex flex-col gap-[0.5rem] items-center justify-center rounded-xl p-[1.5rem] fill-secondary">
                        <Title text={"Siap memulai perjalanan sehat Anda?"} />
                        <p className="text-center opacity-80 text-xl">
                            Anda masih bisa mengubah data-data ini kapan saja
                            melalui menu Profil.
                        </p>
                        <button className="fill-quartenary p-[1rem] rounded-lg font-semibold text-white mt-[1rem] hover:bg-quartenary/80" 
                        >
                            Hitung kebutuhan saya
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
