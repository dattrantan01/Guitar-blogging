import React from "react";
import { useAuth } from "../../contexts/auth-context";

const UserProfile = () => {
  const { userInfo } = useAuth();
  console.log(userInfo);
  return (
    <div>
      <div className="flex flex-row items-center gap-5">
        <div className="w-[200px] h-[200px]">
          <img
            src="https://images.unsplash.com/photo-1667976368812-31e7a836158b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div>
          <h1 className="dashboard-heading text-primary">
            {userInfo.displayName}
          </h1>
          <h2 className="text-2xl font-medium">{userInfo.email}</h2>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-2">
        <div className="flex flex-row gap-4 text-xl">
          <span className="font-semibold">Role:</span>
          <span>Admin</span>
        </div>
        <div className="flex flex-row gap-4 text-xl">
          <span className="font-semibold">Status:</span>
          <span>Active</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
