import React, { useEffect } from "react";
import { useState } from "react";
import { dbService } from "firebaseInstance";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Home = ({ userObj }) => {
  const [cweet, setCweet] = useState("");
  const [cweets, setCweets] = useState([]);

  const getCweets = async () => {
    const dbCweets = await getDocs(collection(dbService, "cweets"));
    dbCweets.docs.map((tweet) => {
      const tweetObj = {
        ...tweet.data(),
        id: tweet.id,
      };
      setCweets((priv) => [tweetObj, ...priv]);
    });
  };

  useEffect(() => {
    getCweets();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(dbService, "cweets"), {
        cweet: cweet,
        createdAt: Date.now(),
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
          palceholder="트윗 내용을 입력해라"
          maxLength={120}
          onChange={onChange}
        ></input>
        <input type="submit" value="Cwitt" onClick={onSubmit}></input>
      </form>
      <div>
        {cweets.map((cweet) => (
          <div key={cweet.id}>
            <h4>{cweet.cweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
