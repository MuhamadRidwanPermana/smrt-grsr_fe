import React, { useState } from 'react';
import { BsGrid3X3GapFill } from 'react-icons/bs';
import { Upload, Input } from 'antd';
import ImgCrop from 'antd-img-crop';

// Component
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import InputForm from '../Components/Elements/Input/InputForm';
import Header from '../Components/LoginRegisterComponents/Header/index'
import Button from '../Components/Elements/Button';

export default function Penjualan(){

  const [openSidebar, setOpenSidebar] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [submenuOpen2, setSubmenuOpen2] = useState(false);
  const [openDropdownProfile, setOpenDropdownProfile] = useState(false);

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

  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.jpg',
      status: 'done',
      // url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
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

  return(
    <main className="flex bg-blue-500 w-full h-fit font-inter">
      
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} submenuOpen={submenuOpen} setSubmenuOpen={setSubmenuOpen} submenuOpen2={submenuOpen2} setSubmenuOpen2={setSubmenuOpen2} setOpenDropdownProfile={setOpenDropdownProfile}/>

      <div className='w-full h-fit z-5 lg:-z-0'>

        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} openDropdownProfile={openDropdownProfile} setOpenDropdownProfile={setOpenDropdownProfile}/>

        <div className=' bg-slate-100 w-full min-h-[calc(100vh-64px)] lg:p-5 p-4'>
          <div className='w-full h-auto border-2 bg-white border-slate-300 rounded-xl lg:py-16'>
            <form action="" onSubmit={handleSubmit}>
              <div className='block lg:flex lg:justify-between'>
                <div className='w-full lg:border-r-2 border-slate-300 lg:px-24 lg:py-16 p-10'>
                  <Header header='Pengaturan Toko' subHeader='Ubah informasi toko'/>

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

                </div>

                <div className='w-full lg:px-24 lg:py-16 p-10 lg:border-0 border-t-2 border-slate-300'>
                  <Header header='Pengaturan Akun' subHeader='Ubah informasi akun'/>
                  <div className='mb-3'>
                    <InputForm label='Nama Pemilik' placeholder="Masukan nama pemilik" name="name" onChange={e=>setName(e.target.value)}/>
                    {error ? <span className='text-red-500 text-sm'>Nama Pemilik harus di isi</span> : null}
                  </div>

                  <div className='mb-3'>
                    <InputForm label='Email' placeholder="Masukan email" name="email" onChange={e=>setEmail(e.target.value)}/>
                    {error ? <span className='text-red-500 text-sm'>Email harus di isi</span> : null}
                  </div>

                  <div className='mb-3'>
                    <label htmlFor="password" className="text-blue-950 font-inter font-medium">Masukan Kata Sandi Lama</label>  <span className="text-red-500">*</span>
                    <Input.Password placeholder="Buat kata sandi akun SmartGrosir" className='w-full h-12 border-2 border-slate-300 rounded-lg mt-3'/>
                    {error ? <span className='text-red-500 text-sm'>Kata Sandi harus lebih dari 8 karakter</span> : null}
                  </div>

                  <div className='mb-3'>
                    <label htmlFor="password" className="text-blue-950 font-inter font-medium">Masukan Kata Sandi Baru</label>  <span className="text-red-500">*</span>
                    <Input.Password placeholder="Konfirmasi kata sandi" className='w-full h-12 border-2 border-slate-300 rounded-lg mt-3'/>
                    {error ? <span className='text-red-500 text-sm'>Kata Sandi harus lebih dari 8 karakter</span> : null}
                  </div>

                  <div className='mb-3'>
                    <label htmlFor="password" className="text-blue-950 font-inter font-medium">Konfirmasi Kata Sandi Baru</label>  <span className="text-red-500">*</span>
                    <Input.Password placeholder="Konfirmasi kata sandi" className='w-full h-12 border-2 border-slate-300 rounded-lg mt-3'/>
                    {error ? <span className='text-red-500 text-sm'>Kata Sandi harus lebih dari 8 karakter</span> : null}
                  </div>

                  <button className='lg:w-1/2 w-full lg:my-3 mt-5 p-3 bg-blue-500 text-white rounded-lg' >Simpan Perubahan</button>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>

    </main>
  )
}