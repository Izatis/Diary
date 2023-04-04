import React, { useContext } from "react";
import s from "./ModalWallpaper.module.scss";
import cn from "classnames";
import { AddContext } from "../../../pages/AddContext/AddContext";
import search from "../../../assets/search.png";
import MyInput from "../../MUI/MyInput/MyInput";
import MyButton from "../../MUI/MyButton/MyButton";

const ModalWallpaper = () => {
   // Состояния модалки (из контекста)
   const {searchImg, setSearchImg} = useContext(AddContext);

  // Состояния модалки (из контекста)
  const { modalActive, setModalActive } = useContext(AddContext);

  return (
    <div
      className={modalActive ? cn(s.modal, s.modalActive) : s.modal}
      // onClick={() => setModalActive(!modalActive)}
    >
      <div className={s.input_btn}>  
      <MyInput
        value={searchImg}
        onChange={(e) => setSearchImg(e.target.value)}
        style={{ maxWidth: 500, height: 40 }}
        placeholder="Поиск"
      />
      <MyButton
        className={s.search_btn}
        style={{ background: "#fff76a", maxWidth: 40, height: 40}}
        img={search}
        onClick={() => getPhotosBtn()}
      ></MyButton>
      </div>
    </div>
  );
};

export default ModalWallpaper;
