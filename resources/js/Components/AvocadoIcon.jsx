import Avocado from "@/assets/images/Avocado.svg";

export default function AvocadoIcon({ className = "w-6 h-6" }) {
    return (
        // Ganti properti fill="red" atau kode hex menjadi fill="currentColor"
        // agar mengikuti warna text dari parent element
        <svg
            viewBox="0 0 24 24" // Sesuaikan dengan viewBox asli SVG anda
            fill="currentColor" // PENTING: Ganti warna hardcode jadi ini
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* ... path svg anda di sini ... */}
            <path d={Avocado} />
            
        </svg>
    );
}
