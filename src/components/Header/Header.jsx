import React, { useContext, useEffect, useState } from "react";
import s from "./Header.module.scss";
import icon from "../../assets/icon.png";
import MyInput from "../MUI/MyInput/MyInput";
import MySelect from "../MUI/MySelect/MySelect";
import square from "../../assets/square.png";
import pen from "../../assets/pen.png";
import { useLocation, useNavigate } from "react-router-dom";
import MyButton from "../MUI/MyButton/MyButton";
import emoji from "../../data/emoji.json";
import { AddContext } from "../../pages/AddContext/AddContext";



const Header = () => {
const { cardData, setCardData } = useContext(AddContext);

  const location = useLocation();
  const navigate = useNavigate();
  const sortedCards = (sort) => {
    setCardData(cardData.filter((item) => item.mood === sort));
  };

  return (
    <header>
      <div className={s.header_content}>
        <div className={s.icon_text} onClick={() => navigate("/")}>
          <img src={icon} alt="icon" />
          <h1>Дневник</h1>
        </div>
        <div className={s.input_btn}>
          {location.pathname === "/" ? (
            <div className={s.inputs}>
              <MyInput
                style={{ maxWidth: 480 }}
                placeholder="Поиск"
              />
              <MySelect
                style={{ maxWidth: 100 }}
                onChange={(event) => sortedCards(event.target.value)}
                options={emoji}
              />
            </div>
          ) : null}
          <div className={s.buttons}>
            <MyButton
              style={{ maxWidth: 167, background: "#FFCE89", color: "black" }}
              img={square}
              text={"Список"}
              onClick={() => navigate("/")}
            />

            <MyButton
              style={{ maxWidth: 166 }}
              img={pen}
              text={"Запись"}
              onClick={() => navigate("/createCard")}
            />
          </div>
        </div>
      </div>
      {location.pathname === "/" ? (
        <div className={s.inputs_clone}>
          <MyInput
            style={{ maxWidth: 800 }}
            placeholder="Поиск"
          />
          <MySelect
            style={{ maxWidth: 100 }}
            onChange={(event) => sortedCards(event.target.value)}
            options={emoji}
          />
        </div>
      ) : null}
    </header>
  );
};

export default Header;
