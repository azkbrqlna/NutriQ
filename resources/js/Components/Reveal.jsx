import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function Reveal({
    children,
    delay = 0,
    y = 18,
    duration = 0.7,
}) {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: false,
        threshold: 0.18,
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [inView]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: {
                    opacity: 0,
                    y,
                },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        delay,
                        duration,
                        ease: [0.25, 0.8, 0.25, 1],
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
}
