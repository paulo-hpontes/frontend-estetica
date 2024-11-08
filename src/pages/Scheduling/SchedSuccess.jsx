import "./SchedResult.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";


// React Hooks
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";


// Redux
import { getAllPayment, updatePayment } from "../../slices/paymentSlice";

const SchedSuccess = () => {
  const { payments } = useSelector((state) => state.payment);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const status = query.get("status");
  const preferenceID = query.get("preference_id");


  const dispatch = useDispatch();
  


  useEffect(() => {
    dispatch(getAllPayment());
  }, [dispatch]);

  return (
    <section id="success-sched" className="container">
      <div className="container-sucesso">
        <FontAwesomeIcon icon={faCheckCircle} size="5x" color="#2ecc71" />
        <h1>Agendamento realizado com sucesso!</h1>
        <p>Você será redirecionado em: </p>
      </div>
    </section>
  );
};

export default SchedSuccess;
