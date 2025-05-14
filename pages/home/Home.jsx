import { useEffect, useState } from "react";
import SectionHome from "../../components/sectionHome/SectionHome";
import Slider from "../../components/slider/Slider";
import "./home.scss";
import api from "../../api/axiosConfig";

export default function Home() {
  const [trendingMovieData, setTrendingMovieData] = useState([]);
  const [trendingTvShowData, setTrendingTvShowData] = useState([]);
  useEffect(() => {
    api
      .get("/movie/get-trending-movie")
      .then((res) => {
        if (res.data.status === 200) {
          console.log(res.data);
          setTrendingMovieData(res.data.data);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((error) => {
        console.log("Error call /movie/get-trending-movie " + error);
      });


    api
      .get("/movie/get-trending-tv-show")
      .then((res) => {
        if (res.data.status === 200) {
          console.log(res.data);
          setTrendingTvShowData(res.data.data);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((error) => {
        console.log("Error call /movie/get-trending-tv-show " + error);
      });
  }, []);

  return (
    <main className="home-main">
      <Slider />
      <SectionHome title="Trending Movies" data={trendingMovieData} />
      <SectionHome title="Trending Tv Show" data={trendingTvShowData} />
    </main>
  );
}
