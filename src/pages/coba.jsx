import React, { useState } from "react";
import { Button, Drawer, Menu } from "antd";
import { Link } from "react-router-dom";

import { AiFillHome, RxDotFilled, RxHamburgerMenu, RxDoubleArrowLeft, HiMiniShoppingBag, FaBoxArchive, ImPriceTag } from "../utils/icons";

import Dashboard from "./dashboard";

const App = () => {
  const [openSidebarMobile, setOpenSidebarMobile] = useState(false);
  const showSidebarMobile = () => {
    setOpenSidebarMobile(true);
  };
  const closeSidebarMobile = () => {
    setOpenSidebarMobile(false);
  };
  return (
    <>
    <div>coba</div>
    </>
  );
};
export default App;
