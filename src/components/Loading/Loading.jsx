import React, { useContext } from "react";
import s from "./Loading.module.scss";
import cn from "classnames";
import { AddContext } from "../../pages/AddContext/AddContext";

const Loading = ({ ...props }) => {
  // Состояние - для  загрузки, (общий)
  const { isLoading } = useContext(AddContext);
  return (
    <div
      className={
        isLoading ? cn(s.lds_circle, s.lds_circle_active) : s.lds_circle
      }
      {...props}
    >
      <div></div>
      <h1>Загрузка</h1>
    </div>
  );
};

export default Loading;
