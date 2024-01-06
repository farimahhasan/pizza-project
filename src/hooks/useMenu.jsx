import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const useMenu = () => {
    return useQuery({
        queryKey: ['menus'],
        queryFn: async () => {
            const res = await axios.get("http://localhost:6001/menu")
            return res;
        },
    })
};

export default useMenu;