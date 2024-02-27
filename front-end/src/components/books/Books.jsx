import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Books() {
  const navigate = useNavigate();

  const [bookField, setBookField] = useState({
    title: "",
    author: "",
    isbn: "",
    description: "",
    publication_year: "",
    genre: "",
    publisher: "",
    quantity: "",
    available: "",
  });

  const changeBookFieldHandler = (e) => {
    setBookField({
      ...bookField,
      [e.target.name]: e.target.value,
    });
  };

  const [loading, setLoading] = useState();

  const onSubmitChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/book",
        bookField
      );
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return navigate("/book");
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h3>Add Book</h3>
          <form action="">
            <div className="mb-3 mt-3">
              <label className="form-label">Book Title:</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Book Title"
                name="title"
                onChange={(e) => changeBookFieldHandler(e)}
                required
              />
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Author:</label>
              <input
                type="text"
                className="form-control"
                id="author"
                placeholder="Author"
                name="author"
                onChange={(e) => changeBookFieldHandler(e)}
                required
              />
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Isbn:</label>
              <input
                type="text"
                className="form-control"
                id="isbn"
                placeholder="Isbn"
                name="isbn"
                onChange={(e) => changeBookFieldHandler(e)}
                required
              />
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Description:</label>
              <input
                type="text"
                className="form-control"
                id="description"
                placeholder="Description"
                name="description"
                onChange={(e) => changeBookFieldHandler(e)}
                required
              />
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Year of Publication:</label>
              <input
                type="text"
                className="form-control"
                id="publication_year"
                placeholder="Year of Publication"
                name="publication_year"
                onChange={(e) => changeBookFieldHandler(e)}
                required
              />
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Genre:</label>
              <input
                type="text"
                className="form-control"
                id="genre"
                placeholder="Genre"
                name="genre"
                onChange={(e) => changeBookFieldHandler(e)}
                required
              />
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Publisher:</label>
              <input
                type="text"
                className="form-control"
                id="publisher"
                placeholder="Publisher"
                name="publisher"
                onChange={(e) => changeBookFieldHandler(e)}
                required
              />
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Quantity:</label>
              <input
                type="text"
                className="form-control"
                id="quantity"
                placeholder="Quantity"
                name="quantity"
                onChange={(e) => changeBookFieldHandler(e)}
              />
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Available for rent:</label>
              <input
                type="text"
                className="form-control"
                id="available"
                placeholder="Available for rent"
                name="available"
                onChange={(e) => changeBookFieldHandler(e)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => onSubmitChange(e)}
            >
              Add Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Books;
