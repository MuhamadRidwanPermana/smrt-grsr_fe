import { useState, useRef } from 'react'

import { Link } from 'react-router-dom';

import Logo from '../../assets/img/logo.svg';

import { RxHamburgerMenu } from 'react-icons/rx';

export default function Navbar() {

  const[openNavbar, setOpenNavbar] = useState(false);

  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className='flex justify-between items-center sticky z-50 bg-white bg-opacity-70 top-0 backdrop-blur background-blur-lg  w-full h-16 p-5 lg:px-28 py-5 lg:py-10 font-inter text-blue-900'>

      {/* Mobile */}
      <span className='flex lg:hidden cursor-pointer' onClick={() => setOpenNavbar(!openNavbar)}>
        <RxHamburgerMenu className={`text-2xl my-4 mx-4 cursor-pointer text-blue-900`}/>
      </span>
      <div className={`inline lg:hidden bg-white w-full h-fit px-5 text-slate-500 ${openNavbar ? 'absolute z-50 top-16 left-0' : 'hidden'}`}>
        <ul className='mx-5 flex lg:hidden py-5 text-slate-500' onClick={handleClick}>
          <li>Harga</li>
        </ul>
        <Link target="_blank" to={'https://www.sadigit.co.id/profil-kami/'}>
          <ul className='mx-5  flex lg:hidden pb-7 text-slate-500'>
            <li>Tentang Kami</li>
          </ul>
        </Link>
      </div>

        <div className='flex cursor-pointer items-center pt-2'>
          <img src={Logo} alt="" className='lg:w-52 lg:-mt-2 w-40 -mt-2'/>
        </div>

        <div className='flex items-center cursor-pointer text-slate-500'>
          <ul className='mx-5 hidden lg:flex  text-slate-500' onClick={handleClick}>
            <li>Harga</li>
          </ul>
          <Link target="_blank" to={'https://www.sadigit.co.id/profil-kami/'}>
            <ul className='mx-5 hidden lg:flex  text-slate-500'>
              <li>Tentang Kami</li>
            </ul>
          </Link>

          <Link to={'/login'}>
            <ul className='mx-5 bg-blue-500 rounded-lg text-white px-3 py-1'>
              <li>Masuk</li>
            </ul>
          </Link>
        </div>
    </nav>
  )
}
