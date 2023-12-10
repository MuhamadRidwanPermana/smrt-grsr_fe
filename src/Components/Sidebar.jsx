import  { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Drawer, Menu } from 'antd';

// Icon
import { RxDoubleArrowLeft, AiFillHome, BsChevronRight, HiMiniShoppingBag, ImPriceTag, FaBoxArchive, RxDotFilled, CgClose } from '../utils/icons';

export default function Sidebar({openSidebar, setOpenSidebar, submenuOpen, setSubmenuOpen, submenuOpen2, setSubmenuOpen2}) {

  return(
    <aside className={` ${openSidebar ? 'w-72 lg:w-80 fixed lg:flex duration-300' : 'animation w-80 h-full p-5 duration-300 lg:flex hidden'} h-screen p-5 bg-blue-500 fixed sm:fixed lg:relative z-50 lg:z-0`}>
      <span className='absolute -mt-5 ml-64 lg:hidden bg-blue-500 w-14 h-12 pt-2 rounded-tr-xl rounded-br-xl cursor-pointer' onClick={() => setOpenSidebar(!openSidebar)}>
          <RxDoubleArrowLeft className='text-xl my-1.5 mx-5 text-white' />
      </span>
      <div className='sticky top-5 w-full h-12 border-b'>
        <div className='flex justify-center items-center w-full h-fit text-white'>
          <svg width="160" height="24" viewBox="0 0 172 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.1674 0.334595L18.5521 3.99951C18.4767 4.0354 18.3986 4.06677 18.3181 4.0932L16.7769 4.6001C15.9171 4.88287 15.4605 5.60333 15.407 6.35101L7.33081 1.70343L9.73389 0.334595C10.1191 0.111511 10.5247 0 10.9506 0C11.3765 0 11.782 0.111511 12.1674 0.334595Z" fill="#fff"/>
            <path d="M12.1674 12.8669L18.7101 9.08441C19.1237 9.32855 19.4402 9.71649 19.5931 10.1818L20.1001 11.7232C20.3892 12.6021 21.1357 13.0598 21.9011 13.096V17.0038C21.902 17.45 21.7957 17.8555 21.5824 18.2205C21.369 18.5856 21.0697 18.8796 20.6844 19.1027L12.1674 24V12.8669Z" fill="#fff"/>
            <path d="M9.73389 24V12.8669L0 7.23956V17.0038C0 17.45 0.106689 17.8555 0.319946 18.2205C0.533325 18.5856 0.832275 18.8796 1.21667 19.1027L9.73389 24Z" fill="#fff"/>
            <path d="M10.9506 10.7681L14.5703 8.69965L4.92773 3.10266L1.27759 5.20154L10.9506 10.7681Z" fill="#fff"/>
            <path d="M21.525 1.9442C21.6758 1.48582 22.3242 1.48582 22.475 1.94421L23.406 4.7752C23.4556 4.92605 23.574 5.04436 23.7248 5.09397L26.5558 6.02503C27.0142 6.17578 27.0142 6.82422 26.5558 6.97497L23.7248 7.90603C23.574 7.95564 23.4556 8.07395 23.406 8.2248L22.475 11.0558C22.3242 11.5142 21.6758 11.5142 21.525 11.0558L20.594 8.2248C20.5444 8.07395 20.426 7.95564 20.2752 7.90603L17.4442 6.97497C16.9858 6.82422 16.9858 6.17578 17.4442 6.02503L20.2752 5.09397C20.426 5.04436 20.5444 4.92605 20.594 4.7752L21.525 1.9442Z" fill="#fff"/>
            <path d="M42.7074 8.34375C42.6278 7.59943 42.2926 7.01989 41.7017 6.60511C41.1165 6.19034 40.3551 5.98295 39.4176 5.98295C38.7585 5.98295 38.1932 6.08239 37.7216 6.28125C37.25 6.48011 36.8892 6.75 36.6392 7.09091C36.3892 7.43182 36.2614 7.82102 36.2557 8.25852C36.2557 8.62216 36.3381 8.9375 36.5028 9.20455C36.6733 9.47159 36.9034 9.69886 37.1932 9.88636C37.483 10.0682 37.804 10.2216 38.1562 10.3466C38.5085 10.4716 38.8636 10.5767 39.2216 10.6619L40.858 11.071C41.517 11.2244 42.1506 11.4318 42.7585 11.6932C43.3722 11.9545 43.9205 12.2841 44.4034 12.6818C44.892 13.0795 45.2784 13.5597 45.5625 14.1222C45.8466 14.6847 45.9886 15.3437 45.9886 16.0994C45.9886 17.1222 45.7273 18.0227 45.2045 18.8011C44.6818 19.5739 43.9261 20.179 42.9375 20.6165C41.9545 21.0483 40.7642 21.2642 39.3665 21.2642C38.0085 21.2642 36.8295 21.054 35.8295 20.6335C34.8352 20.2131 34.0568 19.5994 33.4943 18.7926C32.9375 17.9858 32.6364 17.0028 32.5909 15.8438H35.7017C35.7472 16.4517 35.9347 16.9574 36.2642 17.3608C36.5937 17.7642 37.0227 18.0653 37.5511 18.2642C38.0852 18.4631 38.6818 18.5625 39.3409 18.5625C40.0284 18.5625 40.6307 18.4602 41.1477 18.2557C41.6705 18.0455 42.0795 17.7557 42.375 17.3864C42.6705 17.0114 42.821 16.5739 42.8267 16.0739C42.821 15.6193 42.6875 15.2443 42.4261 14.9489C42.1648 14.6477 41.7983 14.3977 41.3267 14.1989C40.8608 13.9943 40.3153 13.8125 39.6903 13.6534L37.7045 13.142C36.267 12.7727 35.1307 12.2131 34.2955 11.4631C33.4659 10.7074 33.0511 9.70455 33.0511 8.45454C33.0511 7.42614 33.3295 6.52557 33.8864 5.75284C34.4489 4.98011 35.2131 4.38068 36.179 3.95454C37.1449 3.52273 38.2386 3.30682 39.4602 3.30682C40.6989 3.30682 41.7841 3.52273 42.7159 3.95454C43.6534 4.38068 44.3892 4.97443 44.9233 5.73579C45.4574 6.49148 45.733 7.3608 45.75 8.34375H42.7074Z" fill="#fff"/>
            <path d="M48.6712 21V7.90909H51.62V10.1335H51.7734C52.0462 9.38352 52.4979 8.7983 53.1285 8.37784C53.7592 7.9517 54.5121 7.73864 55.3871 7.73864C56.2734 7.73864 57.0206 7.95455 57.6285 8.38636C58.2422 8.8125 58.674 9.39489 58.924 10.1335H59.0604C59.3501 9.40625 59.8388 8.8267 60.5263 8.39489C61.2195 7.95739 62.0405 7.73864 62.9893 7.73864C64.1939 7.73864 65.1769 8.11932 65.9382 8.88068C66.6996 9.64205 67.0803 10.7528 67.0803 12.2131V21H63.9865V12.6903C63.9865 11.8778 63.7706 11.2841 63.3388 10.9091C62.907 10.5284 62.3785 10.3381 61.7535 10.3381C61.0092 10.3381 60.4268 10.571 60.0064 11.0369C59.5916 11.4972 59.3842 12.0966 59.3842 12.8352V21H56.3587V12.5625C56.3587 11.8864 56.1541 11.3466 55.745 10.9432C55.3416 10.5398 54.8132 10.3381 54.1598 10.3381C53.7166 10.3381 53.3132 10.4517 52.9496 10.679C52.5859 10.9006 52.2962 11.2159 52.0803 11.625C51.8643 12.0284 51.7564 12.5 51.7564 13.0398V21H48.6712Z" fill="#fff"/>
            <path d="M73.9773 21.2642C73.1477 21.2642 72.4006 21.1165 71.7358 20.821C71.0767 20.5199 70.554 20.0767 70.1676 19.4915C69.7869 18.9062 69.5966 18.1847 69.5966 17.3267C69.5966 16.5881 69.733 15.9773 70.0057 15.4943C70.2784 15.0114 70.6506 14.625 71.1222 14.3352C71.5937 14.0455 72.125 13.8267 72.7159 13.679C73.3125 13.5256 73.929 13.4148 74.5653 13.3466C75.3324 13.267 75.9545 13.196 76.4318 13.1335C76.9091 13.0653 77.2557 12.9631 77.4716 12.8267C77.6932 12.6847 77.804 12.4659 77.804 12.1705V12.1193C77.804 11.4773 77.6136 10.9801 77.233 10.6278C76.8523 10.2756 76.304 10.0994 75.5881 10.0994C74.8324 10.0994 74.233 10.2642 73.7898 10.5938C73.3523 10.9233 73.0568 11.3125 72.9034 11.7614L70.0227 11.3523C70.25 10.5568 70.625 9.89205 71.1477 9.35795C71.6705 8.81818 72.3097 8.41477 73.0653 8.14773C73.821 7.875 74.6563 7.73864 75.571 7.73864C76.2017 7.73864 76.8295 7.8125 77.4545 7.96023C78.0795 8.10795 78.6506 8.35227 79.1676 8.69318C79.6847 9.02841 80.0994 9.4858 80.4119 10.0653C80.7301 10.6449 80.8892 11.3693 80.8892 12.2386V21H77.9233V19.2017H77.821C77.6335 19.5653 77.3693 19.9062 77.0284 20.2244C76.6932 20.5369 76.2699 20.7898 75.7585 20.983C75.2528 21.1705 74.6591 21.2642 73.9773 21.2642ZM74.7784 18.9972C75.3977 18.9972 75.9347 18.875 76.3892 18.6307C76.8437 18.3807 77.1932 18.0511 77.4375 17.642C77.6875 17.233 77.8125 16.7869 77.8125 16.304V14.7614C77.7159 14.8409 77.5511 14.9148 77.3182 14.983C77.0909 15.0511 76.8352 15.1108 76.5511 15.1619C76.267 15.2131 75.9858 15.2585 75.7074 15.2983C75.429 15.3381 75.1875 15.3722 74.983 15.4006C74.5227 15.4631 74.1108 15.5653 73.7472 15.7074C73.3835 15.8494 73.0966 16.0483 72.8864 16.304C72.6761 16.554 72.571 16.8778 72.571 17.2756C72.571 17.8438 72.7784 18.2727 73.1932 18.5625C73.608 18.8523 74.1364 18.9972 74.7784 18.9972Z" fill="#fff"/>
            <path d="M83.9915 21V7.90909H86.983V10.0909H87.1193C87.358 9.33523 87.767 8.75284 88.3466 8.34375C88.9318 7.92898 89.5994 7.72159 90.3494 7.72159C90.5199 7.72159 90.7102 7.73011 90.9205 7.74716C91.1364 7.75852 91.3153 7.77841 91.4574 7.80682V10.6449C91.3267 10.5994 91.1193 10.5597 90.8352 10.5256C90.5568 10.4858 90.2869 10.4659 90.0256 10.4659C89.4631 10.4659 88.9574 10.5881 88.5085 10.8324C88.0653 11.071 87.7159 11.4034 87.4602 11.8295C87.2045 12.2557 87.0767 12.7472 87.0767 13.304V21H83.9915Z" fill="#fff"/>
            <path d="M100.747 7.90909V10.2955H93.2216V7.90909H100.747ZM95.0795 4.77273H98.1648V17.0625C98.1648 17.4773 98.2273 17.7955 98.3523 18.017C98.483 18.233 98.6534 18.3807 98.8636 18.4602C99.0739 18.5398 99.3068 18.5795 99.5625 18.5795C99.7557 18.5795 99.9318 18.5653 100.091 18.5369C100.256 18.5085 100.381 18.483 100.466 18.4602L100.986 20.8722C100.821 20.929 100.585 20.9915 100.278 21.0597C99.9773 21.1278 99.608 21.1676 99.1705 21.179C98.3977 21.2017 97.7017 21.0852 97.0824 20.8295C96.4631 20.5682 95.9716 20.1648 95.608 19.6193C95.25 19.0739 95.0739 18.392 95.0795 17.5739V4.77273Z" fill="#fff"/>
            <path d="M115.157 9.11932C115.015 8.65909 114.819 8.24716 114.569 7.88352C114.325 7.5142 114.029 7.19886 113.683 6.9375C113.342 6.67614 112.95 6.48011 112.506 6.34943C112.063 6.21307 111.58 6.14489 111.058 6.14489C110.12 6.14489 109.285 6.38068 108.552 6.85227C107.819 7.32386 107.242 8.01704 106.822 8.93182C106.407 9.84091 106.2 10.9489 106.2 12.2557C106.2 13.5739 106.407 14.6903 106.822 15.6051C107.237 16.5199 107.813 17.2159 108.552 17.6932C109.29 18.1648 110.148 18.4006 111.126 18.4006C112.012 18.4006 112.779 18.2301 113.427 17.8892C114.08 17.5483 114.583 17.0653 114.935 16.4403C115.288 15.8097 115.464 15.071 115.464 14.2244L116.18 14.3352H111.441V11.8636H118.523V13.9602C118.523 15.4545 118.205 16.7472 117.569 17.8381C116.933 18.929 116.058 19.7699 114.944 20.3608C113.83 20.946 112.552 21.2386 111.109 21.2386C109.501 21.2386 108.089 20.8778 106.873 20.1562C105.663 19.429 104.717 18.3977 104.035 17.0625C103.359 15.7216 103.021 14.1307 103.021 12.2898C103.021 10.8807 103.219 9.62216 103.617 8.5142C104.021 7.40625 104.583 6.46591 105.305 5.69318C106.026 4.91477 106.873 4.32386 107.844 3.92045C108.816 3.51136 109.873 3.30682 111.015 3.30682C111.981 3.30682 112.881 3.44886 113.717 3.73295C114.552 4.01136 115.293 4.40909 115.941 4.92614C116.594 5.44318 117.131 6.05682 117.552 6.76704C117.972 7.47727 118.248 8.26136 118.379 9.11932H115.157Z" fill="#fff"/>
            <path d="M121.445 21V7.90909H124.436V10.0909H124.572C124.811 9.33523 125.22 8.75284 125.8 8.34375C126.385 7.92898 127.053 7.72159 127.803 7.72159C127.973 7.72159 128.163 7.73011 128.374 7.74716C128.589 7.75852 128.768 7.77841 128.911 7.80682V10.6449C128.78 10.5994 128.572 10.5597 128.288 10.5256C128.01 10.4858 127.74 10.4659 127.479 10.4659C126.916 10.4659 126.411 10.5881 125.962 10.8324C125.518 11.071 125.169 11.4034 124.913 11.8295C124.658 12.2557 124.53 12.7472 124.53 13.304V21H121.445Z" fill="#fff"/>
            <path d="M136.131 21.2557C134.853 21.2557 133.745 20.9744 132.808 20.4119C131.87 19.8494 131.143 19.0625 130.626 18.0511C130.114 17.0398 129.859 15.858 129.859 14.5057C129.859 13.1534 130.114 11.9687 130.626 10.9517C131.143 9.93466 131.87 9.14489 132.808 8.58239C133.745 8.01989 134.853 7.73864 136.131 7.73864C137.41 7.73864 138.518 8.01989 139.455 8.58239C140.393 9.14489 141.117 9.93466 141.629 10.9517C142.146 11.9687 142.404 13.1534 142.404 14.5057C142.404 15.858 142.146 17.0398 141.629 18.0511C141.117 19.0625 140.393 19.8494 139.455 20.4119C138.518 20.9744 137.41 21.2557 136.131 21.2557ZM136.148 18.7841C136.842 18.7841 137.421 18.5937 137.887 18.2131C138.353 17.8267 138.7 17.3097 138.927 16.6619C139.16 16.0142 139.276 15.2926 139.276 14.4972C139.276 13.696 139.16 12.9716 138.927 12.3239C138.7 11.6705 138.353 11.1506 137.887 10.7642C137.421 10.3778 136.842 10.1847 136.148 10.1847C135.438 10.1847 134.847 10.3778 134.376 10.7642C133.91 11.1506 133.56 11.6705 133.327 12.3239C133.1 12.9716 132.987 13.696 132.987 14.4972C132.987 15.2926 133.1 16.0142 133.327 16.6619C133.56 17.3097 133.91 17.8267 134.376 18.2131C134.847 18.5937 135.438 18.7841 136.148 18.7841Z" fill="#fff"/>
            <path d="M155.369 11.3693L152.557 11.6761C152.477 11.392 152.338 11.125 152.139 10.875C151.946 10.625 151.685 10.4233 151.355 10.2699C151.026 10.1165 150.622 10.0398 150.145 10.0398C149.503 10.0398 148.963 10.179 148.526 10.4574C148.094 10.7358 147.881 11.0966 147.886 11.5398C147.881 11.9205 148.02 12.2301 148.304 12.4688C148.594 12.7074 149.071 12.9034 149.736 13.0568L151.969 13.5341C153.207 13.8011 154.128 14.2244 154.73 14.804C155.338 15.3835 155.645 16.142 155.651 17.0795C155.645 17.9034 155.403 18.6307 154.926 19.2614C154.455 19.8864 153.798 20.375 152.957 20.7273C152.116 21.0795 151.151 21.2557 150.06 21.2557C148.457 21.2557 147.168 20.9205 146.19 20.25C145.213 19.5739 144.631 18.6335 144.443 17.429L147.452 17.1392C147.588 17.7301 147.878 18.1761 148.321 18.4773C148.764 18.7784 149.341 18.929 150.051 18.929C150.784 18.929 151.372 18.7784 151.815 18.4773C152.264 18.1761 152.489 17.804 152.489 17.3608C152.489 16.9858 152.344 16.6761 152.054 16.4318C151.77 16.1875 151.327 16 150.724 15.8693L148.491 15.4006C147.236 15.1392 146.307 14.6989 145.705 14.0795C145.102 13.4545 144.804 12.6648 144.81 11.7102C144.804 10.9034 145.023 10.2045 145.466 9.61364C145.915 9.01705 146.537 8.55682 147.332 8.23295C148.134 7.90341 149.057 7.73864 150.102 7.73864C151.636 7.73864 152.844 8.06534 153.724 8.71875C154.611 9.37216 155.159 10.2557 155.369 11.3693Z" fill="#fff"/>
            <path d="M158.195 21V7.90909H161.28V21H158.195ZM159.746 6.05114C159.257 6.05114 158.837 5.8892 158.484 5.56534C158.132 5.23579 157.956 4.84091 157.956 4.38068C157.956 3.91477 158.132 3.51989 158.484 3.19602C158.837 2.86648 159.257 2.7017 159.746 2.7017C160.24 2.7017 160.661 2.86648 161.007 3.19602C161.359 3.51989 161.536 3.91477 161.536 4.38068C161.536 4.84091 161.359 5.23579 161.007 5.56534C160.661 5.8892 160.24 6.05114 159.746 6.05114Z" fill="#fff"/>
            <path d="M164.452 21V7.90909H167.444V10.0909H167.58C167.819 9.33523 168.228 8.75284 168.808 8.34375C169.393 7.92898 170.06 7.72159 170.81 7.72159C170.981 7.72159 171.171 7.73011 171.381 7.74716C171.597 7.75852 171.776 7.77841 171.918 7.80682V10.6449C171.788 10.5994 171.58 10.5597 171.296 10.5256C171.018 10.4858 170.748 10.4659 170.487 10.4659C169.924 10.4659 169.418 10.5881 168.969 10.8324C168.526 11.071 168.177 11.4034 167.921 11.8295C167.665 12.2557 167.538 12.7472 167.538 13.304V21H164.452Z" fill="#fff"/>
            </svg>

          <span className="text-[10px] text-blue-400 mx-2 mt-1 w-8 h-5 text-center pt-0.5 bg-blue-100 border border-blue-400 rounded-[5px]">Lite</span>
        </div>
      </div>
      <ul className='fixed w-56 lg:mt-16 mt-5'>
        <NavLink to={'/dashboard'} className={`flex mb-3 w-full h-11 items-center hover:bg-white hover:duration-300 rounded-lg cursor-pointer hover:text-blue-500 text-white`}>
          <span><AiFillHome className='text-xl mx-2 mb-1'/></span>
          <p className={`px-3 text-md block duration-300`}>Dashboard</p>
        </NavLink>
        <Link className={`flex mb-3 w-full h-11 items-center hover:bg-white hover:duration-300 rounded-lg cursor-pointer text-white hover:text-blue-500`} onClick={() => setSubmenuOpen(!submenuOpen)}>
          <span><HiMiniShoppingBag className='text-xl mx-2 mb-1'/></span>
          <p className={`px-3 text-md cursor-pointer block' : 'hidden'} `}>Penjualan</p>
            <BsChevronRight  className={`items-center my-auto ml-auto mr-3 duration-300 block duration-300' : 'hidden duration-300'} ${submenuOpen ? 'rotate-90' : ''}`}/>
        </Link>
        <span className={`text-white duration-300 ${submenuOpen ? 'flex-row duration-300' : 'hidden duration-300'} block' : 'hidden'}`}>
          <NavLink to={'/penjualan/kasir'} className='flex mb-3 rounded-lg w-full h-11 px-9 items-center hover:text-blue-500 hover:bg-white hover:duration-300'>
            <div className='flex items-center mx-2'>
              <RxDotFilled />
              <li className='mx-2 cursor-pointer'>Kasir</li>
            </div>
          </NavLink>
          {/* <NavLink to={'/penjualan/riwayat-transaksi'} className='flex mb-3 rounded-lg w-full h-11 pl-9 items-center hover:text-blue-500 hover:bg-white hover:duration-300'>
            <div className='flex items-center mx-2'>
              <RxDotFilled />
              <li className='mx-2 cursor-pointer'>Riwayat Transaksi</li>
            </div>
          </NavLink> */}
          <NavLink to={'/penjualan/persediaan'} className='flex mb-3 rounded-lg w-full h-11 px-9 items-center hover:text-blue-500 hover:bg-white hover:duration-300'>
            <div className='flex items-center mx-2'>
              <RxDotFilled />
              <li className='mx-2 cursor-pointer'>Persediaan</li>
            </div>
          </NavLink>
        </span>
        <NavLink to={'/riwayat-transaksi'} className={`flex mb-3 w-full h-11' : ' items-center w-fit'} h-11 items-center hover:bg-white hover:duration-300 rounded-lg cursor-pointer hover:text-blue-500 text-white`}>
          <span><ImPriceTag className='text-xl mx-2 mb-1'/></span>
          <p className={`px-3 text-md block' : 'hidden duration-300'}`}>Riwayat Transaksi</p>
        </NavLink>
        <li className={`flex mb-3 w-full' : 'w-fit'} h-11 items-center hover:bg-white hover:duration-300 rounded-lg cursor-pointer text-white hover:text-blue-500`} onClick={() => setSubmenuOpen2(!submenuOpen2)}>
          <span><FaBoxArchive className='text-xl mx-2 mb-1'/></span>
          <p className={`px-3 text-md cursor-pointer block' : ' hidden'} `}>Master Data</p>
            <BsChevronRight  className={`items-center my-auto ml-auto mr-3 duration-300 block duration-300' : 'hidden duration-300'} ${submenuOpen2 ? 'rotate-90' : ''}`}/>
        </li>
        <span className={`text-white ${submenuOpen2 ? 'block' : 'hidden'} block' : 'hidden'}`}>
          <NavLink to={'/master-data/produk'} className='flex mb-3 rounded-lg w-full h-11 px-9 items-center hover:text-blue-500 hover:bg-white hover:duration-300'>
            <div className='flex items-center mx-2'>
              <RxDotFilled />
              <li className='mx-2 cursor-pointer'>Produk</li>
            </div>
          </NavLink>
          <NavLink to={'/master-data/data-suplier'} className='flex mb-3 rounded-lg w-full h-11 px-9 items-center hover:text-blue-500 hover:bg-white hover:duration-300'>
            <div className='flex items-center mx-2'>
              <RxDotFilled />
              <li className='mx-2 cursor-pointer'>Data Suplier</li>
            </div>
          </NavLink>
          {/* <NavLink to={'/master-data/data-pelanggan'} className='flex mb-3 rounded-lg w-full h-11 px-9 items-center hover:text-blue-500 hover:bg-white hover:duration-300'>
            <div className='flex items-center mx-2'>
              <RxDotFilled />
              <li className='ml-2 cursor-pointer w-32'>Data Pelanggan</li>
            </div>
          </NavLink> */}
        </span>

        {/* <li className={`fixed bottom-11 border-t-2 border-white ${openSidebarMobile ? ' w-56' : 'w-9'}`}>
          <div className={`items-center w-fit h-fit text-center justify-center pt-10 duration-300  ${openSidebarMobile ? 'ml-7' : 'duration-300'}`}>
            <div className={`flex items-center w-14 h-14 mx-auto bg-white rounded-full mb-1 duration-300 ${openSidebarMobile ? 'block' : 'w-9 h-9'}`}>
              <img src="" alt="" className='p-2' />
            </div>
            <p className={`text-xs text-white mt-5 ${openSidebarMobile ? 'block' : 'hidden duration-300'}`}>©   Sawarga Digital Indonesia </p>
          </div>
        </li> */}

      </ul>
    </aside>

    // <aside className={` ${openSidebarMobile ? 'w-72 lg:w-80 fixed lg:flex duration-300' : 'w-20 h-full p-5 duration-300 lg:flex hidden'} h-screen p-5 bg-blue-500 fixed sm:fixed lg:relative z-50 lg:z-0`}>
    //   <span className='absolute -mt-5 ml-64 lg:hidden bg-blue-500 w-14 h-16 pt-2 rounded-tr-xl rounded-br-xl cursor-pointer' onClick={() => setOpenSidebarMobile(!openSidebarMobile)}>
    //     <RxDoubleArrowLeft className='text-xl my-3 mx-5 text-white' />
    //   </span>
    //   <ul className='fixed w-56 mt-10'>
    //     <NavLink to={'/dashboard'} className={`flex mb-3 ${openSidebarMobile ? 'w-full' : 'w-fit'} h-11 items-center hover:bg-white hover:duration-300 rounded-lg cursor-pointer hover:text-blue-500 text-white`}>
    //       <span><AiFillHome className='text-xl mx-2 mb-1'/></span>
    //       <p className={`px-3 text-md ${openSidebarMobile ? 'block' : 'hidden duration-300'}`}>Dashboard</p>
    //     </NavLink>
    //     <Link className={`flex mb-3 ${openSidebarMobile ? 'w-full' : 'w-fit'} h-11 items-center hover:bg-white hover:duration-300 rounded-lg cursor-pointer text-white hover:text-blue-500`} onClick={() => setSubmenuOpen(!submenuOpen)}>
    //       <span><HiMiniShoppingBag className='text-xl mx-2 mb-1'/></span>
    //       <p className={`px-3 text-md cursor-pointer ${openSidebarMobile ? 'block' : 'hidden'} `}>Penjualan</p>
    //         <BsChevronRight  className={`items-center my-auto ml-auto mr-3 duration-300 ${openSidebarMobile ? 'block duration-300' : 'hidden duration-300'} ${submenuOpen ? 'rotate-90' : ''}`}/>
    //     </Link>
    //     <span className={`text-white duration-300 ${submenuOpen ? 'flex-row duration-300' : 'hidden duration-300'} ${openSidebarMobile ? 'block' : 'hidden'}`}>
    //       <NavLink to={'/penjualan/kasir'} className='flex mb-3 rounded-lg w-full h-11 px-9 items-center hover:text-blue-500 hover:bg-white hover:duration-300'>
    //         <div className='flex items-center mx-2'>
    //           <RxDotFilled />
    //           <li className='mx-2 cursor-pointer'>Kasir</li>
    //         </div>
    //       </NavLink>
    //       <NavLink to={'/penjualan/riwayat-transaksi'} className='flex mb-3 rounded-lg w-full h-11 pl-9 items-center hover:text-blue-500 hover:bg-white hover:duration-300'>
    //         <div className='flex items-center mx-2'>
    //           <RxDotFilled />
    //           <li className='mx-2 cursor-pointer'>Riwayat Transaksi</li>
    //         </div>
    //       </NavLink>
    //       <NavLink to={'/penjualan/persediaan'} className='flex mb-3 rounded-lg w-full h-11 px-9 items-center hover:text-blue-500 hover:bg-white hover:duration-300'>
    //         <div className='flex items-center mx-2'>
    //           <RxDotFilled />
    //           <li className='mx-2 cursor-pointer'>Persediaan</li>
    //         </div>
    //       </NavLink>
    //     </span>
    //     <NavLink to={'/pembelian'} className={`flex mb-3 ${openSidebarMobile ? 'w-full h-11' : ' items-center w-fit'} h-11 items-center hover:bg-white hover:duration-300 rounded-lg cursor-pointer hover:text-blue-500 text-white`}>
    //       <span><ImPriceTag className='text-xl mx-2 mb-1'/></span>
    //       <p className={`px-3 text-md ${openSidebarMobile ? 'block' : 'hidden duration-300'}`}>Pembelian</p>
    //     </NavLink>
    //     <li className={`flex mb-3 ${openSidebarMobile ? 'w-full' : 'w-fit'} h-11 items-center hover:bg-white hover:duration-300 rounded-lg cursor-pointer text-white hover:text-blue-500`} onClick={() => setSubmenuOpen2(!submenuOpen2)}>
    //       <span><FaBoxArchive className='text-xl mx-2 mb-1'/></span>
    //       <p className={`px-3 text-md cursor-pointer ${openSidebarMobile ? 'block' : ' hidden'} `}>Master Data</p>
    //         <BsChevronRight  className={`items-center my-auto ml-auto mr-3 duration-300 ${openSidebarMobile ? 'block duration-300' : 'hidden duration-300'} ${submenuOpen2 ? 'rotate-90' : ''}`}/>
    //     </li>
    //     <span className={`text-white ${submenuOpen2 ? 'block' : 'hidden'} ${openSidebarMobile ? 'block' : 'hidden'}`}>
    //       <NavLink to={'/master-data/produk'} className='flex mb-3 rounded-lg w-full h-11 px-9 items-center hover:text-blue-500 hover:bg-white hover:duration-300'>
    //         <div className='flex items-center mx-2'>
    //           <RxDotFilled />
    //           <li className='mx-2 cursor-pointer'>Produk</li>
    //         </div>
    //       </NavLink>
    //       <NavLink to={'/master-data/data-suplier'} className='flex mb-3 rounded-lg w-full h-11 px-9 items-center hover:text-blue-500 hover:bg-white hover:duration-300'>
    //         <div className='flex items-center mx-2'>
    //           <RxDotFilled />
    //           <li className='mx-2 cursor-pointer'>Data Suplier</li>
    //         </div>
    //       </NavLink>
    //       {/* <NavLink to={'/master-data/data-pelanggan'} className='flex mb-3 rounded-lg w-full h-11 px-9 items-center hover:text-blue-500 hover:bg-white hover:duration-300'>
    //         <div className='flex items-center mx-2'>
    //           <RxDotFilled />
    //           <li className='ml-2 cursor-pointer w-32'>Data Pelanggan</li>
    //         </div>
    //       </NavLink> */}
    //     </span>

    //     {/* <li className={`fixed bottom-11 border-t-2 border-white ${openSidebarMobile ? ' w-56' : 'w-9'}`}>
    //       <div className={`items-center w-fit h-fit text-center justify-center pt-10 duration-300  ${openSidebarMobile ? 'ml-7' : 'duration-300'}`}>
    //         <div className={`flex items-center w-14 h-14 mx-auto bg-white rounded-full mb-1 duration-300 ${openSidebarMobile ? 'block' : 'w-9 h-9'}`}>
    //           <img src="" alt="" className='p-2' />
    //         </div>
    //         <p className={`text-xs text-white mt-5 ${openSidebarMobile ? 'block' : 'hidden duration-300'}`}>©   Sawarga Digital Indonesia </p>
    //       </div>
    //     </li> */}

    //   </ul>
    // </aside>
  )
}