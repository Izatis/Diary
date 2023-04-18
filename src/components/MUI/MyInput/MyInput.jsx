import React from "react";
import  s from "./MyInput.module.scss";

function MyInput({...props}) {
  return (
      <input className={s.myInput} type="text" {...props} required minLength={1}/>
  );
}

export default MyInput;
