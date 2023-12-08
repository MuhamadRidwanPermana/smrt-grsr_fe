import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Space, Table, Modal } from 'antd';
const { TextArea } = Input;
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2'
import axios from 'axios';

// Icon
import { MdSave, BiSolidTrashAlt, BsGrid3X3GapFill, FaPlus } from '../../../utils/icons';

// Component
import Sidebar from '../../../Components/Sidebar';
import Navbar from '../../../Components/Navbar';

export default function DataProduk() {

  const [openSidebar, setOpenSidebar] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [submenuOpen2, setSubmenuOpen2] = useState(true);

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

  const [page, setPage] = useState(1);
  const columnsProduk = [
    {
      title: 'No',
      dataIndex: 'id_masterdata',
      width: '5%',
      align: 'center',
      sorter: (a, b) => a.id_masterdata - b.id_masterdata,
      render: (_, record, index) => index + 1 + (10 * (page - 1)),
    },
    {
      title: 'Kode',
      dataIndex: 'kode_id',
      width: '20px',
      align: 'center',
      ...getColumnSearchProps('kode_id'),
      sorter: (a, b) => a.kode_id - b.kode_id,
    },
    {
      title: 'Nama Item',
      dataIndex: 'nama_produk',
      width: '20px',
      align: 'center',
      ...getColumnSearchProps('nama_produk'),
      sorter: (a, b) => a.nama_produk.length - b.nama_produk.length,
    },
    // {
    //   title: 'Stok',
    //   dataIndex: 'stok',
    //   width: '5%',
    //   align: 'center',
    //   sorter: (a, b) => a.stok - b.stok,
    // },
    {
      title: 'Harga Pokok',
      dataIndex: 'harga_beli',
      width: '20px',
      align: 'center',
      sorter: (a, b) => a.harga_beli - b.harga_beli,
      // render: (_, record) => record.harga_beli.toLocaleString('id-ID'),
    },
    {
      title: 'Harga Jual',
      dataIndex: 'harga_jual',
      width: '20px',
      align: 'center',
      sorter: (a, b) => a.harga_jual - b.harga_jual,
      // render: (_, record) => record.harga_jual.toLocaleString('id-ID'),
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
              {/* <button className='flex items-center justify-center text-xl p-1 text-blue-500 bg-blue-100 rounded-lg mr-2'><MdSave/></button> */}
              <button className='flex items-center justify-center text-xl p-1 text-red-500 bg-red-100 rounded-lg' onClick={() => handleDelete(record.id_masterdata)}><BiSolidTrashAlt/></button>
            </div>
          </>
        ) : null,
    },
  ]

  const handleDelete = (id_masterdata) => {
    Swal.fire({
      title: 'Apakah anda yakin ingin mengahpus data ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3B82F6",
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
        const newData = dataProduk.filter((item) => item.id_masterdata !== id_masterdata);
        setDataProduk(newData);
      }
    })
  };
  
  const [dataProduk, setDataProduk] = useState([])

  const fetchData = async () => {
    try {
      const response = await axios.get('https://apisglite.sadigit.co.id/api/masterdata_produk/show-masterdata');
      setDataProduk(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

    // Modal
    const [open, setOpen] = useState(false);
    const showModal = () => {
      setOpen(true);
    };
    const hideModal = () => {
      setOpen(false);
    };

    const [kode_id, setKodeId] = useState('');
    const [nama_produk, setNamaProduk] = useState('');
    const [stok, setStok] = useState('');
    const [harga_beli, setHargaBeli] = useState('');
    const [harga_jual, setHargaJual] = useState('');
  
    function handleAddData(data){
      setDataProduk([...dataProduk, data]);
    }
  
    function handleSubmit(e){
      e.preventDefault();
  
      if(!kode_id, !nama_produk,!stok, !harga_beli, !harga_jual) return;
  
      const newData = { id_masterdata: dataProduk.length + 1, kode_id, nama_produk, stok, harga_jual, harga_beli };
      handleAddData(newData);
  
      console.log(newData);
      
      setKodeId('');
      setNamaProduk('');
      setStok('');
      setHargaBeli('');
      setHargaJual('');
  
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Data berhasil ditambahkan",
        showConfirmButton: false,
        timer: 1500,
        width: "400px",
      });
    }

  return(
    <main className="flex bg-blue-500 w-full h-full font-inter">
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} submenuOpen={submenuOpen} setSubmenuOpen={setSubmenuOpen} submenuOpen2={submenuOpen2} setSubmenuOpen2={setSubmenuOpen2} />

      <div className='w-full h-fit z-5 lg:-z-0'>

        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

        <div className='bg-slate-100 w-full min-h-[calc(100vh-64px)] lg:p-5 p-4'>
          <div className='w-full h-auto border-2 bg-white border-slate-300 rounded-xl p-5'>
            <div className='flex items-center pb-5 border-b-2 border-slate-300 justify-between'>
              <div className='flex items-center'>
                <span className='text-blue-500 mr-4 text-2xl'><BsGrid3X3GapFill/></span>
                <h1 className='text-xl font-semibold'>Data Item</h1>
              </div>
              {/* <Link to={'/master-data/produk/data-umum'}> */}
                <div className='flex'>
                  <button className='px-5 py-2 rounded-lg text-white bg-blue-500 lg:flex hidden' onClick={showModal}>Tambah Data</button>
                  <button className='px-2 py-2 rounded-lg text-white bg-blue-500 flex lg:hidden' onClick={showModal}>
                    <FaPlus/>
                </button>
                </div>
              {/* </Link> */}
            </div>

            <div className='bg-red w-full h-auto mt-10'>
              <div>
                <Table
                  pagination={{
                    pageSize: 10,
                    onChange(current) {
                      setPage(current);
                    }
                  }}
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

      <Modal
        className="modal-suplier"
        title="Tambah Data"
        open={open}
        onOk={hideModal}
        onCancel={hideModal}
        okText="Selesai"
        cancelText="Batal"
      >
        <form action="" onSubmit={handleSubmit}>
          <div className='block my-5'>
            <label htmlFor="nama" className='font-semibold'>Kode Produk</label>
            <Input name='name' className='my-2' placeholder="Masukan Kode Produk" type='text' value={kode_id} onChange={(e) => setKodeId(e.target.value)}/>
          </div>
          <div className='block my-5'>
            <label htmlFor="nama" className='font-semibold'>Nama Produk</label>
            <Input name='name' className='my-2' placeholder="Masukan Nama Produk" type='text' value={nama_produk} onChange={(e) => setNamaProduk(e.target.value)}/>
          </div>
          <div className='block my-5'>
            <label htmlFor="alamat" className='font-semibold'>Stok</label>
            <Input name='no_tlp' className='my-2' placeholder="Masukan No Telepon" type='number' value={stok} onChange={(e) => setStok(e.target.value)}/>
          </div>
          <div className='block my-5'>
            <label htmlFor="no_tlp" className='font-semibold'>Harga Pokok</label>
            <div>
              <Input name='no_tlp' className='my-2' placeholder="Masukan Harga Pokok" type='number' value={harga_beli} onChange={(e) => setHargaBeli(e.target.value)}/>
            </div>
          </div>
          <div className='block my-5'>
            <label htmlFor="no_tlp" className='font-semibold'>Harga Jual</label>
            <div>
              <Input name='no_tlp' className='my-2' placeholder="Masukan Harga Jual" type='text' value={harga_jual} onChange={(e) => setHargaJual(e.target.value)}/>
            </div>
          </div>

          <div className='flex justify-end'>
            <button type='submit' className="text-slate-800 bg-white border border-slate-500 px-5 py-1.5 rounded-lg mx-3" onClick={hideModal}>Batal</button>
            <button type='submit' className="text-white bg-blue-500 px-5 py-1.5 rounded-lg" onClick={hideModal}>Tambah</button>
          </div>
        </form>
      </Modal>

    </main>
  )
}