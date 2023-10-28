import { useState, useRef } from 'react'

import '../src/assets/style.css';

import image from './assets/img/image_loginPage.png';

import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import { Link } from 'react-router-dom';


import Logo from './assets/img/logo.svg';
import Logo_SGP from './assets/img/LogoPremium.svg';
import Image from './assets/img/image_landingpage.png';
import Image2 from './assets/img/image_landingpage2.png';
import IconItems from './assets/img/Icon_Items.svg';
import IconFolder from './assets/img/Icon_Folder.svg';
import IconDrone from './assets/img/Icon_Drone.svg';
import IconHeadset from './assets/img/Icon_Headset.svg';

import Subtract from './assets/img/Subtract.svg';
import Subtract2 from './assets/img/Subtract2.svg';
import Logo2 from './assets/img/Logo2.svg';
import Rect from './assets/img/rect.svg';

import { FaArrowRightLong } from 'react-icons/fa6';
import { BsCheck2 } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';
import { RxHamburgerMenu } from 'react-icons/rx';

function App() {
  
  const[openNavbar, setOpenNavbar] = useState(false);

  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
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

        <a href="https://wa.me/+6281223918932?text=Hallo, Saya Ingin menanyakan perihal SmartGrosir" target='_blank'>
          <div className='sticky overflow-hidden top-3/4 z-30 float-right w-64 font-inter text-blue-900'>
            <div className='flex items-center w-60 z-20 p-3 pr-8 rounded-s-full bg-blue-950 ml-auto -mr-40 hover:-translate-x-40 hover:duration-300 hover:delay-100'>
              <img src={IconHeadset} alt="" className='rotate-12 w-10 h-auto mr-7' />
              <p className='text-sm text-white underline underline-offset-4 duration-300'>Ada hal yang ingin di tanyakan?</p>
            </div>
          </div>
        </a>

        <body className='w-full h-fit p-5 lg:px-36'>
          <div className='lg:block hidden w-fit h-fit'>
            <img src={Subtract} alt="" className='absolute z-10 w-fit h-fit'/>
            <img src={Logo2} alt="" className='absolute z-10 w-fit h-fit top-96 mt-80'/>
          </div>

          <div className='relative z-20 lg:flex w-full h-fit justify-center lg:justify-between items-center mt-24 mb-32 lg:mt-40 lg:mb-80'>
            <div className='w-full flex lg:hidden'>
              <img src={Image} alt="" />
            </div>

            <div className='lg:w-1/2 p-0 lg:pb-0 pb-10 lg:pr-36'>
              <h1 className='lg:w-[40rem] text-3xl lg:text-5xl font-source_sans text-blue-900 pb-6 pt-5 lg:pt-0'>Gak perlu lagi pusing mengelola data grosir!</h1>
              <p className='text-md lg:text-xl font-inter text-blue-900 pb-8'>SmartGrosir memungkinkan kamu dengan mudah mengorganisir produk, memastikan katalogmu selalu <i>update.</i></p>
              <Link to={'/login'}>
                <div className=' flex bg-blue-500 text-white w-40 h-10 rounded-lg items-center cursor-pointer'>
                  <span className='px-4 font-inter'>Coba Gratis</span>
                  <FaArrowRightLong />
                </div>
              </Link>
            </div>
            
            <div className='w-1/2 h-fit pl-10 hidden lg:flex'>
              <img src={Image} alt="" />
            </div>
          </div>

          <div className='relative z-20 lg:flex w-full justify-center lg:justify-between items-center mt-5 mb-32 lg:my-72'>
            <div className='w-fit lg:pr-10 pb-5'>
              <img src={Image2} alt="" />
            </div>
            <div className='lg:w-1/2 p-0 lg:pl-36'>
              <h1 className='text-3xl lg:text-5xl font-source_sans text-blue-900 pb-6'>Analisis Data Grosir</h1>
              <p className='text-base lg:text-xl font-inter text-blue-900 pb-8'>Dapatkan wawasan berharga dari analisis data grosir untuk pengambilan keputusan yang lebih cerdas.</p>
              <Link to={'/login'}>
                <div className=' flex bg-blue-500 text-white w-40 h-10 rounded-lg items-center cursor-pointer'>
                  <span className='px-4 font-inter'>Coba Gratis</span>
                  <FaArrowRightLong />
                </div>
              </Link>
            </div>
          </div>
          
          <div className='lg:block hidden w-fit h-fit'>
            <img src={Subtract2} alt="" className='absolute z-10 w-fit h-fit top-full mt-96 pt-52'/>
          </div>

          <div className='relative z-20 lg:flex w-full justify-center lg:justify-between items-center mt-5 mb-32 lg:my-72'>
            <div className='w-fit flex lg:hidden'>
              <img src={Image} alt="" />
            </div>

            <div className='lg:w-1/2 p-0 lg:pb-0 pb-10 lg:pr-36'>
              <h1 className='text-3xl lg:text-5xl font-source_sans text-blue-900 pb-6 pt-5 lg:pt-0 lg:w-[35rem]'>Lebih Banyak Waktu, Lebih Banyak Pelanggan</h1>
              <p className='text-base lg:text-xl font-inter text-blue-900 pb-8'>Tingkatkan layanan pelanggan Anda dengan menghemat waktu yang dapat Anda habiskan untuk menjalin hubungan yang lebih baik.</p>
              <Link to={'/login'}>
                <div className='flex bg-blue-500 text-white w-40 h-10 rounded-lg items-center cursor-pointer'>
                  <span className='px-4 font-inter'>Coba Gratis</span>
                  <FaArrowRightLong />
                </div>
              </Link>
            </div>
            
            <div className='w-1/2 h-fit pl-10 hidden lg:flex'>
              <img src={Image} alt="" />
            </div>
          </div>

          <div className='lg:block hidden'>
            <img src={Rect} alt="" className='absolute z-10 w-fit h-fit right-24 -mt-20'/>
          </div>

          <div className='w-full justify-center items-center mt-5 lg:my-72'>
            <header className='text-center mx-auto lg:w-2/3 h-fit w-full'>
              <h1 className='text-3xl lg:text-5xl font-source_sans text-blue-900 pb-5 pt-5 lg:pt-0'>Manfaatkan Kemudahan Grosir</h1>
              <p className='mx-auto text-lg lg:text-xl font-inter text-blue-900 lg:w-[35rem]'>SmartGrosir - Solusi terbaik untuk mengelola bisnis grosir Anda tanpa kerumitan.</p>
            </header>
            <body className='lg:flex mb-36 mt-20 grid gap-8'>
              <div className='w-full bg-blue-50 rounded-xl p-7'>
                <img src={IconItems} alt="" className='mt-5 mb-7'/>
                <h1 className='text-2xl text-blue-900 font-source_sans my-5'>Optimalkan Bisnis Grosir Anda</h1>
                <p className='text-base text-slate-400 my-5 font-inter'>Kelola data grosir dengan efisien dan tingkatkan produktivitas bisnis Anda.</p>
              </div>
              <div className='w-full bg-blue-50 rounded-xl p-7'>
                <img src={IconFolder} alt="" className='mt-5 mb-7'/>
                <h1 className='text-2xl text-blue-900 font-source_sans my-5 pr-5'>Sederhana dan Efisien</h1>
                <p className='text-base text-slate-400 my-5 font-inter'>Pengelolaan informasi grosir menjadi lebih sederhana dan efisien daripada sebelumnya.</p>
              </div>
              <div className='w-full bg-blue-50 rounded-xl p-7'>
                <img src={IconDrone} alt="" className='mt-5 mb-7'/>
                <h1 className='text-2xl text-blue-900 font-source_sans my-5'>Fleksibilitas yang Tak Tertandingi</h1>
                <p className='text-base text-slate-400 my-5 font-inter'>Sesuaikan platform kami dengan kebutuhan bisnis Anda untuk hasil terbaik.</p>
              </div>
              <div className='w-full bg-blue-50 rounded-xl p-7'>
                <img src={IconHeadset} alt="" className='mt-5 mb-7'/>
                <h1 className='text-2xl text-blue-900 font-source_sans my-5'>Dukungan Pelanggan Terbaik</h1>
                <p className='text-base text-slate-400 my-5 font-inter'>Tim kami siap membantu Anda dalam mengoptimalkan penggunaan platform kami.</p>
              </div>
            </body>
          </div>

          <div className='w-full h-fit mx-auto align-center grid justify-center items-center mt-5 mb-10 my-72'>
            <header className='mx-auto text-center lg:w-3/4 h-fit w-full'>
              <h1 className='text-3xl lg:text-5xl font-source_sans text-blue-900 pb-5 pt-5 lg:pt-0'>Solusi yang Didesain Sesuai Kebutuhan</h1>
              <p className='text-lg lg:text-xl font-inter text-blue-900'>Platform kami disesuaikan untuk memenuhi kebutuhan unik bisnis grosir Anda.</p>
            </header>
            <span ref={ref}></span>
            <body className='lg:flex mb-36 mt-20 font-inter'>
              <div className='lg:mx-5 lg:mb-0 mb-10 w-96 h-fit p-10 border-2 border-slate-300 rounded-xl'>
                <header>
                  <div className='flex'>
                    <img src={Logo} alt="" className='lg:w-52 lg:-mt-2 w-40 -mt-2'/>
                    <span className="text-xs text-blue-400 -mt-1 w-9 h-6 mx-1.5 text-center pt-0.5 bg-blue-100 border border-blue-400 rounded-md">Lite</span>
                  </div>
                  <div>
                    <p className='text-slate-500 text-sm mt-6 mb-3'>Gratis Selamanya!</p>
                    <p className='text-4xl font-semibold my-3'>Rp. 0</p>
                  </div>
                </header>
                <div>
                  <span className='flex items-center mt-5'>
                    <BsCheck2 className='text-2xl text-green-500 mr-2'/>
                    <p className='text-slate-500 text-md'>Dashboard Menu</p>
                  </span>
                  <span className='flex items-center my-3'>
                    <BsCheck2 className='text-2xl text-green-500 mr-2'/>
                    <p className='text-slate-500 text-md'>Statistik Penjualan dan Pembelian</p>
                  </span>
                  <span className='flex items-center my-3'>
                    <BsCheck2 className='text-2xl text-green-500 mr-2'/> 
                    <p className='text-slate-500 text-md'>Master Data (Sederhana)</p>
                  </span>
                  <span className='flex items-center my-3'>
                    <BsCheck2 className='text-2xl text-green-500 mr-2'/>
                    <p className='text-slate-500 text-md'>Data <i>Suplier</i> (limit 5)</p>
                  </span>
                  <span className='flex items-center my-3'>
                    <BsCheck2 className='text-2xl text-green-500 mr-2'/>
                    <p className='text-slate-500 text-md'>Hanya untuk satu akun</p>
                  </span>
                  <span className='flex items-center my-3'>
                    <CgClose className='text-xl text-red-700 mr-3'/>
                    <p className='text-slate-500 text-md'>Scan Barcode</p>
                  </span>
                  <span className='flex items-center my-3'>
                    <CgClose className='text-xl text-red-700 mr-3'/>
                    <p className='text-slate-500 text-md'>Laporan keuangan</p>
                  </span>
                  <span className='flex items-center my-3'>
                    <CgClose className='text-xl text-red-700 mr-3'/>
                    <p className='text-slate-500 text-md'>Laporan barang terlaris</p>
                  </span>
                  <span className='flex items-center my-3'>
                    <CgClose className='text-xl text-red-700 mr-3'/>
                    <p className='text-slate-500 text-md'>Laporan utang dan piutang</p>
                  </span>
                  <span className='flex items-center my-3'>
                    <CgClose className='text-xl text-red-700 mr-3'/>
                    <p className='text-slate-500 text-md'>Fitur akuntansi</p>
                  </span>
                </div>
                <div>
                  <Link to={'/login'}>
                    <div className='mt-7 justify-center flex border-2 border-blue-400 text-blue-500 w-full h-9 rounded-lg items-center cursor-pointer'>
                      <span className='px-3 font-inter'>Coba Gratis</span>
                    </div>
                  </Link>
                </div>
              </div>

              <div className='lg:mx-5 w-96 h-auto p-10 border-2 border-blue-950 rounded-xl'>
                <header>
                  <div className='flex'>
                    <img src={Logo_SGP} alt="" className='lg:w-52 lg:-mt-2 w-40 -mt-2'/>
                    <span className="text-xs text-white -mt-1 w-16 h-6 mx-1.5 text-center pt-1 bg-blue-950 rounded-md">Premium</span>
                  </div>
                  <div>
                    <p className='text-slate-500 text-sm my-3'>Kelola Grosir Lebih Produktif!</p>
                    <p className='text-4xl text-blue-950 font-semibold my-3'>Rp. 75k/3 bulan</p>
                  </div>
                </header>
                <div>
                <span className='flex items-center mt-5'>
                    <BsCheck2 className='text-2xl text-green-500 mr-2'/>
                    <p className='text-slate-500 text-md'>Dashboard Menu</p>
                  </span>
                  <span className='flex items-center my-3'>
                    <BsCheck2 className='text-2xl text-green-500 mr-2'/>
                    <p className='text-slate-500 text-md'>Statistik Penjualan dan Pembelian</p>
                  </span>
                  <span className='flex items-center my-3'>
                    <BsCheck2 className='text-2xl text-green-500 mr-2'/> 
                    <p className='text-slate-500 text-md'>Master Data</p>
                  </span>
                  <span className='flex items-center my-3'>
                    <BsCheck2 className='text-2xl text-green-500 mr-2'/>
                    <p className='text-slate-500 text-md'>Data <i>Suplier</i> (Unlimited)</p>
                  </span>
                  <span className='flex items-center my-3'>
                    <BsCheck2 className='text-2xl text-green-500 mr-2'/>
                    <p className='text-slate-500 text-md'>Akun Lebih dari 1 (admin, kasir, dll)</p>
                  </span>
                  <span className='flex items-center my-3'>
                    <BsCheck2 className='text-2xl text-green-500 mr-2'/>
                    <p className='text-slate-500 text-md'>Scan Barkode</p>
                  </span>
                  <span className='flex items-center my-3'>
                    <BsCheck2 className='text-2xl text-green-500 mr-2'/>
                    <p className='text-slate-500 text-md'>Laporan keuangan</p>
                  </span>
                  <span className='flex items-center my-3'>
                    <BsCheck2 className='text-2xl text-green-500 mr-2'/>
                    <p className='text-slate-500 text-md'>Laporan barang terlaris</p>
                  </span>
                  <span className='flex items-center my-3'>
                    <BsCheck2 className='text-2xl text-green-500 mr-2'/>
                    <p className='text-slate-500 text-md'>Laporan Utang Piutang</p>
                  </span>
                  <span className='flex items-center my-3'>
                    <BsCheck2 className='text-2xl text-green-500 mr-2'/>
                    <p className='text-slate-500 text-md'>Fitur akuntansi</p>
                  </span>
                  <span className='flex items-center my-3'>
                    <BsCheck2 className='text-2xl text-green-500 mr-2'/>
                    <p className='text-slate-500 text-md'>Fitur Menarik Lainnya</p>
                  </span>
                </div>
                <div>
                  <a href='#' className='mt-7 justify-center flex bg-blue-950 text-white w-full h-9 rounded-lg items-center cursor-pointer'>
                    <span className='px-3'>Berlangganan</span>
                  </a>
                </div>
              </div>
            </body>
          </div>

        </body>

        <footer className='grid bg-blue-100 w-full py-24 items-center font-inter text-blue-900'>
          <div className='flex w-full justify-center items-center'>
            <div className='lg:flex lg:justify-between grid justify-center items-center lg:w-3/5 w-4/5 h-fit pb-5 border-b-2 border-blue-950'>
              <div className='mb-14 lg:mb-0 text-center lg:ms-0 mx-auto'>
                <img src={Logo_SGP} alt="" className='lg:w-52 lg:-mt-2 w-40 -mt-2'/>
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
    </>
  )
};

export default App;




