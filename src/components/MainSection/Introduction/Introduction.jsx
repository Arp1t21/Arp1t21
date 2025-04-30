import React from "react";
import "./Introduction.css";

const MainSection = () => {
    return (
        <section className="grey-section">
            <section className="section-article-main">
                <div className="div-h2-article-main">
                    <h2 className="h2-section-main">КАК ОДЕВАТЬСЯ СТИЛЬНО И УВЕРЕННО</h2>
                </div>
                <div className="div-p-article-main">
                    <p className="p-section-main">твой гид по стилю</p>
                </div>
            </section>
            <section className="section-2img-main">
                <div className="div-section-2img-main">
                    <div className="div-section-2img-white-main">
                        <div className="div-woman-2img-section-main">
                            <img className="womanimg-div-section-2img-white-main" src="https://static.alltime.ru/obj/article/image-blog/Klassicheskiy_stil_odezhdy/Klassicheskiy_stil_odezhdy_5.jpg"></img>
                        </div>
                        <div className="div-man-2img-section-main">
                            <img className="manimg-div-section-2img-white-main" src="https://static2.issaplus.com/wa-data/public/photos/45/62/6245/6245.970.jpg"></img>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default MainSection;