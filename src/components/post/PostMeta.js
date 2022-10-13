import React from "react";
import styled from "styled-components";

const PostMetaStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;
  color: inherit;
  .post-dot {
    display: inline-block;
    width: 4px;
    height: 4px;
    background-color: currentColor;
    border-radius: 100rem;
  }
`;
const PostMeta = ({ authorName = "Tran Dat", date = "Jan 22", className }) => {
  return (
    <PostMetaStyle className={className}>
      <span className="post-time">{date}</span>
      <span className="post-dot"></span>
      <span className="post-author">{authorName}</span>
    </PostMetaStyle>
  );
};

export default PostMeta;
