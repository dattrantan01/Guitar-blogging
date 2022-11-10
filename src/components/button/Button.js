import React from "react";
import styled from "styled-components";
import LoadingSpinner from "../loading/LoadingSpinner";

const ButtonStyle = styled.button`
  cursor: pointer;
  padding: 0 25px;
  height: ${(props) => props.height || "70px"};
  line-height: 1px;
  color: white;
  border-radius: 8px;
  font-weight: 600;
  font-size: 18px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const Button = ({
  type = "button",
  onClick = () => {},
  children,
  ...props
}) => {
  const { isLoading } = props;
  const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  return (
    <ButtonStyle type={type} onClick={onClick} {...props}>
      {child}
    </ButtonStyle>
  );
};

export default Button;
