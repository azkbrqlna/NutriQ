import { Link, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Brain,
    Camera,
    Utensils,
    Sparkles,
    History,
    ChevronRight,
    Wallet,
    ChefHat,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "@/Components/Reveal";
import { Floating } from "@/Components/Floating";

export default function Landing() {
    const carouselRef = useRef(null);
    const { user } = usePage().props.auth;

    // --- LOGIC AUTO SCROLL (MARQUEE) ---
    useEffect(() => {
        const slider = carouselRef.current;
        if (!slider) return;

        let animationFrameId;

        // Fungsi scroll halus
        const scroll = () => {
            if (slider.scrollLeft >= slider.scrollWidth / 2) {
                // Jika sudah sampai tengah (akhir set pertama), reset ke 0 tanpa animasi
                slider.scrollLeft = 0;
            } else {
                slider.scrollLeft += 1; // Kecepatan scroll (makin besar makin cepat)
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        // Mulai animasi
        animationFrameId = requestAnimationFrame(scroll);

        // Cleanup saat unmount
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    const { scrollYProgress } = useScroll();
    const yHero = useTransform(scrollYProgress, [0, 1], [0, -120]);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    const testimonials = [
        {
            name: "Clara",
            text: "Fitur scan makanannya akurat banget! Langsung tau kalori cuma dari foto.",
            img: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
            name: "Rafi",
            text: "Suka banget sama rekomendasi menunya. Bisa cari makanan sehat sesuai budget anak kos.",
            img: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
            name: "Andi",
            text: "Tracking nutrisi jadi gampang, gak perlu input manual satu-satu.",
            img: "https://randomuser.me/api/portraits/men/76.jpg",
        },
        {
            name: "Maya",
            text: "Desain aplikasinya clean dan modern. Sangat membantu diet saya.",
            img: "https://randomuser.me/api/portraits/women/65.jpg",
        },
    ];

    // Duplikasi data untuk efek infinite loop
    const loopedTestimonials = [...testimonials, ...testimonials];

    return (
        <div className="min-h-screen bg-[#F7F9F0] text-[#2C3A2C] relative font-sans overflow-x-hidden">
            {/* NAVBAR */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="fixed top-0 left-0 w-full z-50"
            >
                <div className="backdrop-blur-xl bg-white/60 border-b border-[#D5E1C3]/50 shadow-sm">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="bg-[#E9EFDB] p-2 rounded-lg text-[#4A624E]">
                                <Brain className="w-6 h-6" />
                            </div>
                            <span className="font-bold text-xl text-[#4A624E]">
                                Nutri<span className="text-[#2C3A2C]">Q</span>
                            </span>
                        </div>

                        <div className="hidden md:flex gap-8 font-medium text-[#5C6F5C]">
                            {[
                                { id: "features", label: "Fitur" },
                                { id: "how", label: "Cara Kerja" },
                                { id: "testimonials", label: "Testimoni" },
                            ].map((item, i) => (
                                <button
                                    key={i}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollTo(item.id);
                                    }}
                                    className="hover:text-[#4A624E] transition-colors"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        {user ? (
                            <Link href="/dashboard">
                                <Button className="bg-[#4A624E] hover:bg-[#3B4F3E] text-white shadow-lg shadow-[#4A624E]/20">
                                    Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link href="/login">
                                    <Button
                                        variant="outline"
                                        className="border-[#4A624E] text-[#4A624E] hover:bg-[#E9EFDB]"
                                    >
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button className="bg-[#4A624E] hover:bg-[#3B4F3E] text-white shadow-lg shadow-[#4A624E]/20">
                                        Daftar
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </motion.nav>

            {/* HERO SECTION */}
            <motion.section
                style={{ y: yHero }}
                className="pt-40 pb-28 px-6 bg-gradient-to-b from-[#F7F9F0] to-[#E9EFDB]/30"
            >
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-14">
                    <div className="flex-1 space-y-6 text-center md:text-left">
                        <Reveal delay={0.05}>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#D5E1C3] text-sm font-semibold text-[#4A624E] shadow-sm mx-auto md:mx-0">
                                <Sparkles size={16} />
                                <span>AI Nutrition Assistant</span>
                            </div>
                        </Reveal>

                        <Reveal delay={0.15}>
                            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-[#2C3A2C]">
                                Pantau Nutrisi & <br />
                                <span className="text-[#4A624E]">
                                    Temukan Menu Sehat
                                </span>
                            </h1>
                        </Reveal>

                        <Reveal delay={0.25}>
                            <p className="text-[#5C6F5C] text-lg md:text-xl max-w-lg mx-auto md:mx-0 leading-relaxed">
                                Cukup scan foto makanan untuk hitung nutrisi,
                                atau cari rekomendasi menu lezat yang pas dengan
                                budget Anda.
                            </p>
                        </Reveal>

                        <Reveal delay={0.35}>
                            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                                <Link href="/register">
                                    <Button className="bg-[#4A624E] hover:bg-[#3B4F3E] text-white px-8 py-6 text-lg rounded-xl shadow-xl shadow-[#4A624E]/20 transition-transform hover:-translate-y-1">
                                        Mulai Sekarang
                                        <ChevronRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </Link>
                                <button
                                    onClick={() => scrollTo("how")}
                                    className="px-8 py-4 text-[#4A624E] font-semibold hover:bg-[#E9EFDB] rounded-xl transition-colors"
                                >
                                    Pelajari Cara Kerja
                                </button>
                            </div>
                        </Reveal>
                    </div>

                    <div className="flex-1 flex justify-center w-full max-w-md md:max-w-full">
                        <Floating intensity={20} speed={7}>
                            <div className="relative">
                                {/* Main Image Card */}
                                <div className="bg-white border border-[#D5E1C3] shadow-2xl rounded-3xl p-3 transform rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
                                    <img
                                        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=500"
                                        className="rounded-2xl w-full h-[300px] object-cover"
                                        alt="Healthy Food"
                                    />
                                    <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-bold text-[#2C3A2C]">
                                                    Gado-gado
                                                </p>
                                                <p className="text-xs text-[#5C6F5C]">
                                                    350 Kkal • Rp 15.000
                                                </p>
                                            </div>
                                            <div className="bg-[#4A624E] text-white p-2 rounded-lg">
                                                <Utensils size={18} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Element (Scan Result) */}
                                <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-[#D5E1C3] animate-bounce-slow">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-green-100 p-2 rounded-full text-green-600">
                                            <Camera size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-[#5C6F5C] font-semibold uppercase">
                                                Status Scan
                                            </p>
                                            <p className="text-sm font-bold text-[#2C3A2C]">
                                                Berhasil Terdeteksi!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Floating>
                    </div>
                </div>
            </motion.section>

            {/* FEATURES SECTION */}
            <section
                id="features"
                className="py-24 bg-white relative z-10 rounded-t-[3rem] -mt-10 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]"
            >
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <Reveal>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#2C3A2C] mb-4">
                            Fitur Canggih NutriQ
                        </h2>
                        <p className="text-[#5C6F5C] text-lg max-w-2xl mx-auto">
                            Teknologi AI yang membantu Anda menjaga pola makan
                            tanpa ribet.
                        </p>
                    </Reveal>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                        {[
                            {
                                Icon: Camera,
                                title: "Scan Makanan",
                                desc: "Foto makanan Anda, AI kami akan langsung menghitung kalori dan nutrisinya.",
                            },
                            {
                                Icon: ChefHat,
                                title: "Rekomendasi Menu",
                                desc: "Bingung mau makan apa? Dapatkan saran menu sehat sesuai budget harianmu.",
                            },
                            {
                                Icon: Wallet,
                                title: "Budget Friendly",
                                desc: "Atur pengeluaran makan dengan rekomendasi harga yang transparan.",
                            },
                            {
                                Icon: History,
                                title: "Jurnal Nutrisi",
                                desc: "Pantau riwayat makan harian untuk mencapai target kesehatan Anda.",
                            },
                        ].map((f, i) => (
                            <Reveal key={i} delay={0.1 * i}>
                                <FeatureCard
                                    icon={
                                        <f.Icon className="w-10 h-10 text-[#4A624E]" />
                                    }
                                    title={f.title}
                                    desc={f.desc}
                                />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS SECTION */}
            <section id="how" className="py-24 bg-[#E9EFDB]/30">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <Reveal>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#2C3A2C] mb-4">
                                Cara Kerja Simpel
                            </h2>
                            <p className="text-[#5C6F5C] text-lg">
                                Mulai hidup sehat dalam 3 langkah mudah.
                            </p>
                        </Reveal>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                number: "01",
                                title: "Personalisasi",
                                desc: "Isi data diri untuk menghitung kebutuhan kalori harianmu.",
                            },
                            {
                                number: "02",
                                title: "Scan / Cari Menu",
                                desc: "Upload foto makanan atau cari rekomendasi menu sesuai budget.",
                            },
                            {
                                number: "03",
                                title: "Pantau Progress",
                                desc: "Lihat grafik nutrisi harian di dashboard yang interaktif.",
                            },
                        ].map((s, i) => (
                            <Reveal key={i} delay={0.1 * i}>
                                <StepCard {...s} />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS SECTION (AUTO SCROLL) */}
            <section
                id="testimonials"
                className="py-24 bg-[#4A624E] text-white overflow-hidden"
            >
                <div className="max-w-7xl mx-auto px-6">
                    <Reveal>
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                            Apa Kata Pengguna?
                        </h2>
                    </Reveal>

                    {/* MARQUEE CONTAINER */}
                    <div
                        ref={carouselRef}
                        className="flex overflow-x-hidden gap-8 pb-4 w-full"
                    >
                        {/* Render array ganda agar loop mulus */}
                        {loopedTestimonials.map((t, i) => (
                            <div key={i} className="shrink-0">
                                <TestimonialCard {...t} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-28 bg-[#2C3A2C] text-white text-center relative overflow-hidden">
                {/* Decoration Circles */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-[#4A624E] rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#4A624E] rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

                <div className="relative z-10 max-w-4xl mx-auto px-6">
                    <Reveal>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Siap Mengubah Pola Makan?
                        </h2>
                        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                            Bergabunglah sekarang dan nikmati fitur tracking
                            nutrisi serta rekomendasi menu pintar secara gratis.
                        </p>
                        <Link href="/register">
                            <Button className="bg-white text-[#2C3A2C] hover:bg-[#E9EFDB] font-bold px-10 py-6 text-lg rounded-xl shadow-lg transition-transform hover:scale-105">
                                Daftar Gratis Sekarang
                            </Button>
                        </Link>
                    </Reveal>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-[#1A231A] py-12 text-white/80 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                            <Brain className="w-5 h-5 text-[#4A624E]" />
                            <span className="font-bold text-xl text-white">
                                NutriQ
                            </span>
                        </div>
                        <p className="text-sm">
                            © 2025 NutriQ. Your Personal AI Nutritionist.
                        </p>
                    </div>

                    <div className="flex gap-8 text-sm font-medium">
                        {[
                            { id: "features", label: "Fitur" },
                            { id: "how", label: "Cara Kerja" },
                            { id: "testimonials", label: "Testimoni" },
                        ].map((item, i) => (
                            <button
                                key={i}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollTo(item.id);
                                }}
                                className="hover:text-white transition-colors"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}

/* --- SUB COMPONENTS --- */

function FeatureCard({ icon, title, desc }) {
    return (
        <div className="p-8 rounded-3xl bg-[#F9FAEF] border border-[#D5E1C3] hover:shadow-xl hover:border-[#4A624E]/50 transition-all duration-300 text-left group h-full">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="font-bold text-xl text-[#2C3A2C] mb-3 group-hover:text-[#4A624E] transition-colors">
                {title}
            </h3>
            <p className="text-[#5C6F5C] leading-relaxed">{desc}</p>
        </div>
    );
}

function StepCard({ number, title, desc }) {
    return (
        <div className="p-8 rounded-3xl bg-white shadow-sm border border-[#D5E1C3] relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="text-9xl font-bold text-[#4A624E]">
                    {number}
                </span>
            </div>
            <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#4A624E] text-white flex items-center justify-center font-bold text-lg mb-6 shadow-lg shadow-[#4A624E]/20">
                    {number}
                </div>
                <h3 className="font-bold text-xl text-[#2C3A2C] mb-3">
                    {title}
                </h3>
                <p className="text-[#5C6F5C] leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}

function TestimonialCard({ name, text, img }) {
    return (
        <div className="w-[350px] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 flex flex-col justify-between hover:bg-white/20 transition-colors duration-300 h-full">
            <div className="mb-6">
                <div className="flex gap-1 text-yellow-400 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                        <Sparkles key={s} size={16} fill="currentColor" />
                    ))}
                </div>
                <p className="text-lg italic leading-relaxed text-white/90 font-medium">
                    "{text}"
                </p>
            </div>
            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/10">
                <img
                    src={img}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
                    alt={name}
                />
                <div>
                    <p className="font-bold text-white">{name}</p>
                    <p className="text-xs text-white/60 uppercase tracking-wider">
                        Pengguna NutriQ
                    </p>
                </div>
            </div>
        </div>
    );
}
