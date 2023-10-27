import  React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Component
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    name: "Jan",
    uv: 0,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Feb",
    uv: 50000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Mar",
    uv: 150000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Apr",
    uv: 200000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Mei",
    uv: 400000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Jun",
    uv: 550000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Jul",
    uv: 350000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Agu",
    uv: 250000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Sep",
    uv: 600000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Okt",
    uv: 650000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Nov",
    uv: 650000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Des",
    uv: 650000,
    pv: 1398,
    amt: 2210
  },
];

export default function Dashboard() {
  
  const [openSidebar, setOpenSidebar] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [submenuOpen2, setSubmenuOpen2] = useState(false);
  const [openDropdownProfile, setOpenDropdownProfile] = useState(false);

  return(
    <main className="flex bg-slate-100 w-full h-fit font-inter">
      
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} submenuOpen={submenuOpen} setSubmenuOpen={setSubmenuOpen} submenuOpen2={submenuOpen2} setSubmenuOpen2={setSubmenuOpen2} setOpenDropdownProfile={setOpenDropdownProfile}/>

      <div className='w-full h-fit z-5 lg:-z-0'>

        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} openDropdownProfile={openDropdownProfile} setOpenDropdownProfile={setOpenDropdownProfile}/>

        <div className=' bg-slate-100 w-full h-full p-7'>
          <div className="lg:grid lg:grid-cols-3 gap-7 block">
            <div className='bg-white w-full h-fit p-7 rounded-2xl mb-5 lg:mb-0'>
              <div className='mb-7'>
                <h1 className='font-medium text-lg text-slate-400'>Total Pendapatan Bulan ini</h1>
                <h1 className='font-bold text-2xl'>Rp. 0</h1>
              </div>
              <div className=''>
                <h1 className='font-medium text-lg text-slate-400'>Total Pendapatan Hari ini</h1>
                <h1 className='font-bold text-2xl'>Rp. 0</h1>
              </div>
            </div>
            <div className='bg-white w-full h-fit p-7 rounded-2xl mb-5 lg:mb-0'>
              <div className='mb-7'>
                <h1 className='font-medium text-lg text-slate-400'>Penjualan Bulan ini</h1>
                <h1 className='font-bold text-2xl'>Rp. 0</h1>
              </div>
              <div className=''>
                <h1 className='font-medium text-lg text-slate-400'>Penjualan Hari ini</h1>
                <h1 className='font-bold text-2xl'>Rp. 0</h1>
              </div>
            </div>
            <div className='bg-white w-full h-fit p-7 rounded-2xl mb-5 lg:mb-0'>
              <div className='mb-7'>
                <h1 className='font-medium text-lg text-slate-400'>Penjualan Offline Hari ini</h1>
                <h1 className='font-bold text-2xl'>0</h1>
              </div>
              <div className=''>
                <h1 className='font-medium text-lg text-slate-400'>Penjualan Online Hari ini</h1>
                <h1 className='font-bold text-2xl'>0</h1>
              </div>
            </div>
          </div>
          <div className='bg-white w-full h-fit p-7 rounded-2xl mt-7 pl-6 lg:pl-10'>
            <h1 className='font-bold text-xl text-center lg:text-start lg:text-2xl mb-10'>Grafik Penjualan Tahun 2023</h1>
            <div style={{ width: '99%', height: 300 }}>
              <ResponsiveContainer>
                <AreaChart
                  data={data}
                  margin={{
                    top: 20,
                    right: 20,
                    left: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="uv" stroke="#3B82F6" fill="#3B82F6" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}