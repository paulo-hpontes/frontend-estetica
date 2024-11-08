import "./SchedResult.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
// faTimesCircle


const SchedFailure = () => {
  

  return (
    <section id="success-sched" className="container">
      <div className="container-sucesso">
        <FontAwesomeIcon icon={faTimesCircle} size="5x" color="#c50101" />
        <h1>Agendamento não pôde ser concluído!</h1>
        <p>Você será redirecionado em: </p>
      </div>
    </section>
  );
};

export default SchedFailure;
