import axios from "axios";
import useMenu from "../../../hooks/useMenu";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ManageMenuItem = () => {

    const { data, refetch } = useMenu()

    const token = localStorage.getItem('access-token')

    const handleDeleteMenu = (menu) => {
        Swal.fire({
            title: "این آیتم از منو حذف شود ؟",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#FFBE00",
            confirmButtonText: "بله ، حذف شود",
            cancelButtonText: "خیر"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:6001/menu/${menu._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(() => {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "حذف شد",
                            showConfirmButton: false,
                            timer: 1000
                        });
                        refetch()
                    })

            }
        })


    }

    return (
        <div className="section-container">
            <div className="flex items-center justify-between m-4">
                <h5>منو</h5>
                <h5 className="text-black"> تعداد آیتم ها :  {data?.data?.length}</h5>
            </div>

            {/* table */}
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra md:w-[870px]">
                        {/* head */}
                        <thead className="bg-orange text-white rounded-lg">
                            <tr>
                                <th>#</th>
                                <th>اسم</th>
                                <th>قیمت</th>
                                <th>عکس</th>
                                <th>ویرایش</th>
                                <th>حذف</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.data?.map((menu, index) => (
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{menu.name}</td>
                                        <td>{menu.price}</td>
                                        
                                        <td>
                                            <img className="w-[50px]" src={menu.image} alt={menu.name} />
                                        </td>
                                        <td>
                                            <Link to={`/dashboard/update-menu/${menu._id}`} className="btn btn-xs bg-orange text-white">
                                                <FaEdit />
                                            </Link>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDeleteMenu(menu)} className="btn btn-xs bg-red text-white">
                                                <FaTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageMenuItem;