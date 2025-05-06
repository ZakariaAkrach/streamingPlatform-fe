import SingleCard from "../../components/singleCard/SingleCard";
import "./sectionHome.scss";

export default function SectionHome() {
  return (
    <section className="home-views-movies">
      <h3>Trending</h3>
      <div className="home-view-cards">
        <SingleCard />
        <SingleCard />
        <SingleCard />
        <SingleCard />
        <SingleCard />
        <SingleCard />
        <SingleCard />
      </div>
    </section>
  );
}
