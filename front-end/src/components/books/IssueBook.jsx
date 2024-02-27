import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

function IssueBook() {
  const [memberData, setMemberData] = useState([]);
  const [bookData, setBookData] = useState([]);
  const [transactionField, setTransactionField] = useState({
    book_id: "",
    member_id: "",
    transaction_type: "",
    _date: "",
    rent_fee: "",
  });

  const navigate = useNavigate();
  let bookId = "";
  let memberId = "";
  let bookTitle = "Select Book";

  useEffect(() => {
    fetchMember();
    fetchBook();
  }, []);

  const fetchMember = async () => {
    try {
      const result = await axios("http://127.0.0.1:5000/membersdebt");
      setMemberData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBook = async () => {
    try {
      const result = await axios("http://127.0.0.1:5000/books");
      setBookData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const issueBook = async () => {
    console.log(transactionField);
    console.log("title: " + bookTitle);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/transaction",
        transactionField
      );
      alert("Book Issued");
    } catch (error) {
      console.log(error);
    }
  };

  const onClickHandler = () => {
    navigate("/addmember");
  };

  return (
    <div>
      <div className="d-flex mb-4">
        <h3>Issue Book To A Member</h3>
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
                <td className="d-flex">
                  <div className="dropdown">
                    <button
                      type="button"
                      id="booksDropDown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      className="btn btn-success dropdown-toggle"
                    >
                      {bookTitle}
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="booksDropDown"
                    >
                      {bookData.map((book, i) => {
                        return (
                          <li key={i}>
                            <label
                              className="dropdown-item"
                              onClick={() => {
                                setTransactionField({
                                  book_id: book.id,
                                  member_id: member.id,
                                  transaction_type: "issue",
                                  _date: new Date().toJSON().slice(0, 10),
                                  rent_fee: 0,
                                });
                                bookTitle = book.title;
                              }}
                            >
                              {book.title}
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <button className="btn btn-primary ms-2" onClick={issueBook}>
                    Issue Book
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

export default IssueBook;
