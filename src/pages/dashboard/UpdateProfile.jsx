import { useForm } from "react-hook-form"
import { useAuth } from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import LoadingBtn from "../../components/LoadingBtn";
import { ErrorMessage } from "@hookform/error-message"

const UpdateProfile = () => {

    const [loadingBtn, setLoadingBtn] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/"

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const { updateUserProfile } = useAuth()

    const imgKey = import.meta.env.VITE_UPLOAD_IMG_API_KEY
    const imgApi = `https://api.imgbb.com/1/upload?expiration=600&key=${imgKey}`

    const onSubmit = async (data) => {
        setLoadingBtn(true)
        const imageFile = { image: data.photoURL[0] }
        const res = await axios.post(imgApi, imageFile, {

            headers: {
                "content-type": "multipart/form-data"
            }

        })
        if (res.data.success) {
            const name = data.name
            const photoURL = res.data.data.display_url
            updateUserProfile(name, photoURL)
                .then(() => {
                    navigate(from, { replace: true })
                    setLoadingBtn(false)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    }

    return (
        <div className="flex items-center h-screen justify-center dark:bg-gray-800 dark:text-white">
            <div className="card shrink-0 w-full max-w-sm shadow-l bg-base-100 dark:bg-gray-900 dark:text-white">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
                    <div className="form-control">
                        <label className="label">
                            <span className="dark:text-white">نام و نام خانوادگی</span>
                        </label>
                        <input  {...register("name")} type="text" placeholder="نام و نام خانوادگی" className="input input-bordered dark:bg-gray-800 dark:text-white" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text dark:text-white">آپلود عکس </span>
                        </label>
                        <input  {...register("photoURL", { required: "عکس نباید خالی باشد" })} placeholder="آپلود عکس" type="file" className="file-input w-full max-w-xs dark:bg-gray-800 dark:text-white" />
                    </div>
                    <ErrorMessage
                        errors={errors}
                        name="photoURL"
                        render={({ message }) => <p className="my-4  text-red text-lg">
                            {message}
                        </p>}
                    />

                    <div className="form-control mt-6 text-center">
                        {
                            loadingBtn ? <LoadingBtn />
                                :
                                <button className="btn bg-orange text-white dark:text-gray-800">به روز رسانی</button>

                        }
                    </div>
                </form>
            </div>
        </div>
    );
};




export default UpdateProfile;