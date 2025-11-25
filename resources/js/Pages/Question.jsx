import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";

import AgeQuestion from "@/Components/AgeQuestion";
import WeightHeightQuestion from "@/Components/WeightHeightQuestion";
import ActivityQuestion from "@/Components/ActivityQuestion";
import GenderQuestion from "@/Components/GenderQuestion";

const contents = [
    AgeQuestion,
    GenderQuestion,
    WeightHeightQuestion,
    ActivityQuestion,
];

export default function Question() {
    const [questionNumber, setQuestionNumber] = useState(0);
    const [gender, setGender] = useState("");
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [activity, setActivity] = useState("");

    const totalQuestions = contents.length - 1;
    const CurrentQuestion = contents[questionNumber];

    const moveToNextQuestion = () => {
        console.log("pindah halaman berikutnya");
        console.log("nomor : ", questionNumber);

        if (questionNumber < totalQuestions) {
            setQuestionNumber(questionNumber + 1);
        }
    };

    const moveToPrevQuestion = () => {
        console.log("pindah halaman berikutnya");
        console.log("nomor : ", questionNumber);

        if (questionNumber == 0) {
            return;
        }

        setQuestionNumber(questionNumber - 1);
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <CurrentQuestion
                setGender={setGender}
                setWeight={setWeight}
                setHeight={setHeight}
                setActivity={setActivity}
            />
            <div className="max-w-6xl w-full fixed flex justify-between bottom-12 ">
                <button
                    className=" fill-tertiary p-[1rem] rounded-xl flex items-center gap-[0.2rem] hover:fill-tertiary/10"
                    onClick={moveToPrevQuestion}
                >
                    <ChevronLeft />
                    <span className="font-semibold hover:fill-tertiary/10">
                        Kembali
                    </span>
                </button>

                <button
                    className=" fill-tertiary p-[1rem] rounded-xl flex items-center gap-[0.2rem]"
                    onClick={moveToNextQuestion}
                >
                    <span className="font-semibold">Selanjutnya</span>
                    <ChevronRight />
                </button>
            </div>
        </div>
    );
}
