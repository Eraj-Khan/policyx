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
  const [id, setId] = useState("");

  useEffect(() => {
    let data = localStorage.getItem("auth");
    const parseData = JSON.parse(data);
    const id = parseData?.id;
    setId(id);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/company_dashboard/list_packages_and_bids/${case_id}` //1b9dfc29d3ffa4ddf87ad27973808d5c82646a0cf2232e3396e765ad3ff17388/"
        );

        // Set the entire JSON object to data
        setData(response.data);
        console.log("data", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleBid = () => {
    let plan = companyX(bidAmount);
    // let payload = Object.assign(generatePlan(bidAmount),{
    //     company_id:1,
    //     company_name: "jubilee insurance",
    // })
    console.log("location", plan);
    axios
      .post(`http://127.0.0.1:8000/company_dashboard/send_packages/`, plan)
      .then((response) => {
        console.log("response", response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  // useEffect(() => {

  console.log("Bid placed (after state update):", bidAmount);
  // }, [bidAmount]);
  function companyX(premium) {
    const coverage = Math.floor(premium * 40);

    let healthPackages;

    if (premium <= 32000) {
      healthPackages = {
        Plan_type: "Basic",
        total_annual_coverage: coverage,
        accidental_emergencies: Math.floor((25 / 100) * coverage),
        hospitalization_room_charges: Math.floor((25 / 100) * coverage),
        dental_and_vision_care: Math.floor((35 / 100) * coverage),
        other_medical_expenses: Math.floor((15 / 100) * coverage),
        case_id: case_id,
        company_id: id,
        company_name: "jubilee insurance",
        company_bid: bidAmount,
        package_id: 5,
      };
    }

    if (premium >= 32000) {
      healthPackages = {
        Plan_type: "Premium",
        total_annual_coverage: coverage,
        accidental_emergencies: Math.floor((20 / 100) * coverage),
        ambulance_services_expenses: Math.floor((20 / 100) * coverage),
        hospitalization_room_charges: Math.floor((10 / 100) * coverage),
        surgery: Math.floor((15 / 100) * coverage),
        dental_and_vision_care: Math.floor((30 / 100) * coverage),
        other_medical_expenses: Math.floor((5 / 100) * coverage),
        case_id: case_id,
        company_id: id,
        company_name: "jubilee insurance",
        company_bid: bidAmount,
        package_id: 6,
      };
    }

    return healthPackages;
  }

  function generatePlan(premium) {
    const xResult = companyX(premium);

    console.log("Company X:", xResult);
  }

  return (
    <main className="main">
        
      <video autoPlay loop muted id='video'>
        {" "}
        <source src={videomain} type="video/mp4" />
      </video>
      
      <div className="bid_button">
        <label htmlFor="bidInput">Enter Bid Amount:</label>
        <input
          type="number"
          id="bidInput"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
        />
        <button onClick={handleBid}>Place Bid</button>
      </div>
    </main>
  );
};

export default Bid;
