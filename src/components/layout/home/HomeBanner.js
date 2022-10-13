import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../button/Button";

const HomeBannerStyle = styled.div`
  height: 500px;
  margin-bottom: 60px;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  .banner-container {
    height: 100%;
  }
  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .banner-content {
    max-width: 500px;
    color: white;
  }
  .banner-image {
    width: 300px;
    height: 300px;
  }
  .banner-logo {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .banner-heading {
    margin-bottom: 30px;
    font-size: 40px;
    font-weight: 600;
  }
  .banner-desc {
    line-height: 1.75;
    margin-bottom: 30px;
  }
  .button-container {
    max-width: 250px;
  }
`;
const HomeBanner = () => {
  const navigate = useNavigate();
  return (
    <HomeBannerStyle>
      <div className="container banner-container">
        <div className="banner">
          <div className="banner-content">
            <h1 className="banner-heading">Blogging</h1>
            <p className="banner-desc">
              lorem ipsum dolor sit amet, consectet lorem ipsum dolor sit amet,
              consectet lorem ipsum dolor sit amet, consectet lorem ipsum dolor
              sit amet, consectet lorem ipsum dolor sit amet, consectet
            </p>
            <div className="button-container">
              <Button
                style={{
                  backgroundColor: "#FFFFFF",
                  backgroundImage: "none",
                  color: "#2EBAC1",
                }}
                onClick={() => navigate("/")}
              >
                Get started
              </Button>
            </div>
          </div>
          <div className="banner-image">
            <img src="/guitar.svg" alt="" className="banner-logo" />
          </div>
        </div>
      </div>
    </HomeBannerStyle>
  );
};

export default HomeBanner;
