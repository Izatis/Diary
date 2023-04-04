import React from "react";
import { Button } from "@mui/material";
import s from "./MyButton.module.scss";
import cn from 'classnames'

const MyButton = ({ text, img, ...props }) => {
  return (
    <Button variant="contained" {...props}>
      <img src={img} alt={text} />
      <span>{text}</span>
    </Button>
  );
};

export default MyButton;
