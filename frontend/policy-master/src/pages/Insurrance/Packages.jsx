import axios from "axios";
import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "../Insurrance/Packages.css"

const Packages = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useNavigate();

  const filteredData = data.filter((item) =>
  item.case_id.toLowerCase().includes(searchTerm.toLowerCase())
);

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

<input
        type="text"
        placeholder="Search by Case ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    <table className="user-pack-table">
      <thead>
        <tr>
         
          <th>Case ID</th>
          <th>Company Name</th>
          <th>Accidental Emergencies</th>
          <th>Ambulance Expenses</th>
          <th>Dental and Vision</th>
          <th>Hospital Room Charges</th>
          <th>Monthly Coverage</th>
         <th>Status</th>
          <th></th>
         
        </tr>
      </thead>
      <tbody>
        {filteredData.map((data) => (

          <tr key={data.case_id}>
            {/* <td>{!data?.is_expired ? "active" : "expired"}</td> */}
            <td>{data.case_id}</td>
            <td>{data.company_name}</td>
            <td>{data.accidental_emergencies}</td>
            <td>{data.ambulance_services_expenses}</td>
            <td>{data.dental_and_vision_care}</td>
            <td>{data.hospitalization_room_charges}</td>
            <td>{data.monthly_coverage}</td>
            <td>{!data?.is_expired ? "active" : "expired"}</td>
            <td>
              <button className="bid-update" onClick={() => handleUpdate(data)}>
                Update
              </button>
            </td>
            <td>
              <div className="icon-container">
                <i className="fas fa-heart"></i>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  );
};

export default Packages;
