import React from "react";
import s from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className={s.loading}>
      <div className={s.loading__content}></div>
      <h2>Загрузка</h2>
    </div>
  );
};

export default Loading;
