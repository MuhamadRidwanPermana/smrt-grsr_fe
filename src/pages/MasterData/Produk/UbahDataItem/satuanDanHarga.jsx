import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Select, InputNumber } from 'antd';

// Icon
import { BsGrid3X3GapFill } from '../../../../utils/icons';

// Component
import Sidebar from '../../../../Components/Sidebar';
import Navbar from '../../../../Components/Navbar';

export default function satuanDanHarga(){

  const [openSidebar, setOpenSidebar] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [submenuOpen2, setSubmenuOpen2] = useState(false);
  const [openDropdownProfile, setOpenDropdownProfile] = useState(false);

  // Cari Barang
  const onInput = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };
  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const onChange = (value) => {
    console.log('changed', value);
  };

  return(
    <main className="flex bg-blue-500 w-full h-full font-inter">
      
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} submenuOpen={submenuOpen} setSubmenuOpen={setSubmenuOpen} submenuOpen2={submenuOpen2} setSubmenuOpen2={setSubmenuOpen2} setOpenDropdownProfile={setOpenDropdownProfile}/>

      <div className='w-full h-fit z-5 lg:-z-0'>

        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} openDropdownProfile={openDropdownProfile} setOpenDropdownProfile={setOpenDropdownProfile}/>

        <div className=' bg-slate-100 w-full h-full p-7'>
          <div className='w-full h-full border-2 bg-white border-slate-300 rounded-xl p-5'>
            <div className='flex items-center pb-5 border-b-2 border-slate-300'>
              <span className='text-blue-500 mr-4 text-2xl'><BsGrid3X3GapFill/></span>
              <h1 className='text-xl font-semibold'>Ubah Data Item</h1>
            </div>

            <div className='flex my-5'>
              <Link to={'/data-umum'}>
                <button className='px-5 py-2 rounded-lg text-dark bg-white mr-5 hover:text-white  hover:bg-blue-500 hover:duration-300'>Data Umum</button>
              </Link>
              <Link to={'/satuan-dan-harga'}>
                <button className='px-5 py-2 rounded-lg text-white bg-blue-500 duration-300'>Satuan dan Harga</button>
              </Link>
            </div>

            <div className='flex justify-between w-full h-fit'>
              <div className='block w-full h-full  m-5 ml-0'>
                <div className='w-full h-52 shadow-slate-400 shadow-md rounded-lg bg-white mb-5'>
                  <h1 className='font-semibold text-lg p-5'>Daftar Konversi</h1>
                  <div className='flex items-center justify-center'>
                    <p className='flex items-center justify-center mt-10'>Anda belum mempunyai Konversi</p>
                  </div>
                </div>
                <div className='flex items-center justify-center w-full h-52 shadow-slate-400 shadow-md rounded-lg bg-green-200 mb-5'>
                  <div className='text-green-700'>
                    <h1 className='font-semibold text-lg'>KETERANGAN :</h1>
                    <p>Satuan yang pertama dimasukan akan menjadi satuan dasar</p>
                  </div>
                </div>
                <div className='flex items-center px-14 w-full h-52 shadow-slate-400 shadow-md rounded-lg bg-red-200 mb-5'>
                  <div className='text-red-700'>
                    <h1 className='font-semibold text-lg'>WARNING :</h1>
                    <p>Mohon masukan minimal 1 data konversi</p>
                  </div>
                </div>
              </div>
              <div className=' w-full h-fit m-5 mr-0'>
                <div className='bg-white shadow-slate-400 shadow-md w-full h-fit rounded-lg  p-5'>
                  <h1 className='font-semibold text-lg '>Tambah Satuan</h1>
                  <div>
                    <div className='flex my-5 align-middle items-center'>
                      <label htmlFor="barang" className='font-semibold w-40 h-fit'>Satuan</label>
                      <Select
                        className='w-3/4 h-9 mt-2'
                        showSearch
                        placeholder="Pilih Satuan"
                        optionFilterProp="children"
                        onChange={onInput}
                        onSearch={onSearch}
                        filterOption={filterOption}
                        options={[
                          {
                            value: 'bungkus',
                            label: 'Bungkus',
                          },
                          {
                            value: 'pcs',
                            label: 'Pcs',
                          },
                          {
                            value: 'dus',
                            label: 'Dus',
                          },
                          {
                            value: 'kg',
                            label: 'Kilogram',
                          },
                        ]}
                      />
                    </div>
                    <div className='flex my-5 align-middle items-center'>
                      <label htmlFor="barang" className='font-semibold w-40 h-fit'>Jumlah Konversi</label>
                      <InputNumber min={1} max={10} onChange={onChange} className='w-3/4 h-9 border border-slate-300 rounded-md mt-2 bg-white'/>
                    </div>
                    <div className='flex my-5 align-middle items-center'>
                      <label htmlFor="barang" className='font-semibold w-40 h-fit'>Harga Pokok</label>
                      <InputNumber 
                        min={1} 
                        max={100000000} 
                        onChange={onChange} 
                        formatter={(value) => `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')} 
                        className='w-3/4 h-9 border border-slate-300 rounded-md mt-2 bg-white'
                      />
                    </div>
                    <div className='flex my-5 align-middle items-center'>
                      <label htmlFor="barang" className='font-semibold w-40 h-fit'>Harga Jual</label>
                      <InputNumber 
                        min={1} 
                        max={100000000} 
                        onChange={onChange} 
                        formatter={(value) => `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')} 
                        className='w-3/4 h-9 border border-slate-300 rounded-md mt-2 bg-white'
                      />
                    </div>
                  </div>
                  <button className='flex px-7 py-2 ml-auto rounded-lg text-white bg-blue-500 mt-8 mb-9'>Tambah Satuan</button>
                </div>

                  <button className='flex px-7 py-2 ml-auto rounded-lg text-white bg-blue-500 mt-5 mb-2'>Simpan</button>

              </div>
            </div>
          </div>
        </div>

      </div>

    </main>
  )
}