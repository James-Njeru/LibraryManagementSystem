import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

function List() {
  const [memberData, setMemberData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios("http://127.0.0.1:5000/members");
      setMemberData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete("http://127.0.0.1:5000/deletemember/" + id);
    const newMemberData = memberData.filter((item) => {
      return item.id !== id;
    });
    setMemberData(newMemberData);
  };

  const onClickHandler = () => {
    navigate("/addmember");
  };

  return (
    <div>
      <div className="d-flex mb-4">
        <h3>Member Details</h3>
        <button
          type="button"
          className="btn btn-primary ms-4"
          onClick={onClickHandler}
        >
          Add Member
        </button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>No.</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Outstanding Debt</th>
          </tr>
        </thead>
        <tbody>
          {memberData.map((member, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{member.full_name}</td>
                <td>{member.email}</td>
                <td>{member.outstanding_debt}</td>
                <td>
                  <NavLink
                    to={`/view/${member.id}`}
                    className="btn btn-success mx-2"
                  >
                    View
                  </NavLink>
                  <NavLink
                    to={`/edit/${member.id}`}
                    className="btn btn-info mx-2"
                  >
                    Edit
                  </NavLink>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(member.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default List;
