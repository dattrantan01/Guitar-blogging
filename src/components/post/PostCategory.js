import React from "react";
import styled, { css } from "styled-components";

const PostCatergoryStyle = styled.div`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 10px;
  color: ${(props) => props.theme.gray6B};
  font-size: 14px;
  font-weight: 600;
  background-color: #f3edff;
  margin-bottom: 16px;
  ${(props) =>
    props.type === "prirmary" &&
    css`
      background-color: ${(props) => props.theme.grayF3}; ;
    `};
  ${(props) =>
    props.type === "secondary" &&
    css`
      background-color: white;
    `};
`;

const PostCategory = ({ children, type = "primary", className = "" }) => {
  return (
    <PostCatergoryStyle type={type} className={className}>
      {children}
    </PostCatergoryStyle>
  );
};

export default PostCategory;
