import { useForm } from "react-hook-form"
import ModalLogin from "./ModalLogin";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Signup = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const { createUser } = useAuth()
    const [error, setError] = useState("")

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/"

    const onSubmit = (data) => {
        const email = data.email
        const password = data.password
        createUser(email, password)
            .then((result) => {
                const user = result.user;
                navigate(from, { replace: true })
                document.getElementById('my_modal_3').close()
            })
            .catch((err) => {
                const errorMesage = err.message;
                setError(errorMesage)
            })

    }

    return (
        <div className="flex max-w-md h-screen w-full bg-white mx-auto items-center justify-center ">
            <div className="card border-none w-full max-w-md shadow-lg bg-base-100">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">ایمیل</span>
                        </label>
                        <input  {...register("email")} type="email" placeholder="ایمیل" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">رمز عبور</span>
                        </label>
                        <input  {...register("password")} type="password" placeholder="رمز عبور" className="input input-bordered" />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-orange text-white">ثبت نام</button>
                    </div>
                </form>
                <p className="py-4 text-center">
                    حساب کاربری دارید ؟
                    <button onClick={() => document.getElementById('my_modal_3').showModal()}
                        className="link" >وارد شوید </button>
                </p>
                <ModalLogin signupClick={true} />
            </div>
        </div>
    );
};

export default Signup;