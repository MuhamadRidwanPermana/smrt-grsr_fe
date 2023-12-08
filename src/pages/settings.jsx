import React, { useState } from "react";
import { Upload, Input, Form } from "antd";
import ImgCrop from "antd-img-crop";
import TextArea from "antd/es/input/TextArea";

// Component
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import Header from "../Components/LoginRegisterComponents/Header/index";
import Label from "../Components/Elements/Input/Label";

export default function Settings() {

  const [openSidebar, setOpenSidebar] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [submenuOpen2, setSubmenuOpen2] = useState(false);

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.jpg",
      status: "done",
      url: "https://i.ibb.co/HB1k6w3/app-icon.jpg",
    },
  ]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <main className="flex bg-blue-500 w-full h-fit font-inter">
      <Sidebar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        submenuOpen={submenuOpen}
        setSubmenuOpen={setSubmenuOpen}
        submenuOpen2={submenuOpen2}
        setSubmenuOpen2={setSubmenuOpen2}
      />

      <div className="w-full h-fit z-5 lg:-z-0">
        <Navbar
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
        />

        <div className=" bg-slate-100 w-full min-h-[calc(100vh-64px)] lg:p-5 p-4">
          <div className="w-full h-auto border-2 bg-white border-slate-300 rounded-xl lg:py-16">
            <Form action="" onSubmit="">
              <div className="block lg:flex lg:justify-between">
                <div className="w-full lg:border-r-2 border-slate-300 lg:px-24 lg:py-16 p-10">
                  <Header
                    header="Pengaturan Toko"
                    subHeader="Ubah informasi toko"
                  />

                  <div className="mb-3">
                    <div className="mb-2">
                      <label
                        htmlFor=""
                        className="text-blue-950 font-inter font-medium"
                      >
                        Logo Toko
                      </label>
                    </div>
                    <div className="flex items-center align-middle">
                      <div className="flex w-fit h-fit mr-5">
                        <ImgCrop rotate>
                          <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-circle"
                            fileList={fileList}
                            onChange={onChange}
                            onPreview={onPreview}
                          >
                            {fileList.length < 1 && "+ Upload"}
                          </Upload>
                        </ImgCrop>
                      </div>
                      <div className="mt-2">
                        <h1 className="text-xs font-semibold">
                          PNG, JPG or JPEG, 2MB max.
                        </h1>
                        <h1 className="text-xs text-slate-500">
                          Anda bisa unggah gambar nanti
                        </h1>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <Label label="Nama Toko" />
                    <Form.Item
                      name="nama_toko"
                      rules={[
                        {
                          required: true,
                          message: (
                            <span className="text-xs">
                              Mohon masukan Nama Toko anda!
                            </span>
                          ),
                        },
                      ]}
                    >
                      <Input
                        placeholder="Masukan nama toko"
                        name="nama_toko"
                        className="w-full h-12 border-2 border-slate-300 rounded-lg mt-3"
                      />
                    </Form.Item>
                  </div>

                  <div className="mb-3">
                    <Label label="Alamat Toko" />
                    <Form.Item
                      name="alamat_toko"
                      rules={[
                        {
                          required: true,
                          message: (
                            <span className="text-xs">
                              Mohon masukan Alamat Toko Anda!
                            </span>
                          ),
                        },
                      ]}
                    >
                      <TextArea
                        autoSize
                        placeholder="Masukan alamat toko"
                        name="alamat_toko"
                        className="w-full py-3 border-2 border-slate-300 rounded-lg mt-3"
                      />
                    </Form.Item>
                  </div>

                  <div className="mb-3">
                    <Label label="No Kontak Toko" />
                    <Form.Item
                      name="no_kontak"
                      rules={[
                        {
                          required: true,
                          message: (
                            <span className="text-xs">
                              Mohon masukan No Kontak Toko Anda!
                            </span>
                          ),
                        },
                      ]}
                    >
                      <Input
                        placeholder="ex. 081 234 567 890"
                        name="no_kontak"
                        className="w-full h-12 border-2 border-slate-300 rounded-lg mt-3"
                      />
                    </Form.Item>
                  </div>
                </div>

                <div className="w-full lg:px-24 lg:py-16 p-10 lg:border-0 border-t-2 border-slate-300">
                  <Header
                    header="Pengaturan Akun"
                    subHeader="Ubah informasi akun"
                  />
                  <div className="mb-3">
                    <Label label="Nama Pemilik" />
                    <Form.Item
                      name="nama_pemilik"
                      rules={[
                        {
                          required: true,
                          message: (
                            <span className="text-xs">
                              Mohon masukan Nama Pemilik!
                            </span>
                          ),
                        },
                      ]}
                    >
                      <Input
                        label="Email"
                        placeholder="Masukan email"
                        name="email"
                        className="w-full h-12 border-2 border-slate-300 rounded-lg mt-3"
                      />
                    </Form.Item>
                  </div>

                  <div className="mb-3">
                    <Label label="Email" />
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: (
                            <span className="text-xs">
                              Mohon masukan Email!
                            </span>
                          ),
                        },
                      ]}
                    >
                      <Input
                        label="Email"
                        placeholder="Masukan email"
                        name="email"
                        className="w-full h-12 border-2 border-slate-300 rounded-lg mt-3"
                      />
                    </Form.Item>
                  </div>

                  <div className="mb-3">
                    <Label label="Masukan Kata Sandi Lama" />
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: (
                            <span className="text-xs">
                              Mohon masukan Kata Sandi Lama!
                            </span>
                          ),
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="Masukan Kata Sandi lama"
                        name="password"
                        className="w-full h-12 border-2 border-slate-300 rounded-lg mt-3"
                      />
                    </Form.Item>
                  </div>

                  <div className="mb-3">
                    <Label label="Masukan Kata Sandi Baru" />
                    <Form.Item
                      name="confirm_password"
                      rules={[
                        {
                          required: true,
                          message: (
                            <span className="text-xs">
                              Mohon masukan Kata Sandi Baru!
                            </span>
                          ),
                        },
                      ]}
                    >
                      <Input.Password
                        label="Password"
                        placeholder="Konfirmasi Kata Sandi Baru"
                        name="password"
                        className="w-full h-12 border-2 border-slate-300 rounded-lg mt-3"
                      />
                    </Form.Item>
                  </div>

                  <div className="mb-3">
                    <Label label="Konfirmasi Kata Sandi Baru" />
                    <Form.Item
                      name="confirm_password"
                      rules={[
                        {
                          required: true,
                          message: (
                            <span className="text-xs">
                              Mohon masukan Kata Sandi Baru!
                            </span>
                          ),
                        },
                      ]}
                    >
                      <Input.Password
                        label="Password"
                        placeholder="Konfirmasi Kata Sandi Baru"
                        name="password"
                        className="w-full h-12 border-2 border-slate-300 rounded-lg mt-3"
                      />
                    </Form.Item>
                  </div>

                  <button className="text-base font-inter lg:w-1/2 w-full lg:my-3 mt-5 p-3 bg-blue-500 text-white rounded-lg">
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
}
