import "./SchedResult.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

// React Hooks
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Redux
import { getAllPayment, updatePayment } from "../../slices/paymentSlice";
import { newScheduling } from "../../slices/schedulingSlice";
import Loading from "../../components/Loading/Loading";

const SchedSuccess = () => {
  const { payments, loading } = useSelector((state) => state.payment);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const status = query.get("status");
  const preferenceID = query.get("preference_id");

  const [success, setSuccess] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [time, setTime] = useState(5);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Search all DB info
  useEffect(() => {
    if (!loading && (!payments || payments.length === 0)) {
      dispatch(getAllPayment());
    }
  }, [dispatch, payments, loading]);

  // verify data
  useEffect(() => {
    if (payments && payments.length > 0) {
      const verify = payments.find((pay) => pay.paymentId === preferenceID);
      if (verify) {
        setUpdateId(verify._id);
        setSuccess(true);
      }
    }
  }, [payments, preferenceID]);

  // set schedule for DB after successful verification
  useEffect(() => {
    if (success) {
      const data = JSON.parse(localStorage.getItem("scheduling"));
      if (!data) return;
      dispatch(newScheduling(data));
      localStorage.removeItem("scheduling");
    }
  }, [success, dispatch]);

  // update the payment info
  useEffect(() => {
    if (updateId && status === "approved") {
      const paymentData = {
        id: updateId,
        paymentStatus: status,
      };
      console.log(paymentData);
      dispatch(updatePayment(paymentData));
    }
  }, [updateId, status, dispatch]);


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

  if (loading) {
    return <Loading />;
  }

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
