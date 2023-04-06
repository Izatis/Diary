import React, { useContext, useState } from "react";
import s from "./Card.module.scss";
import ModalCard from "../Modals/ModalCard/ModalCard";
import { AddContext } from "../../pages/AddContext/AddContext";

const Card = ({ item }) => {
  // Здесь мы создаем отдельное состояние для каждой карточки, а глобальное состояние не подходить
  // Состояние - для каждой карточки
  const [showModal, setShowModal] = useState(false);

  // ----------------------------------------------------------------

  // Функция - для удаление карточек, (общий)
  const { removeCard } = useContext(AddContext);
  return (
    <>
      <div className={s.card_main} onClick={() => setShowModal(true)}>
        <img src={item.img} alt="card_image" />
        <button
          className={s.circle}
          onClick={(event) => removeCard(item, event)}
        >
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
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default Card;
