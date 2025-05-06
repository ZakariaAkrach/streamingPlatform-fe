import Rate from "../../components/rate/Rate";
import "./singleCard.scss";
import daredevil from "../../src/images/daredevil-born-again.jpg"

export default function SingleCard() {
  return (
    <div className="home-view-single-card">
      <img src={daredevil} alt="slider-photo" />
      <Rate />
      <h4 className="home-view-single-title-card">Daredevil: Born Again</h4>

      <div className="home-view-card-button">
        <i className="fa-solid fa-play"></i>
        <button>Watch now</button>
      </div>
    </div>
  );
}
