// CSS
import "./Home.css";
import homeIMG from "../../assets/Img-Home/Home.png";
import { FaAngleDoubleDown } from "react-icons/fa";

// Pages
import Service from "../Service/Service";
import Scheduling from "../Scheduling/Scheduling";
import Contact from "../Contact/Contact";

const Home = () => {
  return (
    <>
      <section id="home" className="container">
        <div className="title">
          <div className="layout">
            <h1>
              Deseja <br /> se sentir <br />
              <span>mais</span> bonita?
            </h1>
            <p>Realce sua beleza de forma natural</p>
            <a href="#scheduling">
              <button className="btn">Agendar</button>
            </a>
          </div>
        </div>
        <div className="img">
          <img src={homeIMG} alt="Imagem de apresentação" />
        </div>
        <div className="cssanimation hu__hu__">
          <FaAngleDoubleDown size={40} />
        </div>
      </section>
      <Service />
      <Scheduling />
      {/* <Contact /> */}
    </>
  );
};

export default Home;
