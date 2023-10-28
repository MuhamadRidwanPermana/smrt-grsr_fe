import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Upload } from 'antd';

import ImgCrop from 'antd-img-crop';

import Image1 from '../assets/img/image_landingpage.png';
import Image2 from '../assets/img/image_landingpage2.png';
import Subtract3 from '../assets/img/Subtract3.svg';

import InputForm from '../Components/Elements/Input/InputForm';
import Header from '../Components/LoginRegisterComponents/Header';

export default function InformationPage() {

  const [Logo, setLogo] = useState('');
  const [Name, setName] = useState('');
  const [Alamat, setAlamat] = useState('');
  const [NoKontak, setNoKontak] = useState('');
  const [error, setError] = useState('');

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
    height: 'auto',
    width:'500px',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(Logo.length === 0 || Name.length === 0 || Alamat.length === 0 || NoKontak.length === 0){
      setError(true);
    }
    console.log(Name, Alamat, NoKontak);
  }

    const [fileList, setFileList] = useState([
      {
        uid: '-1',
        name: 'image.jpg',
        status: 'done',
        url: 'https://lh3.googleusercontent.com/pw/ADCreHc55u48dIILFqmiRzYwgkF8ugG5wn6a7WerMbIFlY_pM2N9REQyh__mb17hD2zqt8AD2oKGbPSf4_SfGWva_B91Sprv1kfbBUks3l1tpASLfHDu8R_4YEmcTRh6J0T87HiAp1OUtsww5FfXlM6JbVSqOlIf9u5-KQvw3gw0C8ITsuadT3kT-kYenNXbQe7eF1NCby2CfpAMxhzrw6PvES6wHmJLrdKEtV2XLI_Z4nAV7KzZ77aXNj1qd3qKAyaAuQrn5MZyPoObtD2NCZ8ec8ovurxt9RMrFcGN4Buc4MnPGrbKIHVujw7jGeX8sj-bqw3kAsu5LEeGb8zOjjai6yE22moTZVCTCyVoBT28DuTYOZvOYppV2Bm5JqSgT0QEvcDq17bHUDXi1g-24bqjF_t29sDEBalQUFXtwcgg6hR3Y-XrViZObtEjyR6haKRwu0Aa5na96mvLETHZYYL9rDwKpsZ6P8QzUZzmP-vAa22kl1Z-8EfyfmiGTOBu2NUx9R1WiRKk6K-Cft6IjC6bED7-nNU5O_hYeGt4brJP2TVaZ1MGJ6_nO6W3TMQV-a8dYbAUZPCw7B75GlHuA0kHk9sd1j4dVl1vT18TypfXTDD48IFpX8hB0BKEv270mlRBCfhTQL99QuuMleN78tiaF4btHn0pZGo8RhI0l5kQ9xXuuQdLrHR3-t2FvVtTX2JOI_OIeBY5aBgHbjQnMPIioLkcObKaDeAtCgSAVZ6mr88zuS5l_i4iEdfftBCmuhA6lIFV1bbV3Zhu7_gysczbEWs9sEAJsAQek5mNy7gjfXiopFdHSVY-FjLdgSR49ug-XexJxHfo01UYJPhL7jYcfzIMpe-7xfhreQ2jYGgYxBChJZslzR57V-OU-4Sg7yMfmSwEMMBuO8G5vMC-4Lggnu9uRH0QWvrXLgWGfRI63t0O0qEUbOlM0Xavt905TxI-7jMUfA1spOlBowE0m8UAyd_KM77KTxOO9WMNrznI5I3ciwrLlxF2aiXFXIrK8JS4knijQw=w196-h196-s-no-gm?authuser=3',
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
          <img src={Subtract3} alt="" className='absolute z-10 w-fit h-fit left-52 ml-3'/>
        </div>

        <div className='relative z-20 flex w-full h-fit justify-center lg:p-0 lg:mt-20 mt-0 p-5 lg:justify-evenly'>
          <div className="hidden lg:flex w-full px-5 lg:w-fit mt-10 lg:pt-11 items-center">
            <Carousel autoplay style={contentStyle}>
              <div>
                <img src={Image1} alt=""/>
              </div>
              <div>
                <img src={Image2} alt=""/>
              </div>
            </Carousel>
          </div>

          <div className="w-full px-5 lg:w-1/4">
            <Header header='Identitas Toko' subHeader='Lengkapi Informasi Toko'/>

            <form action="" onSubmit={handleSubmit}>

              <div className='mb-3'>
                <div className='mb-2'>
                  <label htmlFor="" className="text-blue-950 font-inter font-medium">Logo Toko</label>
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
                <InputForm label='Nama Toko' placeholder="Masukan nama toko" name="name" onChange={e=>setName(e.target.value)}/>
                {error ? <span className='text-red-500 text-sm'>Nama Toko harus di isi</span> : null}
              </div>

              <div className='mb-3'>
                <InputForm label='Alamat Toko' placeholder="Masukan alamat toko" name="text" onChange={e=>setAlamat(e.target.value)}/>
                {error ? <span className='text-red-500 text-sm'>Alamat Toko harus di isi</span> : null}
              </div>

              <div className='mb-3'>
                <InputForm label='No Kontak Toko' placeholder="ex. 081 234 567 890" name="text" onChange={e=>setNoKontak(e.target.value)}/>
                {error ? <span className='text-red-500 text-sm'>No Kontak Toko harus di isi</span> : null}
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
                  <Link to={'/dashboard'}>
                    <button className='w-full h-12 rounded-lg text-white bg-blue-500 disabled:bg-slate-300 ' disabled={btnStatus}>Daftar</button>
                  </Link>
                </div>
              </div>

            </form>

          </div>
        </div>
      </section>
    </>
  );
}
