import React from "react";
import Slider from './Slider/Slider';
import "./MainSection.css";
import Introduction from './Introduction/Introduction';
import Textstyle from "./Texstyle/Textstyle";
import Color from "./Color/Color";
import Cloth_styles from "./Cloth-styles/Cloth-styles"


const MainSection = () => {
    return (
        <main className="main">
            <Introduction />
            <section className="mini-intro">
                <div className="div-h2-main">
                    <h2 className="mini-h2">Базовые принципы стиля</h2>
                </div>
                <div className="div-p-main">
                    <p className="mini-p">Создать стильный образ – это не просто подобрать вещи. Важно учитывать фигуру, цветовые сочетания и общий баланс. В этом разделе ты узнаешь, как формировать гардероб, чтобы выглядеть хорошо в любой ситуации.</p>
                </div>
            </section>
            <div id="Figure">
                <Slider />
            </div>

            <div id="Tissue">
                <Textstyle />
            </div>

            <div id="Color">
                <Color />
            </div>
            
            <div id="Styles">
                <Cloth_styles />
            </div>
        </main>
    );
};

export default MainSection;