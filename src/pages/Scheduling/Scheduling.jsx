import "./Scheduling.css";
import { IoAddCircle } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

// Calendar
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import momentBr from "../../utils/momentConfig";

// React Hooks
import { useEffect, useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Components
import Modal from "../../components/Modal/Modal";
import Message from "../../components/Messages/Message";
import Loading from "../../components/Loading/Loading";

// Redux
import { profile } from "../../slices/userSlice";
import {
  newScheduling,
  getAllScheduling,
  deleteScheduling,
  reset,
} from "../../slices/schedulingSlice";

const Scheduling = () => {
  const { user, loading: loadingUser } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);
  const { products, loading: loadingProd } = useSelector(
    (state) => state.product
  );
  const { schedulings, loading, success, error, message } = useSelector(
    (state) => state.scheduling
  );

  // Store the data in the right order for the calendar
  const [events, setEvents] = useState([]);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHours, setSelectedHours] = useState("");
  const [userName, setUserName] = useState("");

  // Store the service Type
  const [service, setService] = useState("");

  // Stores the name by service Type
  const [filterService, setFilterService] = useState([]);

  // Store the service name choice
  const [selectedService, setSelectedService] = useState([]);

  const dateNow = momentBr().format("yyyy-MM-DD");
  const hoursNow = momentBr().format("HH:mm");
  const localizer = momentLocalizer(momentBr);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const resetMessage = () => {
    setTimeout(() => {
      dispatch(reset());
    }, 3000);
  };

  // Set the Service Name
  const handleSelectService = (e) => setSelectedService(e.target.value);

  // Set the Service Type and the options for service name
  const handleSelectChange = (e) => {
    setService(e.target.value);
    const filterService = products.filter((prod) => {
      if (prod.serviceType === e.target.value) return prod;
    });
    setFilterService(filterService);
  };

  // Open and Close modal
  const handleCloseModal = () => setModalOpen(false);
  const handleOpenModal = () => {
    if (user) setUserName(user.name);
    setSelectedHours(hoursNow);
    setSelectedDate(dateNow);
    setModalOpen(true);
  };

  // Open modal by selected slot
  const handleSelectSlot = (slotInfo) => {
    const data = momentBr(slotInfo.start).format("yyyy-MM-DD");
    const hours = momentBr(slotInfo.start).format("HH:mm");

    setSelectedDate(data);
    setSelectedHours(hours);
    if (user) setUserName(user.name);
    setModalOpen(true);
  };

  // Handle scheduling submit
  const saveScheduling = (e) => {
    e.preventDefault();

    if (!userAuth) {
      return navigate("/login");
    }

    const dataStart = selectedDate + "T" + selectedHours;

    const data = {
      title: userName,
      start: new Date(dataStart),
      end: momentBr(new Date(dataStart)).add(1, "hours"),
      service: {
        type: service,
        name: selectedService,
      },
      userEmail: user.email,
    };

    dispatch(newScheduling(data));
    setModalOpen(false);
    setUserName("");
    setSelectedDate("");
    setSelectedHours("");
    setService("");
    setSelectedService("");
    resetMessage();
  };

  const handleDelete = (id) => {
    dispatch(deleteScheduling(id));
    resetMessage();
  };

  // Organizing scheduling info for the Calendar
  useEffect(() => {
    const newEvent = schedulings.map((el) => {
      const data = {
        id: el._id,
        title: el.title,
        start: new Date(el.start),
        end: new Date(el.end),
        service: {
          type: el.typeService,
          name: el.nameService,
        },
        userEmail: el.userEmail,
      };
      return data;
    });
    setEvents(newEvent);
  }, [schedulings]);

  useEffect(() => {
    dispatch(profile());
    dispatch(getAllScheduling());
  }, [dispatch]);

  const { ref: ref1, inView } = useInView({
    threshold: 0.5,
  });

  useLayoutEffect(() => {
    const animations = document.querySelectorAll(".hidden-sched");
    if (inView) {
      animations.forEach((el) => {
        el.classList.add("show-sched");
      });
    }
  }, [inView]);

  if (loading || loadingUser || loadingProd) {
    return <Loading />;
  }

  return (
    <section id="scheduling" className="container">
      <div className="title hidden-sched" ref={ref1}>
        <h2>Agendamentos</h2>
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
        <div className="calendar hidden-sched">
          <Calendar
            localizer={localizer}
            culture="pt-br"
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable={true}
            onSelectSlot={handleSelectSlot}
            defaultView="day"
            messages={{
              next: "PRÓXIMO",
              previous: "ANTERIOR",
              today: "HOJE",
              month: "MÊS",
              week: "SEMANA",
              day: "DIA",
              agenda: "AGENDA",
              date: "Data",
              time: "Horário",
              event: "Cliente"
            }}
          />
        </div>
        <div className="scheduling-info hidden-sched">
          <div className="personal-scheduling">
            <h3>Meus Agendamentos</h3>
            {schedulings &&
              user &&
              schedulings.map((sched) => (
                <span key={sched._id}>
                  {user.email === sched.userEmail ? (
                    <div className="scheduling-details">
                      <div>
                        <h4>{sched.title.toUpperCase()}</h4>
                        <p>
                          {sched.service.typeService}:{" "}
                          {sched.service.nameService}
                        </p>
                      </div>
                      <div>
                        <p>{momentBr(sched.start).format("L")}</p>
                        <p>{momentBr(sched.start).fromNow()}</p>
                      </div>
                      <button
                        className="btn"
                        onClick={() => handleDelete(sched._id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* {user && user.admin && (
                        <div className="scheduling-details">
                          <div>
                            <h4>{sched.title.toUpperCase()}</h4>
                            <p>
                              {sched.service.typeService}:{" "}
                              {sched.service.nameService}
                            </p>
                          </div>
                          <div>
                            <p>{momentBr(sched.start).format("L")}</p>
                            <p>{momentBr(sched.start).fromNow()}</p>
                          </div>
                          <button
                            className="btn"
                            onClick={() => handleDelete(sched._id)}
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      )} */}
                    </>
                  )}
                </span>
              ))}
          </div>
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

        <form className="form" onSubmit={saveScheduling}>
          <label>
            <span>Cliente: </span>
            <input type="text" value={userName} required disabled />
          </label>

          <label>
            <span>Data:</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={dateNow}
              required
            />
          </label>

          {dateNow >= selectedDate ? (
            <>
              {hoursNow > "19:00" || hoursNow > selectedHours ? (
                <>
                  <label>
                    <span>Horário:</span>
                    <input
                      type="time"
                      value={selectedHours}
                      onChange={(e) => setSelectedHours(e.target.value)}
                      min="08:00"
                      max="19:00"
                      required
                    />
                  </label>

                  <select value={""} required disabled>
                    <option value="">Selecione uma opção</option>
                  </select>
                </>
              ) : (
                <>
                  <label>
                    <span>Horário:</span>
                    <input
                      type="time"
                      value={selectedHours}
                      onChange={(e) => setSelectedHours(e.target.value)}
                      min="08:00"
                      max="19:00"
                      required
                    />
                  </label>

                  <select
                    value={service}
                    onChange={handleSelectChange}
                    required
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="cilios">Cílios</option>
                    <option value="Sobrancelhas">Sobranchelhas</option>
                    <option value="Depilacao">Depilação</option>
                  </select>
                </>
              )}
            </>
          ) : (
            <>
              <label>
                <span>Horário:</span>
                <input
                  type="time"
                  value={selectedHours}
                  onChange={(e) => setSelectedHours(e.target.value)}
                  min="08:00"
                  max="19:00"
                  required
                />
              </label>

              <select value={service} onChange={handleSelectChange} required>
                <option value="">Selecione uma opção</option>
                <option value="cilios">Cílios</option>
                <option value="Sobrancelhas">Sobranchelhas</option>
                <option value="Depilacao">Depilação</option>
              </select>
            </>
          )}

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

export default Scheduling;
