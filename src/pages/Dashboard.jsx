
import { BiCalendarEvent, BiCart, BiListCheck, BiMenu, BiUser } from 'react-icons/bi';
import { FaHome, FaJediOrder } from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';
import { TbBrandBooking, TbMenuOrder } from 'react-icons/tb';
import { TfiWrite } from 'react-icons/tfi';
import { NavLink, Outlet } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const Dashboard = () => {
  const { adminCheck, isAdmin } = useAuth();

  // console.log(isAdmin);
  adminCheck();
  // console.log(isAdmin);



  return (
    <div className='flex'>
      {/* Slide bar */}
<div className='lg:w-[300px] sticky top-0 rounded-r-xl bg-gray-700 h-dvh text-white p-5'>

        <p className='font-bold text-2xl'>Dashboard</p>
        {/* Navlinks  */}
        <div className='mt-5 pl-2 font-semibold grid gap-2 text-lg'>
          <NavLink className={'flex items-center gap-2'} to={'/'}><FaHome /> User Home</NavLink>
          
          <hr className='text-gray-400 w-[70%] mt-2 mb-2' />
          <NavLink className={'flex items-center gap-2'} to={'/dashboard/cart'}><BiCart /> My Cart</NavLink>
          <NavLink className={'flex items-center gap-2'} to={'/dashboard/addReview'}><TfiWrite /> Add Review</NavLink>
          <NavLink className={'flex items-center gap-2'} to={'/dashboard/userOrders'}><BiListCheck /> My Orders</NavLink>
          {
            (isAdmin) && <>
              <hr className='text-gray-400 w-[70%] mt-2 mb-2' />
              <NavLink className={'flex items-center gap-2'} to={'/dashboard/allUser'}><BiUser /> All User</NavLink>
              <NavLink className={'flex items-center gap-2'} to={'/dashboard/menu'}><BiMenu /> Menu</NavLink>
              <NavLink className={'flex items-center gap-2'} to={'/dashboard/orderRequest'}><TbMenuOrder /> Order Request</NavLink>
            </>
          }


        </div>
      </div>
      {/* content  */}
      <div className='p-6 w-full'>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;