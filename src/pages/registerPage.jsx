import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Input, Form } from 'antd';

import { Image1, Image3 } from '../utils/icons';

import Button from '../Components/Elements/Button';
import Label from '../Components/Elements/Input/Label';
import Header from '../Components/LoginRegisterComponents/Header';

export default function registerPage() {

  const contentStyle = {
    height: '350px',
    width:'500px',
  };

  return (
    <>
      <section className='w-full h-fit p-5 lg:px-0 py-2 font-inter'>

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
                <img src={Image1} alt=""/>
              </div>
              <div>
                <img src={Image3} alt=""/>
              </div>
            </Carousel>
          </div>

          <div className=" w-full h-fit lg:px-5 lg:w-1/4">
            <Header header='Identitas Pemilik' subHeader='Harap masukan Identitas yang sesuai'/>

            <Form onSubmit="" action="">

              <div className='mb-3'>
                <Label label="Nama Pemilik"/>
                <Form.Item
                  name="nama_pemilik"
                  rules={[
                    {
                      required: true,
                      message: <span className='text-xs'>Mohon masukan Nama Pemilik!</span>,
                    },
                  ]}
                  >
                  <Input label='Nama Pemilik' placeholder="Masukan nama Pemilik" name="name" className='w-full h-12 border-2 border-slate-300 rounded-lg mt-2'/>
                </Form.Item>
              </div>

              <div className='mb-3'>
                <Label label="Email"/>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: <span className='text-xs'>Mohon masukan Email!</span>,
                    },
                  ]}
                  >
                  <Input label='Email' placeholder="Masukan email" name="email" className='w-full h-12 border-2 border-slate-300 rounded-lg mt-2'/>
                </Form.Item>
              </div>

              <div className='mb-3'>
                <Label label="Kata Sandi"/>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: <span className='text-xs'>Mohon masukan Kata Sandi!</span>,
                    },
                  ]}
                  >
                  <Input.Password label='Kata Sandi' placeholder="Buat Kata Sandi akun SmartGrosir" type='password' name="password" className='w-full h-12 border-2 border-slate-300 rounded-lg mt-2'/>
                </Form.Item>
              </div>

              <div className='mb-3'>
                <Label label="Konfirmasi Kata Sandi"/>
                <Form.Item
                  name="confirm_password"
                  rules={[
                    {
                      required: true,
                      message: <span className='text-xs'>Mohon masukan Kata Sandi!</span>,
                    },
                  ]}
                  >
                  <Input.Password label='Konfirmasi Kata Sandi' placeholder="Konfirmasi Kata Sandi" type='password' name="password" className='w-full h-12 border-2 border-slate-300 rounded-lg mt-2'/>
                </Form.Item>
              </div>

              <Button title="Selanjutnya"/>
              {/* <Link to={'/register_identitas_toko'}>
                <Button title="Selanjutnya"/>
              </Link> */}
            </Form>
          </div>
        </div>
      </section>
    </>
  );
}
