import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import bid from "../Insurrance/Bid.css";
import videomain from "../../image/mainvideo.mp4";
const Bid = () => {
  const [bidAmount, setBidAmount] = useState("");
  const location = useLocation().search;
  const case_id = new URLSearchParams(location).get("case_id");
  const Id = new URLSearchParams(location).get("id");
  const [data, setData] = useState(null);
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
    company_bid: 0,
    ambulance_services_expenses: 0,
    surgery: 0,
   
  });

  // useEffect(() => {
  //   let data = localStorage.getItem("auth");
  //   const parseData = JSON.parse(data);
  //   const id = parseData?.id;
  //   setId(id);
  // }, []);

  const handleBid = () => {
    
    // let payload = Object.assign(generatePlan(bidAmount),{
    //     company_id:1,
    //     company_name: "jubilee insurance",
    // })
    let temp = formData;
    if(plan_type === 'Basic'){
      delete temp.surgery;
      delete temp.ambulance_services_expenses
    }
    console.log("formData", temp);
    // axios
    //   .post(`http://127.0.0.1:8000/company_dashboard/send_packages/`, plan)
    //   .then((response) => {
    //     console.log("response", response.data);
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //   });
  };

  // function companyX(premium) {
  //   const coverage = Math.floor(premium * 40);

  //   let healthPackages;

  //   if (premium <= 32000) {
  //     healthPackages = {
  //       Plan_type: "Basic",
  //       total_annual_coverage: coverage,
  //       accidental_emergencies: Math.floor((25 / 100) * coverage),
  //       hospitalization_room_charges: Math.floor((25 / 100) * coverage),
  //       dental_and_vision_care: Math.floor((35 / 100) * coverage),
  //       other_medical_expenses: Math.floor((15 / 100) * coverage),
  //       case_id: case_id,
  //       company_id: id,
  //       company_name: "jubilee insurance",
  //       company_bid: bidAmount,
  //     };
  //   }

  //   if (premium >= 32000) {
  //     healthPackages = {
  //       Plan_type: "Premium",
  //       total_annual_coverage: coverage,
  //       accidental_emergencies: Math.floor((20 / 100) * coverage),
  //       ambulance_services_expenses: Math.floor((20 / 100) * coverage),
  //       hospitalization_room_charges: Math.floor((10 / 100) * coverage),
  //       surgery: Math.floor((15 / 100) * coverage),
  //       dental_and_vision_care: Math.floor((30 / 100) * coverage),
  //       other_medical_expenses: Math.floor((5 / 100) * coverage),
  //       case_id: case_id,
  //       company_id: id,
  //       company_name: "jubilee insurance",
  //       company_bid: bidAmount,
  //     };
  //   }

  //   return healthPackages;
  // }

  return (
    <main className="main">
      <video autoPlay loop muted id="video">
        {" "}
        <source src={videomain} type="video/mp4" />
      </video>

      <div className="bid_button">
        <label htmlFor="bidInput">Select Plan:</label>
        <select
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

        <label htmlFor="bidInput">Total Annual Coverage:</label>
        <input
          type="number"
          id="total_annual_coverage"
          value={formData.total_annual_coverage}
          onChange={(e) =>
            setFormData({...formData, total_annual_coverage: e.target.value })
          }
        />
        <label htmlFor="bidInput">Accidental Emergencies:</label>
        <input
          type="number"
          id="accidental_emergencies"
          value={formData.accidental_emergencies}
          onChange={(e) =>
            setFormData({...formData,  accidental_emergencies: e.target.value })
          }
        />

        <label htmlFor="bidInput">Hospitalization Room Charges:</label>
        <input
          type="number"
          id="hospitalization_room_charges"
          value={formData.hospitalization_room_charges}
          onChange={(e) =>
            setFormData({...formData,  hospitalization_room_charges: e.target.value })
          }
        />

        <label htmlFor="bidInput">Hospitalization Room Charges:</label>
        <input
          type="number"
          id="dental_and_vision_care"
          value={formData.dental_and_vision_care}
          onChange={(e) =>
            setFormData({...formData,  dental_and_vision_care: e.target.value })
          }
        />

        <label htmlFor="bidInput">Other Medical Expenses:</label>
        <input
          type="number"
          id="other_medical_expenses"
          value={formData.other_medical_expenses}
          onChange={(e) =>
            setFormData({...formData,  other_medical_expenses: e.target.value })
          }
        />
        {plan_type === "Premium" && (
          <>
            <label htmlFor="bidInput">Ambulance Services Expenses:</label>
            <input
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
            <label htmlFor="bidInput">Surgery:</label>
            <input
              type="number"
              id="surgery"
              value={formData.surgery}
              onChange={(e) => setFormData({...formData,  surgery: e.target.value })}
            />
          </>
        )}

        <label htmlFor="bidInput">Enter Bid Amount:</label>
        <input
          type="number"
          id="bidInput"
          value={formData.company_bid}
          onChange={(e) => setFormData({...formData,  company_bid: e.target.value })}
        />
        <button onClick={handleBid}>Place Bid</button>
      </div>
    </main>
  );
};

export default Bid;
