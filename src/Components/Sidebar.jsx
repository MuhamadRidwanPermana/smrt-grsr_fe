import  { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

// Icon
import { RxDoubleArrowLeft, AiFillHome, BsChevronRight, HiMiniShoppingBag, ImPriceTag, FaBoxArchive, RxDotFilled } from '../utils/icons';

export default function Sidebar({openSidebar, setOpenSidebar, submenuOpen, setSubmenuOpen, submenuOpen2, setSubmenuOpen2}) {
  
  return(
    <aside className={` ${openSidebar ? 'w-72 lg:w-80 fixed lg:flex duration-300' : 'w-20 h-full p-5 duration-300 lg:flex hidden'} h-screen p-5 bg-blue-500 fixed sm:fixed lg:relative z-50 lg:z-0`}>
      <span className='absolute -mt-5 ml-64 lg:hidden bg-blue-500 w-14 h-12 pt-2 rounded-tr-xl rounded-br-xl cursor-pointer' onClick={() => setOpenSidebar(!openSidebar)}>
        <RxDoubleArrowLeft className='text-xl my-1 mx-5 text-white' />
      </span>
      <ul className='fixed w-56'>
        <NavLink to={'/dashboard'} className={`flex mb-3 ${openSidebar ? 'w-full' : 'w-fit'} h-11 items-center hover:bg-white hover:duration-300 rounded-lg cursor-pointer hover:text-blue-500 text-white`}>
          <span><AiFillHome className='text-xl mx-2 mb-1'/></span>
          <p className={`px-3 text-md ${openSidebar ? 'block' : 'hidden duration-300'}`}>Dashboard</p>
        </NavLink>
        <Link className={`flex mb-3 ${openSidebar ? 'w-full' : 'w-fit'} h-11 items-center hover:bg-white hover:duration-300 rounded-lg cursor-pointer text-white hover:text-blue-500`} onClick={() => setSubmenuOpen(!submenuOpen)}>
          <span><HiMiniShoppingBag className='text-xl mx-2 mb-1'/></span>
          <p className={`px-3 text-md cursor-pointer ${openSidebar ? 'block' : 'hidden'} `}>Penjualan</p>
            <BsChevronRight  className={`items-center my-auto ml-auto mr-3 duration-300 ${openSidebar ? 'block duration-300' : 'hidden duration-300'} ${submenuOpen ? 'rotate-90' : ''}`}/>
        </Link>
        <span className={`text-white duration-300 ${submenuOpen ? 'flex-row duration-300' : 'hidden duration-300'} ${openSidebar ? 'block' : 'hidden'}`}>
          <NavLink to={'/penjualan/kasir'} className='flex mb-3 rounded-lg w-full h-11 px-9 items-center hover:text-blue-500 hover:bg-white hover:duration-300'>
            <div className='flex items-center mx-2'>
              <RxDotFilled />
              <li className='mx-2 cursor-pointer'>Kasir</li>
            </div>
          </NavLink>
          <NavLink to={'/penjualan/penjualan'} className='flex mb-3 rounded-lg w-full h-11 px-9 items-center hover:text-blue-500 hover:bg-white hover:duration-300'>
            <div className='flex items-center mx-2'>
              <RxDotFilled />
              <li className='mx-2 cursor-pointer'>Penjualan</li>
            </div>
          </NavLink>
          <NavLink to={'/penjualan/persediaan'} className='flex mb-3 rounded-lg w-full h-11 px-9 items-center hover:text-blue-500 hover:bg-white hover:duration-300'>
            <div className='flex items-center mx-2'>
              <RxDotFilled />
              <li className='mx-2 cursor-pointer'>Persediaan</li>
            </div>
          </NavLink>
        </span>
        <NavLink to={'/pembelian'} className={`flex mb-3 ${openSidebar ? 'w-full h-11' : ' items-center w-fit'} h-11 items-center hover:bg-white hover:duration-300 rounded-lg cursor-pointer hover:text-blue-500 text-white`}>
          <span><ImPriceTag className='text-xl mx-2 mb-1'/></span>
          <p className={`px-3 text-md ${openSidebar ? 'block' : 'hidden duration-300'}`}>Pembelian</p>
        </NavLink>
        <li className={`flex mb-3 ${openSidebar ? 'w-full' : 'w-fit'} h-11 items-center hover:bg-white hover:duration-300 rounded-lg cursor-pointer text-white hover:text-blue-500`} onClick={() => setSubmenuOpen2(!submenuOpen2)}>
          <span><FaBoxArchive className='text-xl mx-2 mb-1'/></span>
          <p className={`px-3 text-md cursor-pointer ${openSidebar ? 'block' : ' hidden'} `}>Master Data</p>
            <BsChevronRight  className={`items-center my-auto ml-auto mr-3 duration-300 ${openSidebar ? 'block duration-300' : 'hidden duration-300'} ${submenuOpen2 ? 'rotate-90' : ''}`}/>
        </li>
        <span className={`text-white ${submenuOpen2 ? 'block' : 'hidden'} ${openSidebar ? 'block' : 'hidden'}`}>
          <NavLink to={'/master-data/produk'} className='flex mb-3 rounded-lg w-full h-11 px-9 items-center hover:text-blue-500 hover:bg-white hover:duration-300'>
            <div className='flex items-center mx-2'>
              <RxDotFilled />
              <li className='mx-2 cursor-pointer'>Produk</li>
            </div>
          </NavLink>
          <NavLink to={'/master-data/data-suplier'} className='flex mb-3 rounded-lg w-full h-11 px-9 items-center hover:text-blue-500 hover:bg-white hover:duration-300'>
            <div className='flex items-center mx-2'>
              <RxDotFilled />
              <li className='mx-2 cursor-pointer'>Data Suplier</li>
            </div>
          </NavLink>
          <NavLink to={'/master-data/data-pelanggan'} className='flex mb-3 rounded-lg w-full h-11 px-9 items-center hover:text-blue-500 hover:bg-white hover:duration-300'>
            <div className='flex items-center mx-2'>
              <RxDotFilled />
              <li className='ml-2 cursor-pointer w-32'>Data Pelanggan</li>
            </div>
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