export default function SelectBox({ icon: Icon, label, active, onClick }) {
    return (
        <div className="flex flex-col items-center">
            <button
                onClick={onClick}
                className={`
                    fill-secondary rounded-lg p-[2rem] gap-[1rem] hover:opacity-80
                    ${active ? "fill-tertiary" : "fill-secondary"}
                `}
            >
                <Icon size={54} />
            </button>

            <span className="block text-center text-2xl font-medium mt-[1rem]">
                {label}
            </span>
        </div>
    );
}
