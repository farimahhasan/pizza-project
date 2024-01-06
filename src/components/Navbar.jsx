import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useEffect, useState } from "react";
import { IoPersonAddOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import ModalLogin from "./ModalLogin";
import { useAuth } from "../hooks/useAuth";
import Profile from "./Profile";
import useCart from "../hooks/useCart";


const Navbar = () => {

    const { user } = useAuth()

    const [sticky, setSticky] = useState(false)

    useEffect(() => {

        refetch()

        const scrollHandler = () => {
            const offset = window.scrollY;
            offset > 0 ? setSticky(true) : setSticky(false)
        }

        window.addEventListener("scroll", scrollHandler);

        return () => {
            window.addEventListener("scroll", scrollHandler)
        }

    }, [])

    const { data, refetch } = useCart()

    return (
        <header className="max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out z-[1000] ">
            <nav className={`navbar xl:px-24 ${sticky ? "shadow-md bg-base-100  transition-all duration-300 ease-in-out" : null}`}>
                <div className="navbar-start">
                    <div className="dropdown ">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link to="/">خانه</Link></li>
                            {/* <li>
                                <a>سرویس ها</a>
                                <ul className="p-2">
                                    <li><a>سفارش آنلاین</a></li>
                                    <li><a>پیگیری سفارش</a></li>
                                </ul>
                            </li> */}
                            <li>
                                <Link to="/menu">منو</Link>
                            </li>
                        </ul>
                    </div>
                    {
                        user ?
                            <Profile user={user} />
                            : <button
                                onClick={() => document.getElementById('my_modal_3').showModal()}
                                className="btn btn-ghost btn-circle mr-2">
                                <IoPersonAddOutline size={20} />
                            </button>
                    }

                    <ModalLogin />
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <Link to="/cart">
                            <div className="indicator flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span className="badge badge-sm indicator-item">
                                    {data?.data?.length || 0}
                                </span>
                            </div>
                        </Link>
                    </div>
                    <button className="btn btn-ghost btn-circle mr-2">
                        <FaHeart size={19}/>
                    </button>

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 " >
                        <li><Link to="/">خانه</Link></li>
                        {/* <li>
                            <details>
                                <summary>سرویس ها</summary>
                                <ul className="p-2">
                                    <li><a>سفارش آنلاین</a></li>
                                    <li><a>پیگیری سفارش</a></li>
                                </ul>
                            </details>
                        </li> */}
                        <li>
                            <Link to="/menu">منو</Link>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end text-end">
                    <Link to="./">
                        <img src={logo} alt="لوگو پیتزا" className="md:w-1/6 w-1/4 mr-auto " />
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;