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

import { Link, Navigate, useNavigate, useNavigation } from "react-router-dom";

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
const handlelogOut = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("refresh-token");
  window.location.reload();
  window.location.reload();
}


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const UserList = () => {
  const [notificationinfo, setNotificationInfo] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigation = useNavigate();

  const handleBidClick = (caseId, case_user) => {
    // Handle the click event and redirect to the next page using React Router
    // For now, it just logs the caseI
    navigation("/bid", {
      state: {
        case_id: caseId,
        case_user: case_user,
        payload: null,
      },
    });
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
        <div className="flex flex-1 flex-col md:pl-64">
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-1 justify-between px-4">
              <div className="flex flex-1">
                {/* <form className="flex w-full md:ml-0" action="#" method="GET">
              <label htmlFor="search-field" className="sr-only">
                Search
              </label>
              <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                  <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                  id="search-field"
                  className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                  placeholder="Search"
                  type="search"
                  name="search"
                />
              </div>
            </form> */}
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <a
                  href="/notification"
                  className="flex justify-center items-center rounded-full hover:bg-sky-500 bg-white p-1 text-gray-400 hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                  <span className="inline-flex items-center rounded-full bg-sky-100 px-3 py-0.5 text-sm font-medium text-sky-600">
                    {/* {notificationCount} */}
                  </span>
                </a>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex max-w-xs items-center hover:bg-sky-600 rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="w-5 rounded-full"
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
                    <Menu.Items className=" signout-menu absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? "bg-sky-500" : "",
                                "block px-4 py-2 rounded-md hover:text-white"
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                      <button className="signout-button  hover:text-white hover:rounded-md hover:bg-sky-500 p-2 pl-4" onClick={handlelogOut}>Sign Out</button>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <></>
          <main>
            <div className="py-6">
           
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                {/* <div className="py-4">
              <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
            </div> */}
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="bellicon">
        <h1 className="notificat-heading text-sky-600">Insurrance Requests</h1>

        <span className="sr-only">View notifications</span>
      </div>

      {/* <div className="notifi-container">
        {notificationinfo.map((data) => (
          <div
            style={{ position: "relative" }}
            key={data.case_id}
            className="user-item"
          >
            <img
              className="user-image"
              src={blue} // Add the image source to each data item
              alt={`Profile - ${data.case_id}`}
            />
            <span style={{ position: "absolute", top: 0, right: 10 }}>
              {!data?.is_expired ? "active" : "expired"}
            </span>
            <ul>
              <li className="case_id">CASE ID: {data.case_id}</li>
              <div className="inline-info">
                <li className="age">AGE: {data.age}</li>
                <li className="income">Income: {data.income}</li>
              </div>
              <li className="recommended">
                SELECTED VALUE: {data.recommended_value}
              </li>
            </ul>
           
              <button
                className="bid-place"
                onClick={() => handleBidClick(data.case_id, data.id)}
              >
                Place bid
              </button>
           
            <div className="icon-container">
              <i className="fas fa-heart"></i>
            </div>
          </div>
        ))}
      </div> */}

      <div className="notifi-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Case ID</th>
              <th>Age</th>
              <th>Income</th>
              <th>BMI</th>
              <th>Selected Value</th>
              <th>Children</th>
              <th>Employment Status</th>
              <th>Gender</th>
              <th>Region</th>
              <th>Status</th>
              <th>Date Received</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {notificationinfo.map((data) => (
              <tr
                key={data.case_id}
                className={data?.is_expired ? "expired" : "active"}
              >
                <td>
                  <img
                    className="user-image"
                    src={blue} // Add the image source to each data item
                    alt={`Profile - ${data.case_id}`}
                  />
                </td>

                <td>{data.case_id}</td>
                <td>{data.age}</td>
                <td>{data.income}</td>
                <td>{data.bmi}</td>
                <td>{data.recommended_value}</td>
                <td>{data.children}</td>
                <td>{data.employment_status}</td>
                <td>{data.gender}</td>
                <td>{data.region}</td>
                <td className="status">
                  {!data?.is_expired ? "active" : "expired"}
                </td>
                <td>{data.created_at}</td>
                <td>
                  <button
                    className="bid-place"
                    onClick={() => handleBidClick(data.case_id, data.id)}
                  >
                    Place bid
                  </button>
                </td>
                <td>
                  <div className="icon-container">
                    <i className="fas fa-heart"></i>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
