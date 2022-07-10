import React, { useEffect } from "react";
import { useState } from "react";
import { dbService } from "firebaseInstance";
import Cweet from "components/Cweet";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

const Home = ({ userObj }) => {
  const [cweet, setCweet] = useState("");
  const [cweets, setCweets] = useState([]);

  useEffect(() => {
    onSnapshot(collection(dbService, "cweets"), (snapshot) => {
      let cweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      cweetArr.sort((a, b) => b.createdAt - a.createdAt);
      setCweets(cweetArr);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(dbService, "cweets"), {
        text: cweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
    } catch (e) {
      console.log(e.message);
    }
    setCweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setCweet(value);
  };
  return (
    <div>
      <form>
        <input
          value={cweet}
          type="text"
          placeholder="트윗 내용을 입력해라"
          maxLength={120}
          onChange={onChange}
        ></input>
        <input type="submit" value="Cwitt" onClick={onSubmit}></input>
      </form>
      <div>
        {cweets.map((cweet) => (
          <Cweet
            key={cweet.id}
            cweetObj={cweet}
            isOwner={cweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
