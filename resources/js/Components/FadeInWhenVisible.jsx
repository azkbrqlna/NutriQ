import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function FadeInWhenVisible({ children, delay = 0 }) {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.25,   // 25% elemen masuk → animasi mulai
        triggerOnce: false // ini bikin animasinya ngulang terus
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden"); // reset animasi ketika keluar viewport
        }
    }, [controls, inView]);

    const variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1], // smooth cubic bezier
                delay: delay,
            }
        }
    };

    return (
        <motion.div ref={ref} initial="hidden" animate={controls} variants={variants}>
            {children}
        </motion.div>
    );
}
