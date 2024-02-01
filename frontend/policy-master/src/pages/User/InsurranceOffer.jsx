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
import bluess from "../../image/bluess.jpg";
import "../User/InsurranceOffer.css";

import { Link } from "react-router-dom";
import swal from "sweetalert";


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

const InsurranceOffer = () => {
  const [notificationinfo, setNotificationInfo] = useState([]);

  const handleBidClick = (caseId, company_name) => {
    // Handle the click event and redirect to the next page using React Router
    // For now, it just logs the caseId
    console.log(`Place bid for case ID: ${caseId}`);
    axios
      .put(
        `http://127.0.0.1:8000/company_dashboard/accept_package/${caseId}/${company_name}`,
        {}
      )
      .then((response) => {
        console.log(response.data);
        setTimeout(()=>{
            swal("Package Accepted and Notified to Company")
          },100)
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
          //1b9dfc29d3ffa4ddf87ad27973808d5c82646a0cf2232e3396e765ad3ff17388/"
        );

        // Set the entire JSON object to data
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
        <h1 className="notification-heading text-sky-600">Insurrance Offers</h1>

        <span className="sr-only">View notifications</span>
      </div>

      <div className="notifi-container">
        {notification.map((data) => (
          <div
            style={{ position: "relative" }}
            key={data.case_id}
            className="insurrance-item"
          >
            <img
              className="insur-image"
              src={bluess} // Add the image source to each data item
              alt={`Profile - ${data.case_id}`}
            />
            <span style={{ position: "absolute", top: 0, right: 10 }}>
              {!data?.is_expired ? "active" : "expired"}
            </span>
            <div key={data.case_id} className="notif-item">
              <li className="case_id"> CASE ID: {data.case_id}</li>
              <li className="age">Company Name: {data.company_name}</li>
              <li className="recommended"> Monthly Coverage: {data.monthly_coverage}</li>
              <li className="recommended">
                dental: {data.dental_and_vision_care}
              </li>
              <li className="recommended">
                {" "}
                Annual Coverage: {data.total_annual_coverage}
              </li>
              <li className="recommended">
                {" "}
                Accidental Emergencies: {data.accidental_emergencies}
              </li>
              <li className="recommended">
                {" "}
                Hospitalization Room Charges:{" "}
                {data.hospitalization_room_charges}
              </li>
              <li className="recommended">
                {" "}
                Other Medical Expenses: {data.other_medical_expenses}
              </li>
            </div>
            {/* <ul>
              <li className="case_id">CASE ID: {data.case_id}</li>
              <div className="inline-info">
                <li className="age">AGE: {data.age}</li>
                <li className="income">Income: {data.income}</li>
              </div>
              <li className="recommended">
                SELECTED VALUE: {data.recommended_value}
              </li>
            </ul> */}

            <button
              className="insur-place"
              onClick={() => handleBidClick(data.case_id, data.company_name)}
            >
              Accept
            </button>

            <div className="icon-container">
              <i className="fas fa-heart"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsurranceOffer;
