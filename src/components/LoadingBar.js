import { motion } from "framer-motion";
const LoadingBar = () => {
    const barVariants = {
        initial: {
            x: 100
        },
        animate: {
            x: [-100, 100, -100],
            transition: {
                duration: 1,
                ease: "linear",
                repeat: Infinity
            }
        }
    };

    return (
        <motion.div style={{width: "100%", height: "2px", background: "#f1f1f1", borderRadius: "4px", overflow: "hidden", position: "relative"}}>
            <motion.div style={{width: "100%", height: "6px", background: 'linear-gradient(180deg, #365899 0%, #458699 35%, #215896 100%)', borderRadius: "4px", position: "absolute", top: 0, left: 0, bottom: 0}} variants={barVariants} initial="initial" animate="animate"/>
        </motion.div>
    );
};
export default LoadingBar;