import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa"
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

import Swal from 'sweetalert2'
import useCart from "../hooks/useCart";

import { LazyLoadImage } from "react-lazy-load-image-component";

const Card = ({ data }) => {

    const { _id, name, price, recipe, image } = data

    const [isHeartFillted, setIsHeartFillted] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    const { user } = useAuth()

    const { refetch } = useCart()

    const clickHandler = () => {
        setIsHeartFillted(!isHeartFillted)
    }

    const addToCartHandler = (data) => {

        if (user && user?.email) {
            const cartItem = { menuItemId: _id, quantity: 1, name: data.name, price: data.price, image: data.image, email: user.email }
            const token = localStorage.getItem('access-token')
            const postCart = async () => {
                try {
                    const response = await axios.post('http://localhost:6001/carts', cartItem, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    refetch()
                    if (response.data._id) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "به سبد خرید اضافه شد",
                            showConfirmButton: false,
                            timer: 1000
                        });
                    }


                } catch (err) {
                    if (err.response.data.message === "Product already exists in the cart!") {
                        Swal.fire({
                            icon: "error",
                            title: "این محصول در سبد خرید شما موجود است",
                            confirmButtonText: "باشه",
                            confirmButtonColor: "#FFBE00"
                        });
                    }
                }
            }
            postCart()
        }
        else {
            Swal.fire({
                title: "به حساب کاربری خود وارد شوید",
                confirmButtonText: "ورود",
                cancelButtonText: "الان نه",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#FFBE00",
                cancelButtonColor: "#d33",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/signup', { state: { from: location } })
                }
            });
        }
    }



    return (
        <div className="card card-compact md:w-full w-2/3 my-4  mx-auto shadow-lg relative dark:bg-gray-900 ">
            <div className={`rating gap-1 z-[2] absolute right-2 top-2 p-4 heartStar bg-orange
             ${isHeartFillted ? "text-rose-500" : "text-white"}
            `}
                onClick={clickHandler}
            >
                <FaHeart className="h-5 w-5 cursor-pointer" />
            </div>
            <figure>
                <LazyLoadImage src={image}
                    alt={name}
                    className="hover:scale-105 z-[1] transition-all duration-200 md:h-72"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {name}
                </h2>
                <p>{recipe}</p>
                <div className="card-actions justify-between items-center mt-2">
                    <h5 className="font-semibold">{price.toLocaleString()} تومان</h5>
                    <button className="btn bg-orange text-white dark:text-gray-800" onClick={() => addToCartHandler(data)}>افزودن به سبد خرید</button>
                </div>
            </div>
        </div>

    );
};

export default Card;