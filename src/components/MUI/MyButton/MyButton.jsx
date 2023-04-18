import React from "react";
import { Button } from "@mui/material";
import s from "./MyButton.module.scss";
import cn from "classnames";

const MyButton = ({ className, text, img, ...props }) => {
  return (
    <Button className={cn(s.myBtn, className)} variant="contained" {...props}>
      <img src={img} alt={text} />
      <span>{text}</span>
    </Button>
  );
};

export default MyButton;
