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
      <button onClick={onLogOutClick}>๋ก๊ทธ์์</button>
    </>
  );
};

export default Profile;
