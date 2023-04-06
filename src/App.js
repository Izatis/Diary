import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import s from "./App.module.scss";
import Header from "./components/Header/Header";
import CreateCard from "./pages/CreateCard/CreateCard";
import List from "./pages/List/List";
import { AddContext } from "./pages/AddContext/AddContext";
import { createClient } from "pexels";
import data from "./data/data";

function App() {
  /* Запрос на Api pixels */

  // Массив с картинками
  const [photos, setPhotos] = useState([]);

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

  // Значения инпута (общий)
  const [searchImg, setSearchImg] = useState("");

  // Условие на кнопку поиска
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

  // ==========================================================

  // Шаг-1. Состояние для появление галочки
  const [todoImg, setTodoImg] = useState(-1);

  // Шаг-2. Добавление стиля при клике на картинку (появление галочки)
  const imgPicked = (index) => {
    if (todoImg === index) {
      return s.imgPicked;
    } else {
      return s.imgNotPicked;
    }
  };

  // -----------------------------------------------------------

  // Состояние модалки (общий)
  const [modalActive, setModalActive] = useState(false);

  // Для предотвращения скроллинга заднего содержимого при открытии модального окна
  function openModal() {
    setModalActive(true);
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    setModalActive(false);
    document.body.style.overflow = "auto";
  }

  // ==========================================================

  const [cardData, setCardData] = useState(data);

  const createCard = (newPost) => {
    setCardData([...cardData, newPost]);
  };

  const removeCard = (card) => {
    setCardData(cardData.filter((p) => p.id !== card.id));
  };

  return (
    <BrowserRouter>
      <AddContext.Provider
        value={{
          setTodoImg,
          photos,
          getPhotosBtn,
          searchImg,
          setSearchImg,
          openModal,
          closeModal,
          modalActive,
          cardData,
          setCardData,
          createCard,
          removeCard,
          imgPicked,
        }}
      >
        <Header />
        <Routes>
          <Route path="/createCard" element={<CreateCard />} />

          <Route path="/" element={<List />} />
        </Routes>
      </AddContext.Provider>
    </BrowserRouter>
  );
}

export default App;
