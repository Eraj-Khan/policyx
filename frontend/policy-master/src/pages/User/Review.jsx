import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import { Fragment } from "react";
import "@fontsource/poppins";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/400.css";
import "../User/Review.css";
import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useParams } from "react-router";
import { Dialog, Menu, Transition } from "@headlessui/react";
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

const nav = [
  { name: "Dashboard", href: "/userdash", icon: HomeIcon, current: false },
  { name: "Insurance Offers", href: "#", icon: UsersIcon, current: true },
  { name: "Apply For Insurance", href: "/register", icon: FolderIcon, current: false }
 
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const features = [
  {
    name: "100% Free",
    description:
      "All information and advice is free of cost. The price you see is direct customer price.",
    FontAwesomeIcon: { faEnvelope },
  },
  {
    name: "Top-rated insurance",
    description:
      "We have all the top-rated insurance companies on your platform.",
    //icon: LockClosedIcon,
  },
  {
    name: "Accuracy",
    description:
      "We collect all data directly from our partners and do not hide or mislead you.",
    //icon: ArrowPathIcon,
  },
  {
    name: "Transparency/Convenience",
    description:
      "We guide you on the bases of what you need, not on what we want you to know.",
    //icon: ShieldCheckIcon,
  },
];
const blogPosts = [
  {
    id: 1,
    title: "Get Upto 15% Discount With JS Bank Debit & Credit Card",
    href: "#",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { name: "", href: "#" },
    imageUrl:
      " https://mettisglobal.news/wp-content/uploads/2022/03/IMG7129JS-Bank-1.jpg",
    preview: "Max Discounted Rs:2000 ",
    author: {
      name: "Term & Condition",
      imageUrl: "https://s3-symbol-logo.tradingview.com/js-bank--600.png",
      href: "#",
    },
    readingLength: "6 min",
  },
  {
    id: 2,
    title: "Get Upto 15% Discount With Faysal Bank Debit & Credit Card",
    href: "#",
    date: "Mar 10, 2020",
    datetime: "2020-03-10",
    category: { name: "", href: "#" },
    imageUrl: " https://i.brecorder.com/primary/2022/12/63afa41390e0b.png",
    preview: "Max Discounted Rs:2000  ",
    author: {
      name: "Term & Condition",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/c/cb/Faysal_Bank.png",
      href: "#",
    },
    readingLength: "4 min",
  },
  {
    id: 3,
    title: "Get Upto 15% Discount With Silk Bank Debit & Credit Card",
    href: "#",
    date: "Feb 12, 2020",
    datetime: "2020-02-12",
    category: { name: "", href: "#" },
    imageUrl:
      " https://upload.wikimedia.org/wikipedia/en/a/a3/Silkbank_logo.png ",
    preview: "Max Discounted Rs:2000  ",
    author: {
      name: "Term & Condition",
      imageUrl:
        "https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/v1484220707/lfoeojixxge8cgyntcz7.png",
      href: "#",
    },
    readingLength: "11 min",
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

const Review = () => {
  const {case_id} = useParams();
  const [predictedAI, setPredictedAI] = useState();
  const [budget, setBudget] = useState();
  const [data, setData] = useState(null);
  const [recommendedValue, setRecommendedValue] = useState("");
  const [budgetValue, setBudgetValue] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleCheckBoxChange = (value, checkboxName) => {
    setRecommendedValue(value)

    if (checkboxName === "predictedAI") {
      setPredictedAI(!predictedAI);
      setBudget(false);
    } else if (checkboxName === "budget") {
      setBudget(!budget);
      setPredictedAI(false);
    }
  };
  const handleBudgetInputChange = (e) => {
    const enteredValue = e.target.value;
    setBudgetValue(enteredValue);
    setRecommendedValue(enteredValue);
    setBudget(!!enteredValue); 
  };
  const handleSubmit = () => {
   
   
 
     let payload = Object.assign(data, {
      recommended_value:recommendedValue,
      age:data.age,
      id_user:data.user
    });
    axios.post(`http://127.0.0.1:8000/company_dashboard/create_case/`, payload)
    .then((response)=>{
      console.log("response", response.data)
      setTimeout(()=>{
        swal("Case submitted and notified to companies.")
      },100)
    })
    .catch((error)=>{
      console.log("error", error)
    })
     console.log("payload", payload)


    
    
  };

  useEffect(() => {
    localStorage.setItem("case_id", case_id)
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/get_data_by_case_id/${case_id}` 
        );
  
        console.log("API Response:", response.data);
  
       
        setData(response.data.case);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className=" ">
         <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
   
      <div className="logo flex flex-grow flex-col overflow-y-auto  pt-5">
   
          
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
            <div className="insurance_heading"><h1>Case Details</h1></div>
           
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
         
     
        </div>
      </main>
    </div>



      <div className="mid">
      {/* <table>
        <thead>
          <tr>
            <th>Age</th>
            <th>Gender</th>
            <th>BMI</th>
            <th>Children</th>
            <th>Smoker</th>
            <th>Region</th>
            <th>Marital_status</th>
            <th>Income</th>
            <th>Education</th>
            <th>Employment_status</th>
            <th>Case_id</th>
           
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
                <td>{item.age}</td>
                <td>{item.gender}</td>
                <td>{item.bmi}</td>
                <td>{item.children}</td>
                <td>{item.smoker}</td>
                <td>{item.marital_status}</td>
                <td>{item.region}</td>
                <td>{item.employment_status}</td>
                <td>{item.income}</td>
                <td>{item.education}</td>
                <td>{item.case_id}</td>
           
            </tr>
          ))}
        </tbody>
      </table> */}
  
        <div className="checked-container">
        {data && (
        <div>
          
          {/* Access and display properties of the JSON object */}
          <label className="checked-labelid">Case ID: {data.case_id}</label>
          <label className="checked-label">Age: {data.age}</label>
          <label className="checked-label">Gender: {data.gender}</label>
          <label className="checked-label">Marital Status: {data.marital_status}</label>
          <label className="checked-label">BMI: {data.bmi}</label>
          <label className="checked-label">Income: {data.income}</label>
          <label className="checked-label">Region: {data.region}</label>
          <label className="checked-label">Employment Status: {data.employment_status}</label>
          <label className="checked-label">Children: {data.children}</label>
          <label className="checked-label">Smoker: {data.smoker ? "yes":"no"}</label>
          <label className="checked-label">Education: {data.education}</label>
         
         <div className="value-selection">
          <div className="check-select">
          <p>Pick one of the following</p>
          <label className="checked-selection">
            <input
              className="check-input"
              type="checkbox"
              name="predictedAI"
              checked={predictedAI}
              onChange={() => handleCheckBoxChange(data.ai_suggested,"predictedAI")}
            />
           AI Suggested Monthly Premium <span className="your_budget">"$ {data?.ai_suggested}"</span>
          </label>
          </div>

          <label className="checked-selection_2">
            <input
              className="check-input"
              type="checkbox"
              name="budget"
              checked={budget}
              onChange={() => handleCheckBoxChange(data.budgetValue,"budget")}
            />
            Your Budget {data?.budgetValue}
          </label>
        </div>
        {budget && (
        <div className="budget-input-container">
          <label htmlFor="budgetInput" className="checked-label-budget">Enter Your Budget $:</label>
          <input
          
            type="text"
            id="budgetInput"
            value={budgetValue}
            onChange={handleBudgetInputChange}
          />
        </div>
      )}
        </div>
      )}

        

          <button className="proceed-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
     
    </div>
  );
};

export default Review;

