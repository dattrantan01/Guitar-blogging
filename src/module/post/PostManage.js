import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/button/Button";
import TableWithData from "../../components/table/TableWithData";
import { db } from "../../firebase-blog/firebase-config";

const PostManage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    onSnapshot(colRef, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          title: doc.data().title,
          slug: doc.data().slug,
          user: doc.data().userId.name,
          status: doc.data().status,
          hot: doc.data().hot,
        });
      });
      setPosts(result);
    });
  }, []);
  const headerTable = ["Title", "Slug", "Author", "Status", "Feature Post"];
  const handleDeleteCategory = async (id) => {
    const colRef = doc(db, "posts", id);
    await deleteDoc(colRef);
    toast.success("Delete success");
  };
  return (
    <div>
      <div className="flex flex-row justify-between mb-8">
        <h1 className="dashboard-heading ">Manage Posts</h1>
        <div className="max-w-[400px]">
          <Button onClick={() => navigate("/manage/add-post")}>Add post</Button>
        </div>
      </div>
      <TableWithData
        head={headerTable}
        data={posts}
        handleDelete={handleDeleteCategory}
        linkTo="/manage/update-post?id="
        routeToDetail={true}
      ></TableWithData>
    </div>
  );
};

export default PostManage;
