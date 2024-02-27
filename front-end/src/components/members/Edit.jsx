import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const clickToBackHandler = () => {
    navigate("/member");
  };

  const [memberField, setmemberField] = useState({
    full_name: "",
    contact_number: "",
    email: "",
    address: "",
    outstanding_debt: "",
  });

  useEffect(() => {
    fetchMember();
  }, [id]);

  const fetchMember = async () => {
    try {
      const result = await axios.get("http://127.0.0.1:5000/member/" + id);
      setmemberField(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const changeMemberFieldHandler = (e) => {
    setmemberField({
      ...memberField,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitChange = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://127.0.0.1:5000/member/" + id, memberField);
      navigate("/member");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Edit Form</h1>
      <form action="">
        <div className="mb-3 mt-3">
          <label className="form-label">Full Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Full Name"
            name="full_name"
            value={memberField.full_name}
            onChange={(e) => changeMemberFieldHandler(e)}
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
            value={memberField.email}
            onChange={(e) => changeMemberFieldHandler(e)}
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
            value={memberField.contact_number}
            onChange={(e) => changeMemberFieldHandler(e)}
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
            value={memberField.address}
            onChange={(e) => changeMemberFieldHandler(e)}
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
            value={memberField.outstanding_debt}
            onChange={(e) => changeMemberFieldHandler(e)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => onSubmitChange(e)}
        >
          Update
        </button>
      </form>
      <div className="container d-flex justify-content-center mt-4">
        <button className="btn btn-primary" onClick={clickToBackHandler}>
          Back To Home
        </button>
      </div>
    </div>
  );
}

export default Edit;
