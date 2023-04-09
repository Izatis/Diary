import React, { useEffect, useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import CreateCard from "./pages/CreateCard/CreateCard";
import List from "./pages/List/List";
import { AddContext } from "./pages/AddContext/AddContext";
import { createClient } from "pexels";
import data from "./data/data";

function App() {
  // Глобальные данные карточек
  const [cardData, setCardData] = useState(data);

  // Функция - для создание карточки
  const createCard = (newPost) => {
    setCardData([...cardData, newPost]);
  };

  // Функция - для удоление карточек
  const removeCard = (item, event) => {
    event.stopPropagation();
    setCardData(cardData.filter((current) => current.id !== item.id));
  };

  // ----------------------------------------------------------------
  // Состояние - для  загрузки
  const [isLoading, setIsLoading] = useState(true);

  // ----------------------------------------------------------------
  /* Запрос на Api pixels */

  // Массив с картинками
  const [photos, setPhotos] = useState([]);

  // Ключ на pixels
  const client = createClient(
    "IS7Tr1T2bqprvokbeCmn9Poo4q8jWxp0NzbBeZrpfomJTmsk1o9NmwaW"
  );

  // Зарос на Api pixels
  const getPhotos = async (query) => {
    setIsLoading(true);
    await client.photos.search({ query, per_page: 5 }).then((photos) => {
      setPhotos(photos.photos);
    });
    setIsLoading(false);
  };
  // ====================================================================
  // В начале загрузки
  useEffect(() => {
    getPhotos("Nature");
  }, []);

  // Значения инпута (общий)
  const [searchImg, setSearchImg] = useState("");

  // Условие на кнопку поиска
  const getPhotosBtn = (event) => {
    event.preventDefault();
    if (searchImg.trim() === "") {
      alert("Поле ввода пустое!");
    } else {
      getPhotos(searchImg);
      setSearchImg("");
    }
  };

  // ----------------------------------------------------------------

  // Состояние - отфильтированных карточек, клон (Глобальные данные карточек)
  const [filteredCards, setFilteredCards] = useState(cardData);

  // Функция - для отфильтировки карточек
  const handleFilterOutCards = (value) => {
    if (value !== "default") {
      setFilteredCards(
        cardData.filter((card) => {
          return card.mood === value;
        })
      );
    } else {
      return setFilteredCards(cardData);
    }
  };

  // Жизненный цикл - когда добавляется новая карточка, изменяет (Состояние - отфильтированных карточек, клон (Глобальные данные карточек)
  useEffect(() => {
    setFilteredCards(cardData);
  }, [cardData]);

  // ====================================================================

  // Состояние - для инпута поиска
  const [searchValue, setSearchValue] = useState("");

  const searchCard = useMemo(() => {
    return filteredCards.filter((card) =>
      card.title.toLowerCase().includes(searchValue)
    );
  }, [searchValue, filteredCards]);

  // ----------------------------------------------------------------
  // Шаг-1. Состояние - для появление галочки, (общий)
  const [cardImgId, setCardImgId] = useState(-1);

  return (
    <AddContext.Provider
      value={{
        setCardData,
        createCard,
        removeCard,
        photos,
        getPhotosBtn,
        searchImg,
        setSearchImg,
        searchValue,
        setSearchValue,
        cardImgId,
        setCardImgId,
        isLoading,
      }}
    >
      <Header handleFilterOutCards={handleFilterOutCards} />
      <Routes>
        <Route path="/createCard" element={<CreateCard />} />

        <Route path="/" element={<List readyСards={searchCard} />} />
      </Routes>
    </AddContext.Provider>
  );
}

export default App;
