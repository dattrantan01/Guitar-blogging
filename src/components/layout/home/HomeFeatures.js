import React from "react";
import styled from "styled-components";
import PostFeatureItem from "../../post/PostFeatureItem";
import Heading from "../Heading";
const HomeFeatureStyles = styled.div``;

const HomeFeatures = () => {
  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <Heading>Bài viết nổi bật</Heading>
        <div className="grid-layout">
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeatures;
