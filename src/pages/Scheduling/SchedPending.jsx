import "./SchedResult.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";


// React Hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SchedFailure = () => {

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
    if (time <= 0) {
      return navigate("/");
    }
  }, [time, navigate]);

  return (
    <section id="success-sched" className="container">
      <div className="container-result">
        <FontAwesomeIcon icon={faClock} size="8x" color="#ffda05ba" />
        <h1>Pagamento está sendo processado!</h1>
        <p>
          Você será redirecionado em: <strong>{time}</strong>
        </p>
      </div>
    </section>
  );
};

export default SchedFailure;