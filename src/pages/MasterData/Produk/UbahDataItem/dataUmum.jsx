import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Select, InputNumber } from 'antd';

// Icon
import { BsGrid3X3GapFill } from '../../../../utils/icons';

// Component
import Sidebar from '../../../../Components/Sidebar';
import Navbar from '../../../../Components/Navbar';

export default function dataUmum(){

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

        <div className=' bg-slate-100 w-full h-screen p-7'>
          <div className='w-full h-fit border-2 bg-white border-slate-300 rounded-xl p-5'>
            <div className='flex items-center pb-5 border-b-2 border-slate-300'>
              <span className='text-blue-500 mr-4 text-2xl'><BsGrid3X3GapFill/></span>
              <h1 className='text-xl font-semibold'>Ubah Data Item</h1>
            </div>

            <div className='flex my-5'>
              <Link to={'/data-umum'}>
                <button className='px-5 py-2 rounded-lg text-white bg-blue-500 mr-5 duration-300'>Data Umum</button>
              </Link>
              <Link to={'/satuan-dan-harga'}>
                <button className='px-5 py-2 rounded-lg hover:text-white  hover:bg-blue-500 hover:duration-300'>Satuan dan Harga</button>
              </Link>
            </div>

            <div>
              <div className='flex justify-between w-full h-full mt-5'>
                <div className='w-1/2 pr-3'>
                  <div className='block my-5'>
                    <label htmlFor="barang" className='font-semibold'>Tipe Item</label>
                    <Select
                      className='w-full h-9 mt-2'
                      showSearch
                      placeholder="Pilih tipe Item"
                      optionFilterProp="children"
                      onChange={onInput}
                      onSearch={onSearch}
                      filterOption={filterOption}
                      options={[
                        {
                          value: 'barang',
                          label: 'Barang',
                        },
                        {
                          value: 'jasa',
                          label: 'Jasa',
                        },
                      ]}
                    />
                  </div>
                  <div className='block my-5'>
                    <label htmlFor="kode_item" className='font-semibold'>Kode Item</label>
                    <Input className='w-full h-9 border border-slate-300 rounded-md px-3 mt-2 bg-white'/>
                  </div>
                  <div className='block my-5'>
                    <label htmlFor="barang" className='font-semibold'>Jenis</label>
                    <Select
                      className='w-full h-9 mt-2'
                      showSearch
                      placeholder="Pilih Jenis Item"
                      optionFilterProp="children"
                      onChange={onInput}
                      onSearch={onSearch}
                      filterOption={filterOption}
                      options={[
                        {
                          value: 'jenis1',
                          label: 'Jenis 1',
                        },
                        {
                          value: 'jenis2',
                          label: 'Jenis 2',
                        },
                        {
                          value: 'jenis3',
                          label: 'Jenis 3',
                        },
                      ]}
                    />
                  </div>
                  <div className='block my-5'>
                    <label htmlFor="barang" className='font-semibold'>Merk</label>
                    <Select
                      className='w-full h-9 mt-2'
                      showSearch
                      placeholder="Pilih Merk"
                      optionFilterProp="children"
                      onChange={onInput}
                      onSearch={onSearch}
                      filterOption={filterOption}
                      options={[
                        {
                          value: 'merk1',
                          label: 'Merk 1',
                        },
                        {
                          value: 'merk1',
                          label: 'Merk 2',
                        },
                        {
                          value: 'merk1',
                          label: 'Merk 3',
                        },
                      ]}
                    />
                  </div>
                </div>
                <div className='w-1/2 pl-3'>
                  <div className='block my-5'>
                    <label htmlFor="barang" className='font-semibold'>Status Jual</label>
                    <Select
                      className='w-full h-9 mt-2'
                      showSearch
                      placeholder="Pilih Status Jual"
                      optionFilterProp="children"
                      onChange={onInput}
                      onSearch={onSearch}
                      filterOption={filterOption}
                      options={[
                        {
                          value: 'masih_dijual',
                          label: 'Masih DiJual',
                        },
                        {
                          value: 'sudah_terjual',
                          label: 'Sudah Terjual',
                        },
                      ]}
                    />
                  </div>
                  <div className='block my-5'>
                    <label htmlFor="kode_item" className='font-semibold'>Tipe Item</label>
                    <Input className='w-full h-9 border border-slate-300 rounded-md px-3 mt-2 bg-white'/>
                  </div>
                  <div className='my-5'>
                    <label htmlFor="barang" className='font-semibold'>Stok Minimum</label>
                    <div>
                      <InputNumber min={1} max={10} onChange={onChange} className='w-full h-9 border border-slate-300 rounded-md mt-2 bg-white'/>
                    </div>
                  </div>
                </div>
              </div>

              <button className='flex px-7 py-2 ml-auto rounded-lg text-white bg-blue-500'>Simpan</button>
            </div>

          </div>
        </div>

      </div>

    </main>
  )
}