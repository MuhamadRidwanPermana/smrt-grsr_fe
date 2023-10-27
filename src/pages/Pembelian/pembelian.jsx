import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import DataTable from 'react-data-table-component';
import { Select, Modal, Button, Input, Space, Table, Form, InputNumber, DatePicker } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

// Icon
import { BiSolidTrashAlt } from 'react-icons/bi';
import { BsGrid3X3GapFill } from 'react-icons/bs';
import { BsCartPlusFill } from 'react-icons/bs';
import { RiEditLine } from 'react-icons/ri';
import { MdSave } from 'react-icons/md';

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

  const columnsDataPembelian = [
    {
      title: 'No',
      dataIndex: 'no',
      width: '5%',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.no - b.no,
    },
    {
      title: 'Kode',
      dataIndex: 'kode',
      width: '20px',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.kode - b.kode,
    },
    {
      title: 'Nama Sales',
      dataIndex: 'nama_sales',
      width: '20px',
      align: 'center',
      defaultSortOrder: 'descend',
      ...getColumnSearchProps('nama_sales'),
      sorter: (a, b) => a.nama_sales.length - b.nama_sales.length,
    },
    {
      title: 'Tanggal',
      dataIndex: 'tanggal',
      width: '20px',
      align: 'center',
      defaultSortOrder: 'descend',
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
              <button className='flex items-center justify-center text-xl p-1 text-blue-500 bg-blue-100 rounded-lg mr-2'><MdSave/></button>
              <button className='flex items-center justify-center text-xl p-1 text-red-500 bg-red-100 rounded-lg'><BiSolidTrashAlt/></button>
            </div>
          </>
        ) : null,
    },
  ]

  const dataPembelian = [
    {
      no: 1,
      kode: 'PRJM-UTN-001',
      nama_sales: 'Toko Sawarga',
      tanggal: '2022-01-01',
    }
  ]


  const Columns = [
    {
      title: 'No',
      dataIndex: 'no',
      width: '20px',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.no - b.no,
    },
    {
      title: 'Nama Barang',
      dataIndex: 'nama_barang',
      width: '20px',
      align: 'center',
      ...getColumnSearchProps('nama_barang'),
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.nama_barang.length - b.nama_barang.length,
    },
    {
      title: 'Satuan',
      dataIndex: 'satuan',
      width: '20px',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.satuan - b.satuan,
    },
    {
      title: 'Jual',
      dataIndex: 'jual',
      width: '20px',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.jual - b.jual,
    },
    {
      title: 'Pokok',
      dataIndex: 'pokok',
      width: '20px',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.pokok - b.pokok,
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      width: '20px',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.qty - b.qty,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      width: '20px',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: 'Aksi',
      dataIndex: 'aksi',
      align: 'center',
      width: '20px',
      render: (_, record) =>
        Data.length >= 1 ? (
          <>
            <div className='flex justify-center mx-auto align-center items-center'>
            <button className='text-xl w-6 h-6 text-blue-500 mr-2'><RiEditLine/></button>
            <button className='text-xl w-6 h-6 text-red-500'><PiTrashSimpleBold/></button>
          </div>
          </>
        ) : null,
    },
  ]

  const Data = [
    {
      no: 1,
      nama_barang: 'Beras',
      satuan: 'Ton',
      jual: 'Rp 200.000',
      pokok: 'Rp 200.000',
      qty: 1,
      total: 'Rp 200.000',
    }
  ]


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

  const [dataSource, setDataSource] = useState([
    {
      no: '1',
      nama_barang: 'Beras',
      satuan: 'kg',
      harga_jual: 'Rp. 20.000',
      harga_beli: 'Rp. 25.000',
      qty: 1,
    },
    {
      no: '2',
      nama_barang: 'Gandum',
      satuan: 'ton',
      harga_jual: 'Rp. 10.000',
      harga_beli: 'Rp. 15.000',
      qty: 3,
    },
  ]);
  
  const defaultColumns = [
    {
      title: 'No',
      dataIndex: 'no',
      width: '20px',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.no - b.no,
    },
    {
      title: 'Nama Barang',
      dataIndex: 'nama_barang',
      width: '30%',
      align: 'center',
      ...getColumnSearchProps('nama_barang'),
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.nama_barang.length - b.nama_barang.length,
    },
    {
      title: 'Satuan',
      dataIndex: 'satuan',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.satuan - b.satuan,
    },
    {
      title: 'Harga Jual',
      dataIndex: 'harga_jual',
      editable: true,
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.harga_jual - b.harga_jual,
    },
    {
      title: 'Harga Beli',
      dataIndex: 'harga_beli',
      editable: true,
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.harga_beli - b.harga_beli,
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      editable: true,
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.qty - b.qty,
    },
    {
      title: 'Aksi',
      dataIndex: 'aksi',
      align: 'center',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <>
            <div className='cursor-pointer flex items-center justify-center text-center mx-auto bg-blue-500 w-fit h-auto text-white px-3 py-2 rounded-lg'>
              <BsCartPlusFill className='mr-1 text-xl'/>
              <span>Pilih</span>
            </div>
          </>
        ) : null,
    },
    
  ];
  
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
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
      
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} submenuOpen={submenuOpen} setSubmenuOpen={setSubmenuOpen} submenuOpen2={submenuOpen2} setSubmenuOpen2={setSubmenuOpen2} setOpenDropdownProfile={setOpenDropdownProfile}/>

      <div className='w-full h-fit z-5 lg:-z-0'>

        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} openDropdownProfile={openDropdownProfile} setOpenDropdownProfile={setOpenDropdownProfile}/>

        <div className=' bg-slate-100 w-full h-screen p-7'>
          <div className='w-full h-fit border-2 bg-white border-slate-300 rounded-xl p-5'>

            <div className='Pembelian'>
              <header className='flex items-center pb-5 border-b-2 border-slate-300 justify-between'>
                <div className='flex'>
                  <span className='text-blue-500 mr-4 text-2xl'><BsGrid3X3GapFill/></span>
                  <h1 className='text-xl font-semibold'>Data Pembelian</h1>
                </div>
                <Link to={'/proses-pembelian'}>
                  <div className='flex'>
                    <button className='px-5 py-2 rounded-lg text-white bg-blue-500'>Tambah Data</button>
                  </div>
                </Link>
              </header>

              <body>
                <Table
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