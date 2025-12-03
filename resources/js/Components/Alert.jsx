import { CircleAlert } from "lucide-react";
import { useEffect, useState } from "react";

export default function Alert({ msg, variant }) {
    const [shouldShow, setShouldShow] = useState(false);

    let variantClasses = ""
    let icon = ""

    if (variant == "success") {
        variantClasses = "text-red-500" 
    } else if (variant == "error") {
        variantClasses = "text-quartenary"
    }

    useEffect(() => {
        setShouldShow(true);
    }, []);
    return (
        <div
            className={`fixed top-10 flex items-center gap-[1rem] bg-white p-[0.7rem] rounded-xl
            shadow-md  transition ease-in-out duration-200  ${
                shouldShow ? "opacity-100" : "opacity-0"
            }`}
        >
            <icon />
            <p>{msg}</p>
        </div>
    );
}
