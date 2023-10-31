import React, { useContext, useEffect, useRef, useState } from 'react';
import { Select, Modal, Button, Input, Space, Table, Form, InputNumber} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2'

// Icon
import { BsCartPlusFill, BiSolidEditAlt, BiSolidTrashAlt, PiMagnifyingGlassBold } from '../../utils/icons';

// Component
import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar';

// Edit Row
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
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 1,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

export default function Pembelian() {

  const [openSidebar, setOpenSidebar] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [submenuOpen2, setSubmenuOpen2] = useState(false);
  const [openDropdownProfile, setOpenDropdownProfile] = useState(false);

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

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };
  // Filter `option.label` match the user type `input`
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
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setTambahDataKasir(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const ColumnsKasir = [
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
      width: '15%',
      align: 'center',
      ...getColumnSearchProps('kode'),
      sorter: (a, b) => a.no - b.no,
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
      title: 'Qty',
      dataIndex: 'qty',
      width: '5%',
      align: 'center',
      sorter: (a, b) => a.qty - b.qty,
    },
    {
      title: 'Satuan',
      dataIndex: 'satuan',
      width: '20px',
      align: 'center',
      sorter: (a, b) => a.satuan.length - b.satuan.length,
      filters: [
        {
          text: 'Kilogram',
          value: 'Kg',
        },
        {
          text: 'Gram',
          value: 'g',
        },
        {
          text: 'Ons',
          value: 'Ons',
        },
      ],
      onFilter: (value, record) => record.satuan.indexOf(value) === 0,
    },
    {
      title: 'Harga',
      dataIndex: 'harga',
      width: '20px',
      align: 'center',
      sorter: (a, b) => a.harga - b.harga,
    },
    {
      title: 'Disc',
      dataIndex: 'disc',
      width: '5%',
      align: 'center',
      sorter: (a, b) => a.disc - b.disc,
    },
    {
      title: 'Potongan Member',
      dataIndex: 'potongan_member',
      width: '20px',
      align: 'center',
      sorter: (a, b) => a.potongan_member - b.potongan_member,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      width: '15%',
      align: 'center',
      sorter: (a, b) => a.total - b.total,
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
              <button className='flex items-center justify-center text-xl p-1 text-blue-500 bg-blue-100 rounded-lg mr-2'><BiSolidEditAlt/></button>
              <button className='flex items-center justify-center text-xl p-1 text-red-500 bg-red-100 rounded-lg' onClick={() => handleDeleteDataKasir(record.id)}><BiSolidTrashAlt/></button>
            </div>
          </>
        ) : null,
    },
  ]

  const handleDeleteDataKasir = (id) => {
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
        const newData = DataKasir.filter((item) => item.id !== id);
        setDataKasir(newData);
      }
    })
  };

  const [DataKasir, setDataKasir] = useState([
    {
      id: 1,
      kode: 'PRJM-UTN-' + Math.floor(Math.random() * 10000),
      nama: 'Beras',
      qty: Math.floor(Math.random() * 10),
      satuan: 'Kg',
      harga: Math.floor(Math.random() * 220000),
      disc: Math.floor(Math.random() * 10) + '%',
      potongan_member: Math.floor(Math.random() * 10) + '%',
      total: 'Rp. ' + Math.floor(Math.random() * 100) + '.' + Math.floor(Math.random() * 1000),
    },
    {
      id: 2,
      kode: 'PRJM-UTN-' + Math.floor(Math.random() * 10000),
      nama: 'Kopi',
      qty: Math.floor(Math.random() * 10),
      satuan: 'Kg',
      harga: Math.floor(Math.random() * 220000),
      disc: Math.floor(Math.random() * 10) + '%',
      potongan_member: Math.floor(Math.random() * 10) + '%',
      total: 'Rp. ' + Math.floor(Math.random() * 100) + '.' + Math.floor(Math.random() * 1000),
    },
    {
      id: 3,
      kode: 'PRJM-UTN-' + Math.floor(Math.random() * 10000),
      nama: 'Gandum',
      qty: Math.floor(Math.random() * 10),
      satuan: 'Kg',
      harga: Math.floor(Math.random() * 220000),
      disc: Math.floor(Math.random() * 10) + '%',
      potongan_member: Math.floor(Math.random() * 10) + '%',
      total: 'Rp. ' + Math.floor(Math.random() * 100) + '.' + Math.floor(Math.random() * 1000),
    }
  ])
  
  // const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  // function generateString(length) {
  //   let result = ' ';
  //   const charactersLength = characters.length;
  //   for ( let i = 0; i < length; i++ ) {
  //       result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }

  //   return result;
  // }

  // const [DataKasir, setDataKasir] = useState([])
  // for (let i = 1; i < 10 ; i++) {
  //   DataKasir.push({
  //     no: i,
  //     kode: 'PRJM-UTN-' + Math.floor(Math.random() * 10000),
  //     nama: generateString(5),
  //     qty: Math.floor(Math.random() * 10),
  //     satuan: 'Kg',
  //     harga: Math.floor(Math.random() * 220000),
  //     disc: Math.floor(Math.random() * 10) + '%',
  //     potongan_member: 20 + '%',
  //     total: 'Rp. ' + Math.floor(Math.random() * 100) + '.' + Math.floor(Math.random() * 1000),
  //   });
  // }

  // Cari Barang

  const handleAddDataKasir = () => {
    const newData = DataKasir.concat({
      id: DataKasir.length + 1,
      kode: 'PRJM-UTN-' + Math.floor(Math.random() * 10000),
      nama: 'Beras',
      qty: Math.floor(Math.random() * 10),
      satuan: 'Kg',
      harga: Math.floor(Math.random() * 220000),
      disc: Math.floor(Math.random() * 10) + '%',
      potongan_member: Math.floor(Math.random() * 10) + '%',
      total: 'Rp. ' + Math.floor(Math.random() * 100) + '.' + Math.floor(Math.random() * 1000),
    });
    setDataKasir(newData);
  }

  const [tambahDataKasir, setTambahDataKasir] = useState([
    {
      id: 1,
      nama_barang: 'Beras',
      stok: 3 + ' kg',
      qty: 1,
    },
    {
      id: 2,
      nama_barang: 'Gandum',
      stok: 5 + ' kg',
      qty: 3,
    },
  ]);
  
  const tambahcolumnsKasir = [
    {
      title: 'No',
      dataIndex: 'id',
      width: '20px',
      align: 'center',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Nama Barang',
      dataIndex: 'nama_barang',
      width: '50%',
      align: 'center',
      ...getColumnSearchProps('nama_barang'),
      sorter: (a, b) => a.nama_barang.length - b.nama_barang.length,
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
      width: '100px',
      editable: true,
      align: 'center',
      sorter: (a, b) => a.qty - b.qty,
    },
    {
      title: 'Aksi',
      dataIndex: 'aksi',
      align: 'center',
      width: '10%',
      render: (_, record) =>
        tambahDataKasir.length >= 1 ? (
          <>
            <div className='cursor-pointer flex items-center justify-centertext-center mx-auto bg-blue-500 w-fit h-auto text-white px-3 py-2 rounded-lg' onClick={() => handleAddDataKasir(record.no)}>
              <BsCartPlusFill className='mr-1 text-xl'/>
              <span>Pilih</span>
            </div>
          </>
        ) : null,
    },
    
  ];
  
  const columns = tambahcolumnsKasir.map((col) => {
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

  const onInputNumber = (value) => {
    console.log('changed', value);
  };

  return(
    <main className="flex bg-blue-500 w-full h-full font-inter">
      
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} submenuOpen={submenuOpen} setSubmenuOpen={setSubmenuOpen} submenuOpen2={submenuOpen2} setSubmenuOpen2={setSubmenuOpen2} setOpenDropdownProfile={setOpenDropdownProfile}/>

      <div className='w-full h-fit z-5 lg:-z-0'>

        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} openDropdownProfile={openDropdownProfile} setOpenDropdownProfile={setOpenDropdownProfile}/>

        <div className=' bg-slate-100 w-full h-auto p-7 pb-24'>
          <div className='w-full h-fit border-2 bg-white border-slate-300 rounded-xl p-5'>

            <div className='grid lg:flex lg:justify-between'>
              <div>
                <table className='flex'>
                  <tleft>
                    <tr>
                      <td className='text-left w-fit h-14'>Kode</td>
                    </tr>
                    <tr>
                      <td className='text-left w-fit h-14'>Tanggal</td>
                    </tr>
                    <tr>
                      <td className='text-left w-fit h-14'>Pelanggan</td>
                    </tr>
                    <tr>
                      <td className='text-left w-fit h-14'>Nama Pelanggan</td>
                    </tr>
                    <tr>
                      <td className='text-left w-fit h-14'>No HP</td>
                    </tr>
                  </tleft>
                  <tcenter>
                    <tr>
                      <td className='text-center w-10 h-14'>:</td>
                    </tr>
                    <tr>
                      <td className='text-center w-10 h-14'>:</td>
                    </tr>
                    <tr>
                      <td className='text-center w-10 h-14'>:</td>
                    </tr>
                    <tr>
                      <td className='text-center w-10 h-14'>:</td>
                    </tr>
                    <tr>
                      <td className='text-center w-10 h-14'>:</td>
                    </tr>
                  </tcenter>
                  <tright>
                    <tr>
                      <td className='text-left w-52 h-14'>PRJM-UTN-0006</td>
                    </tr>
                    <tr>
                      <td className='text-left w-52 h-14'>07-10-2023 15:06:07</td>
                    </tr>
                    <tr>
                      <td className='text-left w-52 h-14'>
                        <Select
                        className='border border-black w-52 h-11 -mt-2 bg-white rounded-lg select'
                        showSearch
                        placeholder="Pilih Pelanggan"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={filterOption}
                        options={[
                          {
                            value: 'toko',
                            label: 'Toko',
                          },
                          {
                            value: 'toko',
                            label: 'Toko',
                          },
                          {
                            value: 'toko',
                            label: 'Toko',
                          },
                        ]}
                      />
                      </td>
                    </tr>
                    <tr>
                      <td className=' text-left w-52 h-14'>
                        <Input type="text" className='border-black border w-52 h-11 -mt-2 bg-white rounded-lg'/>
                      </td>
                    </tr>
                    <tr>
                      <td className=' text-left w-52 h-14'>
                      <InputNumber min={1} max={1000} onChange={onInputNumber} className='border-black border w-52 py-1.5 -mt-2 bg-white rounded-lg'/>
                      </td>
                    </tr>
                  </tright>
                </table>
              </div>
              <div>
                <table className='flex'>
                  <tleft>
                    <tr>
                      <td className=' text-left w-auto h-14'>Keluar dari</td>
                    </tr>
                    <tr>
                      <td className=' text-left w-auto h-14'>Sales</td>
                    </tr>
                  </tleft>
                  <tcenter>
                    <tr>
                      <td className='text-center w-10 h-14'>:</td>
                    </tr>
                    <tr>
                      <td className='text-center w-10 h-14'>:</td>
                    </tr>
                  </tcenter>
                  <tright>
                    <tr>
                      <td className=' text-left w-52 h-14'>
                      <Select
                        className='border-black border w-52 h-11 -mt-2 bg-white rounded-lg'
                        showSearch
                        placeholder="Pilih Pelanggan"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={filterOption}
                        options={[
                          {
                            value: 'toko',
                            label: 'Toko',
                          },
                          {
                            value: 'toko',
                            label: 'Toko',
                          },
                          {
                            value: 'toko',
                            label: 'Toko',
                          },
                        ]}
                      />
                      </td>
                    </tr>
                    <tr>
                      <td className=' text-left w-52 h-14'>
                      <Select
                        className='border-black border w-52 h-11 -mt-2 bg-white rounded-lg'
                        showSearch
                        placeholder="Pilih Sales"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={filterOption}
                        options={[
                          {
                            value: 'sales',
                            label: 'Sales',
                          },
                          {
                            value: 'non_sales',
                            label: 'Non Sales',
                          },
                        ]}
                      />
                      </td>
                    </tr>
                  </tright>
                </table>
              </div>
              <div className='lg:relative flex lg:w-fit h-fit w-full lg:top-20 top-0'>
                <table className='flex'>
                  <tright>
                    <span className='font-semibold my-10'>Total</span>
                    <tr>
                      <td className=' text-left w-full'>
                        <input type="text" className='border-slate-500 bg-blue-200 border w-full h-24 px-2 rounded-lg'/>
                      </td>
                    </tr>
                  </tright>
                </table>
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
                  
                  {/* <div className='w-full h-fit bg-slate-500'> */}
                    <Table
                      bordered
                      dataSource={DataKasir}
                      columns={ColumnsKasir}
                      onChange={onClick}
                      className='mb-10 overflow-x-auto'
                    />
                  {/* </div> */}

                  <Modal
                  title="Tambah Barang"
                  open={open}
                  onOk={hideModal}
                  onCancel={hideModal}
                  className='w-96 h-full'
                  okText="Selesai"
                  cancelText="Batal"
                  width={1000}
                >
                  <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={tambahDataKasir}
                    columns={columns}
                    className='my-10 overflow-x-auto'
                  />
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