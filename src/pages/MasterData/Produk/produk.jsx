import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2'

// Icon
import { MdSave, BiSolidTrashAlt, BsGrid3X3GapFill } from '../../../utils/icons';

// Component
import Sidebar from '../../../Components/Sidebar';
import Navbar from '../../../Components/Navbar';

export default function DataProduk() {

  const [openSidebar, setOpenSidebar] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [submenuOpen2, setSubmenuOpen2] = useState(false);
  const [openDropdownProfile, setOpenDropdownProfile] = useState(false);

  // Cari Berdasarkan Nama
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const columnsProduk = [
    {
      title: 'No',
      dataIndex: 'id',
      width: '5%',
      align: 'center',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Kode',
      dataIndex: 'kode',
      width: '20px',
      align: 'center',
      ...getColumnSearchProps('kode'),
      sorter: (a, b) => a.kode - b.kode,
    },
    {
      title: 'Toko',
      dataIndex: 'toko',
      width: '20px',
      align: 'center',
      ...getColumnSearchProps('toko'),
      sorter: (a, b) => a.toko - b.toko,
    },
    {
      title: 'Nama Item',
      dataIndex: 'nama_item',
      width: '20px',
      align: 'center',
      ...getColumnSearchProps('nama_item'),
      sorter: (a, b) => a.nama_item.length - b.nama_item.length,
    },
    {
      title: 'Stok',
      dataIndex: 'stok',
      width: '5%',
      align: 'center',
      sorter: (a, b) => a.stok - b.stok,
    },
    {
      title: 'Harga Pokok',
      dataIndex: 'harga_pokok',
      width: '20px',
      align: 'center',
      sorter: (a, b) => a.harga_pokok - b.harga_pokok,
    },
    {
      title: 'Harga Jual',
      dataIndex: 'harga_jual',
      width: '20px',
      align: 'center',
      sorter: (a, b) => a.harga_jual - b.harga_jual,
    },
    {
      title: 'Aksi',
      dataIndex: 'aksi',
      align: 'center',
      width: '5%',
      render: (_, record) =>
        dataProduk.length >= 1 ? (
          <>
            <div className='flex justify-center mx-auto align-center items-center'>
              <button className='flex items-center justify-center text-xl p-1 text-blue-500 bg-blue-100 rounded-lg mr-2'><MdSave/></button>
              <button className='flex items-center justify-center text-xl p-1 text-red-500 bg-red-100 rounded-lg' onClick={() => handleDelete(record.id)}><BiSolidTrashAlt/></button>
            </div>
          </>
        ) : null,
    },
  ]

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apakah anda yakin ingin mengahpus data ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Dihapus!',
          'Data berhasil dihapus!',
          'success'
          )
        const newData = dataProduk.filter((item) => item.id !== id);
        setDataProduk(newData);
      }
    })
  };

  const [dataProduk, setDataProduk] = useState([])
  for(let i = 0; i < 10; i++){
    dataProduk.push({
      id: dataProduk.length + 1,
      kode: 'PRD-' + dataProduk.length,
      toko: 'Toko Sawarga',
      nama_item: 'Beras',
      stok: Math.floor(Math.random() * 100),
      harga_pokok: 'Rp 20.000',
      harga_jual: 'Rp 25.000',
    })
  }

  return(
    <main className="flex bg-blue-500 w-full h-full font-inter">
      
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} submenuOpen={submenuOpen} setSubmenuOpen={setSubmenuOpen} submenuOpen2={submenuOpen2} setSubmenuOpen2={setSubmenuOpen2} setOpenDropdownProfile={setOpenDropdownProfile}/>

      <div className='w-full h-fit z-5 lg:-z-0'>

        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} openDropdownProfile={openDropdownProfile} setOpenDropdownProfile={setOpenDropdownProfile}/>

        <div className=' bg-slate-100 w-full h-full p-7'>
          <div className='w-full h-full border-2 bg-white border-slate-300 rounded-xl p-5'>
            <div className='flex items-center pb-5 border-b-2 border-slate-300 justify-between'>
              <div className='flex'>
                <span className='text-blue-500 mr-4 text-2xl'><BsGrid3X3GapFill/></span>
                <h1 className='text-xl font-semibold'>Data Item</h1>
              </div>
              <Link to={'/data-umum'}>
                <div className='flex'>
                  <button className='px-5 py-2 rounded-lg text-white bg-blue-500'>Tambah Data</button>
                </div>
              </Link>
            </div>

            <div className='bg-red w-full h-screen mt-12'>
              <div>
                <Table
                  bordered
                  dataSource={dataProduk}
                  columns={columnsProduk}
                  onChange={onChange}
                  className='mb-10 overflow-x-auto'
                />
              </div>

            </div>
          </div>
        </div>

      </div>

    </main>
  )
}