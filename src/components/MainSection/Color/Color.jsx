import React, { useState } from "react";
import "./Color.css";

const Color = () => {
    const [selected, setSelected] = useState("mono");

    const handleSelect = (card) => {
        setSelected(card);
    };

    return (
        <div className="color-combination">
            <div className="color-div-h2">
                <h2>Сочетание цветов</h2>
            </div>
            <div className="color-div-p">
                <p>Цвет – ключевой элемент стиля, определяющий восприятие образа. Чтобы создавать гармоничные сочетания, нужно ориентироваться на цветовой круг. 
                Он помогает определять, какие цвета сочетаются между собой. Вот хорошая <a href="https://colorscheme.ru/#">цветовая палитра.</a>
                 Обычно подбирается 3–5 цветов, которые сочетаются между собой и подходят под конкретный стиль или сезон. 
                На её основе подбираются акценты, аксессуары и детали одежды.
                <br />
                <br /> 
                Существует множество подходов и правил подбора цветов, но вот основные из них:</p>
            </div>
            
            <div className="color-blocks">
                <div className={`color-card mono ${selected === "mono" ? "expanded" : ""}`} onClick={() => handleSelect("mono")}>
                    <img className="color-img left-img" src="https://modnaya-krasivaya.ru/moda/2022/06/monoxromnye-obrazy-88.jpg" />

                    <div className="color-content">
                        <h3>Монохром</h3>
                        {selected === "mono" && <p>Один цвет в разных оттенках. Это универсальный и элегантный приём, он делает образ цельным.</p>}
                    </div>

                    <img className="color-img right-img" src="https://theblueprint.ru/upload/19397m/vms/4e587876017ef6493f3d4d46975eedff_small.jpg" />
                </div>

                <div 
                    className={`color-card contrast ${selected === "contrast" ? "expanded" : ""}`}
                    onClick={() => handleSelect("contrast")}>
                    <img className="color-img left-img" src="https://bfbusiness.by/wp-content/uploads/2_mm1-23.jpg" />

                    <div className="color-content">
                        <h3>Контрастные сочетания</h3>
                        {selected === "contrast" && (
                        <p>Сочетание контрастных цветов, расположенных напротив друг друга на цветовом круге. Дает яркий, выразительный эффект. Хорошо смотрится в спортивных и повседневных образах.</p>)}
                    </div>

                    <img className="color-img right-img" src="https://i.pinimg.com/474x/0f/ba/38/0fba3805d35a2ab9d665c84e9eb1130c.jpg"></img>
                </div>
                <div 
                    className={`color-card neutral ${selected === "neutral" ? "expanded" : ""}`} 
                    onClick={() => handleSelect("neutral")}>
                    <img className="color-img left-img" src="https://beautyplan.ru/wp-content/uploads/2021/07/3.-analogovoe-sochetanie-cvetov-v-odezhde.jpg"></img>

                    <div className="color-content">
                        <h3>Нейтральные комбинации</h3>
                        {selected === "neutral" && (
                        <p>Сочетание соседних цветов. Позволяет создать плавные и гармоничные переходы в одежде. Хорошо подходит для спокойных и сбалансированных образов.</p>)}
                    </div>
                    
                    <img className="color-img right-img" src="https://i.pinimg.com/736x/7b/f5/fa/7bf5fafec338cee4b790a20b0ba80e9d.jpg" />
                </div>
            </div>

            
        </div>
    );
};

export default Color;
