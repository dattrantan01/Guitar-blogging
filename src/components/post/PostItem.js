import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostMeta from "./PostMeta";
const PostItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  filter: drop-shadow(0 35px 35px rgba(0, 0, 0, 0.25));
  cursor: pointer;
  .post {
    &-image {
      height: 202px;
      margin-bottom: 20px;
      display: block;
      width: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 16px;
      }
    }

    &-info {
      color: #6b6b6b;
      margin-top: auto;
    }

    &-title {
      font-weight: bold;
      line-height: 1.5;
      display: block;
      font-size: 18px;
      margin-bottom: 8px;
    }
  }
`;

const PostItem = ({ data, id }) => {
  const navigate = useNavigate();
  const date = () => {
    const date = new Date(data?.createdAt?.seconds * 1000);
    return new Date(date).toLocaleDateString("vi-VI");
  };
  return (
    <PostItemStyles onClick={() => navigate(`/${id}`)}>
      <div className="post-image">
        <img src={data?.image} alt="" />
      </div>
      <PostCategory>{data?.category?.name}</PostCategory>
      <h3 className="post-title">{data?.title}</h3>
      <PostMeta
        className="post-info"
        date={date()}
        authorName={data?.userId?.name}
      ></PostMeta>
    </PostItemStyles>
  );
};

export default PostItem;
