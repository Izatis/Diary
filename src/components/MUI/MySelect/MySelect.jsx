import React from "react";
import s from "./MySelect.module.scss";
import smile from "../../../assets/smile.png";

const MySelect = ({ options, ...props }) => {
  return (
    <select {...props}>
      <option value="default" style={{ fontSize: 30 }}>
      ☺
      </option>
      {options.map((option) => (
        <option key={option.id}>{option.mood}</option>
      ))}
    </select>
  );
};

export default MySelect;
