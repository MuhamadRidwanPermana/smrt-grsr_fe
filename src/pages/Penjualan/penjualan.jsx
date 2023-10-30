import React, { useRef, useState } from 'react';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2'

// Icon
import { MdSave, BiSolidTrashAlt, BsGrid3X3GapFill } from '../../utils/icons';

// Component
import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar';

export default function Penjualan(){

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
  

  //Data Table 
  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      width: '5%',
      align: 'center',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Kode Transaksi',
      dataIndex: 'kode',
      width: '15%',
      align: 'center',
      ...getColumnSearchProps('kode'),
      sorter: (a, b) => a.kode.length - b.kode.length,
    },
    {
      title: 'Waktu Transaksi',
      dataIndex: 'waktu_transaksi',
      width: '16%',
      align: 'center',
      sorter: (a, b) => a.waktu_transaksi - b.waktu_transaksi,
    },
    {
      title: 'Nama Pelanggan',
      dataIndex: 'nama',
      width: '20px',
      align: 'center',
      ...getColumnSearchProps('nama'),
      sorter: (a, b) => a.nama.length - b.nama.length,
    },
    {
      title: 'Nomor HP',
      dataIndex: 'no_hp',
      width: '10%',
      align: 'center',
      sorter: (a, b) => a.no_hp - b.no_hp,
    },
    {
      title: 'Status Transaksi',
      dataIndex: 'status_transaksi',
      width: '17%',
      align: 'center',
      sorter: (a, b) => a.status_transaksi.length - b.status_transaksi.length,
      filters: [
        {
          text: 'Selesai',
          value: 'Selesai',
        },
        {
          text: 'Pending',
          value: 'Pending',
        },
        {
          text: 'Belum Selesai',
          value: 'Belum Selesai',
        },
      ],
      onFilter: (value, record) => record.status_transaksi.indexOf(value) === 0,
    },
    {
      title: 'Aksi',
      dataIndex: 'aksi',
      align: 'center',
      width: '5%',
      render: (_, record) =>
        dataPenjualan.length >= 1 ? (
          <>
            <div className='flex justify-center mx-auto align-center items-center'>
              <button className='flex items-center justify-center text-xl p-1 text-blue-500 bg-blue-100 rounded-lg mr-2'><MdSave/></button>
              <button className='flex items-center justify-center text-xl p-1 text-red-500 bg-red-100 rounded-lg' onClick={() => handleDelete(record.id)}><BiSolidTrashAlt/></button>
            </div>
          </>
        ) : null,
    },
  ]

  const [dataPenjualan, setDataPenjualan] = useState([
    {
      id: 1,
      kode: 'PRJM-UTN-001',
      waktu_transaksi: '09-10-2023 14:40:08',
      nama: 'Ridwan',
      no_hp: '081234567890',
      status_transaksi: <span className='text-green-500 font-semibold'>Selesai</span>,
    },
    {
      id: 2,
      kode: 'PRJM-UTN-002',
      waktu_transaksi: '20-01-2023 09:10:58',
      nama: 'Fairuz',
      no_hp: '081234567890',
      status_transaksi: <span className='text-red-500 font-semibold'>Belum Selesai</span>,
    },
    {
      id: 3,
      kode: 'PRJM-UTN-003',
      waktu_transaksi: '22-12-2023 11:28:43',
      nama: 'Agung',
      no_hp: '081234567890',
      status_transaksi: <span className='text-orange-300 font-semibold'>Pending</span>,
    },
  ])

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
        const newData = dataPenjualan.filter((item) => item.id !== id);
        setDataPenjualan(newData);
      }
    })
  };

  // Generate Random String
  // const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  // function generateString(length) {
  //   let result = ' ';
  //   const charactersLength = characters.length;
  //   for ( let i = 0; i < length; i++ ) {
  //       result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }

  //   return result;
  // }

  // const data = []
  // for (let i = 1; i < 100 ; i++) {
  //   data.push({
  //     no: i,
  //     kode: 'PRJM-UTN-' + Math.floor(Math.random() * 10000),
  //     waktu_transaksi: '09-10-2023 14:40:08',
  //     nama: generateString(5),
  //     no_hp: '082' + Math.floor(Math.random() * 1000000000),
  //     status_transaksi: 'Selesai', 
  //   });
  // }


  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return(
    <main className="flex bg-blue-500 w-full h-fit font-inter">
      
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} submenuOpen={submenuOpen} setSubmenuOpen={setSubmenuOpen} submenuOpen2={submenuOpen2} setSubmenuOpen2={setSubmenuOpen2} setOpenDropdownProfile={setOpenDropdownProfile}/>

      <div className='w-full h-fit z-5 lg:-z-0'>

        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} openDropdownProfile={openDropdownProfile} setOpenDropdownProfile={setOpenDropdownProfile}/>

        <div className=' bg-slate-100 w-full h-auto p-7 pb-72'>
          <div className='w-full h-auto border-2 bg-white border-slate-300 rounded-xl p-5'>
            <div className='flex items-center pb-5 border-b-2 border-slate-300'>
              <span className='text-blue-500 mr-4 text-2xl'><BsGrid3X3GapFill/></span>
              <h1 className='text-xl font-semibold'>Data Penjualan</h1>
            </div>

            <div className='w-auto h-auto mt-12'>
              <div className='w-auto h-auto'>
                <Table
                  bordered
                  dataSource={dataPenjualan}
                  columns={columns}
                  onChange={onChange}
                  className='mb-10 overflow-x-auto'
                  >
                </Table>
              </div>
            </div>
          </div>
        </div>

      </div>

    </main>
  )
}