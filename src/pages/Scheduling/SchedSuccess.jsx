import "./SchedResult.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

// React Hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SchedSuccess = () => {

  const [time, setTime] = useState(5);
  const navigate = useNavigate();

  // timer to navigate
  useEffect(() => {
    if (time <= 0) return;
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);
  
  useEffect(() => {
    if (time <= 0){
      return navigate("/");
    }
  }, [time, navigate]);

  return (
    <section id="success-sched" className="container">
      <div className="container-result">
        <FontAwesomeIcon icon={faCheckCircle} size="8x" color="#2ecc71" />
        <h1>Agendamento realizado com sucesso!</h1>
        <p>Você será redirecionado em: <strong>{time}</strong></p>
      </div>
    </section>
  );
};

export default SchedSuccess;
