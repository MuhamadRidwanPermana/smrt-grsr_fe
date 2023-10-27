import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//page
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import InformationPage from './pages/informationPage'
import Dashboard from './pages/dashboard'
import Kasir from './pages/Penjualan/kasir'
import Penjualan from './pages/Penjualan/penjualan'
import Persediaan from './pages/Penjualan/persediaan'
import Pembelian from './pages/Pembelian/pembelian'
import ProsesPembelian from './pages/Pembelian/prosesPembelian'
import DataProduk from './pages/MasterData/Produk/produk'
import DataUmum from './pages/MasterData/Produk/UbahDataItem/dataUmum'
import SatuanDanHarga from './pages/MasterData/Produk/UbahDataItem/satuanDanHarga'
import DataSplier from './pages/MasterData/dataSuplier'
import DataPelanggan from './pages/MasterData/dataPelanggan'
import Pengaturan from './pages/settings'

import Coba from './pages/coba'


const router = createBrowserRouter([
  {
    path:"/coba",
    element: <Coba />
  },
  {
    path:"/",
    element: <App />
  },
  {
    path:"/login",
    element: <LoginPage />
  },
  {
    path:"/register",
    element: <RegisterPage />
  },
  {
    path:"/information",
    element: <InformationPage />
  },
  {
    path:"/dashboard",
    element: <Dashboard />
  },
  {
    path:"/kasir",
    element: <Kasir />
  },
  {
    path:"/penjualan",
    element: <Penjualan />
  },
  {
    path:"/persediaan",
    element: <Persediaan />
  },
  {
    path:"/pembelian",
    element: <Pembelian />
  },
  {
    path:"/proses-pembelian",
    element: <ProsesPembelian />
  },
  {
    path:"/produk",
    element: <DataProduk />
  },
  {
    path:"/data-umum",
    element: <DataUmum />
  },
  {
    path:"/satuan-dan-harga",
    element: <SatuanDanHarga />
  },
  {
    path:"/data-suplier",
    element: <DataSplier />
  },
  {
    path:"/data-pelanggan",
    element: <DataPelanggan />
  },
  {
    path:"/settings",
    element: <Pengaturan />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
