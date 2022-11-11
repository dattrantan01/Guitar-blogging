import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../contexts/auth-context";
import Button from "../button/Button";
const DashboardHeaderStyles = styled.div`
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  .header-button {
    max-width: 250px;
  }
  .header-avatar {
    width: 52px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }
`;

const DashboardHeader = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  return (
    <DashboardHeaderStyles>
      <Button
        onClick={() => navigate("/manage/add-post")}
        className="header-button"
        height="52px"
      >
        Write new post
      </Button>
      <div className="header-avatar">
        <img src={userInfo?.avatar} alt="" />
      </div>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;
