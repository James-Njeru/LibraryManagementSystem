import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const clickToBackHandler = () => {
    navigate("/book");
  };

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

  useEffect(() => {
    fetchMember();
  }, [id]);

  const fetchMember = async () => {
    try {
      const result = await axios.get("http://127.0.0.1:5000/book/" + id);
      setBookField(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const changeBookFieldHandler = (e) => {
    setBookField({
      ...bookField,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitChange = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://127.0.0.1:5000/book/" + id, bookField);
      navigate("/book");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Edit Form</h1>
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
            value={bookField.title}
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
            value={bookField.author}
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
            value={bookField.isbn}
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
            value={bookField.description}
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
            value={bookField.publication_year}
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
            value={bookField.genre}
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
            value={bookField.publisher}
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
            value={bookField.quantity}
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
            value={bookField.available}
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

export default EditBook;
