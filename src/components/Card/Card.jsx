import React, { useContext, useState } from "react";
import s from "./Card.module.scss";
import ModalCard from "../Modals/ModalCard/ModalCard";
import { AddContext } from "../../pages/AddContext/AddContext";

const Card = ({ item, ...props }) => {
  // Для предотвращения скроллинга заднего содержимого при открытии модального окна (общий)
  const { openModal } = useContext(AddContext);

  return (
    <>
      <div className={s.card_main} onClick={openModal}>
        <img src={item.img} alt="card_image" />
        <button {...props} className={s.circle}>
          <span>{item.mood}</span>
        </button>
        <div className={s.text_block}>
          <div className={s.title}>
            <h3>{item.title}</h3>
            <p>{item.date}</p>
          </div>
          <p className={s.description}>{item.description}</p>
        </div>
      </div>
      <ModalCard
        item={item}
      />
    </>
  );
};

export default Card;
