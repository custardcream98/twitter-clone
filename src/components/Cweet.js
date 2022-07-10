import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { dbService } from "firebaseInstance";

const Cweet = ({ cweetObj, isOwner }) => {
  const [edting, setEdting] = useState(false);
  const [newCweet, setNewCweet] = useState(cweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("정말 지워요?");
    if (ok) {
      await deleteDoc(doc(dbService, `cweets/${cweetObj.id}`));
    }
  };

  const toggleEdting = () => setEdting((priv) => !priv);

  const onSubmit = (event) => {
    event.preventDefault();
    updateDoc(doc(dbService, `cweets/${cweetObj.id}`), {
      text: newCweet,
    });
    setEdting(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewCweet(value);
  };

  return (
    <div>
      {edting ? (
        <>
          <form onSubmit={onSubmit}>
            <input type="text" value={newCweet} onChange={onChange} required />
            <input type="submit" value="수정하기" />
          </form>
          <button onClick={toggleEdting}>취소</button>
        </>
      ) : (
        <>
          <h4>{cweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={toggleEdting}>수정하기</button>
              <button onClick={onDeleteClick}>지우기</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Cweet;
