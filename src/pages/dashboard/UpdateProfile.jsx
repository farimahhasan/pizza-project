import { useForm } from "react-hook-form"
import { useAuth } from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
     
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/" 

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const {updateUserProfile}=useAuth()

    const onSubmit = (data) => {
        console.log(data)
        const name = data.name
        const photoURL = data.photoURL[0].name
        console.log(photoURL)
        updateUserProfile(name, photoURL)
            .then(() => {
               console.log("ok")
               navigate(from, { replace: true })
            })
            .catch((err) => {
               console.log(err)
            })

    }

    return (
        <div className="flex items-center h-screen justify-center">
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">نام و نام خانوادگی</span>
                        </label>
                        <input  {...register("name")} type="text" placeholder="نام و نام خانوادگی" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">آپلود عکس </span>
                        </label>
                        <input  {...register("photoURL")} placeholder="آپلود عکس" type="file" className="file-input w-full max-w-xs" />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-orange text-white">به روز رسانی</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;