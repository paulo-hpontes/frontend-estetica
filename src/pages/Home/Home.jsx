// CSS
import './Home.css';
import homeIMG from "../../assets/Home.png";

const Home = () => {
  return (
    <main>
      <section id="home" className='container'>
        <div className='title'>
          <h1>Deseja se sentir mais bonita?</h1>
          <p>Realce sua beleza <br/> de forma natural</p>
          <button className='btn'>Agendar</button>
        </div>
        <div className='img'>
          <img src={homeIMG} alt="Imagem de apresentação" />
        </div>
      </section>
    </main>
  );
};

export default Home;
