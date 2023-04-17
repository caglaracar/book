import {Link, NavLink, Outlet} from "react-router-dom";
import heartIcon from "../assets/favoriteOn.png";
import {motion, useScroll, useSpring} from "framer-motion";

export const MainLayout = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 30,
        damping: 30,
        restDelta: 0.01
    });
    const scaleY = useSpring(scrollYProgress, {
        // stiffness: 30,
        // damping: 30,
        // restDelta: 0.01,
        // to: {
        //     scaleY: 40 // burada yükseklik değerini ayarlayabilirsiniz
        // }
    });
    return (
        <>
            <header>
                <div className="logo-container">
                    <NavLink to={"/"} style={{ textAlign: "center" }}>
                        <span style={{ color: "#4285F4" }}>N</span>
                        <span style={{ color: "#DB4437" }}>E</span>
                        <span style={{ color: "#F4B400" }}>X</span>
                        <span style={{ color: "#0F9D58" }}>U</span>
                        <span style={{ color: "#DB4437" }}>S</span>
                    </NavLink>
                </div>
                <nav>
                    <div className="menu">
                        <NavLink to={"/"} activeclassname ="active">
                            Home
                        </NavLink>
                        <NavLink to={"/wishlist"} activeclassname ="active">
                            Wishlist
                        </NavLink>
                    </div>
                </nav>
            </header>

            <motion.div className="progress-bar">
                <motion.div className="progress-bar-progress" style={{ scaleX,scaleY }} />
            </motion.div>

            <main className="container">
                <Outlet />
            </main>
        </>
    );
};