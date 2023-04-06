import React, { useContext } from "react";
import s from "./ModalWallpaper.module.scss";
import cn from "classnames";
import { AddContext } from "../../../pages/AddContext/AddContext";
import search from "../../../assets/search.png";
import picked from "../../../assets/picked.png";
import MyInput from "../../MUI/MyInput/MyInput";
import MyButton from "../../MUI/MyButton/MyButton";

const ModalWallpaper = () => {
  /* Запрос на Api pixels */

  // Значение инпута (общий)
  const { searchImg, setSearchImg } = useContext(AddContext);

  // Массив с картинками (общий)
  const { photos } = useContext(AddContext);

  // Условие на кнопку поиска (общий)
  const { getPhotosBtn } = useContext(AddContext);

  // ==========================================================

  // Шаг-1. Состояние для появление галочки
  const { setTodoImg } = useContext(AddContext);

  // Шаг-2. Добавление стиля при клике на картинку (появление галочки)
  const { imgPicked } = useContext(AddContext);

  // ----------------------------------------------------------------

  // Для предотвращения скроллинга заднего содержимого при открытии модального окна (общий). Состояния модалки (общий)
  const { closeModal, modalActive } = useContext(AddContext);

  return (
    <div
      className={modalActive ? cn(s.modal, s.modal_active) : s.modal}
      onClick={closeModal}
    >
      <div
        className={
          modalActive ? cn(s.modal_content, s.modal_active) : s.modal_content
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className={s.input_btn}>
          <MyInput
            value={searchImg}
            onChange={(e) => setSearchImg(e.target.value)}
            style={{ height: 40 }}
            placeholder="Поиск"
          />
          <MyButton
            className={s.search_btn}
            style={{ background: "#fff76a" }}
            img={search}
            onClick={() => getPhotosBtn()}
          ></MyButton>
        </div>

        {photos.map((photo, index) => {
          return (
            <div onClick={() => setTodoImg(index)} className={s.wallpaper}>
              {/* <div className={imgPicked(index)}>
                <span>
                  <img
                    onClick={(e) =>
                      setCard({
                        ...card,
                        img: e.target.src,
                      })
                    }
                    src={picked}
                    alt="check"
                  />
                </span>
              </div> */}
              <img key={photo.key} src={photo.src.original} alt={photo.alt} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModalWallpaper;
