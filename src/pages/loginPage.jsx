import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'antd';

import Image from '../assets/img/image_landingpage.png';
import Image2 from '../assets/img/image_landingpage2.png';
import Subtract3 from '../assets/img/Subtract3.svg';

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
    height: 'auto',
    width:'500px',
  };

  return (
    <>
      <section className='w-full h-fit p-5 lg:px-0 py-10 font-inter'>
        
        <div className='lg:block hidden w-fit h-fit'>
          <img src={Subtract3} alt="" className='absolute z-10 w-fit h-fit left-52 ml-3'/>
        </div>

        <div className='relative z-20 flex w-full h-fit justify-center lg:p-0 lg:mt-20 mt-0 p-5 lg:justify-evenly'>
          <div className="hidden lg:flex w-full px-5 lg:w-fit mt-10 lg:pt-11 items-center">
            <Carousel autoplay style={contentStyle}>
              <div>
                <img src={Image} alt=""/>
              </div>
              <div>
                <img src={Image2} alt=""/>
              </div>
            </Carousel>
          </div>

          <div className="w-full lg:px-5 lg:w-1/4 lg:pt-10">
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
                <Input.Password placeholder="Masukan kata sandi" className='w-full h-12 border-2 border-slate-300 rounded-lg mt-3'/>
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