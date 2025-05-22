import React, { useEffect, useState, useRef } from "react";
import './Home.css';

export default function Home() {
    const [news, setNews] = useState([]);
    const [newsCount, setNewsCount] = useState(3);
    const scrollRef = useRef(null);

    useEffect(() => {
        const settings = localStorage.getItem("adminSettings");
        if (settings) {
            const parsed = JSON.parse(settings);
            if (parsed.newsCount) {
                setNewsCount(parsed.newsCount);
            }
        }
    
        fetch("http://YuliaGracheva.github.io/suzdal_gymnazia/api/news/notArchived")
            .then((res) => res.json())
            .then((data) => {
                const sorted = data
                    .sort((a, b) => new Date(b.NewsDate) - new Date(a.NewsDate))
                    .slice(0, newsCount);
                setNews(sorted);
            });
    }, [newsCount]); 

    useEffect(() => {
        const handleResize = () => {
            if (scrollRef.current) {
                const containerWidth = scrollRef.current.offsetWidth;
                const contentWidth = scrollRef.current.scrollWidth;
                const wrapper = scrollRef.current.parentElement;
                if (wrapper) {
                    if (contentWidth <= containerWidth) {
                        wrapper.classList.add("hide-buttons");
                    } else {
                        wrapper.classList.remove("hide-buttons");
                    }
                }
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [news]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = direction === "left" ? -340 : 340;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <div className="main-info">
            <div>
                <h1>Недавние новости</h1>
                <div className="line-purple"></div>

                <div className="carousel-wrapper">
                    <button className="carousel-button" onClick={() => scroll("left")}>‹</button>

                    <div className="carousel-container" ref={scrollRef}>
                        <div className="carousel-track" style={{ width: `${news.length * 340}px` }}>
                            {news.map((item) => (
                                <div className="news-card" key={item.NewsID}>
                                    <h2>{item.NewsName}</h2>
                                    <p className="news-description">
                                        {item.NewsDescription.length > 150 ? (
                                            <span dangerouslySetInnerHTML={{ __html: item.NewsDescription.substring(0, 150) + "..." }} />
                                        ) : (
                                            <span dangerouslySetInnerHTML={{ __html: item.NewsDescription }} />
                                        )}
                                    </p>
                                    <div className="news-card-bottom">
                                        <p className="news-date">Дата: {new Date(item.NewsDate).toLocaleDateString()}</p>
                                        <a className="view-button" href={`/news/${item.NewsID}`}>Читать далее</a>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                    <button className="carousel-button" onClick={() => scroll("right")}>›</button>
                </div>

                <div className="line-purple"></div>
            </div>
            <div>
                <h1>Важная информация для родителей и учителей!</h1>
                <div className="line-yellow"></div>
                <p className="main-text">Сердечно приветствую вас и надеюсь на то, что знакомство с нашей гимназией будет для вас не только
                    интересным, но и полезным.
                    Частное общеобразовательное учреждение «Суздальская Православная гимназия» - это уникальная школа и не
                    только потому, что эта гимназия была одной из первых, открытых во Владимирской области, православных
                    учебных заведений, ей в 2021 году исполнилось 20 лет, но еще и потому, что за годы своего становления
                    она не только добилась значительных успехов в воспитании детей в православных традициях, но и стала
                    одним из лучших образовательных учреждений во Владимирской области. Наши выпускники – а их из гимназии
                    вышло десять выпусков одиннадцатиклассников, поступали и поступают в различные учебные заведения Москвы,
                    Петербурга, Нижнего Новгорода, Иваново, Владимира. Среди них уже есть дипломаты, переводчики, социологи,
                    инженеры, учителя, врачи, строители. Есть дети, который выбрали путь служения Богу, поступили в духовную
                    семинарию, приняли постриг.
                    Суздальская Православная гимназия уникальна еще и тем, что с 2002 года на ее базе открылось отделение
                    школы искусств. Дети имеют возможность во второй половине дня, не выходя из стен гимназии, учиться игре
                    на различных инструментах: фортепиано, скрипке, баяне, балалайке, учатся вокалу, изобразительному
                    искусству и получают документ об окончании школы искусств государственного образца.
                    Суздальская Православная гимназия уникальна тем, что с 2011 года в ее стенах открылся кадетский класс
                    имени А.В. Суворова для детей с 3 по 11 класс, который работает во второй половине дня, где воспитанники
                    проходят различные военные дисциплины, своими руками создают музейный класс имени А.В. Суворова.
                    Еще один уникальный проект, который успешно работает с 2015 года – это «Школа дошколят», для детей 5-7
                    лет, где их готовят к школе.
                    С 2020 года впервые в Суздальском районе заработали в гимназии курсы для подготовки учащихся к
                    государственной итоговой аттестации по разным предметам.
                    Суздальская Православная гимназия – это яркая атмосфера общегимназических праздников, концертов, с
                    которыми дети выступают в городском доме культуре, в доме престарелых, в детских домах, в
                    реабилитационных центрах и госпиталях; паломнических поездок по различным городам нашей Родины;
                    творческих игр, спортивных соревнований, большой спектр дополнительного образования – вот, чем живут
                    учителя и гимназисты Суздальской Православной гимназии! Хотите узнать больше? Добро пожаловать на наш
                    сайт. Мы многое можем рассказать о нашей гимназии.
                </p>
                <p className="director-name">Директор Аникина Нина Владимировна</p>
                <div className="line-yellow"></div>
            </div>
            <div className="">
                <h1>Услуги в сфере образования</h1>
                <div className="line-purple"></div>
                <div className="button-resurs-view">
                    <a href="https://образование33.рф/elektronnyy-shkola/informatsiya-ob-uchrezhdeniyakh/">
                        <button className="button-resurs">
                            <p>Электронная школа.</p>
                            <p>Информация об учреждениях</p>
                        </button>
                    </a>
                    <a href="https://образование33.рф/auth/">
                        <button className="button-resurs">
                            <p>Электронная школа.</p>
                            <p>Подать заявление</p>
                        </button>
                    </a>
                    <a href="https://образование33.рф/elektronnyy-shkola/proverka-statusa-zayavleniya/">
                        <button className="button-resurs">
                            <p>Электронная школа.</p>
                            <p>Проверка статуса заявления</p>
                        </button>
                    </a>
                    <a href="https://образование33.рф/elektronnyy-shkola/rezultaty-ege-oge/">
                        <button className="button-resurs">
                            <p>Электронная школа.</p>
                            <p>Результаты ЕГЭ\ОГЭ</p>
                        </button>
                    </a>
                    <a href="https://школа.образование33.рф/auth/login-page">
                        <button className="button-resurs">
                            <p>Электронная школа.</p>
                            <p>Электронный дневник</p>
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}
