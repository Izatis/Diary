import React, { useContext } from "react";
import s from "./ModalCard.module.scss";
import cn from "classnames";
import { AddContext } from "../../../pages/AddContext/AddContext";

const ModalCard = ({ item }) => {
  // Состояния модалки (из контекста)
  const { modalActive, setModalActive } = useContext(AddContext);

  return (
    <div
      className={modalActive ? cn(s.modal, s.modalActive) : s.modal}
      onClick={() => setModalActive(!modalActive)}
    >
      <div className={s.modal_content}>
        <div className={s.modal_header}>
          <span
            className={s.close}
            onClick={() => setModalActive(!modalActive)}
          >
            X
          </span>

          <div className={s.mood_title}>
            <span>{item.mood}</span>
            <h1>{item.title}</h1>
          </div>
          <span>{item.date}</span>
        </div>
        <div className={s.img_description}>
          <div className={s.modal_img}>
            <img src={item.img} alt="modal_img" />
          </div>
          <div className={s.text}>
            <div className={s.modal_header_clone}>
              <span
                onClick={() => setModalActive(!modalActive)}
                className={s.close}
              >
                X
              </span>

              <div className={s.mood_title}>
                <span>{item.mood}</span>
                <h1>{item.title}</h1>

                <p className={s.date}>{item.date}</p>
              </div>
            </div>
            <p>
              Это бесспорная истина, недаром же мы редко доверяемся тем, кто
              лучше нас. Скорее уж мы избегаем их общества. Чаще всего мы
              исповедуемся тем, кто похож на нас и разделяет наши слабости. Мы
              вовсе не хотим исправляться, не стремимся к
              самоусовершенствованию: прежде всего нужно, чтобы нас судили со
              всеми нашими слабостями. Нам хочется, чтобы нас пожалели и
              поддержали дух наш. В общем, мы хотели бы и не считаться
              виновными, и не стараться очиститься. В нас недостаточно цинизма и
              недостаточно добродетели. У нас нет ни силы зла, ни силы добра. Вы
              читали Данте? Правда? Вот черт! Вы, стало быть, знаете, как это у
              Данте? Ведь он допускает, что ангелы были нейтральными в распре
              между Богом и Сатаной. Он отводит им место в преддверии, так
              сказать в вестибюле своего ада. Мы с вами в вестибюле, дорогой
              друг. Терпение? Вы, разумеется, правы. Нужно набраться терпения и
              ждать Страшного суда. Но, к несчастью, нам некогда, мы торопимся.
              Так торопимся, что мне даже пришлось стать судьей на покаянии.
              Однако мне сначала нужно было привести в порядок свои открытия и
              уладить дело с насмешками моих современников. С того вечера, когда
              меня позвали к ответу — а ведь меня действительно позвали, — я
              обязан был ответить или по крайней мере поискать ответ. Это
              оказалось нелегко. Я долго блуждал наугад. Но этот постоянный
              хохот и насмешки научили меня яснее разбираться в себе и увидеть
              наконец, что я совсем не прост. Вы не улыбайтесь, эта истина не
              так уж элементарна, как кажется. Элементарными называют такие
              истины, которые человек открывает последними, — вот и все.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCard;
