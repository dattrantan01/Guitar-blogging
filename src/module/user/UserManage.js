import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import TableWithData from "../../components/table/TableWithData";
import { db } from "../../firebase-blog/firebase-config";

const UserManage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          //   avatar: doc.data().avatar,
          avatar: (
            <img
              src={doc.data().avatar}
              alt=""
              className="w-[60px] h-[60px] rounded-full"
            />
          ),
          email: doc.data().email,
          fullname: doc.data().fullname,
          status: doc.data().status,
          role: doc.data().role === 1 ? "Admin" : "User",
        });
      });
      setUsers(result);
    });
  }, []);
  const headerTable = ["Avatar", "Email", "Full Name", "Status", "Role"];
  const handleDeleteCategory = () => {};
  return (
    <div>
      <div className="flex flex-row justify-between mb-8">
        <h1 className="dashboard-heading ">Manage Users</h1>
        <div className="max-w-[400px]">
          <Button onClick={() => navigate("/manage/user-profile")}>
            Profile
          </Button>
        </div>
      </div>
      <TableWithData
        head={headerTable}
        data={users}
        handleDelete={handleDeleteCategory}
        linkTo="/manage/update-user?id="
      ></TableWithData>
    </div>
  );
};

export default UserManage;
