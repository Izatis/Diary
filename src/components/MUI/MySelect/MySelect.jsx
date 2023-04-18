import React from "react";
import s from "./MySelect.module.scss";

const MySelect = ({ options, ...props }) => {
  return (
    <select className={s.mySelect} {...props}>
      <option style={{ fontSize: 30 }} value="default" disabled>
        ☺
      </option>
      {options.map((option) => (
        <option key={option.id}>{option.mood}</option>
      ))}
    </select>
  );
};

export default MySelect;
