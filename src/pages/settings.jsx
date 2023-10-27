import React, { useState } from 'react';
import { BsGrid3X3GapFill } from 'react-icons/bs';

// Component
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import InputForm from '../Components/Elements/Input/InputForm';

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

  return(
    <main className="flex bg-blue-500 w-full h-fit font-inter">
      
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} submenuOpen={submenuOpen} setSubmenuOpen={setSubmenuOpen} submenuOpen2={submenuOpen2} setSubmenuOpen2={setSubmenuOpen2} setOpenDropdownProfile={setOpenDropdownProfile}/>

      <div className='w-full h-fit z-5 lg:-z-0'>

        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} openDropdownProfile={openDropdownProfile} setOpenDropdownProfile={setOpenDropdownProfile}/>

        <div className=' bg-slate-100 w-full h-screen p-7 pb-72'>
          <div className='w-full h-auto border-2 bg-white border-slate-300 rounded-xl p-5'>
            <div className='flex items-center justify-between'>
              <div>
                <div className='mb-3'>
                  <InputForm label='Email' placeholder="Masukan email" name="email" onChange={e=>setEmail(e.target.value)} className='w-full'/>
                  {error ? <span className='text-red-500 text-sm'>Email harus di isi</span> : null}
                </div>
              </div>
              <div>
                
              </div>
            </div>
          </div>
        </div>

      </div>

    </main>
  )
}