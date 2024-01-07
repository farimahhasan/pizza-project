import { Link, Outlet } from "react-router-dom";
import { MdDashboard, MdDashboardCustomize } from "react-icons/md";
import {
  FaEdit,
  FaPlusCircle,
  FaShoppingBag,
  FaUser,
} from "react-icons/fa";

import { FaCartShopping } from "react-icons/fa6";
import useAdmin from "../hooks/useAdmin";

const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to="/">
        <MdDashboard /> خانه
      </Link>
    </li>
    <li>
        <Link to="/menu"><FaCartShopping/> منو</Link>
    </li>
  </>
);

const DashboardLayout = () => {

  const {data:isAdmin} = useAdmin()

  return (
    <div>
    {
      isAdmin  &&  <div className="drawer sm:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
        {/* Page content here */}
        <div className="flex items-center justify-between mx-4">
          <label
            htmlFor="my-drawer-2"
            className="btn bg-orange text-white drawer-button sm:hidden"
          >
            <MdDashboardCustomize />
          </label>

        </div>
        <div className="mt-5 md:mt-2 mx-4">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li>
            <a href="/dashboard" className="flex justify-start mb-3">
              <span className="badge badge-primary">ادمین</span>
            </a>
          </li>
          <hr />
          <li className="mt-3">
            <a href="/dashboard">
              <MdDashboard /> پنل ادمین
            </a>
          </li>
          <li>
            <a href="/dashboard">
              <FaShoppingBag /> سفارش مشتریان
            </a>
          </li>
          <li>
            <a href="/dashboard/add-menu">
              <FaPlusCircle />
              اضافه کردن منو
            </a>
          </li>
          <li>
            <a href="/dashboard/manage-menu-items">
              <FaEdit /> مدیریت منو شامل ویرایش و حذف
            </a>
          </li>
          <li className="mb-3">
            <a href="/dashboard/users">
              <FaUser />همه کاربر ها
            </a>
          </li>

          <hr />
      

          {/* shared nav links */}
          {
              sharedLinks
          }
        </ul>
      </div>
    </div>
    }
    </div>
  );
};

export default DashboardLayout;