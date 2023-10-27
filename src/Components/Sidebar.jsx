import  { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

// Icon
import { RxDoubleArrowLeft } from 'react-icons/rx';
import { AiFillHome } from 'react-icons/ai';
import { BsChevronRight } from 'react-icons/bs';
import { HiMiniShoppingBag } from 'react-icons/hi2';
import { ImPriceTag } from 'react-icons/im';
import { FaBoxArchive } from 'react-icons/fa6';

// Logo
import Logo from '../../public/icon.svg'

export default function Sidebar({openSidebar, setOpenSidebar, submenuOpen, setSubmenuOpen, submenuOpen2, setSubmenuOpen2}) {
  
  return(
    <aside className={` ${openSidebar ? 'w-72 lg:w-80 fixed lg:flex duration-300' : 'w-20 h-full p-5 duration-300 lg:flex hidden'} h-screen p-5 bg-blue-500 fixed sm:fixed lg:relative z-50 lg:z-0 `}>
      <span className='absolute -mt-5 ml-64 lg:hidden bg-blue-500 w-14 h-12 pt-2 rounded-tr-xl rounded-br-xl cursor-pointer' onClick={() => setOpenSidebar(!openSidebar)}>
        <RxDoubleArrowLeft className='text-xl my-1 mx-5 text-white' />
      </span>
      <ul className='fixed'>
        <NavLink to={'/dashboard'} className={`flex mb-3 ${openSidebar ? 'w-full' : 'w-fit'} h-11 items-center hover:bg-white hover:duration-300 rounded-lg cursor-pointer hover:text-blue-500 text-white`}>
          <span><AiFillHome className='text-xl mx-2 mb-1'/></span>
          <p className={`px-5 text-md ${openSidebar ? 'block' : 'hidden duration-300'}`}>Dashboard</p>
        </NavLink>
        <Link className='flex mb-3 w-fit h-11 items-center hover:bg-white hover:duration-300 rounded-lg cursor-pointer text-white hover:text-blue-500' onClick={() => setSubmenuOpen(!submenuOpen)}>
          <span><HiMiniShoppingBag className='text-xl mx-2 mb-1'/></span>
          <p className={`px-5 text-md cursor-pointer ${openSidebar ? ' block' : ' hidden'} `}>Penjualan</p>
            <BsChevronRight  className={`items-center my-auto ml-12 mr-3 duration-300 ${openSidebar ? 'block duration-300' : 'hidden duration-300'} ${submenuOpen ? 'rotate-90' : ''}`}/>
        </Link>
        <span className={`mx-10 text-white duration-300 ${submenuOpen ? 'block duration-300' : 'hidden duration-300'} ${openSidebar ? 'block' : 'hidden'}`}>
          <NavLink to={'/kasir'} className='flex py-1 mb-5 rounded-lg'>
            <li className='mx-5 cursor-pointer'>Kasir</li>
          </NavLink>
          <NavLink to={'/penjualan'} className='flex py-1 mb-5 rounded-lg'>
          <li className='mx-5 cursor-pointer'>Penjualan</li>
          </NavLink>
          <NavLink to={'/persediaan'} className='flex py-1 mb-5 rounded-lg'>
          <li className='mx-5 cursor-pointer'>Persediaan</li>
          </NavLink>
        </span>
        <NavLink to={'/pembelian'} className={`flex mb-3 ${openSidebar ? 'w-full' : 'w-fit'} h-11 items-center hover:bg-white hover:duration-300 rounded-lg cursor-pointer hover:text-blue-500 text-white`}>
          <span><ImPriceTag className='text-xl mx-2 mb-1'/></span>
          <p className={`px-5 text-md ${openSidebar ? 'block' : 'hidden duration-300'}`}>Pembelian</p>
        </NavLink>
        <li className='flex mb-3 w-fit h-11 items-center hover:bg-white hover:duration-300 rounded-lg cursor-pointer text-white hover:text-blue-500' onClick={() => setSubmenuOpen2(!submenuOpen2)}>
          <span><FaBoxArchive className='text-xl mx-2 mb-1'/></span>
          <p className={`px-5 text-md cursor-pointer ${openSidebar ? ' block' : ' hidden'} `}>Master Data</p>
            <BsChevronRight  className={`items-center my-auto ml-6 mr-3 duration-300 ${openSidebar ? 'block duration-300' : 'hidden duration-300'} ${submenuOpen2 ? 'rotate-90' : ''}`}/>
        </li>
        <span className={`mx-10 text-white ${submenuOpen2 ? 'block' : 'hidden'} ${openSidebar ? 'block' : 'hidden'}`}>
          <NavLink to={'/produk'} className='flex py-1 mb-5 rounded-lg'>
            <li className='mx-5 cursor-pointer'>Produk</li>
          </NavLink>
          <NavLink to={'/data-suplier'} className='flex py-1 mb-5 rounded-lg'>
            <li className='mx-5 cursor-pointer'>Data Suplier</li>
          </NavLink>
          <NavLink to={'/data-pelanggan'} className='flex py-1 mb-5 rounded-lg'>
            <li className='mx-5 cursor-pointer'>Data Pelanggan</li>
          </NavLink>
        </span>

        {/* <li className={`fixed bottom-11 border-t-2 border-white ${openSidebar ? ' w-56' : 'w-9'}`}>
          <div className={`items-center w-fit h-fit text-center justify-center pt-10 duration-300  ${openSidebar ? 'ml-7' : 'duration-300'}`}>
            <div className={`flex items-center w-14 h-14 mx-auto bg-white rounded-full mb-1 duration-300 ${openSidebar ? 'block' : 'w-9 h-9'}`}>
              <img src="" alt="" className='p-2' />
            </div>
            <p className={`text-xs text-white mt-5 ${openSidebar ? 'block' : 'hidden duration-300'}`}>©   Sawarga Digital Indonesia </p>
          </div>
        </li> */}
      </ul>
    </aside>
  )
}