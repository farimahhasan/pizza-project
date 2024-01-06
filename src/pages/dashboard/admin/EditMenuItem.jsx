import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditMenuItem = () => {
    
    const navigate=useNavigate()

     const [menuItemState,setMenuItem]=useState([])

     const {id}=useParams()

     useEffect(()=>{
        const getMenuItem=async ()=>{
            const res=await axios.get(`http://localhost:6001/menu/${id}`)
            setMenuItem(res.data)
            console.log(res.data)
        }
        getMenuItem()
     },[])

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const imgKey = import.meta.env.VITE_UPLOAD_IMG_API_KEY
    const imgApi = `https://api.imgbb.com/1/upload?expiration=600&key=${imgKey}`

    const onSubmit = async (data) => {
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

            axios.patch(`http://localhost:6001/menu/${menuItemState._id}`, menuItem).then((data) => {
                
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "ویرایش شد",
                    showConfirmButton: false,
                    timer: 1000
                });

                navigate("/dashboard/manage-menu-items", { replace: true })

            })
        }

    }

    return (
        <div className='w-full md:w-[870px] px-4 mx-auto'>
        <h2 className='text-2xl my-4 font-semibold'>
            ویرایش
        </h2>
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form-control w-full my-6'>
                    <label className="label">
                        <span className="label-text">اسم</span>
                    </label>
                    <input {...register("name", { required: true })} defaultValue={menuItemState.name} type="text" placeholder="اسم" className="input input-bordered w-full max-w-xs" />
                </div>
                <div className='flex md:flex-row flex-col items-center gap-4'>
                    <div className='form-control w-full my-6'>
                        <label className='label'>
                            <span className="label-text">دسته بندی </span>
                        </label>
                        <select  {...register("category", { required: true })} defaultValue={menuItemState.category} className="select select-bordered w-full max-w-xs">
                            <option value={menuItemState.category}>
                                {
                                   (menuItemState.category==="popular" && "پرطرفدار") ||
                                   (menuItemState.category==="rogen" && "روگن") ||
                                   (menuItemState.category==="italian" && "ایتالیایی") ||
                                   (menuItemState.category==="appetizer" && "سالاد و پیش غذا") ||
                                   (menuItemState.category==="drinks" && "نوشیدنی")
                                }
                            </option>
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
                        <input  {...register("price", { required: true })} defaultValue={menuItemState.price} type="number" placeholder="قیمت" className="input input-bordered w-full max-w-xs" />
                    </div>
                </div>
                <div className='form-control my-6 w-full'>
                    <label className="label">
                        <span className="label-text">مواد تشکیل دهنده</span>
                    </label>
                    <textarea  {...register("recipe", { required: true })} defaultValue={menuItemState.recipe} className="textarea textarea-bordered h-24" placeholder="مواد تشکیل دهنده"></textarea>
                </div>
                <div className='form-control my-6'>
                    <label className="label">
                        <span className="label-text" >آپلود عکس</span>
                    </label>
                    <input {...register("image", { required: true })}  type="file" className="file-input file-input-bordered w-full max-w-xs" />
                </div>
                <button className='btn text-white bg-orange px-6 my-6'>ویرایش</button>
            </form>
        </div>
    </div>
    );
};

export default EditMenuItem;