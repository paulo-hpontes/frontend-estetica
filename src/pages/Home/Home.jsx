// CSS
import './Home.css';
import homeIMG from "../../assets/Img-Home/Home.png";
import Service from '../Service/Service';
import Scheduling from '../Scheduling/Scheduling';

const Home = () => {
  return (
      <>
        <section id="home" className='container'>
          <div className='img'>
            <img src={homeIMG} alt="Imagem de apresentação" />
          </div>
          <div className='title'>
            <div className='layout'>
              <h1>Deseja <br/> se sentir <br/><span>mais</span> bonita?</h1>
              <p>Realce sua beleza de forma natural</p>
              <a  href='#scheduling'><button className='btn'>Agendar</button></a>
            </div>
          </div>
        </section>
        <Service/>
        <Scheduling/> 
      </>
  );
};

export default Home;
