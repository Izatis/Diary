import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import CreateCard from "./pages/CreateCard/CreateCard";
import List from "./pages/List/List";
import pen from "./assets/Mountain.png";
import emoji from "./data/emoji.json";
import { AddContext } from "./pages/AddContext/AddContext";
// import data from './data/data'

function App() {
  // Значения инпута (общий)
  const [searchImg, setSearchImg] = useState("");

  // Состояния модалки (общий)
  const [modalActive, setModalActive] = useState(false);

  const [cardData, setCardData] = useState([
    {
      id: 1,
      title: "Побывал в горах",
      description: "Сегодня я почувствовал детское волнение...",
      mood: emoji[0].mood,
      date: "Вт 14 янв",
      img: pen,
    },
  ]);

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
          searchImg,
          setSearchImg,
          modalActive,
          setModalActive,
          cardData,
          setCardData,
          createCard,
          removeCard,
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
