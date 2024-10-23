// CSS
import './Home.css';
import homeIMG from "../../assets/Home.png";

const Home = () => {
  return (
    <main>
      <section id="home" className='container'>
        <div>
          <h1>Deseja se sentir mais bonita?</h1>
          <p>Realce sua beleza de forma natural</p>
          <button>Agendar</button>
        </div>
        <div>
          <img src={homeIMG} alt="Imagem de apresentação" />
        </div>
      </section>
    </main>
  );
};

export default Home;
