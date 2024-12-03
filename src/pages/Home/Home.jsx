import Hero from "../../components/sections/Hero/Hero";
import HowWeWork from "../../components/sections/HowWeWork/HowWeWork";
import Licenses from "../../components/sections/Licenses/Licenses";
import Partnership from "../../components/sections/Partnership/Partnership";
import Statistics from "../../components/sections/Statistics/Statistics";
import Vacancies from "../../components/sections/Vacancies/Vacancies";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <Statistics />
      <HowWeWork />
      <Vacancies />
      <Partnership />
      <Licenses />
    </div>
  );
};

export default Home;
