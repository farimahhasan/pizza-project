import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

const CartPage = () => {

  const { data, refetch } = useCart()

  const { user } = useAuth()

  const [cartItem, setCartItem] = useState([])

  const deleteHandler = (item) => {

    Swal.fire({
      title: "محصول از سبد خرید حذف شود ؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#FFBE00",
      confirmButtonText: "بله ، حذف شود",
      cancelButtonText: "خیر"
    }).then((result) => {
      if (result.isConfirmed) {
        const res = axios.delete(`http://localhost:6001/carts/${item._id}`)
        if (res) {

          Swal.fire({
            position: "center",
            icon: "success",
            title: "حذف شد",
            showConfirmButton: false,
            timer: 1000
          });
          refetch()
        }
      }
    })
  }

  const increaseHandler = (item) => {
    axios.put(`http://localhost:6001/carts/${item._id}`,
      { quantity: item.quantity + 1 }).then((res) => {
        refetch()
      })
    // const updateCart=cartItem.map((item)=>{
    //   if(cartItem.id===item.id){
    //     return {
    //       ...cartItem,
    //       quantity:cartItem.quantity+1
    //     }
    //   }
    //   return cartItem
    //})
    //setCartItem(updateCart)
  }

  const decreaseHandler = (item) => {
    if (item.quantity > 1) {
      axios.put(`http://localhost:6001/carts/${item._id}`,
        { quantity: item.quantity - 1 }).then((res) => {
          refetch()
        })
      // const updateCart=cartItem.map((item)=>{
      //   if(cartItem.id===item.id){
      //     return {
      //       ...cartItem,
      //       quantity:cartItem.quantity+1
      //     }
      //   }
      //   return cartItem
      //})
      //setCartItem(updateCart)
    }
  }

  const calculaterPrice = (item) => {
    return item.price * item.quantity
  }


  const calculaterTotalPrice = data?.data?.reduce((total, item) => {
    return total + calculaterPrice(item)
  }, 0)

  const orderTotal = calculaterTotalPrice


  return (
    <div className="section-container py-8">
      {
        data?.data?.length ?

          <>
            <div className="overflow-x-auto py-20">
              <table className="table ">
                {/* head */}
                <thead className="bg-orange text-white text-sm">
                  <tr>
                    <th>#</th>
                    <th>عکس</th>
                    <th>نام</th>
                    <th>تعداد</th>
                    <th>قیمت</th>
                    <th>حذف</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row */}
                  {
                    data?.data?.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="avatar">
                            <div className="mask mask-squircle w-10 h-10">
                              <img src={item.image} alt={item.name} />
                            </div>
                          </div>
                        </td>
                        <td className="font-medium">
                          {item.name}
                        </td>
                        <td >
                          <div className="flex">
                            <button className="btn btn-xs" onClick={() => increaseHandler(item)}>+</button>
                            <span className="mx-3  text-center" >{item.quantity}</span>
                            <button className="btn btn-xs" onClick={() => decreaseHandler(item)}>-</button>
                          </div>
                        </td>
                        <td>
                          {calculaterPrice(item).toLocaleString()} تومان
                        </td>
                        <td>
                          <button className="btn btn-ghost  text-red"
                            onClick={() => { deleteHandler(item) }}>
                            <FaTrash size={20} />
                          </button>
                        </td>
                      </tr>
                    ))
                  }

                </tbody>

              </table>
            </div>

            <div className="my-12 flex md:flex-row flex-col justify-between items-satrt">
              <div className="md:w-1/2 space-y-3">
                <h3 className="text-xl">اطلاعات مشتری</h3>
                <p>نام و نام خانوادگی : {user?.displayName}</p>
                <p>ایمیل : {user?.email}</p>
              </div>
              <div className="md:w-1/2 space-y-3 md:mt-0 mt-5">
                <h3 className="text-xl">جزئیات سفارش</h3>
                <p>تعداد همه محصولات : {data?.data?.length}</p>
                <p>قیمت کل : {orderTotal?.toLocaleString()} تومان</p>
                <button className="btn bg-orange text-white">تایید و ادامه</button>
              </div>
            </div>
          </>

          : <h2 className="text-center text-2xl mt-24">سبد خرید شما خالی است</h2>
      }

    </div>
  );
};

export default CartPage;