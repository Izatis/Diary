import React from "react";
import s from "./CardList.module.scss";
import Card from "../../components/Card/Card";

const CardList = ({ readyСards }) => {
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

export default CardList;
