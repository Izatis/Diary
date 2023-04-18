import React, { useContext, useState } from "react";
import s from "./ModalWallpaper.module.scss";
import cn from "classnames";
import { AddContext } from "../../../pages/AddContext/AddContext";
import search from "../../../assets/search.png";
import picked from "../../../assets/picked.png";
import MyInput from "../../MUI/MyInput/MyInput";
import MyButton from "../../MUI/MyButton/MyButton";
import Loading from "../../Loading/Loading";

const ModalWallpaper = ({ changeImg, showModal, handleClick }) => {
  /* Запрос на Api pixels */

  // Значение инпута, (общий)
  const { searchImg, setSearchImg } = useContext(AddContext);

  // Массив с картинками, (общий)
  const { photos } = useContext(AddContext);

  // Условие на кнопку поиска, (общий)
  const { getPhotosBtn } = useContext(AddContext);

  // ==========================================================

  // Шаг-1. Состояние - для появление галочки
  const [cardImgIdSecond, setCardImgIdSecond] = useState(-1);

  // Шаг-2. Добавление стиля при клике на картинку (появление галочки)
  const imgPickedSecond = (index) => {
    if (cardImgIdSecond === index) {
      return s.wallpaper__picked;
    } else {
      return s.wallpaper__notPicked;
    }
  };

  // Состояние - для  загрузки, (общий)
  const { isLoading } = useContext(AddContext);

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
        <form onSubmit={getPhotosBtn} className={s.search}>
          <MyInput
            value={searchImg}
            onChange={(e) => setSearchImg(e.target.value)}
            style={{ height: 40 }}
            placeholder="Поиск"
          />
          <MyButton
            type="submit"
            className={s.search__btn}
            style={{ background: "#fff76a" }}
            img={search}
            onClick={getPhotosBtn}
          />
        </form>

        {isLoading ? (
          <Loading />
        ) : (
          photos.map((photo, index) => {
            return (
              <div
                key={photo.id}
                onClick={() => setCardImgIdSecond(index)}
                className={s.wallpaper}
              >
                <div className={imgPickedSecond(index)}>
                  <span>
                    <img src={picked} alt="check" />
                  </span>
                </div>
                <img
                  src={photo.src.original}
                  alt={photo.alt}
                  onClick={() => changeImg(photo.src.original)}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ModalWallpaper;
