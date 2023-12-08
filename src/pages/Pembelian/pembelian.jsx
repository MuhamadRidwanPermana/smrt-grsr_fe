import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2'

// Icon
import { BiSolidTrashAlt, BsGrid3X3GapFill, FaPlus } from '../../utils/icons';

// Component
import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar';

export default function Pembelian() {

  const [openSidebar, setOpenSidebar] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [submenuOpen2, setSubmenuOpen2] = useState(false);

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

  const [page, setPage] = useState(1);

  const columnsDataPembelian = [
    {
      title: 'No',
      dataIndex: 'id',
      width: '5%',
      align: 'center',
      sorter: (a, b) => a.id - b.id,
      render: (_, record, index) => index + 1 + (10 * (page - 1)),
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
      title: 'Nama Sales',
      dataIndex: 'nama_sales',
      width: '20px',
      align: 'center',
      ...getColumnSearchProps('nama_sales'),
      sorter: (a, b) => a.nama_sales.length - b.nama_sales.length,
    },
    {
      title: 'Tanggal',
      dataIndex: 'tanggal',
      width: '20px',
      align: 'center',
      sorter: (a, b) => a.tanggal - b.tanggal,
    },
    {
      title: 'Aksi',
      dataIndex: 'aksi',
      align: 'center',
      width: '5%',
      render: (_, record) =>
        dataPembelian.length >= 1 ? (
          <>
            <div className='flex justify-center mx-auto align-center items-center'>
              {/* <button className='flex items-center justify-center text-xl p-1 text-blue-500 bg-blue-100 rounded-lg mr-2'><MdSave/></button> */}
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
      confirmButtonColor: "#3B82F6",
      cancelButtonColor: '#d33',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Data berhasil dihapus",
          showConfirmButton: false,
          timer: 1500,
          width: "400px",
        });
        const newData = dataPembelian.filter((item) => item.id !== id);
        setDataPembelian(newData);
      }
    })
  };

  const [dataPembelian, setDataPembelian] = useState([
    {
      id: 1,
      kode: 'PNJ-UTN-'+ Math.floor(Math.random() * 10000),
      nama_sales: 'Toko Grosir',
      tanggal: '01-01-2022',
    }
  ])

  return(
    
    <main className="flex bg-blue-500 w-full h-full font-inter">
      
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} submenuOpen={submenuOpen} setSubmenuOpen={setSubmenuOpen} submenuOpen2={submenuOpen2} setSubmenuOpen2={setSubmenuOpen2} />

      <div className='w-full h-fit z-5 lg:-z-0'>

        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

        <div className='bg-slate-100 w-full min-h-[calc(100vh-64px)] lg:p-5 p-4'>
          <div className='w-full h-fit border-2 bg-white border-slate-300 rounded-xl p-5'>

            <div className='Pembelian'>
              <header className='flex items-center pb-5 border-b-2 border-slate-300 justify-between'>
                <div className='flex items-center'>
                  <span className='text-blue-500 mr-4 text-2xl'><BsGrid3X3GapFill/></span>
                  <h1 className='text-xl font-semibold'>Data Pembelian</h1>
                </div>
                <Link to={'/pembelian/proses-pembelian'}>
                  <div className='flex'>
                    <button className='px-5 py-2 rounded-lg text-white bg-blue-500 lg:flex hidden'>Tambah Data</button>
                    <button className='px-2 py-2 rounded-lg text-white bg-blue-500 flex lg:hidden'>
                      <FaPlus/>
                    </button>
                  </div>
                </Link>
              </header>

              <body>
                <Table
                  pagination={{
                    pageSize: 10,
                    onChange(current) {
                      setPage(current);
                    }
                  }}
                  bordered
                  dataSource={dataPembelian}
                  columns={columnsDataPembelian}
                  className='mt-10 overflow-x-auto'
                /> 
              </body>
            </div>
          </div>
        </div>

      </div>

    </main>
  )
}