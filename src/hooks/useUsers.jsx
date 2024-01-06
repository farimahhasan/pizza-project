import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const useUsers = () => {
    
    const token = localStorage.getItem('access-token')

    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axios.get("http://localhost:6001/users",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            return res;
        },
    })
};

export default useUsers;