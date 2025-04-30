import React from "react";
import "./Textstyle.css";
import kozha from "/src/assets/textstyle.jpg";

const Textstyle = () => {
    return (
        <div className="textstyle">
            <div className="textstyle-text">
                <div className="textstyle-text-h2">
                    <h2>Сочетание тканей и фактур</h2>
                </div>
                <div className="textstyle-text-p">
                    <p>Ткань играет важную роль в восприятии образа. Гладкие, блестящие материалы придают элегантность, а фактурные ткани создают глубину и уют. Умение правильно сочетать разные фактуры помогает делать образы стильными и гармоничными.</p>
                </div>
            </div>
            <div className="fabric-types">
                {/* <div className="fabric-types-h3">
                    <h3>Основные типы тканей</h3>
                </div> */}
                <div className="animation">
                    <div className="textstyle-block">
                        <img className="img first" src="https://cdn1.ozone.ru/s3/multimedia-j/c600/6154527787.jpg"></img>
                        <div className="div-text">
                            <div>
                                <h4>Шелк</h4>
                            </div>
                            <div>
                                <p><b>На ощупь:</b> гладкий, струящийся, прохладный</p>
                            </div>
                            <div>
                                <p><b>Эффект в образе:</b> придает элегантность, лёгкость и изысканность</p>
                            </div>
                            <div>
                                <p><b>Сочетания:</b>
                                ✔ Идеально сочетается с вельветом, твидом и кожей для баланса между роскошью и текстурой
                                <br/>
                                ✔ Хорошо смотрится с матовыми тканями, такими как хлопок или трикотаж, для контраста</p>
                            </div>
                        </div>
                    </div>


                    <div className="textstyle-block">
                        <img className="img second" src="https://otkani.pro/wp-content/uploads/2021/02/Velvet3.jpg"></img>
                        <div className="div-text">
                            <div>
                                <h4>Вельвет</h4>
                            </div>
                            <div >
                                <p><b>На ощупь:</b> мягкий, рельефный, плотный</p>
                            </div>
                            <div>
                                <p><b>Эффект в образе:</b> делает образ уютным, ретро-стильным</p>
                            </div>
                            <div>
                                <p><b>Сочетания:</b>
                                ✔ Сочетается с шелком и атласом для контраста мягкости и глянца
                                <br/>
                                ✔ Хорошо выглядит с хлопком и трикотажем для повседневного стиля</p>
                            </div>
                        </div>
                    </div>


                    <div className="textstyle-block">
                        <img className="img third" src="https://lotostkani.ru/cache/imgs/e933d3ed851710006699f45eef854749.jpg"></img>
                        <div className="div-text">
                            <div>
                                <h4>Атлас</h4>
                            </div>
                            <div >
                                <p><b>На ощупь:</b> добавляет утончённости и нарядности</p>
                            </div>
                            <div >
                                <p><b>Эффект в образе:</b> придает элегантность, лёгкость и изысканность</p>
                            </div>
                            <div >
                                <p><b>Сочетания:</b>
                                ✔ Идеален с шерстью и кожей для создания контраста текстур
                                <br/>
                                ✔ Можно комбинировать с прозрачными тканями (шифон, гипюр) для лёгкости</p>
                            </div>
                        </div>
                    </div>


                    <div className="textstyle-block">
                        <img className="img fourth" src={kozha}></img>
                        <div className="div-text">
                            <div>
                                <h4>Кожа</h4>
                            </div>
                            <div >
                                <p><b>На ощупь:</b> гладкая, плотная, прохладная</p>
                            </div>
                            <div >
                                <p><b>Эффект в образе:</b> добавляет дерзости и структуры</p>
                            </div>
                            <div >
                                <p><b>Сочетания:</b>
                                ✔ Отлично смотрится с трикотажем и денимом для сбалансированного повседневного образа
                                <br/>
                                ✔ Можно сочетать с шелком для контраста между мягкостью и жёсткостью</p>
                            </div>
                        </div>
                    </div>


                    <div className="textstyle-block">
                        <img className="img fifth" src="https://tkaniruna.ru/assets/images/products/default/article/36588/832.jpg"></img>
                        <div className="div-text">
                            <div>
                                <h4>Деним</h4>
                            </div>
                            <div >
                                <p><b>На ощупь:</b> плотный, текстурный, грубоватый</p>
                            </div>
                            <div >
                                <p><b>Эффект в образе:</b> создаёт расслабленный, урбанистичный стиль</p>
                            </div>
                            <div >
                                <p><b>Сочетания:</b>
                                ✔ Хорошо смотрится с кашемиром и шерстью для мягкого контраста
                                <br/>
                                ✔ Идеален с хлопковыми рубашками и кожаными аксессуарами</p>
                            </div>
                        </div>
                    </div>                
                </div>
            </div>
        </div>
    );
};

export default Textstyle;