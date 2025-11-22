import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Brain,
    Camera,
    Utensils,
    Sparkles,
    History,
    ChevronRight,
    Moon,
    Sun,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "@/Components/Reveal";
import { Floating } from "@/Components/Floating";

export default function Landing() {
    const carouselRef = useRef(null);

    /* ======================================
     DARK MODE TOGGLE
    ====================================== */
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        if (saved === "dark") {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleDark = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem("theme", newMode ? "dark" : "light");
        if (newMode) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
    };

    /* ======================================
     AUTO SCROLL TESTIMONIALS 
    ====================================== */
    useEffect(() => {
        const slider = carouselRef.current;
        if (!slider) return;

        const scrollInterval = setInterval(() => {
            if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
                slider.scrollLeft = 0;
            } else {
                slider.scrollLeft += 1;
            }
        }, 20);

        return () => clearInterval(scrollInterval);
    }, []);

    /* ======================================
     PARALLAX
    ====================================== */
    const { scrollYProgress } = useScroll();
    const yHero = useTransform(scrollYProgress, [0, 1], [0, -120]);

    /* ======================================
     SMOOTH SCROLL NON-HASH
    ====================================== */
    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    /* ======================================
     PARTICLES
    ====================================== */
    const Particles = () => {
        const total = 40;

        return (
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                {Array.from({ length: total }).map((_, i) => {
                    const size = Math.random() * 12 + 8; // 8–20px BIAR KELIATAN
                    const startX = Math.random() * window.innerWidth;
                    const startY = Math.random() * window.innerHeight;

                    return (
                        <motion.div
                            key={i}
                            initial={{
                                x: startX,
                                y: startY,
                                opacity: 0.6, // LEBIH KENTAL
                            }}
                            animate={{
                                y: -150,
                                opacity: [0.6, 0.9, 0.4],
                            }}
                            transition={{
                                duration: Math.random() * 8 + 10,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="
                            absolute rounded-full 
                            bg-greenmedium dark:bg-white 
                            blur-[10px]    // GLOW
                            shadow-xl shadow-greenmedium/40 dark:shadow-white/30
                        "
                            style={{
                                width: size,
                                height: size,
                            }}
                        />
                    );
                })}
            </div>
        );
    };

    const testimonials = [
        {
            name: "Clara",
            text: "Super membantu buat diet! Tinggal foto bisa keluar hasilnya.",
            img: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
            name: "Rafi",
            text: "Akurasi AI-nya tinggi, cocok buat tracking makan harian.",
            img: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
            name: "Andi",
            text: "Bikin hidup sehat jadi lebih gampang.",
            img: "https://randomuser.me/api/portraits/men/76.jpg",
        },
        {
            name: "Maya",
            text: "Desainnya clean banget, hasil cepat, recommended!",
            img: "https://randomuser.me/api/portraits/women/65.jpg",
        },
    ];

    return (
        <div className="min-h-screen bg-cream dark:bg-[#0f1115] text-gray-800 dark:text-gray-200 relative">
            {/* ============ NAVBAR ============ */}

            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="fixed top-0 left-0 w-full z-50"
            >
                <div className="backdrop-blur-xl bg-white/40 dark:bg-black/30 border-b border-white/20 dark:border-white/10 shadow-md">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <Brain className="w-6 h-6 text-greenmedium" />
                            <span className="font-bold text-xl text-greenmedium">
                                Nutri<span className="text-greendeep">Q</span>
                            </span>
                        </div>

                        {/* Links */}
                        <div className="hidden md:flex gap-8 font-medium">
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
                                        history.replaceState(
                                            null,
                                            "",
                                            window.location.pathname
                                        );
                                    }}
                                    className="hover:text-greenmedium dark:hover:text-greenlight transition"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3">
                            {/* DARKMODE BUTTON */}
                            <button
                                onClick={toggleDark}
                                className="p-2 rounded-full bg-greenlight dark:bg-black/40 shadow hover:scale-105 transition"
                            >
                                {darkMode ? (
                                    <Sun className="w-5 h-5 text-yellow-300" />
                                ) : (
                                    <Moon className="w-5 h-5 text-gray-700" />
                                )}
                            </button>

                            <Link href="/login">
                                <Button
                                    variant="outline"
                                    className="border-greendeep dark:border-white text-greendeep dark:text-white"
                                >
                                    Login
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button className="bg-greenmedium hover:bg-greendeep text-white">
                                    Daftar
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* ============ HERO ============ */}
            <motion.section
                style={{ y: yHero }}
                className="pt-40 pb-28 px-6 bg-gradient-to-b from-cream to-greenlight/40 dark:from-[#0f1115] dark:to-[#1a1d21]"
            >
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-14">
                    {/* Hero Text */}
                    <div className="flex-1 space-y-3">
                        <Reveal delay={0.05}>
                            <div className="px-4 py-1 bg-white/70 dark:bg-white/10 rounded-full w-fit border border-greenmild text-sm text-greendeep dark:text-gray-200">
                                Website AI – Nutrisi Makanan
                            </div>
                        </Reveal>

                        <Reveal delay={0.15}>
                            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-greendeep dark:text-white">
                                Analisa Nutrisi Makanan
                                <span className="text-greenmedium block">
                                    Menggunakan Kecerdasan Buatan
                                </span>
                            </h1>
                        </Reveal>

                        <Reveal delay={0.25}>
                            <p className="text-gray-700 dark:text-gray-300 text-lg max-w-lg">
                                NutriQ mendeteksi makanan dari foto dan
                                menampilkan informasi nutrisi lengkap dalam
                                hitungan detik.
                            </p>
                        </Reveal>

                        <Reveal delay={0.35}>
                            <Link href="/app">
                                <Button className="mt-4 bg-greenmedium hover:bg-greendeep text-white px-7 py-5 text-lg rounded-xl shadow-md hover:shadow-xl">
                                    Coba Sekarang{" "}
                                    <ChevronRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                        </Reveal>
                    </div>

                    {/* Hero Image */}
                    <div className="flex-1 flex justify-center">
                        <Floating intensity={20} speed={7}>
                            <div className="bg-white dark:bg-black border dark:border-white/20 shadow-xl rounded-3xl p-5">
                                <img
                                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
                                    className="rounded-2xl w-[430px] object-cover shadow-lg"
                                />
                            </div>
                        </Floating>
                    </div>
                </div>
            </motion.section>

            {/* FEATURES */}
            <section
                id="features"
                className="py-28 bg-greenlight dark:bg-[#14171b] -mt-24"
            >
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <Reveal>
                        <h2 className="text-3xl font-bold text-greendeep dark:text-white">
                            Fitur Unggulan
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 mt-2 max-w-xl mx-auto">
                            Fitur modern untuk mempermudah hidup sehat.
                        </p>
                    </Reveal>

                    <div className="grid md:grid-cols-4 gap-10 mt-16">
                        {[
                            {
                                Icon: Camera,
                                title: "Deteksi via Foto",
                                desc: "Upload foto makanan, hasil langsung muncul.",
                            },
                            {
                                Icon: Utensils,
                                title: "Nutrisi Lengkap",
                                desc: "Kalori, protein, lemak, karbo, vitamin.",
                            },
                            {
                                Icon: Sparkles,
                                title: "Akurasi Tinggi",
                                desc: "AI modern dengan ketepatan tinggi.",
                            },
                            {
                                Icon: History,
                                title: "Riwayat Makanan",
                                desc: "Lihat daftar makanan yang pernah dianalisa.",
                            },
                        ].map((f, i) => (
                            <Reveal key={i} delay={0.1 * i}>
                                <FeatureCard
                                    icon={
                                        <f.Icon className="w-12 h-12 text-greenmedium mx-auto mb-4" />
                                    }
                                    title={f.title}
                                    desc={f.desc}
                                />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW */}
            <section
                id="how"
                className="py-28 bg-greenmild/40 dark:bg-[#101215]"
            >
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <Reveal>
                        <h2 className="text-3xl font-bold text-greendeep dark:text-white">
                            Cara Kerja
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 mt-2 max-w-xl mx-auto">
                            Tiga langkah sederhana untuk mengetahui nutrisi.
                        </p>
                    </Reveal>

                    <div className="grid md:grid-cols-3 gap-10 mt-14">
                        {[
                            {
                                number: "01",
                                title: "Upload Foto",
                                desc: "Pilih gambar makanan dari galeri.",
                            },
                            {
                                number: "02",
                                title: "AI Menganalisa",
                                desc: "Sistem mengenali makanan.",
                            },
                            {
                                number: "03",
                                title: "Lihat Hasil",
                                desc: "Nutrisi ditampilkan otomatis.",
                            },
                        ].map((s, i) => (
                            <Reveal key={i} delay={0.1 * i}>
                                <StepCard {...s} />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section
                id="testimonials"
                className="py-28 bg-greenmedium dark:bg-[#0f3c32] text-white"
            >
                <Reveal>
                    <h2 className="text-3xl font-bold text-center">
                        Apa Kata Pengguna?
                    </h2>
                </Reveal>

                <div
                    ref={carouselRef}
                    className="
                        mt-14
                        flex
                        overflow-x-auto
                        overflow-y-hidden
                        gap-6 
                        px-6 
                        scrollbar-none 
                        scroll-smooth
                    "
                >
                    {testimonials.map((t, i) => (
                        <Reveal key={i} delay={0.1 * i}>
                            <TestimonialCard {...t} />
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-28 bg-greendeep dark:bg-black text-white text-center">
                <Reveal>
                    <h2 className="text-3xl font-bold">
                        Mulai Hidup Sehat Hari Ini
                    </h2>
                    <p className="mt-2 mb-6 text-white/90">
                        Gratis digunakan tanpa batas. Yuk coba!
                    </p>
                    <Link href="/app">
                        <Button className="bg-white text-greendeep hover:bg-gray-200 dark:bg-greenlight dark:text-black font-medium px-6 py-5 text-lg rounded-xl">
                            Mulai Sekarang
                        </Button>
                    </Link>
                </Reveal>
            </section>

            {/* FOOTER */}
            <footer className="bg-greenmedium dark:bg-[#0c2d26] py-10 text-white">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between">
                    <div>
                        <p className="font-bold text-lg">NutriQ</p>
                        <p className="text-white/80 text-sm">
                            © 2025 NutriQ. All rights reserved.
                        </p>
                    </div>

                    <div className="flex gap-6 text-sm mt-4 md:mt-0">
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
                                    history.replaceState(
                                        null,
                                        "",
                                        window.location.pathname
                                    );
                                }}
                                className="hover:text-white"
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

/* ================== COMPONENTS ================== */

function FeatureCard({ icon, title, desc }) {
    return (
        <div className="p-8 rounded-3xl bg-white dark:bg-black border dark:border-white/20 shadow-md hover:shadow-xl transition-all">
            {icon}
            <h3 className="font-semibold text-xl text-greendeep dark:text-white">
                {title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm">
                {desc}
            </p>
        </div>
    );
}

function StepCard({ number, title, desc }) {
    return (
        <div className="p-8 rounded-xl bg-white dark:bg-black shadow-sm border border-greenlight dark:border-white/10">
            <div className="text-4xl font-extrabold text-greenmedium">
                {number}
            </div>
            <p className="font-semibold mt-3 text-greendeep dark:text-white">
                {title}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm">
                {desc}
            </p>
        </div>
    );
}

function TestimonialCard({ name, text, img }) {
    return (
        <div
            className="
                min-w-[280px]
                bg-white/20 dark:bg-white/10
                backdrop-blur-xl
                border border-white/25
                rounded-xl
                p-6
                flex flex-col items-center
                shadow-[0_4px_12px_rgba(0,0,0,0.08)]
            "
        >
            <img
                src={img}
                className="w-14 h-14 rounded-full border border-white/50 mb-3 object-cover shadow-sm"
            />
            <p className="italic text-white/90 text-center leading-relaxed">
                "{text}"
            </p>
            <p className="mt-4 font-semibold text-white text-sm tracking-wide">
                {name}
            </p>
        </div>
    );
}
