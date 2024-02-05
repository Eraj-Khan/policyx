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
import "../User/UserNotification.css";
import { CChart } from "@coreui/react-chartjs";
import axios from "axios";
import { useParams } from "react-router";

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
export const UserNotification = () => {
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    let user = localStorage.getItem("user");
    let parsedPayload = JSON.parse(user);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/company_dashboard/list_user_packages/${parsedPayload.id}`
        );

        const { Bids } = response.data;

        setNotification(Bids);
        console.log("data", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (

    <div>
      <div className="flex flex-1 flex-col ">
      <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
      
        
        <div className="flex flex-1 justify-between px-4">
          <div className="flex flex-1">
            <div className="notify_heading"><h1>Notifications</h1></div>
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
    

      <div className="notif-contain">
        <div className="notif-itm">

        {notification.map((data) => (
          <>
           
            <div key={data.case_id} className="notif-itm">

              <div className="notif">
                             <BellIcon className=" h-6 w-6" aria-hidden="true" /><p>Package received from Company <span className="notif_company_name">{data.company_name}</span> against this case
                <span className="notif_case_id">  {data.case_id}</span></p>
              </div>
              
              {/* <li className="age">Company Name:  {data.company_name}</li>
        <li className="recommended"> Company Bid: {data.company_bid}</li>
        <li className="recommended">dental:  {data.dental_and_vision_care}</li>  
        <li className="recommended"> Annual Coverage: {data.total_annual_coverage}</li>
        <li className="recommended"> Accidental Emergencies: {data.accidental_emergencies}</li>
        <li className="recommended"> Hospitalization Room Charges: {data.hospitalization_room_charges}</li>
        <li className="recommended"> Other Medical Expenses: {data.other_medical_expenses}</li> */}
            </div>
          </>
        ))}
      </div>
      </div>
    </div>
    
  );
};
export default UserNotification;
