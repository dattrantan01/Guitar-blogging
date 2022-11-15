import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/button/Button";
import TableWithData from "../components/table/TableWithData";
import { useAuth } from "../contexts/auth-context";
import { db } from "../firebase-blog/firebase-config";

const DashboardPage = () => {
  const [posts, setPosts] = useState([]);
  const { userInfo } = useAuth();
  const id = userInfo.uid || "";
  const navigate = useNavigate();
  const headerTable = ["Title", "Slug", "Author", "Status", "Feature Post"];
  useEffect(() => {
    const q = query(collection(db, "posts"), where("userId.id", "==", id));
    let result = [];
    getDocs(q).then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.data());
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
  }, [id]);
  console.log(posts);
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

export default DashboardPage;
