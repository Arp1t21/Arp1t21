import React, { useState } from "react";
import "./Slider.css";
import img1 from "/src/assets/triangle.png";
import img2 from "/src/assets/reverse-triangle.png";
import img3 from "/src/assets/rectangle.png";
import img4 from "/src/assets/oval.png";
import img5 from "/src/assets/pesok.png";
import arrow from "/src/assets/free-icon-down-chevron-7604655.png";
import img11 from "/src/assets/triangle-woman.png";
import img12 from "/src/assets/reverse-triangle-woman.png";
import img13 from "/src/assets/rectangle-woman.png";
import img14 from "/src/assets/oval-woman.png";
import img15 from "/src/assets/pesok-woman.png";

const slides = [
  {
    id: 1,
    url: img1,
    title: "Треугольник",
    text: "Этот тип фигуры характеризуется узкими плечами и широкими бедрами. Подходит одежда, создающая баланс между верхом и низом.",
  },
  {
    id: 2,
    url: img2,
    title: "Перевернутый треугольник",
    text: "Широкие плечи и узкие бедра. Желательно использовать одежду, расширяющую нижнюю часть тела.",
  },
  {
    id: 3,
    url: img3,
    title: "Прямоугольник",
    text: "Почти одинаковая ширина плеч, талии и бедер. Нужно акцентировать внимание на талии с помощью одежды.",
  },
  {
    id: 4,
    url: img4,
    title: "Овал",
    text: "Объемная верхняя часть тела, талия выражена слабо. Подходят удлиненные силуэты и акцент на ноги.",
  },
  {
    id: 5,
    url: img5,
    title: "Песочные часы",
    text: "Сбалансированные пропорции плеч и бедер с выраженной талией. Почти любой крой одежды подходит.",
  },
];


const slides2 = [
  {
    id: 1,
    url: img11,
    title: "Треугольник",
    text: "Узкие плечи и широкие бедра. Идеально подходят вещи, подчеркивающие талию и уравновешивающие верх, например, объемные блузы и жакеты.",
  },
  {
    id: 2,
    url: img12,
    title: "Перевернутый треугольник",
    text: "Широкие плечи и узкие бедра. Стоит выбирать юбки с воланами, клеш или расклешенные платья, чтобы сбалансировать фигуру.",
  },
  {
    id: 3,
    url: img13,
    title: "Прямоугольник",
    text: "Почти одинаковая ширина плеч, талии и бедер. Можно создать иллюзию талии с помощью поясов, приталенных жакетов и юбок с высокой посадкой.",
  },
  {
    id: 4,
    url: img14,
    title: "Овал",
    text: "Округлые формы и менее выраженная талия. Лучше всего смотрятся свободные силуэты, удлиненные кардиганы и акценты на зону декольте или ноги.",
  },
  {
    id: 5,
    url: img15,
    title: "Песочные часы",
    text: "Пропорциональная фигура с четко выраженной талией. Отлично подходят приталенные платья, обтягивающие силуэты и классические силуэтные костюмы.",
  },
];


const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  return (
    <div className="div-slider">
      <div className="div-h2-slider">
        <h2 className="h2-slider">Фигуры</h2>
      </div>
      <div className="div-p-slider">
        <p className="p-slider">
          Каждый человек уникален, и правильно подобранная одежда помогает
          подчеркнуть достоинства фигуры. Независимо от типа телосложения, важно
          знать, какие фасоны и силуэты работают на вас. Есть основные типы
          телосложения, которые рассматриваются отдельно для мужчин и женщин, их
          надо учитывать при создании образа.
        </p>
      </div>

      <div className="slider">
        <div className="h3-for-men">
          <h3>ДЛЯ МУЖЧИН</h3>
        </div>

        <div className="slider-div">
          <img
            src={arrow}
            alt="Previous"
            className="arrow left"
            onClick={prevSlide}
          />

          <div className="slide-div">
            <div className="slide-flex-top">
              <h3>{slides[currentSlide].title}</h3>
                <div className="slide-double-div-line"></div>
            </div>

            <div className="slide-flex-center">
              <img src={slides[currentSlide].url} alt={`Slide ${currentSlide + 1}`} className="slide" />
            </div>

            <div className="slide-flex-bottom">
                <div className="slide-double-div-line"></div>
              <p>{slides[currentSlide].text}</p>
            </div>
          </div>


          <img
            src={arrow}
            alt="Next"
            className="arrow right"
            onClick={nextSlide}
          />
        </div>
      </div>

      <div className="slider">
        <div className="h3-for-women">
          <h3>ДЛЯ ЖЕНЩИН</h3>
        </div>

        <div className="slider-div">
          <img
            src={arrow}
            alt="Previous"
            className="arrow left"
            onClick={prevSlide}
          />

          <div className="slide-div-woman">
            <div className="slide-flex-top">
              <h3>{slides2[currentSlide].title}</h3>
              <div className="slide-double-div-line"></div>
            </div>

            <div className="slide-flex-center">
              <img src={slides2[currentSlide].url} alt={`Slide ${currentSlide + 1}`} className="slide" />
            </div>

            <div className="slide-flex-bottom">
              <div className="slide-double-div-line"></div>
              <p>{slides2[currentSlide].text}</p>
            </div>
          </div>


          <img
            src={arrow}
            alt="Next"
            className="arrow right"
            onClick={nextSlide}
          />
        </div>
      </div>
    </div>
  );
};

export default Slider;
