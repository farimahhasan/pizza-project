import { useForm } from "react-hook-form"
import ModalLogin from "./ModalLogin";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";
import { ErrorMessage } from "@hookform/error-message";
import LoadingBtn from "./LoadingBtn";

const Signup = () => {

    const [loadingBtn, setLoadingBtn] = useState(false)


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm(
        {criteriaMode : "all"}
    )

    const { createUser, updateUserProfile, signUpWithGmail } = useAuth()
    const [error, setError] = useState("")

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/"

    const onSubmit = (data) => {
        setLoadingBtn(true)
        const email = data.email
        const password = data.password
        createUser(email, password)
            .then((result) => {
                const user = result.user;

                updateUserProfile(data.name, data.photoURL).then(() => {
                    const userInfo = {
                        name: data.name,
                        email: data.email
                    }
                    axios.post('http://localhost:6001/users', userInfo)
                        .then((res) => {
                            navigate(from, { replace: true })
                            //  document.getElementById('my_modal_3').close()

                        })
                })

            })
            .catch((err) => {
                const errorMesage = err.message;
                setError(errorMesage)
                setLoadingBtn(false)
            })

    }


    const googleLoginHandler = () => {
        signUpWithGmail()
            .then((result) => {
                const user = result.user;
                
                const userInfo = {
                    name: result?.user?.displayName,
                    email: result?.user?.email
                }
                axios.post('http://localhost:6001/users', userInfo)
                    .then((res) => {
                        navigate("/")
                        //  document.getElementById('my_modal_3').close()

                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="flex max-w-md  w-full bg-white mx-auto items-center justify-center ">
            <div className="card border-none w-full max-w-md shadow-lg bg-base-100 my-5">
                
            {error && <p className="text-red text-l my-4">{error}</p>}

                <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">نام و نام خانوادگی</span>
                        </label>
                        <input  {...register("name")} type="text" placeholder="نام و نام خانوادگی" className="input input-bordered" />
                    </div>

                                       <div className="form-control">
                        <label className="label">
                            <span className="label-text">ایمیل</span>
                        </label>
                        <input  {...register("email", { required: "ایمیل نباید خالی باشد" })} type="email" placeholder="ایمیل" className="input input-bordered" />
                    </div>

                    <ErrorMessage
                        errors={errors}
                        name="email"
                        render={({ message }) => <p className="my-4 text-red ">
                            {message}
                        </p>}
                    />

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">رمز عبور</span>
                        </label>
                        <input  {...register("password", {
                            required: "رمز عبور نباید خالی باشد", minLength: {
                                value: 8,
                                message: "رمز عبور باید حتما بیشتر از 7 کاراکتر باشد",
                            },
                        })} type="password" placeholder="رمز عبور" className="input input-bordered" />
                    </div>

                    <ErrorMessage
                        errors={errors}
                        name="password"
                        render={({ messages }) =>
                            messages &&
                            Object.entries(messages).map(([type, message]) => (
                                <p className="my-4 text-red " key={type}>{message}</p>
                            ))
                        }
                    />

                    <div className="form-control mt-6">
                        {
                            loadingBtn ? <LoadingBtn /> :
                            <button className="btn bg-orange text-white">ثبت نام</button>
                        }
                    </div>
                </form>
                <p className="py-4 text-center">
                    حساب کاربری دارید ؟
                    <button onClick={() => document.getElementById('my_modal_3').showModal()}
                        className="link" >وارد شوید </button>
                </p>
                <div className="text-center py-3">
                    <button onClick={googleLoginHandler} className="btn mx-2 btn-circle hover:bg-orange hover:text-white">
                        <FaGoogle size={18} />
                    </button>
                </div>
                <ModalLogin signupClick={true} />
            </div>
        </div>
    );
};

export default Signup;