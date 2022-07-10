import React from "react";
import { useNavigate } from "react-router-dom";
import { authInstance } from "firebaseInstance";

const Profile = () => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authInstance.signOut();
    navigate("/", { replace: true });
  };
  return (
    <>
      <button onClick={onLogOutClick}>로그아웃</button>
    </>
  );
};

export default Profile;
