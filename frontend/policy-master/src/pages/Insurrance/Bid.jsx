import axios from "axios";
import { Fragment, useState, useEffect } from "react";
import React from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { useLocation } from "react-router";
import bid from "../Insurrance/Bid.css";
import videomain from "../../image/mainvideo.mp4";
import swal from "sweetalert";
const Bid = () => {
  const [bidAmount, setBidAmount] = useState("");
  const statePayload = useLocation();
  const [data, setData] = useState(null);
  const case_id = statePayload.state.case_id;
  const Id = statePayload.state.case_user;

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
const NavBar = () => {
  // Add your navigation bar content and styling here
  return (
    <nav className="navbar">
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
};

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
            
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <div className="bellicon">
        <h1 className="notification-heading text-sky-600">
          Insurrance Requests
        </h1>

        <span className="sr-only">View notifications</span>
      </div>
      </div>
  
    <main className="panel">
      



      <div className="bid_cont">

        <label className="bid-label" htmlFor="bidInput">Select Plan:</label>
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

        <label  className="bid-label" htmlFor="bidInput">Total Annual Coverage:</label>
        <input
        className="bid-input"
          type="number"
          id="total_annual_coverage"
          value={formData.total_annual_coverage}
          onChange={(e) =>
            setFormData({...formData, total_annual_coverage: e.target.value })
          }
        />
        <label  className="bid-label" htmlFor="bidInput">Accidental Emergencies:</label>
        <input
        className="bid-input"
          type="number"
          id="accidental_emergencies"
          value={formData.accidental_emergencies}
          onChange={(e) =>
            setFormData({...formData,  accidental_emergencies: e.target.value })
          }
        />

        <label className="bid-label" htmlFor="bidInput">Hospitalization Room Charges:</label>
        <input
        className="bid-input"
          type="number"
          id="hospitalization_room_charges"
          value={formData.hospitalization_room_charges}
          onChange={(e) =>
            setFormData({...formData,  hospitalization_room_charges: e.target.value })
          }
        />

        <label className="bid-label" htmlFor="bidInput">Dental and Vision Care:</label>
        <input
        className="bid-input"
          type="number"
          id="dental_and_vision_care"
          value={formData.dental_and_vision_care}
          onChange={(e) =>
            setFormData({...formData,  dental_and_vision_care: e.target.value })
          }
        />

        <label className="bid-label" htmlFor="bidInput">Other Medical Expenses:</label>
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
            <label className="bid-label" htmlFor="bidInput">Ambulance Services Expenses:</label>
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
            <label className="bid-label" htmlFor="bidInput">Surgery:</label>
            <input
            className="bid-input"
              type="number"
              id="surgery"
              value={formData.surgery}
              onChange={(e) => setFormData({...formData,  surgery: e.target.value })}
            />
          </>
        )}

        <label className="bid-label" htmlFor="bidInput">Enter Monthly Coverage:</label>
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
          <p>Monthly Coverage: {submittedData.monthly_coverage}</p>
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
