import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../button/Button";
import { useAuth } from "../../contexts/auth-context";
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
    url: "/#",
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

  .search {
    margin-left: auto;
    padding: 15px 35px 15px 25px;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 100%;
    max-width: 320px;
    display: flex;
    align-items: center;
    position: relative;
  }
  .search-input {
    flex: 1;
  }
  .search-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 15px;
  }
  .search-button {
    width: 150px;
    margin-left: 20px;
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
          <div className="search">
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
            />
            <span className="search-icon">
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="7.66669"
                  cy="7.05161"
                  rx="6.66669"
                  ry="6.05161"
                  stroke="#999999"
                  strokeWidth="1.5"
                />
                <path
                  d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
          {!userInfo?.email ? (
            <div className="search-button">
              <Button height="56px" onClick={handleNavigate}>
                Sign Up
              </Button>
            </div>
          ) : (
            <div className="user">
              <img
                src="https://images.unsplash.com/photo-1623794858380-804e97709693?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                alt=""
                className="user-avatar"
              />
            </div>
          )}
        </div>
      </div>
    </HeaderStyle>
  );
};

export default Header;
