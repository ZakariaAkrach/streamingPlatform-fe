import Rate from "../rate/Rate";
import "./slider.scss";
import daredevil from "../../src/images/daredevil-born-again.jpg";
import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import { Link } from "react-router-dom";

export default function Slider() {
  const posterUrl = "https://image.tmdb.org/t/p/original/";
  const imgCastUrl = "https://image.tmdb.org/t/p/w500/";

  const [posterPath, setPosterPath] = useState("");
  const [backdropPath, setBackdropPath] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [data, setData] = useState([])

  useEffect(() => {
    api
      .get(
        "movie/get-all-movie?size=1&title=Asterix & Obelix: The Middle Kingdom"
      )
      .then((res) => {
        setPosterPath(res.data.data[0].posterPath);
        setBackdropPath(res.data.data[0].backdropPath);
        setTitle(res.data.data[0].title);
        setDescription(res.data.data[0].description);
        setId(res.data.data[0].id);
        setData(res.data.data[0])
      });
  });

  return (
    <section className="home-slider">
      <img
        className="home-background-slider"
        src={posterUrl + backdropPath}
        alt="slider-photo"
      />

      <div className="home-information-slider">
        <div className="home-wrapper-information-photo-icon-play">
          <img src={imgCastUrl + posterPath} alt="slider-photo" />
          <Link to={`/content-detail/${id}`} state={{data: data}}>
            <i className="fa-solid fa-circle-play"></i>
          </Link>
        </div>
        <div className="home-information-detail-slider">
          <h2 className="home-information-detail-title-slider">{title}</h2>
          <Rate />
          <p className="home-information-detail-description-slider">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
