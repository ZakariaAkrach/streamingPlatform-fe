import SingleCard from "../../components/singleCard/SingleCard";
import "./sectionHome.scss";

export default function SectionHome(params) {
  function populateSingleCard() {
    const cards = [];
    for (let i = 0; i < params.data.length; i++) {
      cards.push(
        <SingleCard
          key={params.data[i].id}
          id={params.data[i].id}
          data={params.data[i]}
        />
      );
    }
    return cards;
  }
  return (
    <section className="home-views-movies">
      <h3>{params.title}</h3>
      <div className="home-view-cards">{populateSingleCard()}</div>
    </section>
  );
}
