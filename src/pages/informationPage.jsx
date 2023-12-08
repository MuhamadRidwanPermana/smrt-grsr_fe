import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Upload, Form, Input } from 'antd';
const { TextArea } = Input;
import ImgCrop from 'antd-img-crop';

import { Image1, Image3 } from '../utils/icons';

import Header from '../Components/LoginRegisterComponents/Header';
import Label from '../Components/Elements/Input/Label';

export default function InformationPage() {

  const [btnStatus, setBtnStatus] = useState(true);
  function handleChange(e) {
    const elements = document.getElementsByName('checkbox');
    let checkedCount = 0;
    elements.forEach((element)=>{
      if(element.checked){
        checkedCount ++;
      }
    })
    if(checkedCount > 1 || checkedCount === 0){
      setBtnStatus(true)
    }else{
      setBtnStatus(false)
    }
  }

  const contentStyle = {
    height: '350px',
    width: '500px',
  };

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.jpg",
      status: "done",
      url: "https://i.ibb.co/HB1k6w3/app-icon.jpg",
    },
  ]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  return (
    <>
      <section className='w-full h-fit p-5 lg:px-0 py-1 font-inter'>
        
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

          <div className="w-full px-5 lg:w-1/4 lg:-mt-7 mb-10">
            <Header header='Identitas Toko' subHeader='Lengkapi Informasi Toko'/>

            <Form action="" onSubmit="">

              <div className='mb-3'>
                <div className='mb-2'>
                  <label className="text-blue-950 font-inter font-medium">Logo Toko</label>
                </div>
                <div className='flex items-center align-middle'>
                  <div className='flex w-fit h-fit mr-5'>
                    <ImgCrop rotate>
                      <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-circle"
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={onPreview}
                      >
                        {fileList.length < 1 && '+ Upload'}
                      </Upload>
                    </ImgCrop>
                  </div>
                  <div className='mt-2'>
                    <h1 className='text-xs font-semibold'>PNG, JPG or JPEG, 2MB max.</h1>
                    <h1 className='text-xs text-slate-500'>Anda bisa unggah gambar nanti</h1>
                  </div>
                </div>
              </div>
              
              <div className='mb-3'>
                <Label label="Nama Toko"/>
                <Form.Item
                  name="nama_toko"
                  rules={[
                    {
                      required: true,
                      message: <span className='text-xs'>Mohon masukan Nama Toko Anda!</span>,
                    },
                  ]}
                  >
                  <Input placeholder="Masukan nama toko" name="nama_toko" className='w-full h-12 border-2 border-slate-300 rounded-lg mt-2'/>
                </Form.Item>
              </div>

              <div className='mb-3'>
                <Label label="Alamat Toko"/>
                <Form.Item
                  name="alamat_toko"
                  rules={[
                    {
                      required: true,
                      message: <span className='text-xs'>Mohon masukan Alamat Toko Anda!</span>,
                    },
                  ]}
                  >
                  <TextArea autoSize placeholder="Masukan alamat toko" name="alamat_toko" className='w-full py-3 border-2 border-slate-300 rounded-lg mt-2'/>
                </Form.Item>
              </div>

              <div className='mb-3'>
                <Label label="No Kontak Toko"/>
                <Form.Item
                  name="no_kontak"
                  rules={[
                    {
                      required: true,
                      message: <span className='text-xs'>Mohon masukan No Kontak Toko Anda!</span>,
                    },
                  ]}
                  >
                  <Input placeholder="ex. 081 234 567 890" name="no_kontak" className='w-full h-12 border-2 border-slate-300 rounded-lg mt-2'/>
                </Form.Item>
              </div>

              <div className='flex items-start my-3 font-inter text-sm'>
                <input type="checkbox" name='checkbox' className='w-5 h-5' onChange={handleChange} /> 
                <p className='mx-2 text-slate-500'>Saya setuju mengikuti layanan  
                  <Link to={'/kebijakan-privasi-pengguna'}>
                    <span className='text-blue-500'> kebijakan privasi </span>
                  </Link>
                pengguna</p>
              </div>  

              <div className='flex w-full items-center mt-5'>

                <div className='w-full font-inter'>
                  <Link to={'/login'}>
                    <button className='w-full h-12 rounded-lg text-white bg-blue-500 disabled:bg-slate-300 font-inter text-base' disabled={btnStatus}>Daftar</button>
                  </Link>
                </div>
              </div>

            </Form>

          </div>
        </div>
      </section>
    </>
  );
}
