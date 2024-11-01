import "./Scheduling.css";
import { IoAddCircle } from "react-icons/io5";
// import { FaTrashAlt } from "react-icons/fa";

// Calendar
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
const localizer = momentLocalizer(moment);

// React Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Components
import Modal from "../../components/Modal/Modal";
import Message from "../../components/Messages/Message";

// Redux
import { profile } from "../../slices/userSlice";
import {
  newScheduling,
  getAllScheduling,
  reset,
} from "../../slices/schedulingSlice";


const Schedulind = () => {
  const { user } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.product);
  const { schedulings, loading, success, error, message } = useSelector(
    (state) => state.scheduling
  );

  const [scheduling, setScheduling] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [userName, setUserName] = useState("");
  const [selectedService, setSelectedService] = useState([]);
  const [filterService, setFilterService] = useState([]);
  const [service, setService] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const dateNow = moment().format("yyyy-MM-DD");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const resetMessage = () => {
    setTimeout(() => {
      dispatch(reset());
    }, 3000);
  };

  const handleOpenModal = () => {
    if (!userAuth) {
      return navigate("/login");
    }
    if (user) setUserName(user.name);
    setModalOpen(true);
  };
  const handleCloseModal = () => setModalOpen(false);
  const handleSelectService = (e) => setSelectedService(e.target.value);

  const handleSelectChange = (e) => {
    setService(e.target.value);
    const filterService = products.filter((prod) => {
      if (prod.serviceType === e.target.value) return prod;
    });
    setFilterService(filterService);
  };

  const handleSelectSlot = (slotInfo) => {
    const data = moment(slotInfo.start).format("yyyy-MM-DDTHH:mm");

    setSelectedDate(data);
    if (user) setUserName(user.name);
    setModalOpen(true);
  };

  const saveScheduling = (e) => {
    e.preventDefault();

    const data = {
      title: userName,
      start: new Date(selectedDate),
      end: moment(new Date(selectedDate)).add(1, "hours"),
      service: {
        type: service,
        name: selectedService,
      },
    };

    dispatch(newScheduling(data));
    setModalOpen(false);
    setUserName("");
    setSelectedDate("");
    setService("");
    setSelectedService("");
    resetMessage();
  };

  useEffect (() => {
    dispatch(profile());
    dispatch(getAllScheduling()); 
  }, [dispatch]);

  return (
    <section id="scheduling" className="container">
      <div className="title">
        <h2>AGENDAMENTOS</h2>
      </div>
      {success && (
        <small>
          <Message msg={message} type="success" />
        </small>
      )}
      {error && (
        <small>
          <Message msg={message} type="error" />
        </small>
      )}
      <div className="scheduling-content">
        <div className="calendar">
          <Calendar
            localizer={localizer}
            events={scheduling}
            startAccessor="start"
            endAccessor="end"
            selectable={true}
            onSelectSlot={handleSelectSlot}
          />
        </div>
        <div className="scheduling-info">
          <button className="btn open-modal" onClick={handleOpenModal}>
            Novo Agendamento <IoAddCircle />
          </button>
          <div className="personal-scheduling">
            <h3>Meus Agendamentos</h3>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSubmit={saveScheduling}
      >
        <h3>NOVO AGENDAMENTO</h3>
        {/* <small>{error && <Message msg={error} type="error" />}</small> */}
        <form className="form" onSubmit={saveScheduling}>
          <label>
            <span>Cliente: </span>
            <input type="text" value={userName} required disabled />
          </label>

          <label>
            <span>Data:</span>
            <input
              type="datetime-local"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={`${dateNow}T08:00`}
              required
            />
          </label>

          <select value={service} onChange={handleSelectChange} required>
            <option value="">Selecione uma opção</option>
            <option value="cilios">Cílios</option>
            <option value="Sobrancelhas">Sobranchelhas</option>
            <option value="Depilacao">Depilação</option>
          </select>

          {service && (
            <>
              <select
                value={selectedService}
                onChange={handleSelectService}
                required
              >
                <option value="">Selecione uma opção</option>
                {filterService &&
                  filterService.map((service) => (
                    <option value={service.serviceName} key={service._id}>
                      {service.serviceName}
                    </option>
                  ))}
              </select>
            </>
          )}

          {!loading && (
            <button type="submit" className="btn">
              Marcar
            </button>
          )}
          {loading && <button disabled>Aguarde...</button>}
        </form>
      </Modal>
    </section>
  );
};

export default Schedulind;
