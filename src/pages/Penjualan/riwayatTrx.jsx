import React, { useRef, useState, useEffect } from 'react';
import { Button, Input, Space, Table, Tag } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2'
import axios from 'axios';

// Icon
import { BiSolidTrashAlt, BsGrid3X3GapFill } from '../../utils/icons';

// Component
import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar';
import Column from 'antd/es/table/Column';

export default function Penjualan(){

  const [openSidebar, setOpenSidebar] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(true);
  const [submenuOpen2, setSubmenuOpen2] = useState(false);

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

  const [page, setPage] = useState(1);

  //Data Table 
  const columnsPenjualan = [
    {
      title: 'No',
      dataIndex: 'id_trx',
      width: '5%',
      align: 'center',
      sorter: (a, b) => a.id_trx - b.id_trx,
      render: (_, record, index) => index + 1 + (10 * (page - 1)),
    },
    {
      title: 'Kode Transaksi',
      dataIndex: 'kode_trx',
      width: '15%',
      align: 'center',
      ...getColumnSearchProps('kode_trx'),
      sorter: (a, b) => a.kode_trx.length - b.kode_trx.length,
    },
    {
      title: 'Nama Pelanggan',
      dataIndex: 'nama_plg',
      width: '20px',
      align: 'center',
      ...getColumnSearchProps('nama_plg'),
      sorter: (a, b) => a.nama_plg.length - b.nama_plg.length,
    },
    {
      title: 'Total Qty',
      dataIndex: 'tot_qty',
      width: '20px',
      align: 'center',
      ...getColumnSearchProps('tot_qty'),
      sorter: (a, b) => a.tot_qty.length - b.tot_qty.length,
    },
    {
      title: 'Total Harga',
      dataIndex: 'tot_trx',
      width: '20px',
      align: 'center',
      ...getColumnSearchProps('tot_trx'),
      sorter: (a, b) => a.tot_trx.length - b.tot_trx.length,
      render: (_, record) => (
        record.tot_trx.toLocaleString('id-ID')
      )
    },
    {
      title: 'Waktu Transaksi',
      dataIndex: 'tgl_trx',
      width: '16%',
      align: 'center',
      sorter: (a, b) => a.tgl_trx - b.tgl_trx,
    },
    // {
    //   title: 'Status Transaksi',
    //   dataIndex: 'status_trx',
    //   key: 'status_trx',
    //   width: '17%',
    //   align: 'center',
    //   sorter: (a, b) => a.status_trx.length - b.status_trx.length,
    //   filters: [
    //     {
    //       text: 'Selesai',
    //       value: 'Selesai',
    //     },
    //     {
    //       text: 'Pending',
    //       value: 'Pending',
    //     },
    //     {
    //       text: 'Belum Selesai',
    //       value: 'Belum Selesai',
    //     },
    //   ],
    //   onFilter: (value, record) => record.status_trx.indexOf(value) === 0,
    //   render: (_, { status_trx }) => (
    //     <>
    //       {status_trx.map((bg_status_trx) => {
    //         let color;
    //         if (bg_status_trx === 'Pending') {
    //           color = '#FFB700';
    //         }else if (bg_status_trx === 'Selesai') {
    //           color = '#00B74B';
    //         }else if (bg_status_trx === 'Belum Selesai') {
    //           color = '#EF4444';
    //         }
    //         return (
    //           <Tag color={color} key={bg_status_trx}>
    //             {bg_status_trx.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: 'Aksi',
      dataIndex: 'aksi',
      align: 'center',
      width: '5%',
      render: (_, record) =>
        dataPenjualan.length >= 1 ? (
          <>
            <div className='flex justify-center mx-auto align-center items-center'>
              {/* <button className='flex items-center justify-center text-xl p-1 text-blue-500 bg-blue-100 rounded-lg mr-2'><MdSave/></button> */}
              <button className='flex items-center justify-center text-xl p-1 text-red-500 bg-red-100 rounded-lg' onClick={() => handleDelete(record.id_trx)}><BiSolidTrashAlt/></button>
            </div>
          </>
        ) : null,
    },
  ]
  // const columnsPenjualan = [
  //   {
  //     title: 'No',
  //     dataIndex: 'id',
  //     width: '5%',
  //     align: 'center',
  //     sorter: (a, b) => a.id - b.id,
  //   },
  //   {
  //     title: 'Kode Transaksi',
  //     dataIndex: 'kode',
  //     width: '15%',
  //     align: 'center',
  //     ...getColumnSearchProps('kode'),
  //     sorter: (a, b) => a.kode.length - b.kode.length,
  //   },
  //   {
  //     title: 'Waktu Transaksi',
  //     dataIndex: 'waktu_transaksi',
  //     width: '16%',
  //     align: 'center',
  //     sorter: (a, b) => a.waktu_transaksi - b.waktu_transaksi,
  //   },
  //   {
  //     title: 'Nama Pelanggan',
  //     dataIndex: 'nama',
  //     width: '20px',
  //     align: 'center',
  //     ...getColumnSearchProps('nama'),
  //     sorter: (a, b) => a.nama.length - b.nama.length,
  //   },
  //   {
  //     title: 'Nomor HP',
  //     dataIndex: 'no_hp',
  //     width: '13%',
  //     align: 'center',
  //     sorter: (a, b) => a.no_hp - b.no_hp,
  //   },
  //   {
  //     title: 'Status Transaksi',
  //     dataIndex: 'status_transaksi',
  //     key: 'status_transaksi',
  //     width: '17%',
  //     align: 'center',
  //     sorter: (a, b) => a.status_transaksi.length - b.status_transaksi.length,
  //     filters: [
  //       {
  //         text: 'Selesai',
  //         value: 'Selesai',
  //       },
  //       {
  //         text: 'Pending',
  //         value: 'Pending',
  //       },
  //       {
  //         text: 'Belum Selesai',
  //         value: 'Belum Selesai',
  //       },
  //     ],
  //     onFilter: (value, record) => record.status_transaksi.indexOf(value) === 0,
  //     render: (_, { status_transaksi }) => (
  //       <>
  //         {status_transaksi.map((bg_status_transaksi) => {
  //           let color;
  //           if (bg_status_transaksi === 'Pending') {
  //             color = '#FFB700';
  //           }else if (bg_status_transaksi === 'Selesai') {
  //             color = '#00B74B';
  //           }else if (bg_status_transaksi === 'Belum Selesai') {
  //             color = '#EF4444';
  //           }
  //           return (
  //             <Tag color={color} key={bg_status_transaksi}>
  //               {bg_status_transaksi.toUpperCase()}
  //             </Tag>
  //           );
  //         })}
  //       </>
  //     ),
  //   },
  //   {
  //     title: 'Aksi',
  //     dataIndex: 'aksi',
  //     align: 'center',
  //     width: '5%',
  //     render: (_, record) =>
  //       dataPenjualan.length >= 1 ? (
  //         <>
  //           <div className='flex justify-center mx-auto align-center items-center'>
  //             {/* <button className='flex items-center justify-center text-xl p-1 text-blue-500 bg-blue-100 rounded-lg mr-2'><MdSave/></button> */}
  //             <button className='flex items-center justify-center text-xl p-1 text-red-500 bg-red-100 rounded-lg' onClick={() => handleDelete(record.id)}><BiSolidTrashAlt/></button>
  //           </div>
  //         </>
  //       ) : null,
  //   },
  // ]

  // const [dataPenjualan, setDataPenjualan] = useState([])

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get('https://apisglite.sadigit.co.id/api');
  //     setDataPenjualan(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  // useEffect(() => {
  //   fetchData()
  // }, [])

  // const [dataPenjualan, setDataPenjualan] = useState([
  //   {
  //     id_trx: 1,
  //     kode_trx: 'TRX-0001',
  //     nama_plg: 'Agung',
  //     tot_qty: 10,
  //     tot_trx: 100000,
  //     tgl_trx: '2023-11-16 09:57:00',
  //     // status_trx: ['Selesai'],
  //   },
  //   {
  //     id_trx: 2,
  //     kode_trx: 'TRX-0001',
  //     nama_plg: 'Agung',
  //     tot_qty: 10,
  //     tot_trx: 100000,
  //     tgl_trx: '2023-11-16 09:57:00',
  //     // status_trx: ['Pending'],
  //   },
  //   {
  //     id_trx: 3,
  //     kode_trx: 'TRX-0001',
  //     nama_plg: 'Agung',
  //     tot_qty: 10,
  //     tot_trx: 100000,
  //     tgl_trx: '2023-11-16 09:57:00',
  //     // status_trx: ['Belum Selesai'],
  //   },
  // ])
  const [dataPenjualan, setDataPenjualan] = useState([])

  const fetchData = async () => {
    try {
      const response = await axios.get('https://apisglite.sadigit.co.id/api/transaksi/');
      setDataPenjualan(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])


  const handleDelete = (id_trx) => {
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
        const newData = dataPenjualan.filter((item) => item.id_trx !== id_trx);
        setDataPenjualan(newData);
      }
    })
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return(
    <main className="flex bg-blue-500 w-full h-full font-inter">
      
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} submenuOpen={submenuOpen} setSubmenuOpen={setSubmenuOpen} submenuOpen2={submenuOpen2} setSubmenuOpen2={setSubmenuOpen2} />

      <div className='w-full h-fit z-5 lg:-z-0'>

        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

        <div className='bg-slate-100 w-full min-h-[calc(100vh-64px)] lg:p-5 p-4'>
          <div className='w-full h-fit border-2 bg-white border-slate-300 rounded-xl p-5'>
            <div className='flex items-center pb-5 border-b-2 border-slate-300'>
              <span className='text-blue-500 mr-4 text-2xl'><BsGrid3X3GapFill/></span>
              <h1 className='text-xl font-semibold'>Riwayat Transaksi</h1>
            </div>

            <div className='w-auto h-auto mt-12'>
              <Table
                pagination={{
                  pageSize: 10,
                  onChange(current) {
                    setPage(current);
                  }
                }}
                bordered
                dataSource={dataPenjualan}
                columns={columnsPenjualan}
                onChange={onChange}
                className='mb-10 overflow-x-auto'
                >
              </Table>
            </div>
          </div>
        </div>

      </div>

    </main>
  )
}