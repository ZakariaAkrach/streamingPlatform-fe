import { useEffect, useState } from "react";
import Rate from "../../components/rate/Rate";
import "./singleCard.scss";

export default function SingleCard(params) {
  const posterUrl = "https://image.tmdb.org/t/p/w500/";
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [screenWidth]);

  return (
    <div className="home-view-single-card">
      <div className="poster-rate-title">
        <img src={posterUrl + params.data.posterPath} alt="slider-photo" />
        <Rate />
        <h4 className="home-view-single-title-card">{params.data.title}</h4>
      </div>

      {screenWidth > 768 ? <div className="home-view-card-button">
        <i className="fa-solid fa-play"></i>
        <button>Watch now</button>
      </div> : null}
    </div>
  );
}
