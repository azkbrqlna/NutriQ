import { CircleAlert, CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";

export default function Alert({ msg, variant }) {
    const [shouldShow, setShouldShow] = useState(false);

    let variantClasses = ""
    let Icon = ""

    if (variant == "success") {
        variantClasses = "text-quartenary" 
        Icon = CircleCheck
    } else if (variant == "error") {
        variantClasses = "text-red-500"
        Icon = CircleAlert;
        
    }

    useEffect(() => {
        setShouldShow(true);
    }, []);
    return (
        <div
            className={`fixed top-10 flex items-center gap-[1rem] bg-white p-[0.7rem] rounded-xl
            shadow-md ${variantClasses} transition ease-in-out duration-200  ${
                shouldShow ? "opacity-100" : "opacity-0"
            }`}
        >
            <Icon size={25} />
            <p className="font-medium">{msg}</p>
        </div>
    );
}
