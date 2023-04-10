import React from "react";
import s from "./ModalCard.module.scss";
import cn from "classnames";

const ModalCard = ({ item, showModal, setShowModal }) => {
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
      className={showModal ? cn(s.modal, s.show_modal) : s.modal}
      onClick={() => setShowModal(false)}
    >
      <div
        className={
          showModal ? cn(s.modal_content, s.modal_active) : s.modal_content
        }
        onClick={(e) => e.stopPropagation()}
      >
        {showModal && (
          <>
            <div className={s.modal_header}>
              <span className={s.close} onClick={() => setShowModal(false)}>
                X
              </span>

              <div className={s.mood_title}>
                <span className={s.mood}>{item.mood}</span>
                <h1>{item.title}</h1>
              </div>
              <span className={s.date}>{formatDate(item.date)}</span>
            </div>
            <div className={s.modal_img_description}>
              <div className={s.modal_img}>
                <img src={item.img} alt="modal_img" />
              </div>

              <div className={s.description}>
                <p>{item.description}</p>
              </div>
            </div>
            <div className={s.clone}>
              <div className={s.modal_header_clone}>
                <span className={s.close} onClick={() => setShowModal(false)}>
                  X
                </span>

                <span className={s.mood}>{item.mood}</span>
                <div className={s.title_date}>
                  <h1>{item.title}</h1>
                  <span className={s.date}>{formatDate(item.date)}</span>
                </div>
              </div>
              <div className={s.modal_img_clone}>
                <img src={item.img} alt="modal_img" />
              </div>
            </div>
            <p className={s.description_clone}>{item.description}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalCard;
