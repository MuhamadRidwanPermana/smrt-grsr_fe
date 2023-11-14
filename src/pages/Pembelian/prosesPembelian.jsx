import React, { useContext, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Select, Modal, Button, Input, Space, Table, Form, InputNumber, DatePicker } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2'

// Icon
import { BiSolidTrashAlt, BsGrid3X3GapFill, BsCartPlusFill,PiMagnifyingGlassBold, BiSolidEditAlt } from '../../utils/icons';

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
  // const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
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
        <InputNumber 
          ref={inputRef} 
          onPressEnter={save} 
          onBlur={save} 
          min={1} 
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          parser={value => value.replace(/[A-Z]|[a-z]|[$ ]|\.+/g, "")}
          onChange={(value) => onChange(value ? value : [])}
          className='w-full'/>
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

const onChange = (value) => {
  console.log('changed', value);
};

export default function ProsesPembelian() {

  const [openSidebar, setOpenSidebar] = useState(true);
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

  // Data yang di Tampilkan
  const columnsPembelian = [
    {
      title: 'No',
      dataIndex: 'id',
      width: '5%',
      align: 'center',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Nama Barang',
      dataIndex: 'nama_barang',
      width: '20px',
      align: 'center',
      ...getColumnSearchProps('nama_barang'),
      sorter: (a, b) => a.nama_barang.length - b.nama_barang.length,
    },
    {
      title: 'Satuan',
      dataIndex: 'satuan',
      width: '20px',
      align: 'center',
      sorter: (a, b) => a.satuan - b.satuan,
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
          value: 'ons',
        },
      ],
      onFilter: (value, record) => record.satuan.indexOf(value) === 0,
    },
    {
      title: 'Jual',
      dataIndex: 'jual',
      width: '20px',
      align: 'center',
      sorter: (a, b) => a.jual - b.jual,
    },
    {
      title: 'Pokok',
      dataIndex: 'pokok',
      width: '20px',
      align: 'center',
      sorter: (a, b) => a.pokok - b.pokok,
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      width: '20px',
      align: 'center',
      sorter: (a, b) => a.qty - b.qty,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      width: '20px',
      align: 'center',
      sorter: (a, b) => a.total - b.total,
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
        const newData = dataPembelian.filter((item) => item.id !== id);
        setDataPembelian(newData);
      }
    })
  };

  const [dataPembelian, setDataPembelian] = useState([
    {
      id: 1,
      nama_barang: 'Beras',
      satuan: 'Kg',
      jual: 'Rp 190.000',
      pokok: 'Rp 200.000',
      qty: 5,
      total: 'Rp 200.000',
    },
  ])


  // Data di Table Cari Barang
  const [dataSource, setDataSource] = useState([
    {
      id: '1',
      nama_barang: 'Beras',
      satuan: 'Kg',
      harga_jual: 15000,
      harga_beli: 17000,
      qty: 1,
    },
    {
      id: '2',
      nama_barang: 'Gandum',
      satuan: 'Ons',
      harga_jual: 10000,
      harga_beli: 13000,
      qty: 3,
    },
  ]);

  const handleAddDataPembelian = () => {
    const newData = dataPembelian.concat({
      id: dataPembelian.length + 1,
      nama_barang: 'Beras',
      satuan: 'Ton',
      jual: 'Rp 190.000',
      pokok: 'Rp 200.000',
      qty: 5,
      total: 'Rp 200.000',
    });
    setDataPembelian(newData);
  }
  
  const defaultColumns = [
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
      width: '30%',
      align: 'center',
      ...getColumnSearchProps('nama_barang'),
      sorter: (a, b) => a.nama_barang.length - b.nama_barang.length,
    },
    {
      title: 'Satuan',
      dataIndex: 'satuan',
      width: '20px',
      align: 'center',
      sorter: (a, b) => a.satuan - b.satuan,
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
          value: 'ons',
        },
      ],
      onFilter: (value, record) => record.satuan.indexOf(value) === 0,
    },
    {
      title: 'Harga Jual',
      dataIndex: 'harga_jual',
      width: '17%',
      editable: true,
      align: 'center',
      sorter: (a, b) => a.harga_jual - b.harga_jual,
    },
    {
      title: 'Harga Beli',
      dataIndex: 'harga_beli',
      width: '17%',
      editable: true,
      align: 'center',
      sorter: (a, b) => a.harga_beli - b.harga_beli,
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      width: '17%',
      editable: true,
      align: 'center',
      sorter: (a, b) => a.qty - b.qty,
    },
    {
      title: 'Aksi',
      dataIndex: 'aksi',
      align: 'center',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <>
            <div className={`cursor-pointer flex items-center justify-centertext-center mx-auto bg-blue-500 hover:bg-blue-600 active:bg-blue-700 w-fit h-auto text-white px-3 py-2 rounded-lg`} onClick={() => handleAddDataPembelian(record.id)}>
              <BsCartPlusFill className='mr-1 text-xl'/>
              <span>Pilih</span>
            </div>
          </>
        ) : null,
    },
    
  ];

  // Cari Barang
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

  // Edit kemudian simpan di row yang di edit
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
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

  const onInput = (value) => {
    console.log('changed', value);
  };

  dayjs.extend(customParseFormat);
  const dateFormatList = ['DD/MM/YYYY'];
  
  return(
    
    <main className="flex bg-blue-500 w-full h-full font-inter">
      
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} submenuOpen={submenuOpen} setSubmenuOpen={setSubmenuOpen} submenuOpen2={submenuOpen2} setSubmenuOpen2={setSubmenuOpen2} />

      <div className='w-full h-fit z-5 lg:-z-0'>

        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

        <div className=' bg-slate-100 w-full min-h-[calc(100vh-64px)] lg:p-5 p-4'>
          <div className='w-full h-auto border-2 bg-white border-slate-300 rounded-xl p-5'>

            {/* Menu Proses Pembelian */}
            <div className='Proses Pembelian'>
              <div className='flex items-center pb-5 border-b-2 border-slate-300 justify-between'>
                <div className='flex items-center'>
                  <span className='text-blue-500 mr-4 text-2xl'><BsGrid3X3GapFill/></span>
                  <h1 className='text-xl font-semibold'>Proses Pembelian</h1>
                </div>
              </div>

              {/* <div className='grid lg:flex lg:justify-between mt-10'>
                <div className=''>
                  <table className='flex'>
                    <tleft>
                      <tr>
                        <td className=' text-left w-40 h-14'>Kode</td>
                      </tr>
                      <tr className=''>
                        <td className=' text-left w-40 h-14'>Tanggal</td>
                      </tr>
                      <tr className=''>
                        <td className=' text-left w-40 h-14'>Toko</td>
                      </tr>
                      <tr className=''>
                        <td className=' text-left w-40 h-14'>Suplier</td>
                      </tr>
                    </tleft>
                    <tcenter>
                      <tr className=''>
                        <td className=' text-center w-5 h-14'>:</td>
                      </tr>
                      <tr className=''>
                        <td className=' text-center w-5 h-14'>:</td>
                      </tr>
                      <tr className=''>
                        <td className=' text-center w-5 h-14'>:</td>
                      </tr>
                      <tr className=''>
                        <td className=' text-center w-5 h-14'>:</td>
                      </tr>
                    </tcenter>
                    <tright>
                      <tr className=''>
                        <td className=' text-left w-52 h-14'>PRJM-UTN-0006</td>
                      </tr>
                      <tr className=''>
                        <td className=' text-left w-52 h-14'>07-10-2023 15:06:07</td>
                      </tr>
                      <tr className=''>
                        <td className=' text-left w-52 h-14'>
                          <Select
                          className='border-black border w-52 h-11 -mt-2 bg-white rounded-lg'
                          showSearch
                          placeholder="Pilih Toko"
                          optionFilterProp="children"
                          onChange={onChange}
                          onSearch={onSearch}
                          filterOption={filterOption}
                          options={[
                            {
                              value: 'toko1',
                              label: 'Toko 1',
                            },
                            {
                              value: 'toko2',
                              label: 'Toko 2',
                            },
                            {
                              value: 'toko3',
                              label: 'Toko 3',
                            },
                          ]}
                        />
                        </td>
                      </tr>
                      <tr className=''>
                        <td className=' text-left w-52 h-14'>
                        <Select
                          className='border-black border w-52 h-11 -mt-2 bg-white rounded-lg'
                          showSearch
                          placeholder="Pilih Suplier"
                          optionFilterProp="children"
                          onChange={onChange}
                          onSearch={onSearch}
                          filterOption={filterOption}
                          options={[
                            {
                              value: 'suplier1',
                              label: 'Suplier 1',
                            },
                            {
                              value: 'suplier2',
                              label: 'Suplier 2',
                            },
                            {
                              value: 'suplier3',
                              label: 'Suolier 3',
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
                      <tr className=''>
                        <td className=' text-left w-full'>
                          <input type="text" className='border-slate-500 bg-blue-200 border w-full h-24 rounded-lg'/>
                        </td>
                      </tr>
                    </tright>
                  </table>
                </div>
              </div> */}

              <div className='grid lg:flex w-full h-fit mt-10'>
              <div className='grid w-full'>
                <div className='flex w-full h-fit py-1.5'>
                  <div className='flex items-center w-32 h-11'>Kode</div>
                  <div className='flex items-center w-12 h-11'>:</div>
                  <div className=''>
                    <p className='flex items-center w-52 h-11'>PRJM-UTN-0001</p>
                  </div>
                </div>
                <div className='flex w-full h-fit py-1.5'>
                  <div className='flex items-center w-32 h-11'>Toko</div>
                  <div className='flex items-center w-12 h-11'>:</div>
                  <div className=''>
                    <Select
                      className='border border-black w-52 h-11 bg-white rounded-lg'
                      showSearch
                      placeholder="Pilih Toko"
                      optionFilterProp="children"
                      onChange={onChange}
                      onSearch={onSearch}
                      filterOption={filterOption}
                      options={[
                        {
                          value: 'toko1',
                          label: 'Toko 1',
                        },
                        {
                          value: 'toko2',
                          label: 'Toko 2',
                        },
                        {
                          value: 'toko3',
                          label: 'Toko 3',
                        },
                      ]}
                    />
                  </div>
                </div>
                <div className='flex w-full h-fit py-1.5'>
                  <div className='flex items-center w-32 h-11'>Suplier</div>
                  <div className='flex items-center w-12 h-11'>:</div>
                  <div className=''>
                    <Select
                      className='border border-black w-52 h-11 bg-white rounded-lg'
                      showSearch
                      placeholder="Pilih Suplier"
                      optionFilterProp="children"
                      onChange={onChange}
                      onSearch={onSearch}
                      filterOption={filterOption}
                      options={[
                        {
                          value: 'suplier1',
                          label: 'Suplier 1',
                        },
                        {
                          value: 'suplier2',
                          label: 'Suplier 2',
                        },
                        {
                          value: 'suplier3',
                          label: 'Suplier 3',
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
              {/* <div className='grid w-full h-fit lg:px-5'>
                <div className='flex w-full h-fit py-1.5'>
                  <div className='flex items-center w-full h-11'>Keluar dari</div>
                  <div className='flex items-center w-12 h-11'>:</div>
                  <div className=''>
                    <Select
                      className='border border-black w-52 h-11 bg-white rounded-lg select'
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
                  <div className='flex items-center w-full h-11'>Sales</div>
                  <div className='flex items-center w-12 h-11'>:</div>
                  <div className=''>
                    <Select
                      className='border border-black w-52 h-11 bg-white rounded-lg select'
                      showSearch
                      placeholder="Pilih Pelanggan"
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
                  </div>
                </div>
              </div> */}
              <div className='grid lg:relative lg:w-full w-full'>
                <div className='mt-7 lg:absolute bottom-0 right-0 w-full h-fit'>
                  <div className='w-full h-7 font-bold text-xl'>Total</div>
                  <div className='flex items-center px-3 justify-end w-full h-32 bg-blue-200 rounded-lg'>
                    <p className='text-6xl font-bold'>0</p>
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
                        components={components}
                        bordered
                        dataSource={dataPembelian}
                        columns={columnsPembelian}
                        className='my-10 overflow-x-auto'
                      />

                    <Modal
                    open={open}
                    onOk={hideModal}
                    onCancel={hideModal}
                    okText="Selesai"
                    cancelText="Batal"
                    width={1000}
                    >
                      <Table
                        components={components}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={dataSource}
                        columns={columns}
                        className='lg:mt-10 mb-5 my-1 overflow-x-auto'
                      />
                    </Modal>

                    <button className='flex ml-auto mt-5 bg-blue-500 text-white rounded-lg px-3 py-2' onClick={showModalProses}>Proses</button>

                    <Modal
                    open={openModal}
                    onOk={hideModalProses}
                    onCancel={hideModalProses}
                    okText="Checkout"
                    cancelText="Simpan"
                    width={700}
                    >
                      <div className='w-full h-fit border-b border-slate-30 px-2 pt-10 pb-3'>
                        <div className='flex items-center mb-2'>
                          <label className='text-start w-1/2 font-semibold'>Total</label>
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
                          <label className='text-start w-1/2 font-semibold'>Diskon</label>
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
                          <label className='text-start w-1/2 font-semibold'>PPN</label>
                          <InputNumber
                            defaultValue={100}
                            min={1}
                            formatter={(value) => `${value}%`}
                            parser={(value) => value.replace('%', '')}
                            onChange={onInput}
                            className='w-full h-9 border border-slate-300 rounded-lg'
                          />
                        </div>
                        <div className='flex items-center mb-2'>
                          <label className='text-start w-1/2 font-semibold'>Total Akhir</label>
                          <InputNumber
                            min={0}
                            defaultValue={0}
                            formatter={(value) => `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                            parser={value => value.replace(/[A-Z]|[a-z]|[$ ]|\.+/g, "")}
                            onChange={(value) => onChange(value ? value : [])}
                            className='w-full h-9 border border-slate-300 rounded-lg'
                          />
                        </div>
                      </div>
                      <div className='w-full h-fit px-2 pt-5 pb-3'>
                        <div className='flex items-center mb-2'>
                          <label className='text-start w-1/2 font-semibold'>Metode</label>
                          <Select
                            className='w-full h-9 border border-slate-100 rounded-lg'
                            showSearch
                            placeholder="Pilih Metode"
                            optionFilterProp="children"
                            onChange={onChange}
                            onSearch={onSearch}
                            filterOption={filterOption}
                            options={[
                              {
                                value: 'cash',
                                label: 'Cash',
                              },
                              {
                                value: 'kredit',
                                label: 'Kredit',
                              },
                            ]}
                          />
                        </div>
                        <div className='flex items-center mb-2'>
                          <label className='text-start w-1/2 font-semibold'>Pembayaran</label>
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

                      <div className='flex justify-end'>
                        <button type='submit' className="text-slate-700 bg-white border border-slate-400 px-5 py-1.5 rounded-lg mx-3" onClick={hideModalProses}>Batal</button>
                        <button type='submit' className="text-white bg-blue-500 px-5 py-1.5 rounded-lg">Checkout</button>
                      </div>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
            {/* Akhir Menu Proses Pembelian */}
          </div>
        </div>

      </div>

    </main>
  )
}