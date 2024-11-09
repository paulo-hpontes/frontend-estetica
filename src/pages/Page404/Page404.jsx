import './Page404.css'
const Page404 = () => {
    return (
      <div id='page404' className="container">
        <div className='container-404'>
          <h1>Erro 404: Página não encontrada!</h1>
          <p>A página que você está procurando não existe.</p>
          <button  className='btn' onClick={() => window.history.back()}>Voltar</button>
        </div>
      </div>
    );
  };
  
  export default Page404;
  
  