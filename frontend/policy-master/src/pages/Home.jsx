import React, { useLayoutEffect, useState, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fontsource/poppins";
import "@fontsource/poppins/800.css";
import "@fontsource/space-grotesk";

import "animate.css";
import "@fontsource/poppins";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  useSpringRef,
  animated,
  useTransition,
  useSpring,
} from "@react-spring/web";

import { Popover, Transition } from "@headlessui/react";
import img2 from "../image/adamjee.jpg";
import img3 from "../image/jubilee.jpg";
import img4 from "../image/askari.jpg";
import img5 from "../image/takaful.png";
import img6 from "../image/ubl.png";
import styles from "./Home.css";
import img7 from "../image/4412.jpg";
import logotwo from "../image/logo1.png";

const IMAGES = [
  'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/7731323/pexels-photo-7731323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/4894569/pexels-photo-4894569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
]

const navigation = [
  { name: "Home", href: "#" },
  { name: "Insurance", href: "#" },
  { name: "About Us", href: "#" },
  { name: "Contact Us", href: "#" },
];
const features = [
  {
    name: "Streamlined Experience",
    description:
      "Navigate insurance effortlessly with our user-friendly platform designed for simplicity.",
    FontAwesomeIcon: { faEnvelope },
  },
  {
    name: "AI-Powered Precision",
    description:
      " Experience personalized decision-making with cutting-edge AI-generated budget suggestions.",
    //icon: LockClosedIcon,
  },
  {
    name: "Transparent Journey",
    description:
      "From application to bidding, enjoy a transparent process ensuring clarity at every step.",
    //icon: ArrowPathIcon,
  },
  {
    name: "Personalized Solutions",
    description:
      "Enjoy insurance tailored to your specific needs, providing a customized approach for comprehensive coverage.",
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
      " https://arynews.tv/wp-content/uploads/2021/09/Bank-Alfalah.jpg",
    preview: "Max Discounted Rs:2000 ",
    author: {
      name: "Term & Condition",
      imageUrl: "data:image/jpeg;base64,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",
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

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const springApi = useSpringRef();

  const transitions = useTransition(activeIndex, {
    from: {
      clipPath: "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)",
    },
    enter: {
      clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
    },
    leave: {
      clipPath: "polygon(100% 0%, 100% 100%, 100% 100%, 100% 0%)",
    },
    onRest: (_springs, _ctrl, item) => {
      if (activeIndex === item) {
        setActiveIndex(activeIndex === IMAGES.length - 1 ? 0 : activeIndex + 1);
      }
    },
    exitBeforeEnter: true,
    config: {
      duration: 1500,
    },
    delay: 1000,
    ref: springApi,
  });

  const springs = useSpring({
    from: {
      strokeDashoffset: 120,
    },
    to: {
      strokeDashoffset: 0,
    },
    config: {
      duration: 11000,
    },
    loop: true,
    ref: springApi,
  });

  useLayoutEffect(() => {
    springApi.start();
  }, [activeIndex]);

  return (
    <div className={styles.container}>
      <div className="bg-white">
        <div className="relative overflow-hidden">
          <Popover as="header" className="relative">
            <div className="nav-bar pb-6 pt-6">
              <nav
                className="relative mx-auto flex max-w-7xl items-center justify-between px-2"
                aria-label="Global"
              >
                <div className="flex flex-1 ">
                  <div className="">
                    <div className="homelogo flex flex-grow flex-col overflow-y-auto  pt-5">
                      {/* <img
     className="h-12 w-auto"
     src="https://www.pinclipart.com/picdir/middle/336-3368754_healthcare-it-solution-provider-health-insurance-logo-png.png"
     alt="Your Company"
   /> */}
                      <div className="homelogo">
                        <img className="home_logo" src={logotwo} />
                      </div>
                    </div>
                    <div className="-mr-2 flex items-center md:hidden">
                      <Popover.Button className="focus-ring-inset inline-flex items-center justify-center rounded-md bg-gray-900 p-2 text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {/* <Bars3Icon className="h-6 w-6" aria-hidden="true" /> */}
                      </Popover.Button>
                    </div>
                  </div>
                  <div className=" nav_menu hidden space-x-8 md:ml-36 md:flex mt-2">
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
                <div>
                  <div className=" signin_signup hidden md:flex md:items-center md:space-x-6">
                    <a
                      href="/signinas"
                      className="inline-flex items-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-base font-medium text-white hover:bg-sky-400"
                    >
                      Sign In / Sign Up
                    </a>
                    {/* <a
                  href="#"
                  className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700"
                >
                  Start free trial
                </a> */}
                  </div>
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
                        className="block w-full rounded-md py-3 px-4 text-center font-medium text-white shadow hover:from-teal-600 hover:to-cyan-700"
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

          <div className="pt-10 sm:pt-16 lg:overflow-hidden lg:pt-0 "></div>
          <div className="">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 hero-section">
              <div className="mx-auto max-w-md px-6 sm:max-w-2xl sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
                <div className="lg:py-40 ">
                  <a
                    href="#"
                    className="inline-flex items-center rounded-full bg-sky-500 p-2 pr-4 pl-4 text-white hover:text-gray-200 sm:text-base lg:text-sm xl:text-base"
                  >
                    <div className="rounded-heading">
                      <div className="animate__animated animate__pulse">
                        <h1 className="rounded-full bg-gradient-to-r from-sky-400 to-sky-600 px-3 py-0.5 text-sm font-semibold leading-5 text-white">
                          Get The Best <span> Life Insurance Plan</span>
                        </h1>
                      </div>
                    </div>
                    {/* <ChevronRightIcon className="ml-2 h-5 w-5 text-gray-500" aria-hidden="true" /> */}
                  </a>
                  <div className="main-heading">
                    <h1 className=" animate__animated animate__bounce ">
                      {" "}
                      We have helped power <br></br>
                      <span> 500+ comparisons</span>{" "}
                    </h1>
                    <p className="main-paragraph">
                      Thousands of customers have already benefitted through our
                      free, reliable and expert services. Become a customer now
                      and be rewarded with smart choices for significant savings
                    </p>
                  </div>
                  <div className="mt-10 sm:mt-12  grid gap-x-8 gap-y-6 grid-cols-3">
                   
                  </div>
              
                </div>
              </div>
              <div className="main-images ">
                <img
                  className="animate__animated animate__pulse "
                  src={img7}
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* Feature section with screenshot */}
          <div className="relative bg-gray-50 pt-16 sm:pt-24 lg:pt-20  pb-20">
            <div className="main-img px-6  lg:px-2  ">
              <div className="container__inner">
                {transitions((springs, item) => (
                  <animated.div className=".img_container" style={springs}>
                    <img src={IMAGES[item]} />
                  </animated.div>
                ))}
                <div className={styles.ticker}>
                  <div />
                </div>
              </div>
              <div className="content_img">
                <h2 className="mt-2  ">
                  We have helped power 500+ people
                </h2>
                <p className="mx-auto mt-5 max-w-prose text-xl  max-w-100">
                PolicyX is a game-changer! The simplicity of registration, coupled with AI-driven budget suggestions, made  insurance decision stress-free.
                </p>
              </div>
            </div>
          </div>
          {/* Logo Cloud */}
          <div className=" ourpartners bg-white pt-20 ">
            <div className="mx-auto max-w-9xl py-16 px-6 lg:px-10 ">
              <h2 className="mt-2 text-3xl font-bold tracking-tight  sm:text-4xl text-center">
                Our Partners
              </h2>
              <p className="mx-auto mt-5 max-w-prose text-2xl">
                Our panel consists of trusted household names from the insurance
                industry.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                  <img className="h-20" src={img2} alt="#" />
                </div>
                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                  <img className="h-20" src={img3} alt="#" />
                </div>
                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                  <img className="h-20" src={img4} alt="#" />
                </div>
                <div className="col-span-1 flex justify-center md:col-span-2 md:col-start-2 lg:col-span-1">
                  <img className="h-20" src={img5} alt="#" />
                </div>
                <div className="col-span-2 flex justify-center md:col-span-2 md:col-start-4 lg:col-span-1">
                  <img className="h-20" src={img6} alt="#" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature section with grid */}
        <div className="relative bg-white py-16 sm:py-24  ">
          <div className="mx-auto max-w-md px-6 text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
            <p className="mt-2 text-3xl font-bold tracking-tight text-sky-600 sm:text-4xl">
              Why Choose us
            </p>
            <p className="mx-auto mt-5 max-w-prose text-xl text-sky-400">
              To provide solutions that protect the future of our customers
            </p>
            <div className="mt-12">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 pb-12 ">
                {features.map((feature) => (
                  <div key={feature.name} className="pt-6">
                    <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                      <div className="-mt-6">
                        <div>
                          <span className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-sky-500 to-sky-300 p-3 shadow-lg">
                            <FontAwesomeIcon
                              className="h-6 w-6 text-white"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                        <h3 className="mt-8 text-lg font-medium tracking-tight text-sky-600">
                          {feature.name}
                        </h3>
                        <p className="mt-5 text-base text-sky-400">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial section */}
        <div className="testimonial  pb-16 lg:relative lg:z-10 lg:pb-0">
          <div className=" lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8">
            <div className="relative lg:-my-8">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1/2 bg-white lg:hidden"
              />
              <div className="mx-auto max-w-md px-6 sm:max-w-3xl lg:h-full lg:p-0">
                <div className="aspect-w-10 aspect-h-6 overflow-hidden rounded-xl shadow-xl sm:aspect-w-16 sm:aspect-h-7 lg:aspect-none lg:h-full">
                  <img
                    className="object-cover lg:h-full lg:w-full"
                    src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="mt-12 lg:col-span-2 lg:m-0 lg:pl-8">
              <div className="mx-auto max-w-md px-6 sm:max-w-2xl lg:max-w-none lg:px-0 lg:py-20">
                <blockquote>
                  <div>
                    <svg
                      className="h-12 w-12 text-white opacity-25"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="mt-6 text-2xl font-medium text-white">
                      PolicyX transformed my insurance experience! With a
                      user-friendly interface and AI-generated budget
                      suggestions, it made decision-making a breeze. The
                      transparency in the bidding process and real-time updates
                      ensured I was in control. Highly recommended!
                    </p>
                  </div>
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        {/* Blog section */}
        <div className="relative bg-gray-50 py-16 sm:py-24 lg:py-32">
          <div className="relative">
            <div className="mx-auto max-w-md px-6 text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
              <p className="mt-2 text-xl font-bold tracking-tight text-sky-600 sm:text-5xl">
                Promotions
              </p>
              {/* <p className="mx-auto mt-5 max-w-prose text-xl text-orange-400">
                  Phasellus lorem quam molestie id quisque diam aenean nulla in.
                  Accumsan in quis quis nunc, ullamcorper malesuada. Eleifend
                  condimentum id viverra nulla.
                </p> */}
            </div>
            <div className="mx-auto mt-12 grid max-w-md gap-8 px-6 sm:max-w-lg lg:max-w-7xl lg:grid-cols-3 lg:px-8">
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex flex-col overflow-hidden rounded-lg shadow-lg"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="h-40 w-full   object-cover"
                      src={post.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between bg-white p-6">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-sky-600">
                        <a
                          href={post.category.href}
                          className="hover:underline"
                        >
                          {post.category.name}
                        </a>
                      </p>
                      <a href={post.href} className="mt-2 block">
                        <p className="text-xl font-semibold text-sky-600">
                          {post.title}
                        </p>
                        <p className="mt-3 text-base text-sky-400">
                          {post.preview}
                        </p>
                      </a>
                    </div>
                    <div className="mt-6 flex items-center">
                      <div className="flex-shrink-0">
                        <a href={post.author.href}>
                          <img
                            className="h-10 w-10 rounded-full"
                            src={post.author.imageUrl}
                            alt={post.author.name}
                          />
                        </a>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-sky-600">
                          <a
                            href={post.author.href}
                            className="hover:underline"
                          >
                            {post.author.name}
                          </a>
                        </p>
                        <div className="flex space-x-1 text-sm text-sky-400">
                          <time dateTime={post.datetime}>{post.date}</time>
                          <span aria-hidden="true">&middot;</span>
                          <span>{post.readingLength} read</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className=" about_us relative ">
          <div className="relative h-56 bg-indigo-600 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">
            <img
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&sat=-100"
              alt=""
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-sky-500 mix-blend-multiply"
            />
          </div>
          <div className="  relative mx-auto max-w-md py-12 px-6 sm:max-w-7xl sm:py-20 md:py-28 lg:px-8 lg:py-32">
            <div className="md:ml-auto md:w-1/2 md:pl-10">
              {/* <h2 className="text-lg font-semibold text-gray-300">
                  Award winning support
                </h2> */}
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                About Us
              </p>
              <p className="mt-3 text-lg text-white">
                In a decade marked by steady growth in Pakistan's insurance
                market, a substantial portion of the population grapples with
                the complexities of navigating and customizing insurance plans.
                Recognizing this gap, PolicyX emerges as a beacon of simplicity
                and innovation. We blend local insights with cutting-edge
                technology, aiming to redefine the insurance landscape in
                Pakistan. At PolicyX, we're more than a platform; we're your
                ally in simplifying insurance decisions. Welcome to a new era in
                insurance, where facts meet innovation for a streamlined and
                personalized experience.
              </p>
              <div className="mt-8">
            
              </div>
            </div>
          </div>
        </div>

        <div className="footer1 mt-60">
          <footer className="main_footer " aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
              Footer
            </h2>
            <div className="mx-auto max-w-md px-6 pt-12 sm:max-w-7xl lg:px-8 lg:pt-16">
              <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                <div className="space-y-8 xl:col-span-1">
                  <img
                    className="home_logo h-28 "
                    src={logotwo}
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
                        className="text-white hover:text-sky-500"
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
                              className="text-base text-white hover:text-sky-900"
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
                              className="text-base text-white hover:text-sky-900"
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
                              className="text-base text-white hover:text-sky-900"
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
                              className="text-base text-white hover:text-sky-900"
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
                <p className="text-base text-white xl:text-center">
                  &copy; 2020 Your Company, Inc. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
