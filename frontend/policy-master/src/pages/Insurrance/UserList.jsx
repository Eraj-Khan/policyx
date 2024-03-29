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
import "@fontsource/poppins";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/400.css";
import "../Insurrance/UserList.css";
import logotwo from "../../image/logo1.png";

import { Link, Navigate, useNavigate, useNavigation } from "react-router-dom";
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};



const nav = [


  { name: 'Dashboard', href: '/company', icon: HomeIcon, current: false },
  { name: 'Registered Cases', href: '#', icon: UsersIcon, current: true },
  { name: 'Packages Offered', href: '/packages', icon: FolderIcon, current: false },

]
const userNavigation = [


  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]
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
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigation = useNavigate();

  const filteredData = notificationinfo.filter((item) =>
  item.case_id.toLowerCase().includes(searchTerm.toLowerCase())
);

const filteredByStatus = filteredData.filter((item) => {
  if (statusFilter === "all") {
    return true; // Show all items
  } else if (statusFilter === "active") {
    return !item.is_expired && !item.is_completed;
  } else if (statusFilter === "completed") {
    return item.is_completed;
  }
  return false;
});

function formatDate(dateTimeString) {
  const dateTime = new Date(dateTimeString);
  const dateOptions = { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit'
  };
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };
  const formattedDate = dateTime.toLocaleDateString('en-US', dateOptions);
  const formattedTime = dateTime.toLocaleTimeString('en-US', timeOptions);
  return `${formattedDate} ${formattedTime}`;
}

  const handleBidClick = (caseId, id_user) => {
    // Handle the click event and redirect to the next page using React Router
    // For now, it just logs the caseI
    navigation("/bid", {
      state: {
        case_id: caseId,
        id_user: id_user,
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
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  const [packageData, setPackageData] = useState([]);
  const [case_id,setCaseId]=useState("")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/company_dashboard/list_packages_and_bids/${case_id}`);
        setPackageData(response.data['Placed Packages']);
        console.log(packageData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [case_id]);
  return (
    <>
   <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
       <h1 style={{
        textAlign:"center",
        marginBottom:"10px",
        fontWeight:"bold",
       }}>Bids from Other Companies</h1>
      <table>
        
           {packageData ? packageData?.map((packageItem) => (
            <>
            <thead>
              <tr key={packageItem.id}>
                <th className="th">Case Id</th>
                <th className="th">Company Name</th>
                <th className="th">Accidental Emergencies</th>
                <th className="th">Ambulance Services</th>
                <th className="th">Dental & Vision</th>
                <th className="th">Hospitalization</th>
                <th className="th">Monthly Coverage</th>
                <th className="th">Other Medical Expenses</th>
                <th className="th">Surgery</th>
                <th className="th">Annual Coverage</th>
              </tr>
           </thead>
        <tbody>
          <tr>
            <td>{packageItem.case_id ? packageItem.case_id : "-"}</td>
            <td>{packageItem.company_name ? packageItem.company_name : "-"}</td>
            <td>{ packageItem.accidental_emergencies ? packageItem.accidental_emergencies : "-"}</td>
            <td>{packageItem.ambulance_services_expenses ? packageItem.ambulance_services_expenses : "-"}</td>
            <td>{ packageItem.dental_and_vision_care ? packageItem.dental_and_vision_care : "-"}</td>
            <td>{ packageItem.hospitalization_room_charges ? packageItem.hospitalization_room_charges : "-"}</td>
            <td>{packageItem.monthly_coverage ? packageItem.monthly_coverage : "-"}</td>
            <td>{packageItem.other_medical_expenses ? packageItem.other_medical_expenses : "-"}</td>
            <td>{ packageItem.surgery ? packageItem.surgery : "-"}</td>
            <td>{packageItem.total_annual_coverage ? packageItem.total_annual_coverage : "-"}</td>
          </tr>
        </tbody></>
                    )):<h1 style={{
                      textAlign:"center",
                    }}>No bids available.</h1>}
      </table>
      <button style={{
        backgroundColor:"#3498DB"
        ,marginTop:"10px"
      }} onClick={()=>{
        closeModal()
      }}>Close</button>
      </Modal>
 
    <div>
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
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
                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
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
                <nav className=" space-y-2 px-2">
                  {nav.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                      )}
                    >
                      <item.icon className="mr-4 h-6 w-6 flex-shrink-0 text-indigo-300" aria-hidden="true" />
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
      <div className="logo flex flex-grow flex-col overflow-y-auto  pt-5">
     
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
        <div className="mt-5 flex flex-1 flex-col">
          <nav className="navbar flex-1 space-y-2 px-2 pb-4">
            {nav.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current ? 'bg-sky-600 text-white' : 'text-indigo-100 hover:bg-sky-600',
                  'group flex items-center px-2 py-2 text-md font-medium rounded-md'
                )}
              >
                <item.icon className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300" aria-hidden="true" />
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
        <div className="flex flex-1 justify-between px-4">
          <div className="flex flex-1">
            <div className="insurance_heading"><h1>Insurance Request</h1></div>
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
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
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
 
   
      {/* <div className="bellicon">
        <h1 className="notificat-heading text-sky-600">Insurrance Requests</h1>

        <span className="sr-only">View notifications</span>
      </div> */}

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
      <div className="search-filter-container">
<div className="case_search">
      <input 
        type="text"
        placeholder="Search by Case ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      </div>


      <div className="status-filter">
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
            className={statusFilter === "completed" ? "active" : ""}
            onClick={() => setStatusFilter("completed")}
          >
            Completed
          </button>
        </div>
        </div>
      
        <table className="user-table">
          <thead>
            <tr>
              {/* <th>Profile</th> */}
              <th>Case ID</th>
              <th>Age</th>
            

              <th>Income</th>
              <th>BMI</th>
              <th>User Budget</th>
              <th>Children</th>
              <th>Employment Status</th>
              <th>Marital</th>
              <th>Gender</th>
              <th>Region</th>
              <th>Status</th>
              <th>Date Received</th>
              <th>Action</th>
            </tr>
            <hr/>

          </thead>
          <tbody>
            {filteredByStatus.reverse().map((data) => (
              <tr
                key={data.case_id}
                className={data?.is_expired ? "expired" : "active"}
              >
                {/* <td>
                  <img
                    className="user-image"
                    src={blue} // Add the image source to each data item
                    alt={`Profile - ${data.case_id}`}
                  />
                </td> */}

                <td>{data.case_id}</td>
              

                <td>{data.age}</td>
                

                <td>{data.income}
                </td>
                <td>{data.bmi}</td>
                <td>{data.recommended_value}</td>
                <td>{data.children}</td>
                <td>{data.employment_status}</td>
                <td>{data.marital_status}</td>
                <td>{data.gender}</td>
                <td>{data.region}</td>
                <td className="status">
                 
                  {data.is_expired ? 'Expired' : data.is_completed ? 'Completed' : 'Active'}
                 
                </td>
                {/* <td>{data.created_at?.split('T')[0]}</td> */}
                <td>{data.created_at ? formatDate(data.created_at) : ''}</td>


                <td>
                  <button
                    className="bid-place"
                    onClick={() => handleBidClick(data.case_id, data.id_user)}
                    disabled={data.is_completed} // Disable if already accepted
                    style={{ cursor: data.is_completed ? 'not-allowed' : 'pointer',backgroundColor: data.is_completed ? 'grey' : ''}}
                  >
                    Place bid
                  </button>
                  <button
                    className="bid-place"
                    style={{
                      marginTop:"10px"
                    }}

                    onClick={()=>{
                      setCaseId(data.case_id)
                        openModal()
                        
                        console.log(data.case_id);
                    }}
                  >
                    View Other bids
                  </button>
                </td>
                <hr/>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      </>
  );
};

export default UserList;
