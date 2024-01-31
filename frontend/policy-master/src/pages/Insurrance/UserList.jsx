import { Fragment, useState, useEffect } from "react";
import React from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3BottomLeftIcon,
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import {
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
} from "@heroicons/react/24/outline";

import { CChart } from "@coreui/react-chartjs";
import axios from "axios";
import "../Insurrance/UserList.css";
import blue from "../../image/blue.jpg";


import { Link } from "react-router-dom";

const navigation = [
  { name: "Company Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Users", href: "#", icon: UsersIcon, current: false },
  { name: "Users Review", href: "#", icon: FolderIcon, current: false },
  { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  { name: "Documents", href: "#", icon: InboxIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const UserList = () => {
    const [notificationinfo, setNotificationInfo] = useState([]);

    const handleBidClick = (caseId) => {
        // Handle the click event and redirect to the next page using React Router
        // For now, it just logs the caseId
        console.log(`Place bid for case ID: ${caseId}`);
      };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/company_dashboard/list_users` //1b9dfc29d3ffa4ddf87ad27973808d5c82646a0cf2232e3396e765ad3ff17388/"
          );
  
          // Set the entire JSON object to data
          setNotificationInfo(response.data);
          console.log("data", response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);
    return (
      <div>
        <div className="ml-4 flex items-center md:ml-6 notification">
          {/* Profile dropdown */}
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="flex max-w-xs items-center hover:bg-sky-400 rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-10 rounded-full"
                  src="https://e7.pngegg.com/pngimages/881/852/png-clipart-computer-icons-drop-down-list-arrow-font-awesome-down-arrow-angle-hand.png"
                  alt=""
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {userNavigation.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <a
                        href={item.href}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        {item.name}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <div className="bellicon">
          <h1 className="notification-heading text-sky-600">User Information</h1>
          <button
            type="button"
            className="w-10  rounded-full hover:bg-white bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            <span className="sr-only">View notifications</span>
            {/* <BellIcon className="h-10 w-10 " aria-hidden="true" /> */}
          </button>
        </div>
  
        {/* <div className="notification-container">
          {notificationinfo.map((data) => (
            <>

              
              <div key={data.case_id} className="user-item">
          <li className="case_id"> CASE ID: {data.case_id}</li>
          <li className="age">AGE:  {data.age}</li>
          <li className="recommended">SELECTED VALUE:  {data.recommended_value}</li>
          <a href={`/bid?case_id=${data.case_id}`}>
              <button className="bid-place" onClick={() => handleBidClick(data.case_id)}>
                Place bid
              </button>
            </a>
        </div>
            </>
          ))}
        </div> */}

<div className="notifi-container">
      {notificationinfo.map((data) => (
        <div key={data.case_id} className="user-item">
          <img
            className="user-image"
            src={blue} // Add the image source to each data item
            alt={`Profile - ${data.case_id}`}
          />
          <ul>
            <li className="case_id">CASE ID: {data.case_id}</li>
            <div className="inline-info">
              <li className="age">AGE: {data.age}</li>
              <li className="income">Income: {data.income}</li>
            </div>
            <li className="recommended">SELECTED VALUE: {data.recommended_value}</li>
          </ul>
          <a href={`/bid?case_id=${data.case_id}`}>
            <button className="bid-place" onClick={() => handleBidClick(data.case_id)}>
              Place bid
            </button>
          </a>
          <div className="icon-container">
            <i className="fas fa-heart"></i>
          </div>
        </div>
      ))}
    </div>
      </div>
    );
  };

export default UserList
