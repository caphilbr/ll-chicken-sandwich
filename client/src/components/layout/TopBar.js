import React from "react";
import { Link, useParams } from "react-router-dom";

import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const { id } = useParams()
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link className="bold" to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button bold">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="profile-page">
        <Link className="bold" to={`/user-profile`}>Profile page</Link>
    </li>,
    <li key="sign-out">
      <SignOutButton />
    </li>
  ];

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li>
            <Link className="bold" to="/">Home</Link>
          </li>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
