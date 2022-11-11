import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../../firebase-blog/firebase-config";
import PostItem from "../../post/PostItem";
import PostNewestItem from "../../post/PostNewestItem";
import PostNewestLarge from "../../post/PostNewestLarge";
import Heading from "../Heading";

const HomeNewestStyles = styled.div`
  .layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 40px;
    margin-bottom: 64px;
    align-items: start;
  }
  .sidebar {
    padding: 28px 20px;
    background-color: #f3edff;
    border-radius: 16px;
  }
`;
const HomeNewest = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    onSnapshot(colRef, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(result);
    });
  }, []);

  return (
    <HomeNewestStyles className="home-block">
      <div className="container">
        <Heading>Bài viết cũ hơn</Heading>

        <div className="grid-layout grid-layout--primary">
          {posts.map((post) => (
            <PostItem key={post.id} id={post.id} data={post}></PostItem>
          ))}
        </div>
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewest;
