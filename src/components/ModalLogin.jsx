import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { useAuth } from "../contexts/AuthProvider";
import { useState } from "react";

const ModalLogin = ({ signupClick }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const {user, signUpWithGmail, login } = useAuth()
    const [error, setError] = useState("")

    const location=useLocation();
    const navigate=useNavigate();
    const from=location.state?.from?.pathname || "/"

    const onSubmit = (data) => {
        const email = data.email
        const password = data.password
        login(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user)
                alert("login")
                navigate(from,{replace:true})
                document.getElementById('my_modal_3').close()
            })
            .catch((err) => {
                const errorMesage = err.message;
                setError("ایمیل یا رمز عبور به درستی وارد نشده است")
            })

    }



    const googleLoginHandler = () => {
        signUpWithGmail()
            .then((result) => {
                const user = result.user;
                alert("login")
                navigate(from,{replace:true})
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
                    <button htmlFor="my_modal_3"
                        onClick={() => document.getElementById('my_modal_3').close()}
                        className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5">✕</button>
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
                     
                    {error && <p className="text-red text-l my-4">{error}</p>}

                    <div className="form-control mt-6">
                        <button className="btn bg-orange text-white">ورود</button>
                    </div>
                </form>
                <p className="py-4 text-center">
                    حساب کاربری ندارید ؟
                    <Link to='/signup' className="link" onClick={signupClick ? () => { document.getElementById('my_modal_3').close() } : null} > ثبت نام کنید</Link>
                </p>
                <div className="flex justify-center py-4">
                    <button onClick={googleLoginHandler} className="btn mx-2 btn-circle hover:bg-orange hover:text-white">
                        <FaGoogle size={18} />
                    </button>
                    <button className="btn mx-2 btn-circle hover:bg-orange hover:text-white">
                        <FaGithub size={20} />
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default ModalLogin;