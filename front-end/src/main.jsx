import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Member from "./components/members/Member.jsx";
import View from "./components/members/View.jsx";
import Edit from "./components/members/Edit.jsx";
import List from "./components/members/List.jsx";
import ViewBook from "./components/books/ViewBook.jsx";
import BookList from "./components/books/BookList.jsx";
import Books from "./components/books/Books.jsx";
import EditBook from "./components/books/EditBook.jsx";
import IssueBook from "./components/books/IssueBook.jsx";
import ReturnBook from "./components/books/ReturnBook.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: "error",
    children: [
      {
        path: "/member",
        element: <List />,
      },
      {
        path: "/view/:id",
        element: <View />,
      },
      {
        path: "/edit/:id",
        element: <Edit />,
      },
      {
        path: "/addmember",
        element: <Member />,
      },
      {
        path: "/book",
        element: <BookList />,
      },
      {
        path: "/viewbook/:id",
        element: <ViewBook />,
      },
      {
        path: "/editbook/:id",
        element: <EditBook />,
      },
      {
        path: "/addbook",
        element: <Books />,
      },
      {
        path: "/issuebook",
        element: <IssueBook />,
      },
      {
        path: "/returnbook",
        element: <ReturnBook />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
