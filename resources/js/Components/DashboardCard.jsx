import { Card } from "./ui/card"; // Asumsi path shadcn card

export default function DashboardCard({
    icon: Icon,
    label,
    makananHariIni,
    kebutuhan,
    className,
    satuan = "g",
}) {
    const hariIni = makananHariIni ?? 0;
    const target = kebutuhan ?? 0;

    // Menghitung sisa nutrisi
    const sisa = target - hariIni;

    // Menghitung persentase (max 100% untuk visual bar, kecuali over)
    const rawPersentase = target > 0 ? (hariIni / target) * 100 : 0;
    const persentaseVisual = Math.min(rawPersentase, 100);

    // Logic Warna Status
    const isOver = sisa < 0;
    const barColor = isOver ? "bg-red-500" : "bg-[#7A9E7E]"; // Moss Green atau Merah
    const textColor = isOver ? "text-red-600" : "text-[#5C6F5C]";

    return (
        <Card
            className={`w-full bg-white border border-[#D5E1C3] shadow-sm hover:shadow-md transition-all duration-300 p-6 rounded-xl flex flex-col justify-between h-full ${className}`}
        >
            {/* Header Card */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-[#5C6F5C] uppercase tracking-wide">
                        {label}
                    </span>
                    <h3 className="text-3xl font-bold text-[#2C3A2C] mt-1">
                        {hariIni}
                        <span className="text-sm font-medium text-[#8D9F8D] ml-1">
                            / {target} {satuan}
                        </span>
                    </h3>
                </div>
                <div className="bg-[#F2F5E8] p-3 rounded-xl text-[#7A9E7E]">
                    <Icon size={22} />
                </div>
            </div>

            {/* Linear Progress Section */}
            <div className="w-full">
                <div className="flex justify-between text-xs mb-2 font-medium">
                    <span className={textColor}>
                        {isOver
                            ? `Melebihi ${Math.abs(sisa)} ${satuan}`
                            : `Tersisa ${sisa} ${satuan}`}
                    </span>
                    <span className="text-[#2C3A2C]">
                        {Math.round(rawPersentase)}%
                    </span>
                </div>

                {/* Progress Bar Container */}
                <div className="h-3 w-full bg-[#E9EFDB] rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${barColor}`}
                        style={{ width: `${persentaseVisual}%` }}
                    ></div>
                </div>
            </div>
        </Card>
    );
}
