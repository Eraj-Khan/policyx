import axios from "axios";
import { Fragment, useState, useEffect } from "react";
import React from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { useLocation } from "react-router";
import bid from "../Insurrance/Bid.css";
import videomain from "../../image/mainvideo.mp4";
import swal from "sweetalert";
import "@fontsource/poppins";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/400.css";
import logotwo from "../../image/logo1.png"

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


const nav = [


  { name: 'Dashboard', href: '/company', icon: HomeIcon, current: false },
  { name: 'Register Cases', href: '/userlist', icon: UsersIcon, current: false },
  { name: 'Offered Packages', href: '/packages', icon: FolderIcon, current: false},
  { name: "Bid Packages", href: "#", icon: InboxIcon, current: true },
  
]
const userNavigation = [


  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Bid = () => {
  const [bidAmount, setBidAmount] = useState("");
  const statePayload = useLocation();
  const [data, setData] = useState(null);
  const case_id = statePayload.state.case_id;
  const Id = statePayload.state.id_user;


    const [sidebarOpen, setSidebarOpen] = useState(false);

  
 
  
  const [submittedData, setSubmittedData] = useState(null);
  // const [id, setId] = useState("");
  const [plan_type, setPlan_type] = useState("");
  let payload = localStorage.getItem('user');
  const parsedPayload = JSON.parse(payload);  
  const plans = [
    {
      plan: "Basic",
    },
    {
      plan: "Premium",
    },
  ];

  const [formData, setFormData] = useState({
    total_annual_coverage: 0,
    accidental_emergencies: 0,
    hospitalization_room_charges: 0,
    dental_and_vision_care: 0,
    other_medical_expenses: 0,
    case_id: case_id,
    company_id: parsedPayload?.id,
    company_name: parsedPayload?.company_name,
    monthly_coverage: 0,
    ambulance_services_expenses: 0,
    surgery: 0,
    case_user:Id
   
   
  });
  const dataPayload = statePayload.state.payload;
 useEffect(()=> {
 
  if(dataPayload) {
    setFormData(dataPayload)
  }
 },[])
 
  console.log("id",Id)


  



  
  // useEffect(() => {
  //   let data = localStorage.getItem("auth");
  //   const parseData = JSON.parse(data);
  //   const id = parseData?.id;
  //   setId(id);
  // }, []);

const handleSubmit = () =>{

  if(dataPayload){ axios
    .put(`http://127.0.0.1:8000/company_dashboard/update_packages/${case_id}/${parsedPayload?.company_name}`, submittedData
  )
    .then((response) => {
      console.log("response", response.data);
      setTimeout(()=>{
        swal("Package Updated")
      },100)
    })
    .catch((error) => {
      console.log("error", error);
    });}
  else{
   axios
      .post(`http://127.0.0.1:8000/company_dashboard/send_packages/`, submittedData
    )
      .then((response) => {
        console.log("response", response.data);
        setTimeout(()=>{
          swal("Package Send")
        },100)
      })
      .catch((error) => {
        console.log("error", error);
      });
}}


  const handleBid = () => {
    
   
  
    let temp = formData;
    if(plan_type === 'Basic'){
      delete temp.surgery;
      delete temp.ambulance_services_expenses
    }
    console.log("formData", temp);
    setSubmittedData(temp); 
   
    };

 
  

  return (
    <>


<div className="nav">
  
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
            <div className="bid_heading"><h1>Bid Packages</h1></div>
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
      </div>
  
    <main className="panel">
      <div className="bid_cont">

        <label className="bid-label" htmlFor="bidInput">Select Plan</label>
        <select
        className="bid-select"
          name="selectPlan"
          id=""
          value={plan_type}
          onChange={(e) => {
            setPlan_type(e.target.value);
          }}
        >
          <option value="">Select Plan</option>
          {plans.map((e) => (
            <option value={e.plan}>{e.plan}</option>
          ))}
        </select>

        <label  className="bid-label" htmlFor="bidInput">Total Annual Coverage</label>
        <input
        className="bid-input"
          type="number"
          id="total_annual_coverage"
          value={formData.total_annual_coverage}
          onChange={(e) =>
            setFormData({...formData, total_annual_coverage: e.target.value })
          }
        />
        <label  className="bid-label" htmlFor="bidInput">Accidental Emergencies</label>
        <input
        className="bid-input"
          type="number"
          id="accidental_emergencies"
          value={formData.accidental_emergencies}
          onChange={(e) =>
            setFormData({...formData,  accidental_emergencies: e.target.value })
          }
        />

        <label className="bid-label" htmlFor="bidInput">Hospitalization Room Charges</label>
        <input
        className="bid-input"
          type="number"
          id="hospitalization_room_charges"
          value={formData.hospitalization_room_charges}
          onChange={(e) =>
            setFormData({...formData,  hospitalization_room_charges: e.target.value })
          }
        />

        <label className="bid-label" htmlFor="bidInput">Dental and Vision Care</label>
        <input
        className="bid-input"
          type="number"
          id="dental_and_vision_care"
          value={formData.dental_and_vision_care}
          onChange={(e) =>
            setFormData({...formData,  dental_and_vision_care: e.target.value })
          }
        />

        <label className="bid-label" htmlFor="bidInput">Other Medical Expenses</label>
        <input
        className="bid-input"
          type="number"
          id="other_medical_expenses"
          value={formData.other_medical_expenses}
          onChange={(e) =>
            setFormData({...formData,  other_medical_expenses: e.target.value })
          }
        />
        {plan_type === "Premium" && (
          <>
            <label className="bid-label" htmlFor="bidInput">Ambulance Services Expenses</label>
            <input
            className="bid-input"
              type="number"
              id="ambulance_services_expenses"
              value={formData.ambulance_services_expenses}
              onChange={(e) =>
                setFormData({...formData,  ambulance_services_expenses: e.target.value })
              }
            />
          </>
        )}

        {plan_type === "Premium" && (
          <>
            <label className="bid-label" htmlFor="bidInput">Surgery</label>
            <input
            className="bid-input"
              type="number"
              id="surgery"
              value={formData.surgery}
              onChange={(e) => setFormData({...formData,  surgery: e.target.value })}
            />
          </>
        )}

        <label className="bid-label" htmlFor="bidInput">Enter Monthly Premium</label>
        <input
        className="bid-input"
          type="number"
          id="bidInput"
          value={formData.monthly_coverage}
          onChange={(e) => setFormData({...formData,  monthly_coverage: e.target.value })}
        />
        <button className="place-bid" onClick={handleBid}>Place Bid</button>
      </div>
        
      {submittedData && (
        <div className="card-style">
          <h3 className="card-styleh3">Insurrance Package</h3>
          <p>Total Annual Coverage: {submittedData.total_annual_coverage}</p>
          <p>Accidental Emergencies: {submittedData.accidental_emergencies}</p>
          <p>Hospitalization Room Charges: {submittedData.hospitalization_room_charges}</p>
          <p>Dental and Vision Care: {submittedData.dental_and_vision_care}</p>
          <p>Company Id: {submittedData.company_id}</p>
          <p>Company Name: {submittedData.company_name}</p>
          <p>Monthly Premium: {submittedData.monthly_coverage}</p>
          <p>Ambulance Services: {submittedData.ambulance_services_expenses}</p>
          <p>Surgery: {submittedData.surgery}</p>
   
          <button className="send-button" onClick={handleSubmit}>
            {dataPayload? "Update": "Send"}
          </button>
        </div>
      )}
    </main>
    </>
  );
};

export default Bid;
