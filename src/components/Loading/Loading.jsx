import React from "react";
import s from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className={s.loading}>
      <div></div>
      <h1>Загрузка</h1>
    </div>
  );
};

export default Loading;
