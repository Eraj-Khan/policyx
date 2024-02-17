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
  ChevronDoubleLeftIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import {
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
} from "@heroicons/react/24/outline";
import "../pages/Notification.css";
import { CChart } from "@coreui/react-chartjs";
import axios from "axios";

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
export const Notification = () => {
  const [notificationinfo, setNotificationInfo] = useState([]);
  const [isCompleted, setIsCompleted] = useState([]);

  function formatDate(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const dateOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    const formattedDate = dateTime.toLocaleDateString("en-US", dateOptions);
    const formattedTime = dateTime.toLocaleTimeString("en-US", timeOptions);
    return `${formattedDate} ${formattedTime}`;
  }
const [allNotifications,setAllnotifications] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/company_dashboard/list_users/"
        );

        // Set the entire JSON object to data
        setAllnotifications(response.data)
        let isRemainingNotifications = response.data?.filter(
          (e) => e.is_completed === false
        );
        setNotificationInfo(isRemainingNotifications);
        let isCompletedData = response.data?.filter(
          (e) => e.is_completed === true
        );
        setIsCompleted(isCompletedData);
        console.log("data", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const [selectedTab, setSelectedTab] = useState(false); // Default selected tab

  const tabs = [
    { name: 'Pending', status: false, href: '#pending' },
    { name: 'Completed', status: true, href: '#completed' }
  ];

  const handleTabChange = (e) => {
    setSelectedTab(e.target.value);
    const a = allNotifications.filter(item => item.is_completed == e.target.value);
    setAllnotifications(a);
  };

  

  if (true) {
    return (
      <>
        <div className="flex flex-1 flex-col ">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1">
              <div className="w-8 h-8 mt-4">
                {" "}
                <a href="./userdash" id="backLink">
                  <ChevronDoubleLeftIcon></ChevronDoubleLeftIcon>
                </a>
              </div>
              <div className="notify_heading">
                <h1>Notifications</h1>
              </div>
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
              {/* <button
              type="button"
              className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button> */}

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                {/* <div>
                <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </Menu.Button>
              </div> */}
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
          </div>
        </div>

        <main>
          <div className="py-6">
            {/* <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <div className="py-4">
              <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
            </div>
            
          </div> */}
          </div>
        </main>
      </div>
        <div className=" main_tab">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block  rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          value={selectedTab}
          onChange={handleTabChange}
        >
          {tabs.map((tab) => (
            <option key={tab.name} value={tab.status}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="isolate flex divide-x divide-sky-400 rounded-lg shadow" aria-label="Tabs">
          {tabs.map((tab, tabIdx) => {
            const isActive = tab.status === selectedTab;
            return (
              <button
                key={tab.name}
                className={`group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-md font-medium text-center hover:bg-sky-600 focus:z-10 ${isActive ? 'text-gray-900  hover:text-white ' : 'text-gray-500 hover:text-white'}`}
                onClick={() => setSelectedTab(tab.status)}
                aria-current={isActive ? 'page' : undefined}
              >
                {tab.name}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-0 h-0.5 ${isActive ? 'bg-sky-600' : 'bg-transparent'}`}
                />
              </button>
            );
          })}
        </nav>
      </div>
      {/* Render your filtered data here */}
      <div className="container">
        {allNotifications.filter(e=> e.is_completed === selectedTab).map(item => (
          <div key={item.id}>
             <div className="pointer-events-auto tab_notifications  overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                 
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-lg font-medium text-gray-900">
                    Insurance request from{" "}
                                    <span className="notif_company_name">
                                      {item.case_id}
                                    </span>{" "}
                                    with recommended value 
                                    <span className="notif_case_id"> {item.recommended_value}</span>
                    </p>
                    
                      <span className="userdate">{item.updated_at ? formatDate(item.updated_at) : ''}</span>
                  </div>
                  {/* <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div> */}
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
      </>
    );
  }
  return (
    <div>
      <div className="flex flex-1 flex-col ">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1">
              <div className="w-8 h-8 mt-4">
                {" "}
                <a href="./company" id="backLink">
                  <ChevronDoubleLeftIcon></ChevronDoubleLeftIcon>
                </a>
              </div>
              <div className="notify_heading">
                <h1>Notifications</h1>
              </div>
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
              {/* <button
              type="button"
              className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button> */}

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                {/* <div>
                <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </Menu.Button>
              </div> */}
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
          </div>
        </div>

        <main>
          <div className="py-6"></div>
        </main>
      </div>
      <div className="notification-container">
        <div className="notification-completed">
          <h1>Completed</h1>
          {isCompleted.map((data) => (
            <>
              <div key={data.case_id} className="notification-item">
                <div>
                  {" "}
                  Insurance Request from{" "}
                  <span className="recommended">{data.case_id}</span> with
                  recommended value{" "}
                  <span className="case_id">{data.recommended_value}</span>
                  <span className="date">
                    {data.updated_at ? formatDate(data.updated_at) : ""}
                  </span>
                </div>
                {/* <li className="age">AGE:  {data.age}</li>
        <li className="recommended">SELECTED VALUE:  {data.recommended_value}</li> */}
              </div>
            </>
          ))}
        </div>
        <div class="vl"></div>

        <div className="notification-pending">
          <h1>Pending</h1>
          {notificationinfo.map((data) => (
            <>
              <div key={data.case_id} className="notification-item">
                <div>
                  {" "}
                  Insurance Request from{" "}
                  <span className="recommended">{data.case_id}</span> with
                  recommended value{" "}
                  <span className="case_id">{data.recommended_value}</span>
                  <span className="date">
                    {data.updated_at ? formatDate(data.updated_at) : ""}
                  </span>
                </div>
                {/* <li className="case_id"> CASE ID: {data.case_id}</li>
        <li className="age">AGE:  {data.age}</li>
        <li className="recommended">SELECTED VALUE:  {data.recommended_value}</li> */}
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Notification;
