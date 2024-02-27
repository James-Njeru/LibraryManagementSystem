import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ViewBook() {
  const { id } = useParams();

  const [book, setBook] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const result = await axios.get("http://127.0.0.1:5000/book/" + id);
      setBook(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const clickToBackHandler = () => {
    navigate("/book");
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Book Details</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Book Title</th>
                  <th>Author</th>
                  <th>Quantity Available</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.quantity}</td>
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

export default ViewBook;
