import React, { useContext, useEffect, useRef, useState } from 'react';
import { Select, Modal, Button, Input, Space, Table, Form } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

// Icon
import { BsCartPlusFill } from 'react-icons/bs';
import { BiSolidEditAlt } from 'react-icons/bi';
import { BiSolidTrashAlt } from 'react-icons/bi';
import { PiMagnifyingGlassBold } from 'react-icons/pi';

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

  const ColumnsKasir = [
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
      width: '15%',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.no - b.no,
    },
    {
      title: 'Nama',
      dataIndex: 'nama',
      width: '20px',
      align: 'center',
      ...getColumnSearchProps('nama'),
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.no - b.no,
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      width: '5%',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.no - b.no,
    },
    {
      title: 'Satuan',
      dataIndex: 'satuan',
      width: '20px',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.no - b.no,
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
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.no - b.no,
    },
    {
      title: 'Disc',
      dataIndex: 'disc',
      width: '5%',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.no - b.no,
    },
    {
      title: 'Potongan Member',
      dataIndex: 'potongan_member',
      width: '20px',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.no - b.no,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      width: '15%',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.no - b.no,
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
              <button className='flex items-center justify-center text-xl p-1 text-red-500 bg-red-100 rounded-lg'><BiSolidTrashAlt/></button>
            </div>
          </>
        ) : null,
    },
  ]

  // const DataKasir = [
  //   {
  //     no: '1',
  //     kode : '001',
  //     nama: 'Beras',
  //     qty: 1,
  //     satuan: 3 + ' kg',
  //     harga: 20,
  //     disc: 20 + '%',
  //     potongan_member: 20 + '%',
  //     total: '20.000',
  //   },
  // ]

  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  const DataKasir = []
  for (let i = 1; i < 100 ; i++) {
    DataKasir.push({
      no: i,
      kode : 'PRJM-UTN-0' + Math.floor(Math.random() * 1000),
      nama: generateString(5),
      qty: Math.floor(Math.random() * 10),
      satuan: 'Kg',
      harga: Math.floor(Math.random() * 220000),
      disc: Math.floor(Math.random() * 10) + '%',
      potongan_member: 20 + '%',
      total: 'Rp. ' + Math.floor(Math.random() * 100) + '.' + Math.floor(Math.random() * 1000),
    });


  }  

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


  const [tambahDataKasir, setTambahDataKasir] = useState([
    {
      no: '1',
      nama_barang: 'Beras',
      stok: 3 + ' kg',
      qty: 1,
    },
    {
      no: '2',
      nama_barang: 'Gandum',
      stok: 5 + ' kg',
      qty: 3,
    },
  ]);
  
  const tambahcolumnsKasir = [
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
      width: '50%',
      align: 'center',
      ...getColumnSearchProps('nama_barang'),
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.nama_barang.length - b.nama_barang.length,
    },
    {
      title: 'Stok',
      dataIndex: 'stok',
      width: '100px',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.stok - b.stok,
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      width: '100px',
      editable: true,
      align: 'center',
      defaultSortOrder: 'descend',
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
            <div className='cursor-pointer flex items-center justify-center text-center mx-auto bg-blue-500 w-fit h-auto text-white px-3 py-2 rounded-lg'>
              <BsCartPlusFill className='mr-1 text-xl'/>
              <span>Pilih</span>
            </div>
          </>
        ) : null,
    },
    
  ];
  
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

  return(
    
    <main className="flex bg-blue-500 w-full h-full font-inter">
      
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} submenuOpen={submenuOpen} setSubmenuOpen={setSubmenuOpen} submenuOpen2={submenuOpen2} setSubmenuOpen2={setSubmenuOpen2} setOpenDropdownProfile={setOpenDropdownProfile}/>

      <div className='w-full h-fit z-5 lg:-z-0'>

        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} openDropdownProfile={openDropdownProfile} setOpenDropdownProfile={setOpenDropdownProfile}/>

        <div className=' bg-slate-100 w-full h-auto p-7 pb-24'>
          <div className='w-full h-fit border-2 bg-white border-slate-300 rounded-xl p-5'>

            <div className='grid lg:flex lg:justify-between'>
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
                        {/* <input type="text" className='border-black border w-52 h-11 -mt-2 bg-white rounded-lg'/> */}
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
                    <tr className=''>
                      <td className=' text-left w-52 h-14'>
                        <Input type="text" className='border-black border w-52 h-11 -mt-2 bg-white rounded-lg'/>
                      </td>
                    </tr>
                  </tright>
                </table>
              </div>
              <div className=''>
                <table className='flex'>
                  <tleft>
                    <tr>
                      <td className=' text-left w-40 h-14'>Keluar dari</td>
                    </tr>
                    <tr className=''>
                      <td className=' text-left w-40 h-14'>Sales</td>
                    </tr>
                  </tleft>
                  <tcenter>
                    <tr className=''>
                      <td className=' text-center w-5 h-14'>:</td>
                    </tr>
                    <tr className=''>
                      <td className=' text-center w-5 h-14'>:</td>
                    </tr>
                  </tcenter>
                  <tright>
                    <tr className=''>
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
                    <tr className=''>
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
                    <tr className=''>
                      <td className=' text-left w-full'>
                        <input type="text" className='border-slate-500 bg-blue-200 border w-full h-24 rounded-lg'/>
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
                    className='my-10'
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