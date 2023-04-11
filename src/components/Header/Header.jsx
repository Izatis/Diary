import React, { useContext, useState } from "react";
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

const Header = ({ handleFilterOutCards }) => {
  // Шаг-1. Состояние - для появление галочки, (общий)
  const { setCardImgId } = useContext(AddContext);

  const location = useLocation();
  const navigate = useNavigate();

  // Функция - для сброса по умолчанию (Шаг-1. Состояние - для появление галочки)
  const handleClick = () => {
    navigate("/createCard");
    setCardImgId(-1);
  };

  // ----------------------------------------------------------------

  // Состояние - для select
  const [option, setOption] = useState("default");

  // Функция - для фильтирации карточек
  const filterOutCards = (e) => {
    setOption(e.target.value);
    handleFilterOutCards(e.target.value);
  };

  // ----------------------------------------------------------------

  // Состояние - для инпута поиска
  const { searchValue, setSearchValue } = useContext(AddContext);

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
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <MySelect
                style={{ maxWidth: 100 }}
                options={emoji}
                value={option}
                onChange={filterOutCards}
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
              onClick={() => handleClick()}
            />
          </div>
        </div>
      </div>
      {location.pathname === "/" ? (
        <div className={s.inputs_clone}>
          <MyInput
            style={{ maxWidth: 800 }}
            placeholder="Поиск"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <MySelect
            style={{ maxWidth: 100 }}
            options={emoji}
            value={option}
            onChange={filterOutCards}
          />
        </div>
      ) : null}
    </header>
  );
};

export default Header;
