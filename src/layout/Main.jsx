import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <div>
            <nav></nav>
            <Outlet />
            <footer></footer>
        </div>
    );
};

export default Main;