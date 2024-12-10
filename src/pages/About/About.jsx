import AboutSection from "../../components/sections/AboutComponent/AboutComponent";
import Gallery from "../../components/sections/Gallery/Gallery";
import HowWeWork from "../../components/sections/HowWeWork/HowWeWork";
import Licenses from "../../components/sections/Licenses/Licenses";
import "./About.scss";

const About = () => {
  return (
    <div className="about-page">
      <AboutSection />
      <Gallery />
      <HowWeWork />
      <Licenses />
    </div>
  );
};

export default About;
