import {useAuth} from './useAuth'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
    const {user} = useAuth();
    return useQuery({
        queryKey: [user?.email, ],
        queryFn: async () => {
            const token = localStorage.getItem('access-token')
           const res = await axios.get(`http://localhost:6001/users/admin/${user?.email}`,
           {
            headers: {
                Authorization: `Bearer ${token}`
            }
           })
            return res.data?.admin;
        }
    })
  
}

export default useAdmin;