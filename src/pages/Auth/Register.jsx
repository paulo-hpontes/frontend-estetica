import "./Auth.css";

// Components
import Message from "../../components/Messages/Message";

// React Hooks
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { register, reset } from "../../slices/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    dispatch(register(user));
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <section id="login" className="container">
      <div className="form">
        <h1>Cadastre-se</h1>
        <form onSubmit={handleSubmit}>
          {error && <Message msg={error} type="error" />}
          <input
            type="text"
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            type="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input
            type="password"
            placeholder="Confirme a senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          {!loading && (
            <button type="submit" className="btn">
              Entrar
            </button>
          )}
          {loading && (
            <button type="submit" className="btn" disabled>
              Aguarde...
            </button>
          )}
        </form>
        <p>
          Já possui uma conta?<br/> <Link to="/login">Clique aqui</Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
