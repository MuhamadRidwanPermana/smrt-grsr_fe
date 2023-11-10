import  { useRef, useState } from 'react';
import { InputNumber, Modal, Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2'

// Icon
import { MdSave, BsGrid3X3GapFill, BiSolidTrashAlt, FaPlus } from '../../utils/icons';

// Component
import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar';

export default function DataPelanggan(){
  
  const [openSidebar, setOpenSidebar] = useState(true);
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

  const columnsSuplier = [
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
      dataIndex: 'noTlp',
      width: '20px',
      align: 'center',
      sorter: (a, b) => a.noTlp - b.noTlp,
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
        dataSuplier.length >= 1 ? (
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
        const newData = dataSuplier.filter((item) => item.id !== id);
        setDataSuplier(newData);
      }
    })
  };

  const handleAddDataKasir = () => {
    const newData = DataKasir.concat({
      no: DataKasir.length + 1,
      kode: 'PRJM-UTN-' + Math.floor(Math.random() * 10000),
      nama: 'Kopi',
      qty: Math.floor(Math.random() * 10),
      satuan: 'Kg',
      harga: Math.floor(Math.random() * 220000),
      disc: Math.floor(Math.random() * 10) + '%',
      potongan_member: 20 + '%',
      total: 'Rp. ' + Math.floor(Math.random() * 100) + '.' + Math.floor(Math.random() * 1000),
    });
    setDataKasir(newData);
  }

  const [dataSuplier, setDataSuplier] = useState([
    {
      id: 1,
      kode: 'PLG-' + Math.floor(Math.random() * 100),
      nama: 'Ridwan',
      alamat: 'Sumedang',
      noTlp: '08123456789',
      email: 'ridwan@gmail.com',
    }
  ])

  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [noTlp, setNoTlp] = useState('');
  const [email, setEmail] = useState('');

  function handleAddData(data){
    setDataSuplier([...dataSuplier, data]);
  }

  function handleSubmit(e){
    e.preventDefault();

    if(!nama) return;

    const newData = { nama, kode: 'PLG-' + Math.floor(Math.random() * 100), alamat, noTlp, email, id: dataSuplier.length + 1 };
    handleAddData(newData);

    console.log(newData);

    setNama('');
    setAlamat('');
    setNoTlp('');
    setEmail('');
  }

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
                <h1 className='text-xl font-semibold'>Data Pelanggan</h1>
              </div>
              <div className='flex items-center'>
                <button className='px-5 py-2 ml-auto rounded-lg text-white bg-blue-500 lg:flex hidden' onClick={showModal}>Tambah Data</button>
                <button className='px-2 py-2 rounded-lg text-white bg-blue-500 flex lg:hidden' onClick={showModal}>
                  <FaPlus/>
                </button>
              </div>
            </div>

              <div>
                <Table
                  bordered={true}
                  dataSource={dataSuplier}
                  columns={columnsSuplier}
                  onChange={onChange}
                  className='mb-10 overflow-x-auto'
                />

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
                      <label htmlFor="nama" className='font-semibold'>Nama Suplier</label>
                      <Input name='name' className='my-2' placeholder="Masukan Nama" value={nama} onChange={(e) => setNama(e.target.value)}/>
                    </div>
                    <div className='block my-5'>
                      <label htmlFor="alamat" className='font-semibold'>Alamat</label>
                      <TextArea name='alamat' placeholder="Masukan Alamat" autoSize value={alamat} onChange={(e) => setAlamat(e.target.value)}/>
                      <div
                        style={{
                          margin: '24px 0',
                        }}
                      />
                    </div>
                    <div className='block my-5'>
                      <label htmlFor="no_tlp" className='font-semibold'>No Telepon</label>
                      <div>
                        <Input name='no_tlp' className='my-2' placeholder="Masukan No Telepon" type='text' value={noTlp} onChange={(e) => setNoTlp(e.target.value)}/>
                      </div>
                    </div>
                    <div className='block my-5'>
                      <label htmlFor="email" className='font-semibold'>Email</label>
                      <Input name='email' className='my-2' placeholder="Masukan Email" type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className='flex justify-end'>
                      <button type='submit' className="text-slate-800 bg-white border border-slate-500 px-5 py-1.5 rounded-lg mx-3" onClick={hideModal}>Batal</button>
                      <button type='submit' className="text-white bg-blue-500 px-5 py-1.5 rounded-lg">Tambah</button>
                    </div>
                  </form>
                </Modal>

            </div>
          </div>
        </div>

      </div>

    </main>
  )
}