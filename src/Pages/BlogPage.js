import { collection, onSnapshot } from "firebase/firestore";
import React, { useMemo } from "react";
import { useEffect } from "react";

import { useState } from "react";
import Layout from "../components/layout/Layout";
import PostItem from "../components/post/PostItem";
import { db } from "../firebase-blog/firebase-config";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

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

  const results = useMemo(
    () =>
      posts.filter((post) => {
        return (
          post.title.toLowerCase().includes(search) ||
          post.userId.name.toLowerCase().includes(search)
        );
      }),
    [search, posts]
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <Layout>
        <div className="container">
          <input
            type="text"
            onChange={handleSearch}
            value={search}
            className="w-full  border-2 border-purple-500 px-5 py-4 rounded-xl"
            placeholder="Search posts..."
          />
          <div className="grid grid-cols-3 mt-10 gap-5">
            {results.map((post) => (
              <PostItem key={post.id} id={post.id} data={post}></PostItem>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default BlogPage;
