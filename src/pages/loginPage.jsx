import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'antd';

import { Image, Image3 } from '../utils/icons';

import InputForm from '../Components/Elements/Input/InputForm';
import Button from '../Components/Elements/Button';
import Header from '../Components/LoginRegisterComponents/Header';

import { FcGoogle } from 'react-icons/fc';

import { Input } from 'antd';

export default function Login() {

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(Email.length === 0 || Password.length === 8){
      setError(true);
    }
    console.log(Email, Password);
  }

  const contentStyle = {
    height: '350px',
    width:'500px',
  };

  return (
    <>
      <section className='w-full h-screen p-5 lg:px-0 font-inter'>
        
        <div className='lg:block hidden w-fit h-fit'>
          <svg width="1092" height="810" viewBox="0 0 1092 810" fill="none" xmlns="http://www.w3.org/2000/svg" className='absolute z-10 w-[66%] h-fit left-52 ml-3'>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M877.5 -281.625C966.431 -230.28 1040.28 -156.431 1091.62 -67.5001L990.3 -9.00009C949.224 -80.1451 890.145 -139.224 819 -180.3C747.855 -221.376 667.151 -243 585 -243C502.849 -243 422.145 -221.375 351 -180.3C279.855 -139.224 220.776 -80.1449 179.7 -8.99991C138.624 62.1451 117 142.849 117 225C117 307.151 138.625 387.855 179.7 459C220.776 530.145 279.855 589.224 351 630.3C417.81 668.872 493.049 690.292 570 692.76V809.808C472.506 807.307 377.097 780.467 292.5 731.625C203.569 680.281 129.72 606.431 78.3752 517.5C27.0307 428.569 2.77471e-05 327.689 0 225C-2.7747e-05 122.311 27.0306 21.4314 78.3751 -67.4999C129.72 -156.431 203.569 -230.28 292.5 -281.625C381.431 -332.969 482.311 -360 585 -360C687.689 -360 788.569 -332.969 877.5 -281.625Z" fill="url(#paint0_linear_109_2126)"/>
            <defs>
            <linearGradient id="paint0_linear_109_2126" x1="545.813" y1="-360" x2="545.813" y2="810" gradientUnits="userSpaceOnUse">
            <stop offset="0.354704" stop-color="#4187EF" stop-opacity="0"/>
            <stop offset="0.456203" stop-color="#4187EF"/>
            <stop offset="0.821602" stop-color="#4187EF" stop-opacity="0"/>
            </linearGradient>
            </defs>
        </svg>
        </div>

        <div className='relative z-20 flex w-full h-fit justify-center lg:p-0 lg:mt-20 mt-0 p-5 lg:justify-evenly'>
          <div className="hidden lg:flex w-full px-5 lg:w-fit mt-10 lg:pt-11 items-center">
            <Carousel autoplay style={contentStyle}>
              <div>
                <img src={Image} alt=""/>
              </div>
              <div>
                <img src={Image3} alt=""/>
              </div>
            </Carousel>
          </div>

          <div className="w-full lg:px-5 lg:w-1/4">
            <Header header='Selamat Datang' subHeader='Silahkan daftar/ masuk melalui akun Google'/>

            <button className="flex items-center justify-center w-full my-3 p-3 bg-white text-dark rounded-lg border-2 border-slate-300">
              <FcGoogle className='text-2xl mr-3'/>
              <span className='font-semibold'>Lanjutkan dengan Google</span>
            </button>

            <div className='flex items-center justify-center mt-5 mb-3'>
              <span className='border border-slate-300 w-28 rounded-lg'></span>
              <span className='w-52 text-xs text-center text-slate-400 font-medium font-inter'>Masuk dengan Email</span>
              <span className='border border-slate-300 w-28 rounded-lg'></span>
            </div>

            <form action="" onSubmit={handleSubmit} className='font-inter'>
              <div className='mb-3'>
                <InputForm label='Email' placeholder="Masukan email" name="email" onChange={e=>setEmail(e.target.value)}/>
                {error ? <span className='text-red-500 text-sm'>Email harus di isi</span> : null}
              </div>

              <div className='mb-3'>
                <label htmlFor="password"  className="text-blue-950 font-inter font-medium">Kata sandi</label>  <span className="text-red-500">*</span>
                <Input.Password placeholder="Masukan kata sandi" className='w-full h-12 border-2 border-slate-300 rounded-lg mt-3' onChange={e=>setPassword(e.target.value)}/>
                {error ? <span className='text-red-500 text-sm'>Kata Sandi harus di isi</span> : null}
              </div>

              <a href="#" className='w-fit block ml-auto text-blue-500 text-sm text-end mt-5 mb-2'>Lupa kata sandi?</a>

              <Button title="Masuk"/>
            </form>
            <div className='font-inter'>
              <h1 className='text-center text-sm mt-4 font-inter'>Belum punya akun? <Link to={'/register'} className='text-blue-500'>Daftar</Link></h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}