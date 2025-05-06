import Rate from "../rate/Rate";
import "./slider.scss";
import daredevil from "../../src/images/daredevil-born-again.jpg"

export default function Slider() {
  return (
    <section className="home-slider">
      <img
        className="home-background-slider"
        src={daredevil}
        alt="slider-photo"
      />

      <div className="home-information-slider">
        <div className="home-wrapper-information-photo-icon-play">
          <img
            src={daredevil}
            alt="slider-photo"
          />
          <i className="fa-solid fa-circle-play"></i>
        </div>
        <div className="home-information-detail-slider">
          <h2 className="home-information-detail-title-slider">
            Daredevil: Born Again
          </h2>
          <Rate />
          <p className="home-information-detail-description-slider">
            Matt Murdock, a blind lawyer with heightened abilities, is fighting
            for justice through his bustling law firm, while former mob boss
            Wilson Fisk pursues his own political endeavors in New York. When
            their past identities begin to emerge, both men find themselves on
            an inevitable collision course.
          </p>
        </div>
      </div>
    </section>
  );
}
