import React, { useContext, useState } from "react";
import s from "./CreateCard.module.scss";
import { AddContext } from "../AddContext/AddContext";
import { useNavigate } from "react-router-dom";
import useBodyScrollLock from "../../hooks/useBodyScrollLock";

import search from "../../assets/search.png";
import picked from "../../assets/picked.png";
import add from "../../assets/add.png";
import mountain from "../../assets/Rectangle 3.png";
import emoji from "../../data/emoji.json";
import MyInput from "../../components/MUI/MyInput/MyInput";
import MySelect from "../../components/MUI/MySelect/MySelect";
import MyButton from "../../components/MUI/MyButton/MyButton";
import ModalWallpaper from "../../components/Modals/ModalWallpaper/ModalWallpaper";
import Loading from "../../components/Loading/Loading";

const CreateCard = () => {
  /* Запрос на Api pixels */

  // Значение инпута, (общий)
  const { searchImg, setSearchImg } = useContext(AddContext);

  // Массив с картинками, (общий)
  const { photos } = useContext(AddContext);

  // Условие на кнопку поиска, (общий)
  const { getPhotosBtn } = useContext(AddContext);

  // ----------------------------------------------------------------
  // Шаг-1. Состояние - для появление галочки, (общий)
  const { cardImgId, setCardImgId } = useContext(AddContext);

  // Шаг-2. Добавление стиля при клике на картинку (появление галочки)
  const imgPicked = (index) => {
    if (cardImgId === index) {
      return s.wallpaper__picked;
    } else {
      return s.wallpaper__notPicked;
    }
  };

  // ----------------------------------------------------------------
  // Состояние - модалки, (общий)
  const [activeModal, setActiveModal] = useState(false);

  // Состояние - для запрета прокрутки когда модалка открыта
  const [isLocked, setIsLocked] = useBodyScrollLock();

  // Function - для activeModal и isLocked
  const handleClick = () => {
    setActiveModal(!activeModal);
    setIsLocked(!isLocked);
  };

  // ----------------------------------------------------------------
  // Функция - для создание карточки, (общий)
  const { createCard } = useContext(AddContext);

  // Маршутизация после создания карточки
  const navigate = useNavigate();

  // Состояние - для инпутов
  const [card, setCard] = useState({
    title: "",
    description: "",
    mood: "",
    date: "",
    img: "",
  });

  // ====================================================================
  // Чтобы достать src картинку из модалки, с помощю функции
  const changeImg = (newSrc) => {
    setCard({ ...card, img: newSrc });
  };

  // ====================================================================
  // Состояние - для select
  const [option, setOption] = useState("default");

  // Функция - для отслеживание option
  const choiceOfOption = (e) => {
    setOption(e.target.value);
    setCard({ ...card, mood: e.target.value });
  };

  // ====================================================================
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

  // ----------------------------------------------------------------
  // Состояние - для  загрузки, (общий)
  const { isLoading } = useContext(AddContext);

  return (
    <section className={s.create}>
      <img
        className={s.wallpaper_clone}
        src={mountain}
        alt={"mountain"}
        onClick={handleClick}
      />
      <ModalWallpaper
        changeImg={changeImg}
        card={card}
        setCard={setCard}
        activeModal={activeModal}
        handleClick={handleClick}
      />

      {/* Управляемый компонент */}
      <form className={s.create__form}>
        <div className={s.inputs}>
          <MyInput
            style={{ maxWidth: 670 }}
            value={card.title}
            placeholder="Название"
            onChange={(e) => setCard({ ...card, title: e.target.value })}
          />
          <div className={s.inputs__select}>
            <MySelect
              style={{ maxWidth: 100 }}
              options={emoji}
              value={option}
              onChange={choiceOfOption}
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
        <div className={s.add}>
          <MyButton
            className={s.add__btn}
            img={add}
            text={"Создать"}
            background={"linear-gradient(135deg, #61B15A 0%, #ADCE74 100%)"}
            onClick={addNewPost}
          />
        </div>
      </form>
      <div className={s.search}>
        <form onSubmit={getPhotosBtn} className={s.search__form}>
          <MyInput
            value={searchImg}
            onChange={(e) => setSearchImg(e.target.value)}
            style={{ maxWidth: 789 }}
            placeholder="Поиск"
          />
          <MyButton
            type="submit"
            className={s.search__btn}
            style={{ background: "#fff76a" }}
            img={search}
          />
        </form>

        {isLoading ? (
          <Loading />
        ) : (
          <div className={s.wallpapers}>
            {photos.map((photo, index) => {
              return (
                <div
                  className={s.wallpaper}
                  key={photo.id}
                  onClick={() => setCardImgId(index)}
                >
                  <div className={imgPicked(index)}>
                    <span>
                      <img src={picked} alt="check" />
                    </span>
                  </div>
                  <img
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
        )}
      </div>
    </section>
  );
};

export default CreateCard;
