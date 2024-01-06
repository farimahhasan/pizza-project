import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import useAdmin from "../../../hooks/useAdmin";
import Swal from "sweetalert2";
import useUsers from "../../../hooks/useUsers";

const Users = () => {

    const { data: isAdmin } = useAdmin()

    const token = localStorage.getItem('access-token')

    const { data, refetch } = useUsers()

    const handleMakeAdmin = (user) => {
        axios.patch(`http://localhost:6001/users/admin/${user._id}`, isAdmin, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                refetch()
            })
    }

    const handleDeleteUser = (user) => {

        Swal.fire({
            title: "این کاربر حذف شود ؟",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#FFBE00",
            confirmButtonText: "بله ، حذف شود",
            cancelButtonText: "خیر"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:6001/users/${user._id}`, {
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
                <h5>همه کاربر ها</h5>
                <h5 className="text-black"> تعداد کاربر ها : {data?.data?.length}</h5>
            </div>

            {/* table */}
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra md:w-[870px]">
                        {/* head */}
                        <thead className="bg-orange text-white rounded-lg">
                            <tr>
                                <th>#</th>
                                <th>نام و نام خانوادگی</th>
                                <th>ایمیل</th>
                                <th>نقش</th>
                                <th>حذف</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.data?.map((user, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {user.role === "admin" ? (
                                            "ادمین"
                                        ) : (
                                            <button
                                                onClick={() => handleMakeAdmin(user)}
                                                className="btn btn-xs btn-circle bg-indigo-500 text-white"
                                            >
                                                <FaUsers />
                                            </button>
                                        )}
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteUser(user)} className="btn btn-xs bg-red text-white">
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Users;