import React, { useState } from "react";

const Input = ({ onTaskCreate }) => {
  const [text, setText] = useState("");
  const handleOnchange = (event) => {
    setText(event.target.value);
  };
  const handleClick = () => {
    onTaskCreate(text);
    // console.log(item);
  };
  return (
    <>
      <input
        type="text"
        value={text}
        onChange={handleOnchange}
        placeholder="Write Here"
      />
      <button className="add" onClick={handleClick}>+</button>
    </>
  );
};

export default Input;