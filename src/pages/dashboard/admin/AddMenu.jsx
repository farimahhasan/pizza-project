import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form"
import Swal from "sweetalert2";

const AddMenu = () => {

    const [loadingBtn, setLoadingBtn] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const imgKey = import.meta.env.VITE_UPLOAD_IMG_API_KEY
    const imgApi = `https://api.imgbb.com/1/upload?expiration=600&key=${imgKey}`

    const onSubmit = async (data) => {
        setLoadingBtn(true)
        const imageFile = { image: data.image[0] }
        const res = await axios.post(imgApi, imageFile , {
            
                headers:{
                    "content-type":"multipart/form-data"
                }
            
        })
        
        if(res.data.success){
            const menuItem = {
                name: data.name,
                category: data.category,
                price: data.price,
                recipe: data.recipe,
                image:res.data.data.display_url
            }
            console.log(menuItem)
            axios.post('http://localhost:6001/menu', menuItem).then((data) => {
                setLoadingBtn(true)
                reset()
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "اضافه شد",
                    showConfirmButton: false,
                    timer: 1000
                });
            })
        }

    }

    return (
        <div className='w-full md:w-[870px] px-4 mx-auto'>
            <h2 className='text-2xl my-4 font-semibold'>
                ایجاد منو جدید
            </h2>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-control w-full my-6'>
                        <label className="label">
                            <span className="label-text">اسم</span>
                        </label>
                        <input {...register("name", { required: true })} type="text" placeholder="اسم" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className='flex md:flex-row flex-col items-center gap-4'>
                        <div className='form-control w-full my-6'>
                            <label className='label'>
                                <span className="label-text">دسته بندی </span>
                            </label>
                            <select defaultValue="انتخاب دسته بندی" {...register("category", { required: true })} className="select select-bordered w-full max-w-xs">
                                <option selected disabled value="">دسته بندی</option>
                                <option value="popular">پرطرفدار</option>
                                <option value="rogen">روگن</option>
                                <option value="italian">ایتالیایی</option>
                                <option value="appetizer">سالاد و پیش غذا</option>
                                <option value="drinks">نوشیدنی</option>
                            </select>
                        </div>
                        <div className='form-control w-full my-6'>
                            <label className="label">
                                <span className="label-text">قیمت</span>
                            </label>
                            <input  {...register("price", { required: true })} type="number" placeholder="قیمت" className="input input-bordered w-full max-w-xs" />
                        </div>
                    </div>
                    <div className='form-control my-6 w-full'>
                        <label className="label">
                            <span className="label-text">مواد تشکیل دهنده</span>
                        </label>
                        <textarea  {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" placeholder="مواد تشکیل دهنده"></textarea>
                    </div>
                    <div className='form-control my-6'>
                        <label className="label">
                            <span className="label-text">آپلود عکس</span>
                        </label>
                        <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered w-full max-w-xs" />
                    </div>
                    {
                        loadingBtn ? <loadingBtn /> :
                        <button className='btn text-white bg-orange px-6 my-6'>اضافه کردن</button>
                    }
                </form>
            </div>
        </div>
    );
};

export default AddMenu;