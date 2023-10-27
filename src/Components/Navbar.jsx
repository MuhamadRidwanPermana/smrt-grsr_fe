import  { useState } from 'react';
import { Link } from 'react-router-dom';

// Icon
import { RxHamburgerMenu } from 'react-icons/rx';
import { RxDoubleArrowLeft } from 'react-icons/rx';
import { IoLogOutOutline } from 'react-icons/io5';
import { SlSettings } from 'react-icons/sl';
import { BsPerson } from 'react-icons/bs';

// Image and Logo
import imageAdmin from '../assets/img/admin.png';
import Logo from '../assets/img/logo.svg';

export default function Navbar({ openSidebar, setOpenSidebar, openDropdownProfile, setOpenDropdownProfile }) {
  
  return(
    <nav className='flex w-full sticky top-0 h-16 bg-white justify-between z-10'>
      <div className='flex w-fit h-16'>
        <span className='bg-blue-500 w-9 h-12 pt-2 rounded-tr-xl rounded-br-xl hidden lg:flex cursor-pointer' onClick={() => setOpenSidebar(!openSidebar)}>
          <RxDoubleArrowLeft className={`text-xl mt-1.5 text-white ${openSidebar ? '0' : 'rotate-180'}`}/>
        </span>
        <span className=' flex lg:hidden cursor-pointer'>
          <RxHamburgerMenu className={`text-2xl my-4 mx-4 cursor-pointer text-blue-500 ${openSidebar ? '0' : 'rotate-180'}`} onClick={() => setOpenSidebar(!openSidebar)}/>
        </span>
        <div className='flex py-4 mx-0 lg:mx-6'>
          <img src={Logo} alt="" className='lg:w-52 lg:-mt-2 w-40 -mt-2'/>
        {/* <h1 className="text-blue-600 font-semibold text-2xl">SmartGrosir</h1> */}
        <span className="text-xs text-blue-400 lg:mt-1 w-9 h-6 mx-1.5 text-center pt-0.5 bg-blue-100 border border-blue-400 rounded-md">Lite</span>
        </div>
      </div>
      <div className='flex w-fit h-16 mx-5 items-center cursor-pointer' onClick={() => setOpenDropdownProfile(!openDropdownProfile)}>
        <div className='flex'>
          <img src={imageAdmin} alt="" className=' bg-white w-8 h-8 rounded-full border border-blue-500'/>
        </div>
        <span className='text-sm text-blue-500 mx-3 lg:inline lg:mx-3 hidden'>Admin</span>
          <span className={`mx-10 py-2 text-dark w-40 bg-white border border-slate-100 rounded-xl ${openDropdownProfile ? 'absolute block z-50 top-16 right-0' : 'hidden'}`}>
              <Link to={'/profile'}>
                <div className='flex items-center mt-2 mb-4 mx-5 text-slate-700 hover:text-blue-500'>
                  <BsPerson className='text-xl mr-3'/>
                  <li className='list-none text-md'>Profile</li>
                </div>
              </Link>
              <Link to={'/settings'}>
              <div className='flex items-center mt-2 mb-4 mx-5 text-slate-700 hover:text-blue-500'>
                <SlSettings className='text-xl mr-3'/>
                <li className='list-none text-md'>Settings</li>
              </div>
              </Link>
              <div className='border-t border-slate-200 w-full h-1'></div>
              <Link to={'/'}>
                <div className="flex items-center mt-3 mb-2 mx-5 text-slate-700 hover:text-blue-500">
                  <IoLogOutOutline className='text-xl mr-3'/>
                  <li className='list-none text-md'>Logout</li>
                </div>
              </Link>
          </span>
      </div>
    </nav>
  )
}