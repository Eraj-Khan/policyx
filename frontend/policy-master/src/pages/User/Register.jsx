import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

import "../User/Register.css";
import { useState } from 'react';
import axios from 'axios';
import swal from "sweetalert";



const navigation = [
  { name: "Home", href: "#" },
  { name: "Insurance", href: "#" },
  { name: "About Us", href: "#" },
  { name: "Contact Us", href: "#" },
];
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
      " https://mettisglobal.news/wp-content/uploads/2022/03/IMG7129JS-Bank-1.jpg", preview:
      "Max Discounted Rs:2000 ",
    author: {
      name: "Term & Condition",
      imageUrl:
        "https://s3-symbol-logo.tradingview.com/js-bank--600.png", href: "#",
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
    imageUrl:
      " https://i.brecorder.com/primary/2022/12/63afa41390e0b.png", preview:
      "Max Discounted Rs:2000  ", author: {
        name: "Term & Condition",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/c/cb/Faysal_Bank.png", href: "#",
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
      " https://upload.wikimedia.org/wikipedia/en/a/a3/Silkbank_logo.png ", preview:
      "Max Discounted Rs:2000  ",
    author: {
      name: "Term & Condition",
      imageUrl: "https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/v1484220707/lfoeojixxge8cgyntcz7.png", href: "#",
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

const Register = () => {

  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bmi, setBmi] = useState('');
  const [children, setChildren] = useState('');
  const [smoker, setSmoker] = useState('');
  const [region, setRegion] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [income, setIncome] = useState('');
  const [education, setEducation] = useState('');
  const [employment, setEmployment] = useState('');
  const [budget, setBudget] = useState('');

  const handleSubmit = (e) => {


    e.preventDefault();

    const response = axios.post('http://127.0.0.1:8000/',{
      age,
      gender,
      bmi,
      children,
      smoker,
      region,
      maritalStatus,
      income,
      education,
      employment,
      budget
    } ,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    );
    if(response.status === 200){
      console.log("Age", age);
      swal("form submitted successfully")
      
    }
    else{
      swal("unsuccessful")
    }
    

    


    const formData = {
      age,
      gender,
      bmi,
      children,
      smoker,
      region,
      maritalStatus,
      income,
      education,
      employment,
      budget,
    };
    // Here you can handle the form submission, for example, send the data to an API.
    console.log('Form submitted:', formData);
  };


  return (
   


    <div className=" ">
    
    <Popover as="header" className="relative">
          <div className="bg-sky-300	 pt-6 pb-6">
            <nav
              className="relative mx-auto flex max-w-7xl items-center justify-between px-6"
              aria-label="Global"
            >
              <div className="flex flex-1 items-center">
                <div className="flex w-full items-center justify-between md:w-auto">
                  <a href="#">
                    <span className="sr-only">Your Company</span>
                    <img
                      className="h-8 w-auto sm:h-10"
                      src="https://tailwindui.com/img/logos/mark.svg?from-color=teal&from-shade=200&to-color=cyan&to-shade=400&toShade=400"
                      alt=""
                    />
                  </a>
                  <div className="-mr-2 flex items-center md:hidden">
                    <Popover.Button className="focus-ring-inset inline-flex items-center justify-center rounded-md bg-gray-900 p-2 text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {/* <Bars3Icon className="h-6 w-6" aria-hidden="true" /> */}
                    </Popover.Button>
                  </div>
                </div>
                <div className="hidden space-x-8 md:ml-10 md:flex">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className=" text-xl font-medium text-white hover:text-sky-600"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="hidden md:flex md:items-center md:space-x-6">
                <a
                  href="/login"
                  className="inline-flex items-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-base font-medium text-white hover:bg-sky-400"
                >
                  Log out
                </a>
                {/* <a
                  href="#"
                  className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700"
                >
                  Start free trial
                </a> */}
              </div>
            </nav>
          </div>

          <Transition
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute inset-x-0 top-0 origin-top transform p-2 transition md:hidden"
            >
              <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
                <div className="flex items-center justify-between px-5 pt-4">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?from-color=teal&from-shade=500&to-color=cyan&to-shade=600&toShade=600"
                      alt=""
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-600">
                      <span className="sr-only">Close menu</span>
                      {/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
                    </Popover.Button>
                  </div>
                </div>
                <div className="pt-5 pb-6">
                  <div className="space-y-1 px-2">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="mt-6 px-5">
                    <a
                      href="#"
                      className="block w-full rounded-md bg-gradient-to-r from-teal-500 to-cyan-600 py-3 px-4 text-center font-medium text-white shadow hover:from-teal-600 hover:to-cyan-700"
                    >
                      Start free trial
                    </a>
                  </div>
                  <div className="mt-6 px-5">
                    <p className="text-center text-base font-medium text-gray-500">
                      Existing customer?{" "}
                      <a href="#" className="text-gray-900 hover:underline">
                        Login
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>

    
<div className=" main">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">

        <div className="mx-auto w-full max-w-sm ">
          <div>
         
            <h2 className="mt-6 text-4xl font-bold tracking-tight text-sky-600">Registration</h2>
          
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
                <div className="age">
                  <label htmlFor="age">Age:</label>
                  <input
                    type="number"
                    name="age"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>

                <div className="gender">
                  <label>Gender </label> 
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    value="Male"
                    checked={gender === 'Male'}
                    onChange={() => setGender('Male')}
                  />
                  <label htmlFor="male"> Male </label>
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="Female"
                    checked={gender === 'Female'}
                    onChange={() => setGender('Female')}
                  />
                  <label htmlFor="female"> Female </label>
                </div>
                <div className="select3">
                  <div className="bmi">
                    <label htmlFor="bmi" id="bmi_label">
                      BMI:
                    </label>
                    <input
                      type="text"
                      name="bmi"
                      id="bmi"
                      value={bmi}
                      onChange={(e) => setBmi(e.target.value)}
                    />
                  </div>

                  <div className="children">
                    <label htmlFor="children">Children:</label>
                    <input
                      type="number"
                      name="children"
                      id="children"
                      value={children}
                      onChange={(e) => setChildren(e.target.value)}
                    />
                  </div>
                </div>
                <div className="smoker">
                  <label> Smoker </label>
                  <input
                    type="radio"
                    name="smoker"
                    id="smokerYes"
                    value="Yes"
                    checked={smoker === 'Yes'}
                    onChange={() => setSmoker('Yes')}
                  />
                  <label htmlFor="smokerYes"> Yes </label>
                  <input
                    type="radio"
                    name="smoker"
                    id="smokerNo"
                    value="No"
                    checked={smoker === 'No'}
                    onChange={() => setSmoker('No')}
                  />
                  <label htmlFor="smokerNo"> No </label>
                </div>

                <div className="region">
                <label> Region </label>
                  <input
                    type="radio"
                    name="region"
                    id="southwest"
                    value="Southwest"
                    checked={region === 'Southwest'}
                    onChange={() => setRegion('Southwest')}
                  />
                  <label htmlFor="southwest"> Southwest </label>
                  <input
                    type="radio"
                    name="region"
                    id="northwest"
                    value="Northwest"
                    checked={region === 'Northwest'}
                    onChange={() => setRegion('Northwest')}
                  />
                  <label htmlFor="northwest"> Northwest </label>
                </div>
                <div className="marin">
                <div className="martial">
                  <label htmlFor="marital_status"> <h1 className="martialheading"> Marital Status </h1></label>
                  <select
                    name="maritalStatus"
                    id="maritalStatus"
                    value={maritalStatus}
                    onChange={(e) => setMaritalStatus(e.target.value)}
                  >
                    <option value="">Marital Status</option>
                    <option value="Married">Married</option>
                    <option value="Unmarried">Unmarried</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="income">
                  <label htmlFor="income" id="income_label"><h1 className="incomeheading">  Income </h1> </label>
                  <input
                    type="number"
                    name="income"
                    id="income"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                  />
           </div>    
          
          </div> 

                <div className="education">
                  <label htmlFor="education">Education</label>
                  <input
                    type="text"
                    name="education"
                    id="education"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                  />
                </div>
                <div className="budget">
                  <label htmlFor="budget" id="budget_label"><h1 className="budgetheading">  Budget </h1> </label>
                  <input
                    type="number"
                    name="budget"
                    id="budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
           </div> 

                <div className="employment">
                  <label>  Employment </label>
                  <input
                    type="radio"
                    name="employment"
                    id="employed"
                    value="Employed"
                    checked={employment === 'Employed'}
                    onChange={() => setEmployment('Employed')}
                  />
                  <label htmlFor="employed">  Employed </label>
                  <input
                    type="radio"
                    name="employment"
                    id="unemployed"
                    value="Unemployed"
                    checked={employment === 'Unemployed'}
                    onChange={() => setEmployment('Unemployed')}
                  />
                  <label htmlFor="unemployed"> Unemployed </label>
                </div>

                <div className="button">
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
      </div>
      <div className="relative hidden w-30 flex-1 h-1 lg:block contentimg">
        <img
          className="object-contain object-img"
          src="https://d1e6cjojnyo6nm.cloudfront.net/webp_images/product_new/healthcampiegn_img_3.png"
          alt="#"
        />
        <h1 className="w-100 heading1 text-sky-600">Get The Best Life Plan For</h1>
        <h2 className="heading2  text-sky-600">Yourself, Family or Parents</h2>
      </div>
    </div>
    <footer className="bg-sky-300" aria-labelledby="footer-heading">
          <h2 id="footer-heading" className="sr-only">
            Footer
          </h2>
          <div className="mx-auto max-w-md px-6 pt-12 sm:max-w-7xl lg:px-8 lg:pt-16">
            <div className="xl:grid xl:grid-cols-3 xl:gap-8">
              <div className="space-y-8 xl:col-span-1">
                <img
                  className="h-10"
                  src="https://tailwindui.com/img/logos/mark.svg?color=gray&shade=300"
                  alt="Company name"
                />
                <p className="text-base text-white">
                  Making the world a better place through constructing elegant
                  hierarchies.
                </p>
                <div className="flex space-x-6">
                  {footerNavigation.social.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">{item.name}</span>
                      {/* <item.//icon className="h-6 w-6" aria-hidden="true" /> */}
                    </a>
                  ))}
                </div>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                <div className="md:grid md:grid-cols-2 md:gap-8">
                  <div>
                    <h3 className="text-base font-medium text-white">
                      Solutions
                    </h3>
                    <ul role="list" className="mt-4 space-y-4">
                      {footerNavigation.solutions.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className="text-base text-white hover:text-gray-900"
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-12 md:mt-0">
                    <h3 className="text-base font-medium text-white">
                      Support
                    </h3>
                    <ul role="list" className="mt-4 space-y-4">
                      {footerNavigation.support.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className="text-base text-white hover:text-gray-900"
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="md:grid md:grid-cols-2 md:gap-8">
                  <div>
                    <h3 className="text-base font-medium text-white">
                      Company
                    </h3>
                    <ul role="list" className="mt-4 space-y-4">
                      {footerNavigation.company.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className="text-base text-white hover:text-white"
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-12 md:mt-0">
                    <h3 className="text-base font-medium text-white">
                      Legal
                    </h3>
                    <ul role="list" className="mt-4 space-y-4">
                      {footerNavigation.legal.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className="text-base text-white hover:text-white"
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 border-t border-gray-200 py-8">
              <p className="text-base text-gray-600 xl:text-center">
                &copy; 2020 Your Company, Inc. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
    </div>
    
  );
};

export default Register;