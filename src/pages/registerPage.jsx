import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Input } from 'antd';

import Image from '../assets/img/image_landingpage.png';
import Image2 from '../assets/img/image_landingpage2.png';
import Subtract3 from '../assets/img/Subtract3.svg';

import Button from '../Components/Elements/Button';
import InputForm from '../Components/Elements/Input/InputForm';
import Header from '../Components/LoginRegisterComponents/Header';

export default function registerPage() {

  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(Name.length === 0 || Email.length === 0 || Password.length === 8 || ConfirmPassword.length === 8){
      setError(true);
    }
    console.log(Name, Email, Password, ConfirmPassword);
  }

  const contentStyle = {
    height: 'auto',
    width:'500px',
  };

  return (
    <>
      <section className='w-full h-fit p-5 lg:px-0 py-2 font-inter'>

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

          <div className=" w-full h-fit lg:px-5 lg:w-1/4 lg:pt-10">
            <Header header='Identitas Pemilik' subHeader='Harap masukan Identitas yang sesuai'/>

            <form onSubmit={handleSubmit} action="">

              <div className='mb-3'>
                <InputForm label='Nama Pemilik' placeholder="Masukan nama pemilik" name="name" onChange={e=>setName(e.target.value)}/>
                {error ? <span className='text-red-500 text-sm'>Nama Pemilik harus di isi</span> : null}
              </div>

              <div className='mb-3'>
                <InputForm label='Email' placeholder="Masukan email" name="email" onChange={e=>setEmail(e.target.value)}/>
                {error ? <span className='text-red-500 text-sm'>Email harus di isi</span> : null}
              </div>

              <div className='mb-3'>
                <label htmlFor="password" className="text-blue-950 font-inter font-medium">Kata Sandi</label>  <span className="text-red-500">*</span>
                <Input.Password placeholder="Buat kata sandi akun SmartGrosir" className='w-full h-12 border-2 border-slate-300 rounded-lg mt-3'/>
                {error ? <span className='text-red-500 text-sm'>Kata Sandi harus lebih dari 8 karakter</span> : null}
              </div>

              <div className='mb-3'>
                <label htmlFor="password" className="text-blue-950 font-inter font-medium">Konfirmasi Kata Sandi</label>  <span className="text-red-500">*</span>
                <Input.Password placeholder="Konfirmasi kata sandi" className='w-full h-12 border-2 border-slate-300 rounded-lg mt-3'/>
                {error ? <span className='text-red-500 text-sm'>Kata Sandi harus lebih dari 8 karakter</span> : null}
              </div>

              <Button title="Selanjutnya"/>
              {/* <Link to={'/register_identitas_toko'}>
                <Button title="Selanjutnya"/>
              </Link> */}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
