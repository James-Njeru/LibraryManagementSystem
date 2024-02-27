import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";

function BookList() {
  const [bookData, setBookData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios("http://127.0.0.1:5000/books");
      setBookData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchData = async () => {
    try {
      const result = await axios(
        "http://127.0.0.1:5000/searchby/" + wordEntered
      );
      setBookData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete("http://127.0.0.1:5000/deletebook/" + id);
    const newBookData = bookData.filter((item) => {
      return item.id !== id;
    });
    setBookData(newBookData);
  };

  const onClickHandler = () => {
    navigate("/addbook");
  };

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
  };

  return (
    <div>
      <div className="d-flex mb-4 align-items-center">
        <h3>Book Details</h3>
        <button
          type="button"
          className="btn btn-primary ms-4"
          onClick={onClickHandler}
        >
          Add Book
        </button>
        <div className="ms-4 input-group">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search by name/author"
            className="form-control"
            onChange={handleFilter}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={searchData}
          >
            <IoMdSearch />
          </button>
        </div>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>No.</th>
            <th>Book Title</th>
            <th>Author</th>
            <th>Quantity Available</th>
          </tr>
        </thead>
        <tbody>
          {bookData.map((book, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.quantity}</td>
                <td>
                  <NavLink
                    to={`/viewbook/${book.id}`}
                    className="btn btn-success mx-2"
                  >
                    View
                  </NavLink>
                  <NavLink
                    to={`/editbook/${book.id}`}
                    className="btn btn-info mx-2"
                  >
                    Edit
                  </NavLink>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(book.id)}
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

export default BookList;
