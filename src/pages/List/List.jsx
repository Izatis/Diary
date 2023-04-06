import React from "react";
import s from "./List.module.scss";
import Card from "../../components/Card/Card";

const List = ({readyСards}) => {
  return (
    <>
      <div className={s.cards}>
        {readyСards.length ? (
          readyСards.map((item) => {
            return <Card key={item.id} item={item} />;
          })
        ) : (
          <h1>Ничего не найдено!</h1>
        )}
      </div>
    </>
  );
};

export default List;
