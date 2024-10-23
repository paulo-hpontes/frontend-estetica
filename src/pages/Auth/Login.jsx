import "./Auth.css";

// Components
import Message from "../../components/Messages/Message";


// React Hooks
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Redux
import {login, reset} from '../../slices/authSlice';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const {loading, error} = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password
    }

    dispatch(login(user));
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch])

  return (
    <section id="login" className="container">
      <div className="form">
        <h1>
          Faça login para <br/> entrar com sua conta
        </h1>
        <form onSubmit={handleSubmit}>
        {error && <Message msg={error} type='error' />}
          <input
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!loading && <button type="submit" className="btn">Entrar</button>}
          {loading && <button type="submit" className="btn" disabled>Aguarde...</button>}
        </form>
        <p>
          Não tem uma conta? <Link to="/register">Clique aqui</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
