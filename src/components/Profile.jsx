import { IoPersonCircle } from "react-icons/io5";
import { useAuth } from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

const Profile = ({ user }) => {

  const { logOut } = useAuth()
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/"

  const logoutHandler = () => {
    logOut()
      .then(() => {
        navigate(from, { replace: true })
      }).catch((err) => console.log(err))
  }

  const { data: isAdmin } = useAdmin()

  return (
    <div className=" drawer-start z-50">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content mx-auto ">
        {/* Page content here */}
        <label htmlFor="my-drawer-4" className=" btn btn-circle btn-ghost dark:hover:bg-white dark:hover:text-gray-700">
          <div>
            {
              user.photoURL ?
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img src={user.photoURL} alt={user.name} />
                  </div>
                </div>
                : <IoPersonCircle size={24} />
            }
          </div>
        </label>
      </div>
      <div className="drawer-side ">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu dark:bg-gray-800 dark:text-white p-4 w-80 min-h-full bg-base-200 text-base-content">
          <h2 className="text-orange p-3 text-lg">{user?.displayName}</h2>
          {/* Sidebar content here */}
          {
            isAdmin ?
              <>
                <li className="dark:hover:text-gray-300"><a href="/dashboard">پنل ادمین</a></li>
              </>
              :
              <>
                <li className="dark:hover:text-gray-300"><a href="/update-profile">ویرایش پروفایل</a></li>
              </>
          }
          <li className="dark:hover:text-gray-300">
            <a href="/" onClick={logoutHandler}>خروج</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;