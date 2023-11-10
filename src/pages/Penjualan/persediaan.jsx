import  { useRef, useState } from 'react';
import { Select, Modal, Button, Input, Space, Table, InputNumber } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2'

// Icon
import { BsGrid3X3GapFill, BiSolidEditAlt, BiSolidTrashAlt } from '../../utils/icons';

// Component
import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar';

export default function Persediaan(){

  const [openSidebar, setOpenSidebar] = useState(true);
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

  // Cari Barang
  // const onInput = (value) => {
  //   console.log(`selected ${value}`);
  // };
  // const onSearch = (value) => {
  //   console.log('search:', value);
  // };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  
  // Modal
  // const [open, setOpen] = useState(false);
  // const showModal = () => {
  //   setOpen(true);
  // };
  // const hideModal = () => {
  //   setOpen(false);
  // };
  // Filter `option.label` match the user type `input`
  // const filterOption = (input, option) =>
  // (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  // Data
  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      width: '5%',
      align: 'center',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Kode Barang',
      dataIndex: 'kode_barang',
      width: '50px',
      align: 'center',
      sorter: (a, b) => a.kode_barang - b.kode_barang,
    },
    {
      title: 'Nama Barang',
      dataIndex: 'nama_barang',
      width: '50px',
      align: 'center',
      ...getColumnSearchProps('nama_barang'),
      sorter: (a, b) => a.nama_barang.length - b.nama_barang.length,
    },
    {
      title: 'Stok Awal',
      dataIndex: 'stok_awal',
      width: '50px',
      align: 'center',
      sorter: (a, b) => a.stok_awal - b.stok_awal,
    },
    {
      title: 'Satuan',
      dataIndex: 'satuan',
      width: '50px',
      align: 'center',
      sorter: (a, b) => a.satuan - b.satuan,
    },
    {
      title: 'Tanggal Input',
      dataIndex: 'tanggal_input',
      width: '50px',
      align: 'center',
      sorter: (a, b) => a.tanggal_input - b.tanggal_input,
    },
    {
      title: 'Aksi',
      dataIndex: 'aksi',
      align: 'center',
      width: '5%',
      render: (_, record) =>
        dataPersediaan.length >= 1 ? (
          <>
            <div className='flex justify-center mx-auto align-center items-center'>
              <button className='flex items-center justify-center text-xl p-1 text-blue-500 bg-blue-100 rounded-lg mr-2'><BiSolidEditAlt/></button>
              <button className='flex items-center justify-center text-xl p-1 text-red-500 bg-red-100 rounded-lg' onClick={() => handleDelete(record.id)}><BiSolidTrashAlt/></button>
            </div>
          </>
        ) : null,
    },
  ]

  const [dataPersediaan, setDataPersediaan] = useState([
    {
      id: 1,
      kode_barang: 123,
      nama_barang: 'Gula',
      stok_awal: '5',
      satuan: 'Bungkus',
      tanggal_input: '09-10-2023',
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
        const newData = dataPersediaan.filter((item) => item.id !== id);
        setDataPersediaan(newData);
      }
    })
  };

  // const onInputNumber = (value) => {
  //   console.log('changed', value);
  // };

  return(
    <main className="flex bg-blue-500 w-full h-full font-inter">
      
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} submenuOpen={submenuOpen} setSubmenuOpen={setSubmenuOpen} submenuOpen2={submenuOpen2} setSubmenuOpen2={setSubmenuOpen2} />

      <div className='w-full h-fit z-5 lg:-z-0'>

        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

        <div className='bg-slate-100 w-full min-h-[730px] lg:min-h-[738px] lg:p-7 p-4'>
          <div className='w-full h-auto border-2 bg-white border-slate-300 rounded-xl p-5'>
            <div className='flex items-center pb-5 border-b-2 border-slate-300 justify-between'>
              <div className='flex items-center'>
                <span className='text-blue-500 mr-4 text-2xl'><BsGrid3X3GapFill/></span>
                <h1 className='text-xl font-semibold'>Input Stok Awal</h1>
              </div>
              {/* <button className='px-5 py-2 ml-auto rounded-lg text-white bg-blue-500' onClick={showModal}>Input</button> */}
            </div>

              <div>
                <Table
                    bordered={true}
                    dataSource={dataPersediaan}
                    columns={columns}
                    onChange={onChange}
                    className='my-10 overflow-x-auto'
                  />

                {/* <Modal
                  title="Barang"
                  open={open}
                  onOk={hideModal}
                  onCancel={hideModal}
                  okText="Simpan"
                  cancelText="Batal"
                >
                  <div className=''>
                    <div className='block my-5'>
                      <label htmlFor="barang" className='font-semibold'>Barang</label>
                      <Select
                        className='w-full h-9 mt-2'
                        showSearch
                        placeholder="Pilih Barang"
                        optionFilterProp="children"
                        onChange={onInput}
                        onSearch={onSearch}
                        filterOption={filterOption}
                        options={[
                          {
                            value: 'beras',
                            label: 'Beras',
                          },
                          {
                            value: 'gula',
                            label: 'Gula',
                          },
                          {
                            value: 'kopi',
                            label: 'Kopi',
                          },
                        ]}
                      />
                    </div>
                    <div className='block mb-10'>
                      <label htmlFor="qty" className='font-semibold'>Qty</label>
                      <InputNumber 
                        min={1} 
                        max={1000} 
                        onChange={onInputNumber} 
                        className='w-full h-9 border border-slate-300 rounded-md mt-2'
                      />
                    </div>
                  </div>
                </Modal> */}
              </div>
          </div>
          <div>
          </div>
        </div>

      </div>
    </main>
  )
}