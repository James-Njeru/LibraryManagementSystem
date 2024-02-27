import React from "react";
import { Link } from "react-router-dom";
import {
  IoPeople,
  IoNewspaperOutline,
  IoSettingsOutline,
  IoRocketOutline,
} from "react-icons/io5";
import { AiOutlineDashboard } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { FaRegNewspaper, FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark h-100 w-25">
      <Link
        to={`/`}
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <CgProfile className="fs-4" />
        <span className="fs-4 ms-4">Profile</span>
      </Link>
      <hr />

      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item mb-2">
          <Link
            to={`#`}
            className="nav-link text-white d-flex align-items-center"
            aria-current="page"
          >
            <AiOutlineDashboard className="bi me-2 fs-5" />
            Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to={`/member`}
            className="nav-link active text-white d-flex align-items-center"
          >
            <IoPeople className="bi me-2 fs-5" />
            Members
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to={`/book`}
            className="nav-link text-white d-flex align-items-center"
          >
            <MdOutlineLibraryBooks className="bi me-2 fs-5" />
            Books
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to={`#`}
            className="nav-link text-white d-flex align-items-center"
          >
            <FaRegNewspaper className="bi me-2 fs-5" />
            Magazines
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to={`#`}
            className="nav-link text-white d-flex align-items-center"
          >
            <IoNewspaperOutline className="bi me-2 fs-5" />
            Newspapers
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to={`/issuebook`}
            className="nav-link text-white d-flex align-items-center"
          >
            <IoRocketOutline className="bi me-2 fs-5" />
            Issue Book
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to={`/returnbook`}
            className="nav-link text-white d-flex align-items-center"
          >
            <FaRegThumbsUp className="bi me-2 fs-5" />
            Return Book
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to={`#`}
            className="nav-link text-white d-flex align-items-center"
          >
            <FaRegThumbsDown className="bi me-2 fs-5" />
            Not Returned
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to={`#`}
            className="nav-link text-white d-flex align-items-center"
          >
            <IoSettingsOutline className="bi me-2 fs-5" />
            ACTIONS
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
