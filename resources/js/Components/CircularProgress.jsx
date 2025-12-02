export default function CircularProgress({
    size = 90,
    stroke = 12,
    value = 50,
    textSize = "text-xl",
    className = "", // ← tambahin ini
}) {
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
        <div
            className={`relative flex items-center justify-center ${className}`}
        >
            <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
                {/* Background circle */}
                <circle
                    stroke="#A1BC98"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />

                {/* Progress circle */}
                <circle
                    stroke="#778873"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{ transition: "stroke-dashoffset 0.3s ease" }}
                />
            </svg>

            <span className={`absolute ${textSize} font-semibold`}>
                {value}%
            </span>
        </div>
    );
}
