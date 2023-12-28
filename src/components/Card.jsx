import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa"

const Card = ({ data: { _id, name, price, recipe, image } }) => {

    const [isHeartFillted, setIsHeartFillted] = useState(false)

    const clickHandler = () => {
        setIsHeartFillted(!isHeartFillted)
    }

    return (
        <div className="card card-compact md:w-full w-2/3 my-4  mx-auto shadow-lg relative">
            <div className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-orange
             ${isHeartFillted ? "text-rose-500" : "text-white"}
            `}
                onClick={clickHandler}
            >
                <FaHeart className="h-5 w-5 cursor-pointer" />
            </div>
            <figure>
                <Link to={`/menu/${_id}`}>
                    <img className="hover:scale-105 transition-all duration-200 md:h-72" src={image} alt={name} />
                </Link>
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    <Link to={`/menu/${_id}`}>
                        {name}
                    </Link>
                </h2>
                <div className="card-actions justify-between items-center mt-2">
                    <h5 className="font-semibold">{price.toLocaleString()} تومان</h5>
                    <button className="btn bg-orange text-white">افزودن به سبد خرید</button>
                </div>
            </div>
        </div>

    );
};

export default Card;