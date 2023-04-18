import React from "react";
import s from "./ModalCard.module.scss";
import cn from "classnames";

const ModalCard = ({ item, showModal, handleClick }) => {
  // Функция - отформатировки даты
  function formatDate(dateString) {
    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const month = months[monthIndex];
    const year = date.getFullYear();
    return `${day} ${month} ${year} года`;
  }

  return (
    <div
      className={showModal ? cn(s.modal, s.show) : s.modal}
      onClick={handleClick}
    >
      <div
        className={
          showModal ? cn(s.modal__content, s.active) : s.modal__content
        }
        onClick={(e) => e.stopPropagation()}
      >
        {showModal && (
          <>
            <div className={s.modal__header}>
              <span className={s.modal__close} onClick={handleClick}>
                X
              </span>

              <div className={s.modal__title}>
                <span className={s.modal__mood}>{item.mood}</span>
                <h1>{item.title}</h1>
              </div>
              <span className={s.modal__date}>{formatDate(item.date)}</span>
            </div>
            <div className={s.modal__hero}>
              <div className={s.modal__img}>
                <img src={item.img} alt="modal_img" />
              </div>

              <div className={s.modal__description}>
                <p>{item.description}</p>
              </div>
            </div>
            <div className={s.modal__clone}>
              <div className={s.modal__header_clone}>
                <span className={s.modal__close} onClick={handleClick}>
                  X
                </span>

                <span className={s.mood}>{item.mood}</span>
                <div className={s.modal__title_clone}>
                  <h1>{item.title}</h1>
                  <span className={s.modal__date}>{formatDate(item.date)}</span>
                </div>
              </div>
              <div className={s.modal__img_clone}>
                <img src={item.img} alt="modal_img" />
              </div>
            </div>
            <p className={s.modal__description_clone}>{item.description}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalCard;
