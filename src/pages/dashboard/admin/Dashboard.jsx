import useMenu from "../../../hooks/useMenu";
import useUsers from "../../../hooks/useUsers";
import { BiFoodMenu } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";

const Dashboard = () => {

    const { data: users } = useUsers()
    const { data: menu } = useMenu()

    return (
        <div className="section-container">
            <div>
                <div className="stats shadow my-4">

                    <div className="stat bg-indigo-400">
                        <div className="stat-figure text-primary">
                            <FaUsers size={40} />
                        </div>
                        <div className="stat-title text-white">تعداد کاربرها</div>
                        <div className="stat-value text-primary mt-4">{users?.data.length}</div>
                    </div>

                    <div className="stat bg-purple-500">
                        <div className="stat-figure text-orange">
                            <BiFoodMenu size={40} />
                        </div>
                        <div className="stat-title text-white">تعداد آیتم های منو</div>
                        <div className="stat-value text-orange mt-4">{menu?.data.length}</div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;