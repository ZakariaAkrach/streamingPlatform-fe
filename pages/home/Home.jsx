import SectionHome from "../../components/sectionHome/SectionHome";
import Slider from "../../components/slider/Slider";
import "./home.scss";

export default function Home() {
  return (
    <main className="home-main">
      <Slider />
      <SectionHome />
      <SectionHome />
      <SectionHome />
      <SectionHome />
    </main>
  );
}
