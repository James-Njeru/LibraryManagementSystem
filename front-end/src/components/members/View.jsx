import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function View() {
  const { id } = useParams();

  const [member, setMember] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMember();
  }, [id]);

  const fetchMember = async () => {
    try {
      const result = await axios.get("http://127.0.0.1:5000/member/" + id);
      setMember(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const clickToBackHandler = () => {
    navigate("/member");
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Member Details</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Outstanding Debt</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{member.id}</td>
                  <td>{member.full_name}</td>
                  <td>{member.email}</td>
                  <td>{member.outstanding_debt}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="container d-flex justify-content-center">
        <div>
          <button className="btn btn-primary" onClick={clickToBackHandler}>
            Back To Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default View;
