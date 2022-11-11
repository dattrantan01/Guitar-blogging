import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../button/Button";
import { useAuth } from "../../contexts/auth-context";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase-blog/firebase-config";
const menuList = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/blog",
    title: "Blog",
  },
  {
    url: "/manage/user-profile",
    title: "Contact",
  },
];
const HeaderStyle = styled.header`
  padding: 15px 0;
  margin-bottom: 40px;
  .header-left {
    display: flex;
    align-items: center;
  }
  .logo-container {
    width: 60px;
    height: 60px;
    min-width: 60px;
    display: inline-block;
  }
  .logo {
    width: 100%;
    height: 100%;
  }
  .menu {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 40px;
    list-style: none;
    font-weight: 500;
  }

  .user {
    width: 60px;
    height: 60px;
    border-radius: 200px;
    margin-left: 20px;
    overflow: hidden;
  }
  .user-avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

//header cua homepage
const Header = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/sign-in");
  };
  const handleSignOut = () => {
    signOut(auth);
  };
  return (
    <HeaderStyle>
      <div className="container">
        <div className="header-left">
          <NavLink to={"/"} className="logo-container">
            <img src="/guitar.svg" alt="" className="logo" />
          </NavLink>
          <ul className="menu">
            {menuList.map((item) => {
              return (
                <li className="menu-item" key={item.title}>
                  <NavLink to={item.url} className="menu-link">
                    {item.title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <div className="ml-auto">{userInfo?.displayName}</div>
          {!userInfo?.email ? (
            <div className="search-button">
              <Button height="56px" onClick={handleNavigate}>
                Sign Up
              </Button>
            </div>
          ) : (
            <>
              <div className="user mr-8">
                <img src={userInfo?.avatar} alt="" className="user-avatar" />
              </div>
              <div
                className="rotate-180 cursor-position"
                onClick={handleSignOut}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </>
          )}
        </div>
      </div>
    </HeaderStyle>
  );
};

export default Header;
