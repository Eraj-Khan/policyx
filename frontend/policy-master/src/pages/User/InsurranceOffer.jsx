import { Fragment, useState, useEffect } from "react";
import React from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import "@fontsource/poppins";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/400.css";
import logotwo from "../../image/logo1.png";
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


import { CChart } from "@coreui/react-chartjs";
import axios from "axios";
import "../Insurrance/UserList.css";
import card from "../../image/card-image.jpg";
import "../User/InsurranceOffer.css";

import { Link } from "react-router-dom";
import swal from "sweetalert";

const nav = [
  { name: "Dashboard", href: "/userdash", icon: HomeIcon, current: false },
  { name: "Insurance Offers", href: "#", icon: UsersIcon, current: true },
  {
    name: "Apply For Insurance",
    href: "/register",
    icon: FolderIcon,
    current: false,
  },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const InsurranceOffer = () => {
  const [notificationinfo, setNotificationInfo] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleBidClick = (caseId, company_name) => {
    console.log(`Place bid for case ID: ${caseId}`);
    axios
      .put(
        `http://127.0.0.1:8000/company_dashboard/accept_package/${caseId}/${company_name}`,
        {}
      )
      .then((response) => {
        console.log(response.data);
        setTimeout(() => {
          swal("Package Accepted And Notified To Company");
        }, 100);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

        setNotification(Bids.reverse());
        console.log("data", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <div>
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          <div className="logo flex flex-grow flex-col overflow-y-auto  pt-5">
            <div className="flex flex-shrink-0">
              <div className="logo">
                <img src={logotwo} />
              </div>
            </div>
            <div className="mt-5 flex flex-1 flex-col">
              <nav className="navbar flex-1 space-y-2 px-2 pb-4">
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
            <div className="flex flex-1 justify-between px-4">
              <div className="flex flex-1">
                <div className="bid_heading">
                  <h1>Insurance Offers</h1>
                </div>
                
              </div>
              <div className="ml-4 flex items-center md:ml-6">
           

               
                <Menu as="div" className="relative ml-3">
               
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
           
            </div>
          </main>
        </div>
      </div>

      <div className="notification-container_1">
        {notification?.map((data) => (
          <div
            style={{ position: "relative" }}
            key={data.case_id}
            className="insurrance-item"
          >
            <div key={data.case_id} className="notif-item">
              <span style={{}}>
                {data.is_expired
                  ? "Expired"
                  : data.is_accepted
                  ? "Accepted"
                  : "Active"}
              </span>
              <li className="case_id">
                {" "}
                <label>Case id:</label> {data.case_id}
              </li>
              <li className="company_name">
                <label>Company Name:</label>
                {data.company_name}
              </li>
              <li className="recommended">
                <label> Monthly Coverage:</label> {data.monthly_coverage}
              </li>
              <li className="recommended">
                <label> dental:</label> {data.dental_and_vision_care}
              </li>
              <li className="recommended">
                {" "}
                <label> Annual Coverage:</label> {data.total_annual_coverage}
              </li>
              <li className="recommended">
                {" "}
                <label>Accidental Emergencies:</label>{" "}
                {data.accidental_emergencies}
              </li>
              <li className="recommended">
                {" "}
                <label> Hospitalization Room Charges:</label>{" "}
                {data.hospitalization_room_charges}
              </li>
              <li className="recommended">
                {" "}
                <label> Other Medical Expenses:</label>{" "}
                {data.other_medical_expenses}
              </li>
              {data.ambulance_services_expenses && (
                <li className="recommended">
                  <label> Ambulance Expense:</label>
                  {data.ambulance_services_expenses}
                </li>
              )}
              {data.surgery && (
                <li className="recommended">
                  <label> Surgery:</label> {data.surgery}
                </li>
              )}

              <button
                className="insur-place"
                onClick={() => handleBidClick(data.case_id, data.company_name)}
                disabled={data.is_expired || data.is_accepted}
                style={{
                  cursor:
                    data.is_expired || data.is_accepted
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {data.is_accepted
                  ? "Accepted"
                  : data.is_expired
                  ? "Expired"
                  : "Accept"}
              </button>
            </div>
            <img
              className="insur-image"
              src={card}
              alt={`Profile - ${data.case_id}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsurranceOffer;
