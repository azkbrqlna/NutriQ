import { toast } from "sonner";

export default function useNotify() {
    const notifySuccess = (title, description = "") => {
        toast.success(title, {
            description,
            duration: 3000,
            style: {
                background: "#10b981", // emerald green
                color: "white",
            },
        });
    };

    const notifyError = (title, description = "") => {
        toast.error(title, {
            description,
            duration: 4000,
            style: {
                background: "#ef4444", // red error
                color: "white",
            },
        });
    };

    return { notifySuccess, notifyError };
}
