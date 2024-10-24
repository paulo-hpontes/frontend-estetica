// CSS
import './Home.css';
import homeIMG from "../../assets/Img-Home/Home.png";
import TextIMG from '../../assets/Img-Home/Home-text.png'

const Home = () => {
  return (
      <section id="home" className='container'>
        <div className='img'>
          <img src={homeIMG} alt="Imagem de apresentação" />
        </div>
        <div className='title'>
          <img src={TextIMG}></img>
          <button className='btn'>Agendar</button>
        </div>
        
      </section>
  );
};

export default Home;
