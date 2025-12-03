import CircularProgress from "./CircularProgress";

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
    // Menghitung persentase (mencegah pembagian dengan nol)
    const persentase = target > 0 ? Math.round((hariIni / target) * 100) : 0;

    return (
        <div
            className={`w-full ${className} rounded-xl bg-white border border-gray-200 hover:border-tertiary transition p-[1.2rem] shadow-sm flex items-center justify-between`}
        >
            <div className="">
                <div className="flex items-center gap-[0.8rem]">
                    <div className="bg-tertiary rounded-xl p-[0.6rem]">
                        <Icon size={24} />
                    </div>
                    <span className="text-xl">{label}</span>
                </div>
                <h3 className="md:text-4xl text-3xl font-semibold mt-[1.2rem]">
                    {hariIni}
                    <span className="text-lg font-normal ml-[0.5rem]">
                        /{target} {satuan}
                    </span>
                </h3>
                <span
                    className={`block mt-[0.7rem] opacity-80 ${
                        sisa < 0 ? "text-red-600" : "text-gray-700"
                    }`}
                >
                    {sisa >= 0
                        ? `Tersisa ${sisa} ${satuan}`
                        : `Melebihi ${Math.abs(sisa)} ${satuan}`}
                </span>
            </div>
            <CircularProgress
                stroke={10}
                progress={persentase}
                textSize="text-2xl"
                className="w-[100px] h-[100px] md:w-[100px] md:h-[100px]"
            />
        </div>
    );
}
