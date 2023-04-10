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
  const [showModal, setShowModal] = useState(false);

  // Состояние - для запрета прокрутки когда модалка открыта
  const [isLocked, setIsLocked] = useBodyScrollLock();

  // Function - для showModal и isLocked
  const handleClick = () => {
    setShowModal(!showModal);
    setIsLocked(!isLocked);
  };

  return (
    <>
      <div className={s.card_main} onClick={handleClick}>
        <img src={item.img} alt="card_image" />
        <button
          className={s.circle}
          onClick={(event) => removeCard(item, event)}
        >
          <span>{item.mood}</span>
        </button>
        <div className={s.text_block}>
          <div className={s.title_date}>
            <h3>{item.title}</h3>
            <p>{formatDate(item.date)}</p>
          </div>
          <div className={s.description}>
            <p>{item.description.split(" ").slice(0, 5).join(" ")}...</p>
          </div>
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
