import axios from "axios";
import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "../Insurrance/Packages.css"

const Packages = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigate();

  const handleUpdate = (payload) => {
    navigation("/bid", {
      state: {
        case_id: payload.case_id,
        case_user: payload.case_user,
        payload: payload,
      },
    });
  };

  useEffect(() => {
    let user = localStorage.getItem("user");
    let parsedPayload = JSON.parse(user);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/company_dashboard/list_company_packages/${parsedPayload.company_name}` //1b9dfc29d3ffa4ddf87ad27973808d5c82646a0cf2232e3396e765ad3ff17388/"
        );

        // Set the entire JSON object to data

        const { Packages } = response.data;
        setData(Packages);
        console.log("data", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.map((data) => (
        <div
          style={{ position: "relative" }}
          key={data.case_id}
          className="user-pack"
          
        >
          <span style={{ position: "absolute", top: 0, right: 10 }}>
            {!data?.is_expired ? "active" : "expired"}
          </span>
          <ul>
            <li className="case_id">CASE ID: {data.case_id}</li>
           
              <li className="age">Company Name: {data.company_name}</li>
              <li className="income">
                Accidental Emergencies: {data.accidental_emergencies}
              </li>
              <li className="income">
                Ambulance Expenses: {data.ambulance_services_expenses}
              </li>
            
              <li className="income">
                Dental and Vision: {data.dental_and_vision_care}
              </li>
           
            <li className="recommended">
              Hospital Room Charges: {data.hospitalization_room_charges}
            </li>
            <li className="recommended">
              Monthly Coverage: {data.monthly_coverage}
            </li>
          </ul>

          <button className="bid-place" onClick={() => handleUpdate(data)}>
            Update
          </button>

          <div className="icon-container">
            <i className="fas fa-heart"></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Packages;
