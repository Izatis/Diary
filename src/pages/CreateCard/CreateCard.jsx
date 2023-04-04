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
import { createClient } from "pexels";
import picked from "../../assets/picked.png";
import ModalWallpaper from "../../components/Modals/ModalWallpaper/ModalWallpaper";

const CreateCard = () => {
  /* Запрос на Api pixels */

  // Массив с картинками
  const [photos, setPhotos] = useState([]);
  
  // Состояния модалки (из контекста)
  const {searchImg, setSearchImg} = useContext(AddContext);

  // Ключ на pixels
  const client = createClient(
    "IS7Tr1T2bqprvokbeCmn9Poo4q8jWxp0NzbBeZrpfomJTmsk1o9NmwaW"
  );

  // Зарос на Api pixels
  const getPhotos = (query) => {
    client.photos.search({ query, per_page: 5 }).then((photos) => {
      setPhotos(photos.photos);
    });
  };

  // Условие на кнопку
  const getPhotosBtn = () => {
    if (searchImg.trim() === "") {
      alert("Поле ввода пустое!");
    } else {
      getPhotos(searchImg);
      setSearchImg("");
    }
  };

  // В начале загрузки
  useEffect(() => {
    getPhotos("Nature");
  }, []);

  // ----------------------------------------------------------------

  // Состояние модалки
  const { modalActive, setModalActive } = useContext(AddContext);

  /* Создание новой карточки */
  const { createCard } = useContext(AddContext);

  // Маршутизация после создания карточки
  const navigate = useNavigate();

  const [todoImg, setTodoImg] = useState(-1);

  // Состояние для инпутов
  const [card, setCard] = useState({
    title: "",
    description: "",
    mood: "",
    date: "",
    img: mountain,
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
        img: pen,
      });
    }
  };

  const imgPicked = (index) => {
    if (todoImg === index) {
      return s.imgPicked;
    } else {
      return s.imgNotPicked;
    }
  };
  return (
    <div className={s.main}>
      <img className={s.clone_wallpaper} src={mountain} alt={mountain} onClick={() => setModalActive(!modalActive)}/>
      <ModalWallpaper/>
      {/* Управляемый компонент */}
      <form className={s.createForm}>
        <div className={s.input_date_select}>
          <MyInput
            style={{ maxWidth: 670 }}
            value={card.title}
            onChange={(e) => setCard({ ...card, title: e.target.value })}
            placeholder="Название"
          />
          <div className={s.date_select}>
            <MySelect
              className={s.createMood}
              style={{ maxWidth: 100 }}
              options={emoji}
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
            style={{ maxWidth: 596 }}
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
                </div>
                <img key={photo.key} src={photo.src.original} alt={photo.alt} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CreateCard;
