import "./Scheduling.css";
import { IoAddCircle } from "react-icons/io5";
// import { FaTrashAlt } from "react-icons/fa";

// Calendar
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
const localizer = momentLocalizer(moment);

// React Hooks
import { useState } from "react";

// Components
import Modal from "../../components/Modal/Modal";
// import Message from "../../components/Messages/Message";
// import Loading from "../../components/Loading/Loading";

const Schedulind = () => {
  const [scheduling, setScheduling] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [userName, setUserName] = useState("");

  const dateNow = moment().format('yyyy-MM-DD');

  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleSelectSlot = (slotInfo) => {
    const data = moment(slotInfo.start).format('yyyy-MM-DDTHH:mm');

    console.log(dateNow);
    setSelectedDate(data);
    setUserName("Paulo Teles");
    setModalOpen(true);
  };

  const saveScheduling = (e) => {
    e.preventDefault();

    if (userName && selectedDate) { 
      const newScheduling = {
        title: userName,
        start: new Date(selectedDate),
        end: moment(new Date(selectedDate)).add(1, "hours").toDate(),
      };

      setScheduling([...scheduling, newScheduling]);
      setModalOpen(false);
      setUserName("");
      setSelectedDate("");
    }
  };

  return (
    <section id="scheduling" className="container">
      <div className="title">
        <h2>AGENDAMENTOS</h2>
      </div>
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

          <button type="submit" className="btn">
            Marcar
          </button>
        </form>
      </Modal>
    </section>
  );
};

export default Schedulind;
