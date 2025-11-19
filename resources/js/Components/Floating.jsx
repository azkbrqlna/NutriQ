import { motion } from "framer-motion";

export function Floating({ children, intensity = 12, speed = 6 }) {
    return (
        <motion.div
            animate={{ y: [0, -intensity, 0] }}
            transition={{
                duration: speed,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            {children}
        </motion.div>
    );
}
