import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import LoadingBtn from "./LoadingBtn";
import { ErrorMessage } from "@hookform/error-message";

const ModalLogin = () => {

    const [loadingBtn, setLoadingBtn] = useState(false)


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm(
        {criteriaMode : "all"}
    )

    const { user, signUpWithGmail, login } = useAuth()
    const [error, setError] = useState("")

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/"

    const onSubmit = (data) => {
        setLoadingBtn(true)

        const email = data.email
        const password = data.password
        login(email, password)
            .then((result) => {
                const user = result.user;
                document.getElementById('my_modal_3').close()

                const userInfo = {
                    name: data.name,
                    email: data.email
                }
                axios.post('http://localhost:6001/users', userInfo)
                    .then((res) => {
                        setLoadingBtn(false)
                       navigate(from, { replace: true })

                    })

            })
            .catch((err) => {
                const errorMesage = err.message;
                setError("ایمیل یا رمز عبور به درستی وارد نشده است")
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
        <dialog id="my_modal_3" className="modal ">
            <div className="modal-box dark:bg-gray-800 dark:text-white">
            <p className="dark:text-white text-sm pt-3 px-16 leading-6 text-center">
                (برای تست پنل ادمین با ایمیل admin@gmail.com و رمز عبور 12345678 وارد شوید)
            </p>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
                    <button htmlFor="my_modal_3"
                        onClick={() => document.getElementById('my_modal_3').close()}
                        className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5 dark:hover:bg-white dark:hover:text-gray-800">✕</button>
                    {error && <p className="text-red text-l my-4">{error}</p>}

                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text dark:text-white">ایمیل</span>
                        </label>
                        <input  {...register("email", { required: "ایمیل نباید خالی باشد" })} type="email" placeholder="ایمیل" className="input input-bordered dark:bg-gray-900 dark:text-white" />
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
                            <span className="label-text dark:text-white">رمز عبور</span>
                        </label>
                        <input  {...register("password", {
                            required: "رمز عبور نباید خالی باشد", minLength: {
                                value: 8,
                                message: "رمز عبور باید حتما بیشتر از 7 کاراکتر باشد",
                            },
                        })} type="password" placeholder="رمز عبور" className="input input-bordered dark:bg-gray-900 dark:text-white" />
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

                    <div className="form-control mt-6 text-center">
                        {
                            loadingBtn ? <LoadingBtn />
                                : <button className="btn bg-orange text-white  dark:text-gray-900">ورود</button>
                        }
                    </div>
                </form>
                <p className="py-4 text-center">
                    حساب کاربری ندارید ؟
                    <Link to='/signup' className="link" onClick={ () =>  document.getElementById('my_modal_3').close() } > ثبت نام کنید</Link>
                </p>
                <div className="flex justify-center py-4">
                    <button onClick={googleLoginHandler} className="btn mx-2 btn-circle hover:bg-orange hover:text-white">
                        <FaGoogle size={18} />
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default ModalLogin;