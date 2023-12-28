import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css"

const Main = () => {
    return (
        <div className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
            <Navbar />
            <Outlet />
            <footer></footer>
        </div>
    );
};

export default Main;