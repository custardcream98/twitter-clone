import { React, useEffect, useState } from "react";

import { authInstance } from "firebaseInstance";
import AppRouter from "components/Router";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authInstance.currentUser);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authInstance.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "로딩중"
      )}
      <footer>&copy; Cwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
