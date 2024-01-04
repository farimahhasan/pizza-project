import axios from "axios";
import { useAuth } from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useCart = () => {
    
    const {user}=useAuth()

    const token = localStorage.getItem('access-token')

    return useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:6001/carts?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            return res;
        },
    })



};

export default useCart;