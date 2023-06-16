import React, { useContext, useState } from "react";
import s from "./Card.module.scss";
import { AddContext } from "../../pages/AddContext/AddContext";
import useBodyScrollLock from "../../hooks/useBodyScrollLock";

import ModalCard from "../Modals/ModalCard/ModalCard";

const Card = ({ item }) => {
  // Функция - для удаление карточек, (общий)
  const { removeCard } = useContext(AddContext);

  // ----------------------------------------------------------------
  // Функция - отформатировки даты
  function formatDate(dateString) {
    const weekdays = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
    const months = [
      "янв",
      "фев",
      "мар",
      "апр",
      "май",
      "июн",
      "июл",
      "авг",
      "сен",
      "окт",
      "ноя",
      "дек",
    ];
    const date = new Date(dateString);
    const dayOfWeek = weekdays[date.getDay()];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const month = months[monthIndex];
    return `${dayOfWeek} ${day} ${month}`;
  }

  // ----------------------------------------------------------------

  // Здесь мы создаем отдельное состояние для каждой карточки, а глобальное состояние не подходить
  // Состояние - для каждой карточки
  const [activeModal, setActiveModal] = useState(false);

  // Состояние - для запрета прокрутки когда модалка открыта
  const [isLocked, setIsLocked] = useBodyScrollLock();

  // Function - для activeModal и isLocked
  const handleClick = () => {
    setActiveModal(!activeModal);
    setIsLocked(!isLocked);
  };

  return (
    <>
      <div className={s.card} onClick={handleClick}>
        <img src={item.img} alt="card_image" />
        <button
          className={s.card__btn}
          onClick={(event) => removeCard(item, event)}
        >
          <span>{item.mood}</span>
        </button>
        <div className={s.card__text}>
          <div className={s.card__title}>
            <h3>{item.title}</h3>
            <p>{formatDate(item.date)}</p>
          </div>
          <div className={s.card__description}>
            <p>{item.description.split(" ").slice(0, 5).join(" ")}...</p>
          </div>
        </div>
      </div>
      <ModalCard item={item} activeModal={activeModal} handleClick={handleClick} />
    </>
  );
};

export default Card;
