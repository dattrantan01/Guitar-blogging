import React from "react";

import styled from "styled-components";

import HomeBanner from "../components/layout/home/HomeBanner";
import HomeFeatures from "../components/layout/home/HomeFeatures";
import HomeNewest from "../components/layout/home/HomeNewest";
import Layout from "../components/layout/Layout";

const HomePageStyle = styled.div``;

const HomePage = () => {
  // const navigate = useNavigate();
  // const handleSignOut = () => {
  //   signOut(auth);
  //   navigate("/sign-in");
  // };
  return (
    <HomePageStyle>
      <Layout>
        <HomeBanner></HomeBanner>
        <HomeFeatures></HomeFeatures>
        <HomeNewest></HomeNewest>
      </Layout>
    </HomePageStyle>
  );
};

export default HomePage;
