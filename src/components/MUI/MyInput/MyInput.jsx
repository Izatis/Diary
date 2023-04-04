import React from "react";
import "./MyInput.module.scss";

function MyInput({...props}) {
  return (
      <input type="text" {...props} required minLength={1}/>
  );
}

export default MyInput;
