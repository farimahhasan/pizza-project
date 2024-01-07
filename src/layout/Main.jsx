import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css"
import Footer from "../components/Footer";
import { useDarkMode } from "../hooks/useDarkMode";

const Main = () => {

    const [darkMode]=useDarkMode()

    return (
        <div className={darkMode==="dark" ? "dark" : " bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%"}>

            <Navbar />
            <div className="min-h-screen">
                <Outlet />
            </div>
            <Footer />

        </div>
    );
};

export default Main;