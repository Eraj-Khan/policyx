import axios from "axios";
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
import { useNavigate } from "react-router";
import "../Insurrance/Packages.css";
import "@fontsource/poppins";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/400.css";
import logotwo from "../../image/logo1.png"
const nav = [
  { name: "Dashboard", href: "/company", icon: HomeIcon, current: false },
  { name: "Registered Cases", href: "/userlist", icon: UsersIcon, current: false },
  { name: "Offered Packages", href: "#", icon: FolderIcon, current: true },
  
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Packages = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const navigation = useNavigate();

  const filteredData = data?.filter((item) =>
    item.case_id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredByStatus = filteredData.filter((item) => {
    if (statusFilter === "all") {
      return true; 
    } else if (statusFilter === "active") {
      return !item.is_expired && !item.is_accepted;
    } else if (statusFilter === "accepted") {
      return item.is_accepted;
    }
    return false;
  });
  const handleUpdate = (payload) => {
    navigation("/bid", {
      state: {
        case_id: payload.case_id,
        case_user: payload.case_user,
        payload: payload,
      },
    });
  };

  useEffect(() => {
    let user = localStorage.getItem("user");
    let parsedPayload = JSON.parse(user);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/company_dashboard/list_company_packages/${parsedPayload.company_name}` //1b9dfc29d3ffa4ddf87ad27973808d5c82646a0cf2232e3396e765ad3ff17388/"
        );

        

        const { Packages } = response.data;
        setData(Packages);
        console.log("data", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-indigo-700 pt-5 pb-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex flex-shrink-0 items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
                    alt="Your Company"
                  />
                </div>
                <div className="mt-5 h-0 flex-1 overflow-y-auto">
                  <nav className="space-y-1 px-2">
                    {nav.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-indigo-800 text-white"
                            : "text-indigo-100 hover:bg-indigo-600",
                            'group flex items-center px-2 py-2 text-md  rounded-md'
                            )}
                      >
                        <item.icon
                          className="mr-4 h-6 w-6 flex-shrink-0 text-indigo-300"
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="logo_package flex flex-grow flex-col overflow-y-auto bg-indigo-700 pt-5">
        <div className="flex flex-shrink-0">
              {/* <img
            className="h-12 w-auto"
            src="https://www.pinclipart.com/picdir/middle/336-3368754_healthcare-it-solution-provider-health-insurance-logo-png.png"
            alt="Your Company"
          /> */}
              <div className="logo">
              <img
              
              src={logotwo} 
              
            />
              </div>
            </div>
          
          <div className="mt-5 flex flex-1 flex-col">
            <nav className="package_sidebar flex-1 space-y-2 px-2 pb-4">
              {nav.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-sky-600 text-white"
                      : "text-indigo-100 hover:bg-sky-600",
                    "group flex items-center px-2 py-2 text-md font-medium rounded-md"
                  )}
                >
                  <item.icon
                    className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300"
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
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
          <div className="flex flex-1 justify-between px-4 ">
            <div className="flex flex-1">
              <h1 className=" packages_heading ">Packages Offered</h1>

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
                <div>
                  <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="sr-only">Open user menu</span>
                    {/* <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      /> */}
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
                    {userNavigation?.map((item) => (
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
          <div className="py-4">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8"></div>
            {/* <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <div className="py-4">
                  <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
                </div>
              </div> */}
          </div>
        </main>
      </div>

      <div className="package_search">
        <input
          type="text"
          placeholder="Search by Case ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="status-filt">
          <button
            className={statusFilter === "all" ? "active" : ""}
            onClick={() => setStatusFilter("all")}
          >
            All
          </button>
          <button
            className={statusFilter === "active" ? "active" : ""}
            onClick={() => setStatusFilter("active")}
          >
            Active
          </button>
          <button
            className={statusFilter === "accepted" ? "active" : ""}
            onClick={() => setStatusFilter("accepted")}
          >
            Accepted
          </button>
        </div>
      
      </div>
      
      <table className="user-pack-table">
        <thead>
          <tr>
            <th>Case ID</th>
            <th>Company Name</th>
            <th>Accidental </th>
            <th>Dental & Vision</th>
            <th>Hospital Room Charges</th>
            <th>Monthly Premium</th>
            <th>Annual Coverage</th>
            <th>Ambulance Expense</th>
            <th>Surgery</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {filteredByStatus.reverse()?.map((data) => (
          // {filteredData?.map((data) => (
            <tr key={data.case_id}>
              {/* <td>{!data?.is_expired ? "active" : "expired"}</td> */}
              <td>{data.case_id}</td>
              <td>{data.company_name}</td>
              <td>{data.accidental_emergencies}</td>
              <td>{data.dental_and_vision_care}</td>
              <td>{data.hospitalization_room_charges}</td>
              <td>{data.monthly_coverage}</td>
              <td>{data.total_annual_coverage}</td>
              <td>{data.ambulance_services_expenses}</td>
              <td>{data.surgery}</td>
              {/* <td>{!data?.is_expired ? "active" : "expired"}</td> */}
              <td>{data.is_expired ? 'Expired' : data.is_accepted ? 'Accepted' : 'Active'}</td>
              <td>
                <button
                  className="bid-update"
                  onClick={() => handleUpdate(data)}
                
                  disabled={data.is_accepted} // Disable if already accepted
                  style={{ cursor: data.is_accepted ? 'not-allowed' : 'pointer',backgroundColor: data.is_accepted ? 'grey' : ''}}
                >
                  Update
                </button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
};

export default Packages;
