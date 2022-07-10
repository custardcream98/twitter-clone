import React from "react";
import { useState } from "react";
import { dbService } from "firebaseInstance";
import { collection, addDoc } from "firebase/firestore";

const Home = () => {
  const [cweet, setCweet] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let doc = await addDoc(collection(dbService, "cweets"), {
        cweet: cweet,
        createdAt: Date.now(),
      });
      console.log(`${doc}문서 생성~!`);
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
          palceholder="트윗 내용을 입력해라"
          maxLength={120}
          onChange={onChange}
        ></input>
        <input type="submit" value="Cwitt" onClick={onSubmit}></input>
      </form>
    </div>
  );
};

export default Home;
