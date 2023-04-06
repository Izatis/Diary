import React, { useContext, useEffect, useState } from "react";
import s from "./CreateCard.module.scss";
import MyInput from "../../components/MUI/MyInput/MyInput";
import search from "../../assets/search.png";
import MyButton from "../../components/MUI/MyButton/MyButton";
import add from "../../assets/add.png";
import mountain from "../../assets/Mountain.png";
import emoji from "../../data/emoji.json";
import { useNavigate } from "react-router-dom";
import MySelect from "../../components/MUI/MySelect/MySelect";
import { AddContext } from "../AddContext/AddContext";
import picked from "../../assets/picked.png";
import ModalWallpaper from "../../components/Modals/ModalWallpaper/ModalWallpaper";

const CreateCard = () => {
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

  // Для предотвращения скроллинга заднего содержимого при открытии модального окна (общий)
  const { openModal } = useContext(AddContext);

  // ==========================================================

  /* Создание новой карточки */
  const { createCard } = useContext(AddContext);

  // Маршутизация после создания карточки
  const navigate = useNavigate();

  // Состояние для инпутов
  const [card, setCard] = useState({
    title: "",
    description: "",
    mood: "",
    date: "",
    img: "",
  });

  // Добавленин карточки к главной ветке
  const addNewPost = () => {
    if (
      card.title.trim() === "" ||
      card.description.trim() === "" ||
      card.mood.trim() === "" ||
      card.date.trim() === "" ||
      card.img.trim() === ""
    ) {
      alert("Заполните все поля и выберете фотографию!");
    } else {
      navigate("/");
      const newCard = {
        ...card,
        id: Date.now(),
      };
      createCard(newCard);
      setCard({
        title: "",
        description: "",
        mood: "",
        date: "",
        img: "",
      });
    }
  };

  return (
    <section className={s.main}>
      <img
        className={s.clone_wallpaper}
        src={mountain}
        alt={mountain}
        onClick={openModal}
      />
      <ModalWallpaper />

      {/* Управляемый компонент */}
      <form className={s.createForm}>
        <div className={s.input_date_select}>
          <MyInput
            style={{ maxWidth: 670 }}
            value={card.title}
            placeholder="Название"
            onChange={(e) => setCard({ ...card, title: e.target.value })}
          />
          <div className={s.date_select}>
            <MySelect
              className={s.createMood}
              style={{ maxWidth: 100 }}
              options={emoji}
              onChange={(e) => setCard({ ...card, mood: e.target.value })}
            />

            <MyInput
              value={card.date}
              style={{ maxWidth: 210, color: "gray" }}
              onChange={(e) => setCard({ ...card, date: e.target.value })}
              type="date"
            />
          </div>
        </div>
        <textarea
          value={card.description}
          onChange={(e) => setCard({ ...card, description: e.target.value })}
          placeholder="Описание"
        ></textarea>
        <div className={s.add_block}>
          <MyButton
            className={s.add_btn}
            img={add}
            text={"Создать"}
            background={"linear-gradient(135deg, #61B15A 0%, #ADCE74 100%)"}
            onClick={addNewPost}
          />
        </div>
      </form>
      <div className={s.search_wallpaper}>
        <form className={s.search}>
          <MyInput
            value={searchImg}
            onChange={(e) => setSearchImg(e.target.value)}
            style={{ maxWidth: 789 }}
            placeholder="Поиск"
          />
          <MyButton
            className={s.search_btn}
            style={{ background: "#fff76a" }}
            img={search}
            onClick={() => getPhotosBtn()}
          ></MyButton>
        </form>
        <div className={s.wallpapers}>
          {photos.map((photo, index) => {
            return (
              <div onClick={() => setTodoImg(index)} className={s.wallpaper}>
                <div className={imgPicked(index)}>
                  <span>
                    <img src={picked} alt="check" />
                  </span>
                </div>
                <img
                  key={photo.key}
                  src={photo.src.original}
                  alt={photo.alt}
                  onClick={(e) =>
                    setCard({
                      ...card,
                      img: e.target.src,
                    })
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CreateCard;
