import React, { useContext, useState } from "react";
import s from "./Card.module.scss";
import ModalCard from "../Modals/ModalCard/ModalCard";
import { AddContext } from "../../pages/AddContext/AddContext";

const Card = ({ item, ...props }) => {
  const {modalActive, setModalActive} = useContext(AddContext)    
  return (
    <>
      <div className={s.card_main} onClick={() => setModalActive(!modalActive)}>
        <img src={item.img} alt="img" />
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
        modalActive={modalActive}
        setModalActive={setModalActive}
        item={item}
      />
    </>
  );
};

export default Card;
