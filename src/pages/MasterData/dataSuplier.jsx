import  { useRef, useState } from 'react';
import { InputNumber, Modal, Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

// Icon
import { MdSave } from 'react-icons/md';
import { BiSolidTrashAlt } from 'react-icons/bi';
import { BsGrid3X3GapFill } from 'react-icons/bs';

// Component
import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar';

export default function DataSuplier(){
  
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

  // Cari Barang
  const onInput = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  
  // Modal
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };
  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const onType = (value) => {
    console.log('changed', value);
  };

  const { TextArea } = Input;

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      width: '5%',
      align: 'center',
      sorter: (a, b) => a.no - b.no,
    },
    {
      title: 'Kode',
      dataIndex: 'kode',
      width: '20px',
      align: 'center',
      sorter: (a, b) => a.kode - b.kode,
    },
    {
      title: 'Nama',
      dataIndex: 'nama',
      width: '20px',
      align: 'center',
      ...getColumnSearchProps('nama'),
      sorter: (a, b) => a.nama.length - b.nama.length,
    },
    {
      title: 'Alamat',
      dataIndex: 'alamat',
      width: '20px',
      align: 'center',
      ...getColumnSearchProps('alamat'),
      sorter: (a, b) => a.alamat.length - b.alamat.length,
    },
    {
      title: 'Telepon',
      dataIndex: 'telepon',
      width: '20px',
      align: 'center',
      sorter: (a, b) => a.telepon - b.telepon,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '20px',
      align: 'center',
      sorter: (a, b) => a.email - b.email,
    },
    {
      title: 'Aksi',
      dataIndex: 'aksi',
      align: 'center',
      width: '5%',
      render: (_, record) =>
        data.length >= 1 ? (
          <>
            <div className='flex justify-center mx-auto align-center items-center'>
              <button className='flex items-center justify-center text-xl p-1 text-blue-500 bg-blue-100 rounded-lg mr-2'><MdSave/></button>
              <button className='flex items-center justify-center text-xl p-1 text-red-500 bg-red-100 rounded-lg'><BiSolidTrashAlt/></button>
            </div>
          </>
        ) : null,
    },
  ]

  const data = [
    {
      no: 1,
      kode: 123,
      nama: 'Ridwan',
      alamat: 'Sumedang',
      telepon: '08123456789',
      email: 'ridwan@gmail.com',
    }
  ]

  return(
    <main className="flex bg-blue-500 w-full h-full font-inter">
      
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} submenuOpen={submenuOpen} setSubmenuOpen={setSubmenuOpen} submenuOpen2={submenuOpen2} setSubmenuOpen2={setSubmenuOpen2} setOpenDropdownProfile={setOpenDropdownProfile}/>

      <div className='w-full h-fit z-5 lg:-z-0'>

        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} openDropdownProfile={openDropdownProfile} setOpenDropdownProfile={setOpenDropdownProfile}/>

        <div className=' bg-slate-100 w-full h-full p-7'>
          <div className='w-full h-full border-2 bg-white border-slate-300 rounded-xl p-5'>
          <div className='flex items-center pb-5 border-b-2 border-slate-300 justify-between'>
              <div className='flex items-center'>
                <span className='text-blue-500 mr-4 text-2xl'><BsGrid3X3GapFill/></span>
                <h1 className='text-xl font-semibold'>Data Suplier</h1>
              </div>
              <button className='px-5 py-2 ml-auto rounded-lg text-white bg-blue-500' onClick={showModal}>Tambah Data</button>
            </div>

            <div className='bg-red w-full h-screen mt-12'>
              <div>
                <Table
                  bordered={true}
                  dataSource={data}
                  columns={columns}
                  onChange={onChange}
                  className='mb-10 overflow-x-auto'
                />
              </div>

              <Modal
                  title="Tambah Data"
                  open={open}
                  onOk={hideModal}
                  onCancel={hideModal}
                  okText="Tambah"
                  cancelText="Batal"
                >
                  <div className=''>
                    <div className='block my-5'>
                      <label htmlFor="nama" className='font-semibold'>Nama Suplier</label>
                      <Input className='my-2' placeholder="Masukan Nama" />
                    </div>
                    <div className='block my-5'>
                      <label htmlFor="alamat" className='font-semibold'>Alamat</label>
                      <TextArea placeholder="Masukan Alamat" autoSize />
                      <div
                        style={{
                          margin: '24px 0',
                        }}
                      />
                    </div>
                    <div className='block my-5'>
                      <label htmlFor="no_tlp" className='font-semibold'>No Telepon</label>
                      <div>
                        <InputNumber 
                        className='w-full'
                        min={1} 
                        max={100000000}
                        onChange={onType} />
                      </div>
                    </div>
                    <div className='block my-5'>
                      <label htmlFor="email" className='font-semibold'>Email</label>
                      <Input className='my-2' placeholder="Masukan Email" type='email' />
                    </div>
                  </div>
                </Modal>

            </div>
          </div>
        </div>

      </div>

    </main>
  )
}