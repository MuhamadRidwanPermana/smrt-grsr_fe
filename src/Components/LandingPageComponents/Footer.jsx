import React from 'react'
import { Link } from 'react-router-dom';

import { LogoPremium } from '../../utils/icons'

export default function Footer() {
  return (
  <footer className='grid bg-blue-100 w-full py-24 items-center font-inter text-blue-900'>
      <div className='flex w-full justify-center items-center'>
        <div className='lg:flex lg:justify-between grid justify-center items-center lg:w-3/5 w-4/5 h-fit pb-5 border-b-2 border-blue-950'>
          <div className='mb-14 lg:mb-0 text-center lg:ms-0 mx-auto'>
            <img src={LogoPremium} alt="" className='lg:w-52 lg:-mt-2 w-40 -mt-2'/>
          </div>
          <div className='flex text-blue-900'>
            <a href="https://wa.me/+6281223918932?text=Hallo, Saya Ingin menanyakan perihal SmartGrosir" target='_blank'>
              <ul className='mx-5 cursor-pointer'>
                <li>Bantuan</li>
              </ul>
            </a>
            <Link to={'/kebijakan-privasi-pengguna'} target='_blank'>
              <ul className='mx-5 cursor-pointer'>
                <li>Kebijakan Privasi</li>
              </ul>
            </Link>
          </div>
        </div>
      </div>
      <div className='text-center mt-5 text-blue-950'>
        <p className='hidden lg:block'>© 202X SmartGrosir by PT. Sawarga Digital Indonesia</p>

        <p className='block lg:hidden'>© 202X SmartGrosir by PT. Sawarga Digital <br /> Indonesia</p>
      </div>
    </footer>
  )
}
