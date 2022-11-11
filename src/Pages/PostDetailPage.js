import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import PostCategory from "../components/post/PostCategory";
import PostMeta from "../components/post/PostMeta";
import { db } from "../firebase-blog/firebase-config";
import parse from "html-react-parser";
const PostDetailsPageStyles = styled.div`
  padding-bottom: 100px;
  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 16px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }
  .author {
    margin-top: 40px;
    margin-bottom: 80px;
    display: flex;
    border-radius: 20px;
    background-color: ${(props) => props.theme.grayF3};
    &-image {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      border-radius: inherit;
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
      padding: 20px;
    }
    &-name {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
    }
    @media screen and (max-width: 1023.98px) {
      padding-bottom: 40px;
      .post {
        &-header {
          flex-direction: column;
        }
        &-feature {
          height: auto;
        }
        &-heading {
          font-size: 26px;
        }
        &-content {
          margin: 40px 0;
        }
      }
      .author {
        flex-direction: column;
        &-image {
          width: 100%;
          height: auto;
        }
      }
    }
  }
`;

const PostDetailsPage = () => {
  const [postDetail, setPostDetail] = useState();

  const param = useParams();
  const id = param.id;

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      const colRef = doc(db, "posts", id);
      const postData = await getDoc(colRef);
      setPostDetail(postData.data());
      console.log("data", postData.data());
    };
    fetchData();
  }, [setPostDetail, id]);
  const dateCreated = () => {
    const dateMeta = new Date(postDetail?.createdAt.seconds * 1000);
    return new Date(dateMeta).toLocaleDateString("vi-VI");
  };

  return (
    <PostDetailsPageStyles>
      <Layout>
        <div className="container">
          <div className="post-header">
            <img src={postDetail?.image} className="post-feature" alt="" />
            <div className="post-info">
              <PostCategory className="mb-6">
                {postDetail?.category.name}
              </PostCategory>
              <h1 className="post-heading">{postDetail?.title}</h1>
              <PostMeta
                authorName={postDetail?.userId.name}
                date={dateCreated()}
              ></PostMeta>
            </div>
          </div>
          <div className="post-content">
            <div className="entry-content">
              {parse(postDetail?.content || "")}
            </div>
            <div className="author">
              <div className="author-content">
                <h3 className="author-name">{postDetail?.userId.name}</h3>
                <p className="author-desc">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Dignissimos non animi porro voluptates quibusdam optio nulla
                  quis nihil ipsa error delectus temporibus nesciunt, nam
                  officiis adipisci suscipit voluptate eum totam!
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </PostDetailsPageStyles>
  );
};

export default PostDetailsPage;
