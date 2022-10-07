import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/layout/Header";
import { auth } from "../firebase-blog/firebase-config";

const HomePageStyle = styled.div``;

const HomePage = () => {
  // const navigate = useNavigate();
  // const handleSignOut = () => {
  //   signOut(auth);
  //   navigate("/sign-in");
  // };
  return (
    <HomePageStyle>
      <Header></Header>
    </HomePageStyle>
  );
};

export default HomePage;
