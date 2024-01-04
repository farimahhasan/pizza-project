import { createBrowserRouter } from "react-router-dom"
import Main from "../layout/Main";
import Home from "../pages/Home";
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup";
import PrivateRouter from "../components/privateRouter/PrivateRouter";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/shop/CartPage";

const router = createBrowserRouter([
    {
        path:"/",
        element:<Main/>,
        children :[
            {
                path:"/",
                element:<Home />
            },
            {
                path:"/menu",
                element:<PrivateRouter><Menu /></PrivateRouter>
            },
            {
                path:"/update-profile",
                element:<PrivateRouter><UpdateProfile /></PrivateRouter>
            },
            {
                path:"/cart",
                element:<PrivateRouter><CartPage /></PrivateRouter>
            }
        ]
    },
    {
        path:"/signup",
        element:<Signup />
    }
])

export default router;