import AboutSection from "../../components/sections/About/About";
import HowWeWork from "../../components/sections/HowWeWork/HowWeWork";
import Licenses from "../../components/sections/Licenses/Licenses";
import "./About.scss";

const About = () => {
  return (
    <div className="about-page">
      <AboutSection />
      <HowWeWork />
      <Licenses />
    </div>
  );
};

export default About;
