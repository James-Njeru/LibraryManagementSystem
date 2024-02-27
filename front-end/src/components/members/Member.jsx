import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Member() {
  const navigate = useNavigate();

  const [memberField, setmemberField] = useState({
    full_name: "",
    contact_number: "",
    email: "",
    address: "",
    outstanding_debt: "",
  });

  const changeMemberFieldHandler = (e) => {
    setmemberField({
      ...memberField,
      [e.target.name]: e.target.value,
    });
  };

  const [loading, setLoading] = useState();

  const onSubmitChange = async (e) => {
    e.preventDefault();
    try {
      const responce = await axios.post(
        "http://127.0.0.1:5000/member",
        memberField
      );
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return navigate("/member");
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h3>Add Member</h3>
          <form action="">
            <div className="mb-3 mt-3">
              <label className="form-label">Full Name:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Full Name"
                name="full_name"
                onChange={(e) => changeMemberFieldHandler(e)}
                required
              />
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                name="email"
                onChange={(e) => changeMemberFieldHandler(e)}
                required
              />
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Phone Number:</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                placeholder="Phone Number"
                name="contact_number"
                onChange={(e) => changeMemberFieldHandler(e)}
                required
              />
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Address:</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Address"
                name="address"
                onChange={(e) => changeMemberFieldHandler(e)}
                required
              />
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Outstanding Debt:</label>
              <input
                type="text"
                className="form-control"
                id="debt"
                placeholder="Outstanding Debt"
                name="outstanding_debt"
                onChange={(e) => changeMemberFieldHandler(e)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => onSubmitChange(e)}
            >
              Add Member
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Member;
