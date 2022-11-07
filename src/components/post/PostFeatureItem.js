import { data } from "autoprefixer";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../firebase-blog/firebase-config";
import PostCategory from "./PostCategory";
import PostMeta from "./PostMeta";
const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 169px;
  .post {
    &-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 16px;
    }
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background: linear-gradient(
        179.77deg,
        #6b6b6b 36.45%,
        rgba(163, 163, 163, 0.622265) 63.98%,
        rgba(255, 255, 255, 0) 99.8%
      );
      mix-blend-mode: multiply;
      opacity: 0.6;
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 16px;
    }

    &-title {
      font-weight: bold;
      line-height: 1.5;
      display: block;
      font-size: 22px;
      color: white;
    }
  }
  @media screen and (min-width: 1024px) {
    height: 272px;
  }
`;
const PostFeatureItem = ({ data }) => {
  const [category, setCategory] = useState({});
  const [user, setUser] = useState({});
  useEffect(() => {
    const cateFetch = async () => {
      const docRef = doc(db, "categories", data.category);
      const docSnap = await getDoc(docRef);
      setCategory(docSnap.data());
    };
    cateFetch();
  }, [data.category]);
  useEffect(() => {
    const userFetch = async () => {
      if (data.userId) {
        const docRef = doc(db, "users", data.userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.data()) {
          setUser(docSnap.data());
        }
      }
    };
    userFetch();
  }, [data.userId]);
  const date = () => {
    const date = new Date(data?.createdAt?.seconds * 1000);
    return new Date(date).toLocaleDateString("vi-VI");
  };
  return (
    <PostFeatureItemStyles>
      <img src={data.image} alt="" className="post-image" />
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          {category && (
            <>
              <PostCategory className="post-category">
                {category.name}
              </PostCategory>
              <PostMeta authorName={user.fullname} date={date()}></PostMeta>
            </>
          )}
        </div>
        <h3 className="post-title">{data.title}</h3>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
