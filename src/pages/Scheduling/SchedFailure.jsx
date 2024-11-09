import "./SchedResult.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

// Components
import Loading from "../../components/Loading/Loading";

// Redux
import { getAllPayment, deletePayment } from "../../slices/paymentSlice";

// React Hooks
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const SchedFailure = () => {
  const { payments, loading } = useSelector((state) => state.payment);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const preferenceID = query.get("preference_id");

  const [time, setTime] = useState(5);
  const [deleteId, setDeleteId] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  localStorage.removeItem("scheduling");

  // Get DB info
  useEffect(() => {
    if (!loading && (!payments || payments.length === 0)) {
      dispatch(getAllPayment());
    }
  }, [dispatch, payments, loading]);

  // Find the payment by preferenceID
  useEffect(() => {
    if (payments && payments.length > 0) {
      const verify = payments.find((pay) => pay.paymentId === preferenceID);
      if (verify) {
        setDeleteId(verify._id);
      }
    }
  }, [payments, preferenceID]);

  // Delete payment
  useEffect(() => {
    dispatch(deletePayment(deleteId));
    localStorage.removeItem("scheduling");
  }, [deleteId, dispatch]);

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

  if (loading) {
    return <Loading />;
  }
  return (
    <section id="success-sched" className="container">
      <div className="container-result">
        <FontAwesomeIcon icon={faTimesCircle} size="8x" color="#c50101" />
        <h1>Algo deu errado!</h1>
        <p>
          Você será redirecionado em: <strong>{time}</strong>
        </p>
      </div>
    </section>
  );
};

export default SchedFailure;
