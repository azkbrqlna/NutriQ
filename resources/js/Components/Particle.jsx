import { motion } from "framer-motion";

export default function Particles() {
    const particles = Array.from({ length: 35 });

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {particles.map((_, i) => {
                const size = Math.random() * 6 + 4;
                const left = Math.random() * 100;
                const delay = Math.random() * 6;
                const duration = Math.random() * 8 + 8;

                return (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-green-300/50 dark:bg-green-400/20 blur-md"
                        style={{ width: size, height: size, left: `${left}%` }}
                        animate={{
                            y: ["120%", "-20%"],
                            opacity: [0.2, 0.6, 0.2],
                        }}
                        transition={{
                            duration,
                            repeat: Infinity,
                            delay,
                            ease: "easeInOut",
                        }}
                    />
                );
            })}
        </div>
    );
}
