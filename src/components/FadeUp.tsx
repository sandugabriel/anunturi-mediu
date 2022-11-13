import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

const FadeUp = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden")
    }
  }, [controls, inView]);


  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ delay: 0.7, type: "spring", stiffness: 70 }}
      variants={{
        visible: { opacity: 1, scale: 1, y: 0 },
        hidden: { opacity: 0, scale: 1, y: 20 },
      }}
    >
      {children}
    </motion.div>
  );
}

export default FadeUp;