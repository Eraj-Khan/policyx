import { Fragment, useEffect, useState } from "react";
import React from "react";
import "@fontsource/poppins";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/400.css";

import "@fontsource/space-grotesk";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3BottomLeftIcon,
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  InboxIcon,
  UsersIcon,
  XMarkIcon,
  EnvelopeOpenIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import logotwo from "../image/logo1.png";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import { CursorArrowRaysIcon } from "@heroicons/react/24/outline";
import "../pages/Company.css";
import { CChart } from "@coreui/react-chartjs";
import axios from "axios";

const applications = [
  {
    applicant: {
      name: "Ricardo Cooper",
      email: "ricardo.cooper@example.com",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    date: "2020-01-07",
    dateFull: "January 7, 2020",
    stage: "$350",
    href: "#",
  },
  {
    applicant: {
      name: "Kristen Ramos",
      email: "kristen.ramos@example.com",
      imageUrl:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    date: "2020-01-07",
    dateFull: "January 7, 2020",
    stage: "$450",
    href: "#",
  },
  {
    applicant: {
      name: "Ted Fox",
      email: "ted.fox@example.com",
      imageUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    date: "2020-01-07",
    dateFull: "January 7, 2020",
    stage: "$300",
    href: "#",
  },
  {
    applicant: {
      name: "Kristen Ramos",
      email: "kristen.ramos@example.com",
      imageUrl:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    date: "2020-01-07",
    dateFull: "January 7, 2020",
    stage: "$200",
    href: "#",
  },
  {
    applicant: {
      name: "Ted Fox",
      email: "ted.fox@example.com",
      imageUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    date: "2020-01-07",
    dateFull: "January 7, 2020",
    stage: "$800",
    href: "#",
  },
  {
    applicant: {
      name: "Ted Fox",
      email: "ted.fox@example.com",
      imageUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    date: "2020-01-07",
    dateFull: "January 7, 2020",
    stage: "$600",
    href: "#",
  },
];
const navigation = [
  { name: "Company Dashboard", href: "#", icon: HomeIcon, current: true },
  {
    name: "Registered Cases",
    href: "/userList",
    icon: UsersIcon,
    current: false,
  },
  {
    name: "Offered Packages",
    href: "/packages",
    icon: FolderIcon,
    current: false,
  },
];

const handlelogOut = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("refresh-token");
  localStorage.removeItem("notification");
  window.location.reload();
};

const userNavigation = [
  { name: "Company Profile", href: "#" },
  { name: "Settings", href: "#" },
];

const metrics = [
  {
    id: 1,
    stat: "8K+",
    emphasis: "Companies",
    rest: "use laoreet amet lacus nibh integer quis.",
  },
  {
    id: 2,
    stat: "25K+",
    emphasis: "Countries around the globe",
    rest: "lacus nibh integer quis.",
  },
  {
    id: 3,
    stat: "98%",
    emphasis: "Customer satisfaction",
    rest: "laoreet amet lacus nibh integer quis.",
  },
  {
    id: 4,
    stat: "12M+",
    emphasis: "Issues resolved",
    rest: "lacus nibh integer quis.",
  },
];
const footerNavigation = {
  solutions: [
    { name: "Marketing", href: "#" },
    { name: "Analytics", href: "#" },
    { name: "Commerce", href: "#" },
    { name: "Insights", href: "#" },
  ],
  support: [
    { name: "Pricing", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Guides", href: "#" },
    { name: "API Status", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
    { name: "Partners", href: "#" },
  ],
  legal: [
    { name: "Claim", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Dribbble",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Company = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [statistic, setStatistic] = useState(null);
  const [countBid, setCountBid] = useState([0, 0]);
  const [packageStats, setPackageStats] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Packages",
        backgroundColor: "#3498DB",
        data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
      },
    ],
  });

  const [packages, setPackages] = useState([]);
  const [companyName, setCompanyName] = useState("");


  function formatNumber(number) {
    const suffixes = ["", "K", "M", "B", "T"];
    const numString = String(number);
    const suffixNum = Math.floor(numString.length / 3);
    
    let shortNumber = parseFloat((suffixNum !== 0 ? (number / Math.pow(1000, suffixNum)) : number).toPrecision(2));
    
    if (!Number.isInteger(shortNumber)) {
      shortNumber = shortNumber.toFixed(1);
    }
    
    return shortNumber + suffixes[suffixNum];
  }
  

  useEffect(() => {
    let payload = localStorage.getItem("user");
    let parsedPayload = JSON.parse(payload);

    const { company_name } = parsedPayload;

    // Set company name in state
    setCompanyName(company_name);
  }, []);

  const getPackAges = async () => {
    try {
      let payload = localStorage.getItem("user");
      let parsedPayload = JSON.parse(payload);

      const { company_name } = parsedPayload;
      const response = await axios.get(
        `http://127.0.0.1:8000/company_dashboard/list_company_packages/${company_name}`
      );
      const { Packages } = response.data;

      setPackages(Packages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getStats = async () => {
    try {
      let payload = localStorage.getItem("user");
      let parsedPayload = JSON.parse(payload);

      const { id } = parsedPayload;
      console.log(parsedPayload);
      const response = await axios.get(
        `http://127.0.0.1:8000/company_dashboard/statistics/${id}`
      );
      // Set the entire JSON object to data
      // {
      //   "total_cases": 8,
      //   "total_completed_cases": 3,
      //   "average_age": 44.333333333333336,
      //   "total_accepted_packages": 3,
      //   "total_revenue": 8872
      // }
      console.log(response);
      setStatistic(response.data);
    } catch (error) {
      console.error("Error fetching data111:", error);
    }
  };

  const countBidGet = async () => {
    try {
      let payload = localStorage.getItem("user");
      let parsedPayload = JSON.parse(payload);

      const { company_name } = parsedPayload;
      const response = await axios.get(
        `http://127.0.0.1:8000/company_dashboard/count_bids/${company_name}`
      );
      // Set the entire JSON object to data
      // {
      //   "total_cases": 8,
      //   "total_completed_cases": 3,
      //   "average_age": 44.333333333333336,
      //   "total_accepted_packages": 3,
      //   "total_revenue": 8872
      // }
      const { total_bids_count, accepted_bids_count } = response.data;
      setCountBid([total_bids_count, accepted_bids_count]);
    } catch (error) {
      console.error("Error fetching data222:", error);
    }
  };

  const getPackages = async () => {
    try {
      let payload = localStorage.getItem("user");
      let parsedPayload = JSON.parse(payload);

      const { company_name } = parsedPayload;
      const response = await axios.get(
        `http://127.0.0.1:8000/company_dashboard/monthly_completed_cases/${company_name}`
      );

      const mappedData = packageStats.labels?.map((label, index) => {
        const monthData = response.data.find(
          (data) => data.month_name === index + 1
        );
        const count = monthData ? monthData.count : 0;

        return count;
      });

      setPackageStats((prevChartData) => ({
        ...prevChartData,
        datasets: [
          {
            ...prevChartData.datasets[0],
            data: mappedData,
          },
        ],
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/company_dashboard/list_users/"
        );
        // Set the entire JSON object to data
        let count = localStorage.getItem("notification");
        if (count == response.data.length) {
          setNotificationCount(response.data.length);
        } else {
          localStorage.setItem("notification", response.data.length);
          setNotificationCount(response.data.length);
          toast.success("you have a new notification");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    getStats();
    getPackages();
    countBidGet();
    getPackAges();
  }, []);

  return (
    <div className="main-dashboard">
      <div className="sidebar">
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
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-indigo-800 text-white"
                              : "text-indigo-100 hover:bg-indigo-600",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
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
              <div className="w-14 flex-shrink-0" aria-hidden="true"></div>
            </div>
          </Dialog>
        </Transition.Root>

        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          <div className=" sidebar-menu flex flex-grow flex-col overflow-y-auto bg-sky-400 pt-5">
            <div className="flex flex-shrink-0">
              <div className="logo">
                <img src={logotwo} />
              </div>
            </div>
            <div className="mt-5 flex flex-1 flex-col">
              <nav className="flex-1 space-y-2 px-2 ">
                {navigation.map((item) => (
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
                      className="mr-3 h-6 w-6 flex-shrink-0 text-sky-700"
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
              <div className="flex flex-1"></div>
              <div className="ml-4 flex items-center md:ml-6">
                <a
                  href="/notification"
                  className="flex justify-center items-center rounded-full hover:bg-sky-500 bg-white p-1 text-gray-400 hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                  <span className="inline-flex items-center rounded-full bg-sky-100 px-3 py-0.5 text-sm font-medium text-sky-600">
                    {notificationCount}
                  </span>
                </a>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex flex-row p-1  profile_company items-center bg-sky-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <div className="w-5 px-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-8 h-8 company_font"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                            clipRule="evenodd"
                          />
                          <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z" />
                        </svg>
                      </div>

                      <div className="company-info">
                        {companyName}
                      </div>
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
                      <button
                        className="signout-button  hover:text-white hover:rounded-md hover:bg-sky-500 p-2 pl-4"
                        onClick={handlelogOut}
                      >
                        Sign Out
                      </button>
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
                <h1 className="dashboard">Dashboard</h1>
              </div>
              
            </div>
          </main>
        </div>
        <div className="stats">
          <h3 className=" ">{companyName} Statistics</h3>

          <dl className=" stats_report mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            <div className=" report-cards relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-0 shadow sm:px-6 sm:pt-6">
              <dt>
                <div className=" icons absolute rounded-md p-3 ">
                  <EnvelopeOpenIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                  Total Cases
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-3 sm:pb-3">
                <p className="text-2xl font-semibold text-gray-900">
                  {statistic?.total_cases}
                </p>
              </dd>
            </div>

            <div className=" report-cards relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-10 shadow sm:px-6 sm:pt-6">
              <dt>
                <div className=" icons absolute rounded-md p-3 ">
                  <EnvelopeIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <p className="ml-14 truncate text-sm font-medium text-gray-500">
                  Completed Cases
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">
                  {statistic?.total_completed_cases}
                </p>
              </dd>
            </div>

            <div className=" report-cards relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-10 shadow sm:px-6 sm:pt-6">
              <dt>
                <div className=" icons absolute rounded-md p-3 ">
                  <UsersIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                  Average Age
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-3 sm:pb-3">
                <p className="text-2xl font-semibold text-gray-900">
                  {statistic?.average_age?.toFixed(1)}
                </p>
              </dd>
            </div>

            <div className=" report-cards relative overflow-hidden rounded-lg bg-white px-2 pt-5 pb-5 shadow sm:px-3 sm:pt-6">
              <dt>
                <div className=" icons absolute rounded-md p-3 ">
                  <CheckCircleIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                  Bids Accepted
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-3 sm:pb-3">
                <p className="text-2xl font-semibold text-gray-900">
                  {statistic?.total_accepted_packages}
                </p>
              </dd>
            </div>

            <div className=" report-cards relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-5 shadow sm:px-6 sm:pt-6">
              <dt>
                <div className=" icons absolute rounded-md p-3 ">
                  <ChartBarIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                  Total Revenue
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-3 sm:pb-3">
                <p className="text-2xl font-semibold text-gray-900">
                  {formatNumber(statistic?.total_revenue)}
                </p>
              </dd>
            </div>
          </dl>
        </div>

        <div className="chartmain">
          <div className="chart11">
            <CChart
              type="doughnut"
              data={{
                labels: ["Total Bids Count", "Total Bids Accepted"],
                datasets: [
                  {
                    backgroundColor: ["#3498DB", "	#20b2aa"],
                    data: countBid,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    labels: {
                      color: "--cui-body-color",
                    },
                  },
                },
              }}
            />
          </div>
          <div className="chart33">
            <div className="Insurrancepackages">
              <h1>Packages</h1>
            </div>
            <CChart
              type="bar"
              data={packageStats}
              labels="months"
              options={{
                plugins: {
                  legend: {
                    labels: {
                      color: "--cui-body-color",
                    },
                  },
                },
                scales: {
                  x: {
                    grid: {
                      color: "--cui-border-color-translucent",
                    },
                    ticks: {
                      color: "--cui-body-color",
                    },
                  },
                  y: {
                    grid: {
                      color: "--cui-border-color-translucent",
                    },
                    ticks: {
                      color: "--cui-body-color",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="chartleads">
          <div className="leads">
            <div className="overflow-hidden bg-white sm:rounded-md">
              <div className="recentleads">
                {" "}
                <h1>Recent Bids</h1>
              </div>

              <ul role="list" className="list_leads ">
                {packages?.map((application) => (
                  <li key={application?.case_id}>
                    <a className="block mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pb-10 pl-6">
                      <div className="relative bids_cards rounded-lg bg-white  pt-5 pb-0 shadow  sm:pt-6">
                        <div className="cards_biding ">
                        <div class="go-corner" href="#">
      <div class="go-arrow">
        →
      </div>
    </div>
                          <div>
                            <div >
                              <div>
                                <p className="truncate text-sm font-medium text-gray-600 mb-6">
                                  <span className="head ">
                                    <img src="https://img.icons8.com/?size=50&id=18755&format=png" alt="" />
                                    CASE ID :</span>{" "}
                                  {application?.case_id}
                                </p>
                              </div>
                              <div>
                                <p className="flex items-center text-sm text-gray-600">
                                  <span className="truncate text-sm text-gray-600 mb-6">
                                    <span className="head">
                                      <img src="https://img.icons8.com/?size=80&id=42326&format=png" alt="" />
                                      Monthly Premium :
                                    </span>{" "}
                                    {application?.monthly_coverage}
                                  </span>
                                </p>
                              </div>
                              <div>
                                <p className=" flex items-center text-sm text-gray-600 mb-6">
                                  <span className="truncate text-sm text-gray-600">
                                    <span className="head">
                                      <img src="https://img.icons8.com/?size=80&id=5Mne4khPeMtK&format=png" alt="" />
                                      Annual Coverage :
                                    </span>{" "}
                                    {application?.total_annual_coverage}
                                  </span>
                                </p>
                              </div>
                              <div>
                                {" "}
                                <p className=" flex items-center text-sm text-gray-600 mb-6">
                                  <span className="truncate text-sm text-gray-600">
                                    <span className=" head">
                                      <img src="https://img.icons8.com/?size=50&id=23&format=png" alt="" />Created At : </span>{" "}
                                    {application?.updated_at?.split("T")[0]}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;