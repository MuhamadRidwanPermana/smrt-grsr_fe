import React, { useContext, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Select, Modal, Button, Input, Space, Table, Form, InputNumber, DatePicker } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2'
import axios from 'axios';

// Icon
import { BsCartPlusFill, BiSolidTrashAlt, PiMagnifyingGlassBold } from '../../utils/icons';

// Component
import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar';

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `Harap Masukan ${title}!`,
          },
        ]}
      >
        <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} min={1} max={10000} onChange={onChange}/>
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 0,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

const onChange = (value) => {
  console.log('changed', value);
};

export default function Kasir() {

  const [openSidebar, setOpenSidebar] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(true);
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
          // placeholder={`Search ${dataIndex}`}
          placeholder='Cari'
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
            // icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Cari
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
  
  const onSearch = (value) => {
    console.log('search:', value);
  };
  
  const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  // Modal
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const [openModal, setOpenModal] = useState(false);
  const showModalProses = () => {
    setOpenModal(true);
  };
  const hideModalProses = () => {
    setOpenModal(false);
  };

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
  const onClick = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const handleSave = (row) => {
    const newData = [...tambahDataKasir];
    const index = newData.findIndex((item) => row.id_stok === item.id_stok);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setTambahDataKasir(newData);
  }
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  // Show Hide Metode Pembayaran
  const [showhide, setShowhide] = useState('');
  const handleshowhide = (event) => {
    const getMetode = event.target.value;    
    setShowhide(getMetode);
  };

  dayjs.extend(customParseFormat);
  const dateFormatList = ['DD/MM/YYYY'];

  const ColumnsKasir = [
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
      width: '15%',
      align: 'center',
      ...getColumnSearchProps('kode'),
      sorter: (a, b) => a.no - b.no,
    },
    {
      title: 'Nama',
      dataIndex: 'nama_barang',
      width: '25%',
      align: 'center',
      ...getColumnSearchProps('nama_barang'),
      sorter: (a, b) => a.nama_barang.length - b.nama_barang.length,
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      width: '5%',
      editable: true,
      align: 'center',
      sorter: (a, b) => a.qty - b.qty,
    },
    {
      title: 'Satuan',
      dataIndex: 'satuan',
      width: '20px',
      align: 'center',
      sorter: (a, b) => a.satuan.length - b.satuan.length,
      ...getColumnSearchProps('satuan'),
    },
    {
      title: 'Harga',
      dataIndex: 'harga',
      width: '20px',
      align: 'center',
      sorter: (a, b) => a.harga - b.harga,
      // render: (_, record) => record.harga.toLocaleString('id-ID'),
    },
    // {
    //   title: 'Disc',
    //   dataIndex: 'disc',
    //   width: '5%',
    //   align: 'center',
    //   sorter: (a, b) => a.disc - b.disc,
    // },
    // {
    //   title: 'Potongan Member',
    //   dataIndex: 'disc_member',
    //   width: '15%',
    //   align: 'center',
    //   sorter: (a, b) => a.disc_member - b.disc_member,
    // },
    {
      title: 'Total',
      dataIndex: 'total',
      width: '15%',
      align: 'center',
      sorter: (a, b) => a.total - b.total,
      // render: (_, record) => ((record.harga * record.qty) - ((record.disc / 100) * (record.harga * record.qty)) - ((record.disc_member / 100) * (record.harga * record.qty))).toLocaleString('id-ID'),
      render: (_, record) => (record.harga * record.qty).toLocaleString('id-ID'),
    },
    {
      title: 'Aksi',
      dataIndex: 'aksi',
      align: 'center',
      width: '20px',
      render: (_, record) =>
        tambahDataKasir.length >= 1 ? (
          <>
            <div className='flex justify-center mx-auto align-center items-center'>
              {/* <button className='flex items-center justify-center text-xl p-1 text-blue-500 bg-blue-100 rounded-lg mr-2'><BiSolidEditAlt/></button> */}
              <button className='flex items-center justify-center text-xl p-1 text-red-500 bg-red-100 rounded-lg' onClick={() => handleDeleteDataKasir(record.id)}><BiSolidTrashAlt/></button>
            </div>
          </>
        ) : null,
    },
  ]

  // const [DataKasir, setDataKasir] = useState([])
  const [DataKasir, setDataKasir] = useState([
    {
      id: 1,
      kode: 'PNJ-' + Math.floor(Math.random() * 10000),
      nama_barang: 'Beras',
      qty: 2,
      satuan: 'Kg',
      harga: 20000,
      disc: 2,
      disc_member: 2,
    }
  ])
  
  const calculateTotal = (item) => {
    return (item.harga * item.qty)
    // return ((item.harga * item.qty) - ((item.disc / 100) * (item.harga * item.qty)) - ((item.disc_member / 100) * (item.harga * item.qty)))
  }

  const total = DataKasir.reduce(
    (total, item) => total + calculateTotal(item),
    0
  )

  const handleDeleteDataKasir = (id) => {
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
        const newData = DataKasir.filter((item) => item.id !== id);
        setDataKasir(newData);
      }
    })
  };

  const [page, setPage] = useState(1);
  const tambahColumnsKasir = [
    {
      title: 'No',
      dataIndex: 'id',
      width: '20px',
      align: 'center',
      sorter: (a, b) => a.id - b.id,
      render: (_, record, index) => index + 1 + (10 * (page - 1)),
    },
    {
      title: 'Nama Barang',
      dataIndex: 'nama_produk',
      width: '50%',
      align: 'center',
      ...getColumnSearchProps('nama_produk'),
      sorter: (a, b) => a.nama_produk.length - b.nama_produk.length,
    },
    {
      title: 'Stok',
      dataIndex: 'stok',
      width: '100px',
      align: 'center',
      sorter: (a, b) => a.stok - b.stok,
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      width: '13%',
      editable: true,
      align: 'center',
      sorter: (a, b) => a.qty - b.qty,
      render: (_, record) => (
        record.qty ? record.qty : 0
      )
    },
    {
      title: 'Aksi',
      dataIndex: 'aksi',
      align: 'center',
      width: '10%',
      render: (_, record) =>
      tambahDataKasir.length >= 1 ? (
        <>
        {/* Jika QTY > Stok, Button === hidden */}
          <div className={`cursor-pointer flex items-center justify-center text-center mx-auto ${ record.qty > record.stok ? 'bg-slate-300 cursor-not-allowed' : 'hidden' } w-fit h-auto text-white px-3 py-2 rounded-lg`}>
            <BsCartPlusFill className='mr-1 text-xl' />
            <span>Pilih</span>
          </div>
          {/* Jika QTY < Stok, Button === show */}
          <div className={`cursor-pointer flex items-center justify-center text-center mx-auto ${ record.qty > record.stok ? 'hidden' : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700' } w-fit h-auto text-white px-3 py-2 rounded-lg`} onClick={() => handleAddDataKasir(record)}>
            <BsCartPlusFill className='mr-1 text-xl'/>
            <span>Pilih</span>
          </div>
        </>
      ) : null,
    },
    
  ];

  const [tambahDataKasir, setTambahDataKasir] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get('https://apisglite.sadigit.co.id/api/stok/show-stok');
      setTambahDataKasir(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleAddDataKasir = (data) => {

    const check = DataKasir.find((item) => item.id === data.id_stok)
    if(!check) {
      const newData = DataKasir.concat({
        id: data.id_stok,
        kode: data.kode_id,
        nama_barang: data.nama_produk,
        qty: data.qty,
        satuan: data.satuan,
        harga: data.harga_jual,
      });
      setDataKasir(newData);
    }else{
      if(data.qty + check.qty > check.stok){
        Swal.fire({
          title: 'Stok tidak mencukupi',
          icon: 'warning',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        const ref = DataKasir.map((item) => {
          if(item.id === data.id_stok){
            return {
              ...item,
              qty: item.qty + data.qty
            }
          }else{
            return item
          }
        })
        console.log(ref);
        setDataKasir(ref);
      }
    }

  }
  
  const columns = tambahColumnsKasir.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });


  return(
    <main className="flex bg-blue-500 w-full h-full font-inter">
      <Sidebar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        submenuOpen={submenuOpen}
        setSubmenuOpen={setSubmenuOpen}
        submenuOpen2={submenuOpen2}
        setSubmenuOpen2={setSubmenuOpen2}
      />
      {/* <Sidebar /> */}

      <div className="w-full h-fit z-5 lg:-z-0">

        <Navbar 
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar} />

        <div className='bg-slate-100 w-full min-h-[calc(100vh-64px)] lg:p-5 p-4'>
          <div className='w-full h-auto border-2 bg-white border-slate-300 rounded-xl lg:p-5 px-4'>
            
            <div className='grid lg:flex w-full h-fit'>
              <div className='grid w-full'>
                <div className='flex w-full h-fit py-1.5'>
                  <div className='flex items-center lg:w-40 w-full h-11 lg:text-base text-sm'>Kode</div>
                  <div className='flex items-center lg:w-6 mr-2 h-11'>:</div>
                  <div className=''>
                    <p className='flex items-center lg:w-72 w-52 h-11'>PNJ-UTM-0001</p>
                  </div>
                </div>
                <div className='flex w-full h-fit py-1.5'>
                  <div className='flex items-center lg:w-40 w-full h-11 lg:text-base text-sm'>Pelanggan</div>
                  <div className='flex items-center lg:w-6 mr-2 h-11'>:</div>
                  <div className=''>
                    <Select
                      className='border border-black lg:w-72 w-52 h-11 bg-white rounded-lg'
                      showSearch
                      placeholder="Pilih Pelanggan"
                      optionFilterProp="children"
                      onChange={onChange}
                      onSearch={onSearch}
                      filterOption={filterOption}
                      options={[
                        {
                          value: 'toko1',
                          label: 'Toko1',
                        },
                        {
                          value: 'toko2',
                          label: 'Toko2',
                        },
                        {
                          value: 'toko3',
                          label: 'Toko3',
                        },
                      ]}
                    />
                  </div>
                </div>
                <div className='flex w-full h-fit py-1.5'>
                  <div className='flex items-center lg:w-40 w-full h-11 lg:text-base text-sm'>Nama Pelanggan</div>
                  <div className='flex items-center lg:w-6 mr-2 h-11'>:</div>
                  <div className=''>
                    <Input type="text" className='flex items-center border-black border lg:w-72 w-52 h-11 bg-white rounded-lg'/>
                  </div>
                </div>
                <div className='flex w-full h-fit py-1.5'>
                  <div className='flex items-center lg:w-40 w-full h-11 lg:text-base text-sm'>Alamat</div>
                  <div className='flex items-center lg:w-6 mr-2 h-11'>:</div>
                  <div className=''>
                    <Input type="text" className='flex items-center border-black border lg:w-72 w-52 h-11 bg-white rounded-lg'/>
                  </div>
                </div>
                <div className='flex w-full h-fit py-1.5'>
                  <div className='flex items-center lg:w-40 w-full h-11 lg:text-base text-sm'>No HP</div>
                  <div className='flex items-center lg:w-6 mr-2 h-11'>:</div>
                  <div className=''>
                    <Input type="text" className='flex items-center border-black border lg:w-72 w-52 h-11 bg-white rounded-lg'/>
                  </div>
                </div>
              </div>
              <div className='grid lg:relative w-full bottom-0'>
                <div className='mt-7 lg:absolute bottom-0 w-full h-fit'>
                  <div className='w-full h-7 font-bold text-xl'>Total</div>
                  <div className='flex items-center px-3 justify-end w-full h-32 bg-blue-200 rounded-lg'>
                    <p className='text-6xl font-bold'>{total.toLocaleString('id-ID') === 'NaN' ? 0 : total.toLocaleString('id-ID')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='w-full h-fit mt-12'>
              <div>
                <div className='mb-5'>
                  <div className='flex items-center px-5 w-fit h-11 border border-blue-500 text-blue-500 cursor-pointer hover:text-white hover:bg-blue-500 hover:duration-200 bg-white rounded-lg mb-5' onClick={showModal}>
                    <span>
                      <PiMagnifyingGlassBold/>
                    </span>
                    <div type="text" className='text-md px-2'>Cari Barang</div>
                  </div>
                  
                    <Table
                      pagination={{
                        pageSize: 10,
                        onChange(current) {
                          setPage(current);
                        }
                      }}
                      bordered
                      dataSource={DataKasir}
                      columns={ColumnsKasir}
                      onChange={onClick}
                      className='mb-10 overflow-x-auto'
                    />

                  <Modal
                  open={open}
                  onOk={hideModal}
                  onCancel={hideModal}
                  okText="Selesai"
                  cancelText="Batal"
                  width={1000}
                  className='modal-kasir -mt-20'
                >
                  <Table
                    pagination={{
                      pageSize: 10,
                      onChange(current) {
                        setPage(current);
                      }
                    }}
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={tambahDataKasir}
                    columns={columns}
                    className='mt-10 mb-5 my-1 overflow-x-auto'
                  />
                </Modal>

                <button className='flex ml-auto mt-5 bg-blue-500 text-white rounded-lg px-3 py-2' onClick={showModalProses}>Proses</button>

                  <Modal
                    open={openModal}
                    onOk={hideModalProses}
                    onCancel={hideModalProses}
                    okText="Checkout"
                    cancelText="Simpan"
                    width={600}
                    className='modal-proses-pembelian'
                    >
                    <div className='w-full h-fit border-b border-slate-30 lg:px-2 pt-10 pb-3'>
                      <div className='flex items-center mb-2'>
                        <label className='text-start w-1/2 font-semibold lg:text-md'>Total</label>
                        <div className='w-full h-9 border border-slate-300 rounded-lg'>
                          <p className='text-md px-2 py-1'>{total.toLocaleString('id-ID') === 'NaN' ? 0 : total.toLocaleString('id-ID')}</p>
                        </div>
                      </div>
                      <div className='flex items-center mb-2'>
                        <label className='text-start w-1/2 font-semibold'>Diskon</label>
                         {/* <InputNumber
                          //disabled
                          // placeholder='Fitur Premium'
                          //min={0}
                          // max={100}
                          // defaultValue={0}
                          // formatter={(value) => `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                          // parser={value => value.replace(/[A-Z]|[a-z]|[$ ]|\.+/g, "")}
                          // onChange={(value) => onChange(value ? value : [])}
                          // formatter={(value) => `${value}%`}
                          // parser={(value) => value.replace('%', '')}
                          // value={Diskon}
                          // onChange={(value) => setDiskon(value)}
                         // className='w-full h-9 border border-slate-300 rounded-lg'
                        /> */}
                        <div className='disabled flex items-center pl-3 w-full h-9 border border-slate-300 rounded-md bg-slate-200 text-slate-500'>
                          Fitur Premium
                        </div>
                      </div>
                      <div className='flex items-center mb-2'>
                        <label className='text-start w-1/2 font-semibold'>PPN</label>
                        {/* <InputNumber
                          defaultValue={0}
                          min={0}
                          max={100}
                          formatter={(value) => `${value}%`}
                          parser={(value) => value.replace('%', '')}
                          onChange={onInput}
                          value={Ppn}
                          onChange={(value) => setPpn(value)}
                          className='w-full h-9 border border-slate-300 rounded-lg'
                        /> */}
                        <div className='disabled flex items-center pl-3 w-full h-9 border border-slate-300 rounded-md bg-slate-200 text-slate-500'>
                          Fitur Premium
                        </div>
                      </div>
                      <div className='flex items-center mb-2'>
                        <label className='text-start w-1/2 font-bold lg:text-lg'>Total Akhir</label>
                        <div className='w-full h-14 border border-slate-300 rounded-lg bg-blue-100'>
                          <p className='text-2xl font-bold px-2 py-2.5'>{total.toLocaleString('id-ID') === 'NaN' ? 0 : total.toLocaleString('id-ID')}</p>
                        </div>
                      </div>
                    </div>
                    <div className='w-full h-fit lg:px-2 pt-5 pb-3'>
                      {/* <div className='flex items-center mb-2'>
                        <label className='text-start w-1/2 font-semibold'>Metode</label>
                        <select onChange={(e)=>(handleshowhide(e))} className='px-3 w-full h-9 border border-slate-300 rounded-lg'>
                          <option value="cash">Cash</option>
                          <option value="kredit">Kredit</option>
                        </select>
                      </div> */}
                      <div className='flex items-center mb-2'>
                        <label className='text-start w-1/2 font-semibold'>Pembayaran</label>
                        <InputNumber
                          min={0}
                          defaultValue={0}
                          formatter={(value) => `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                          parser={value => value.replace(/[A-Z]|[a-z]|[$ ]|\.+/g, "")}
                          onChange={(value) => onChange(value ? value : [])}
                          className='w-full h-11 py-1 border border-slate-300 rounded-lg'
                        />
                      </div>

                      {
                        showhide === 'kredit' && (
                          <div>
                            <div className='flex items-center mb-2'>
                              <label className='text-start w-1/2 font-semibold'>Kredit</label>
                              <InputNumber
                                min={0}
                                defaultValue={0}
                                formatter={(value) => `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                parser={value => value.replace(/[A-Z]|[a-z]|[$ ]|\.+/g, "")}
                                onChange={(value) => onChange(value ? value : [])}
                                className='w-full h-9 border border-slate-300 rounded-lg'
                              />
                            </div>
                            <div className='flex items-center mb-2'>
                              <label className='text-start w-1/2 font-semibold'>Jatuh Tempo</label>
                              <DatePicker defaultValue={dayjs('01/01/2023', dateFormatList[0])} format={dateFormatList} 
                              className='w-full h-9 border border-slate-300 rounded-lg'/>
                            </div>
                          </div>    
                        )
                      }
                    </div>

                    <div className='flex justify-end'>
                      <button type='submit' className="text-slate-700 bg-white border border-slate-400 hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:duration-300 active:bg-blue-700 px-5 py-1.5 rounded-lg mx-3" onClick={hideModalProses}>Simpan</button>
                      <button type='submit' className="text-white bg-blue-500 px-5 py-1.5 rounded-lg hover:bg-blue-600 active:bg-blue-700">Checkout</button>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </main>
  )
}