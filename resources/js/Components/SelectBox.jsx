export default function SelectBox({ icon: Icon, label, active, onClick }) {
    return (
        <div className="flex flex-col items-center">
            <button
                onClick={onClick}
                className={`
                 rounded-full p-[2rem] gap-[1rem] hover:opacity-80 
                transition duration-200 ease-in-out
                ${active ? "text-white bg-quartenary" : "bg-white"}
    `}
            >
                <Icon size={65} />
            </button>

            <span
                className={`block text-center text-2xl  mt-[1rem] ${
                    active ? "text-quartenary  font-semibold" : "text-black"
                }`}
            >
                {label}
            </span>
        </div>
    );
}
