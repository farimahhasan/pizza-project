import { createBrowserRouter } from "react-router-dom"
import Main from "../layout/Main";
import Home from "../pages/Home";
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup";
import PrivateRouter from "../components/privateRouter/PrivateRouter";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/shop/CartPage";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageMenuItem from "../pages/dashboard/admin/ManageMenuItem";
import EditMenuItem from "../pages/dashboard/admin/EditMenuItem";
import OrderPage from "../pages/shop/orderPage";
import PageNotFound from "../components/PageNotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/menu",
                element: <PrivateRouter><Menu /></PrivateRouter>
            },
            {
                path: "/update-profile",
                element: <PrivateRouter><UpdateProfile /></PrivateRouter>
            },
            {
                path: "/cart",
                element: <PrivateRouter><CartPage /></PrivateRouter>
            },
            {
                path:"/order",
                element:<PrivateRouter> <OrderPage /> </PrivateRouter>
            },
            {
                path:"*",
                element:<PageNotFound />
            }
        ]
    },
    {
        path: "/signup",
        element: <Signup />
    },

    {
        path: "dashboard",
        element: <PrivateRouter><DashboardLayout /></PrivateRouter>,
        children: [
            {
                path: "",
                element: <Dashboard />
            },
            {
                path: "users",
                element: <Users />
            },
            {
                path: "add-menu",
                element: <AddMenu />
            },
            {
                path: "manage-menu-items",
                element: <ManageMenuItem />
            },
            {
                path: "update-menu/:id",
                element: <EditMenuItem />,
            }
        ]
    },
  

])

export default router;