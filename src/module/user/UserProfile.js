import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";

const UserProfile = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  if (!userInfo) navigate("/sign-in");
  return (
    <div>
      <div className="flex flex-row items-center gap-5">
        <div className="w-[200px] h-[200px]">
          <img
            src={userInfo?.avatar}
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div>
          <h1 className="dashboard-heading text-primary">
            {userInfo?.displayName}
          </h1>
          <h2 className="text-2xl font-medium">{userInfo?.email}</h2>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-2">
        <div className="flex flex-row gap-4 text-xl">
          <span className="font-semibold">Role:</span>
          <span>{userInfo?.role === 1 ? "Admin" : "User"}</span>
        </div>
        <div className="flex flex-row gap-4 text-xl">
          <span className="font-semibold">Status:</span>
          <span>{userInfo?.status === true ? "Active" : "Unactive"}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
