import "./Scheduling.css";
import { IoAddCircle, IoSettings } from "react-icons/io5";
import { FaTrashAlt, FaCalendarAlt } from "react-icons/fa";

// Calendar
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import momentBr from "../../utils/momentConfig";

// React Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// Components
import Modal from "../../components/Modal/Modal";
import ModalAlert from "../../components/ModalAlert/ModalAlert";
import Message from "../../components/Messages/Message";
import Loading from "../../components/Loading/Loading";

// Redux
import { profile } from "../../slices/userSlice";
import { generatePaymentLink } from "../../slices/paymentSlice";
import {
  getAllDays,
  newDayOff,
  deleteDayOff,
  reset as resetDay,
} from "../../slices/dayOffSlice";
import {
  getAllScheduling,
  deleteScheduling,
  reset,
} from "../../slices/schedulingSlice";

const Scheduling = () => {
  // redux-states
  const { link, loading: loadingPay } = useSelector((state) => state.payment);
  const { user, loading: loadingUser } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);
  const { products, loading: loadingProd } = useSelector(
    (state) => state.product
  );
  const { schedulings, loading, success, error, message } = useSelector(
    (state) => state.scheduling
  );
  const {
    daysOff,
    error: errorDay,
    success: successDay,
    loading: loadingDay,
    message: messageDay,
  } = useSelector((state) => state.dayOff);

  const [events, setEvents] = useState([]); // Store the data in the right order for the calendar

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHours, setSelectedHours] = useState("");
  const [userName, setUserName] = useState("");
  const [service, setService] = useState(""); // Store the service Type
  const [filterService, setFilterService] = useState([]); // Stores the service's name according service Type
  const [selectedService, setSelectedService] = useState([]); // Store the service name choice

  // Alert Modal
  const [openAlert, setOpenAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const handleCloseAlert = () => setOpenAlert(false);

  // DaysOff Modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedDayOff, setSelectedDayOff] = useState("");

  // Scheduling filter
  const [userSched, setUserSched] = useState(null);

  const dateNow = momentBr().format("yyyy-MM-DD");
  const hoursNow = momentBr().format("HH:mm");
  const localizer = momentLocalizer(momentBr);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const resetMessage = () => {
    setTimeout(() => {
      dispatch(reset());
      dispatch(resetDay());
    }, 6000);
  };

  // ******************** DaysOff Controllers ******************** //

  // Open and Close daysOff modal
  const handleOpenDaysOffModal = () => setOpenModal(true);
  const handleCloseDaysOffModal = () => setOpenModal(false);

  // Days off Submit
  const handleDaysOffSubmit = (e) => {
    e.preventDefault();

    const data = {
      date: new Date(momentBr(selectedDayOff)),
    };

    dispatch(newDayOff(data));
    setSelectedDayOff("");
    resetMessage();
    setOpenModal(false);
  };

  // Delete DayOff
  const handleDeleteDay = (id) => {
    dispatch(deleteDayOff(id));
    resetMessage();
  };

  const verifyDayOff = (selectDay) => {
    let verify = [];
    if (daysOff.length) {
      verify = daysOff.filter((day) => {
        if (momentBr(selectDay).format("l") === momentBr(day.date).format("l"))
          return day;
      });
    }
    if (verify.length) {
      return true;
    }
    return false;
  };

  // ******************** Scheduling Controllers ******************** //

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

  const schedulingAlert = () => {
    setMessageAlert(
      "Para garantir sua reserva, " +
        "solicitamos um depósito de R$10. " +
        "Este valor será deduzido do seu pagamento total"
    );
    setOpenAlert(true);
  };

  const reminderModal = (msg) => {
    setMessageAlert(msg);
    setOpenAlert(true);
  };

  // Open and Close modal
  const handleCloseModal = () => setModalOpen(false);
  const handleOpenModal = () => {
    if (!userAuth) {
      return navigate("/login");
    }

    schedulingAlert();
    setUserName(user.name);
    setSelectedHours(hoursNow);
    setSelectedDate(dateNow);
    setModalOpen(true);
  };

  // Open modal by selected slot
  const handleSelectSlot = (slotInfo) => {
    const data = momentBr(slotInfo.start).format("yyyy-MM-DD");
    const dia = momentBr(slotInfo.start).format("dddd");
    const hours = momentBr(slotInfo.start).format("HH:mm");

    if (!userAuth) {
      return navigate("/login");
    }

    if (dia === "Domingo" || dia === "Segunda-Feira") {
      reminderModal("Não abrimos aos Domingos e Segundas");
      return;
    }
    if (data < dateNow) {
      reminderModal("Dia Indisponível");
      return;
    }

    const verify = verifyDayOff(data);
    if (verify) {
      reminderModal("Dia Indisponível");
      return;
    }

    schedulingAlert();
    setSelectedDate(data);
    setSelectedHours(hours);
    setUserName(user.name);
    setModalOpen(true);
  };

  // Delete Scheduling
  const handleDelete = (id) => {
    dispatch(deleteScheduling(id));
    resetMessage();
  };

  // Payment for schedule
  const handlePayment = (e) => {
    e.preventDefault();

    const dia = momentBr(selectedDate).format("dddd");
    if (dia === "Domingo" || dia === "Segunda-Feira") {
      reminderModal("Não abrimos aos Domingos e Segundas");
      return;
    }

    const verify = verifyDayOff(selectedDate);
    if (verify) return reminderModal("Dia Indisponível");

    if (selectedDate === dateNow && selectedHours <= hoursNow) {
      return reminderModal("Horário indisponível");
    }

    const prodInfo = products.filter((prod) => {
      if (prod.serviceName === selectedService) return prod;
    });

    const paymentData = {
      id: prodInfo[0]._id,
      unitPrice: 10,
    };

    localStorage.removeItem("scheduling");
    handleSubmit(prodInfo);
    dispatch(generatePaymentLink(paymentData));
  };

  // Form scheduling
  const handleSubmit = (prodInfo) => {
    const dataStart = selectedDate + "T" + selectedHours;

    const SchedulingData = {
      title: userName,
      start: new Date(dataStart),
      end: momentBr(new Date(dataStart)).add(prodInfo[0].time, "hours"),
      service: {
        type: service,
        name: selectedService,
      },
      userEmail: user.email,
    };

    localStorage.setItem("scheduling", JSON.stringify(SchedulingData));
    setModalOpen(false);
    setUserName("");
    setSelectedDate("");
    setSelectedHours("");
    setService("");
    setSelectedService("");
    resetMessage();
  };

  // Navigatr to payment link
  useEffect(() => {
    if (link) window.location.href = link;
  }, [link]);

  // Verify if user has schedule or user is Admin
  useEffect(() => {
    if (user && schedulings) {
      const verify = schedulings.filter((sched) => {
        if (user.admin || user.email === sched.userEmail){
          return sched;
        }
      });
      if (verify.length){
        setUserSched(verify);
      }
    }
  }, [user, schedulings]);

  // Organizing scheduling info for the Calendar
  useEffect(() => {
    const newEvent = schedulings.map((el) => {
      const data = {
        id: el._id,
        start: new Date(el.start),
        end: new Date(el.end),
      };
      return data;
    });
    setEvents(newEvent);
  }, [schedulings]);

  useEffect(() => {
    dispatch(profile());
    dispatch(getAllScheduling());
    dispatch(getAllDays());
  }, [dispatch]);

  if (loading || loadingUser || loadingProd || loadingDay || loadingPay) {
    return <Loading />;
  }

  return (
    <section id="scheduling" className="container">
      <div className="title">
        <h2>Agendamentos</h2>
      </div>
      {(success || successDay) && (
        <small>
          <Message msg={message || messageDay} type="success" />
        </small>
      )}
      {(error || errorDay) && (
        <small>
          <Message msg={message || messageDay} type="error" />
        </small>
      )}

      {daysOff.length > 0 && (
        <div className="daysoff">
          <h3>
            Dias indisponíveis
            <br />
            para agendamento:
          </h3>
          {daysOff.map((day) => (
            <p key={day._id}>
              {momentBr(day.date).format("L")}
              {user && user.admin && (
                <button
                  className="btn"
                  onClick={() => handleDeleteDay(day._id)}
                >
                  <FaTrashAlt />
                </button>
              )}
            </p>
          ))}
        </div>
      )}
      <div className="scheduling-content">
        <div className="calendar">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            longPressThreshold={100}
            selectable={true}
            onSelectSlot={handleSelectSlot}
            defaultView="month"
            views={["week", "month"]}
            messages={{
              next: "PRÓXIMO",
              previous: "ANTERIOR",
              today: "HOJE",
              month: "MÊS",
              week: "SEMANA",
              day: "DIA",
            }}
          />
        </div>
        <div className="scheduling-info">
          <div className="personal-scheduling">
            {userAuth ? (
              <>
                <h3>Meus Agendamentos</h3>
                {userSched ? (
                  <>
                    {userSched.map((sched) => (
                      <div className="scheduling-details" key={sched._id}>
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
                    ))}
                  </>
                ) : (
                  <div className="no-scheduling">
                    <p> Parece que você ainda não tem agendamento conosco!</p>
                    <FaCalendarAlt size={60} />
                    <p>
                      Escolha uma data no calendário ou vá em &quot;Novo
                      Agendamento&quot;
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="noUser-scheduling">
                <p>Faça login e realize o agendamento do serviço desejado!</p>
                <FaCalendarAlt size={60} />
                <p>
                  Para realizar o login <Link to={"/login"}>clique aqui</Link>
                </p>
              </div>
            )}
          </div>
          <div>
            <button className="btn open-modal" onClick={handleOpenModal}>
              Novo Agendamento <IoAddCircle />
            </button>
            {user && user.admin && (
              <button
                className="btn open-modal"
                onClick={handleOpenDaysOffModal}
              >
                <IoSettings />
              </button>
            )}
          </div>
        </div>
      </div>

      <ModalAlert isOpen={openAlert} onClose={handleCloseAlert}>
        <h3 className="title-modal">LEMBRETE</h3>
        <p>{messageAlert}</p>
      </ModalAlert>

      <Modal isOpen={openModal} onClose={handleCloseDaysOffModal}>
        <h3 className="title-modal">SELECIONE O DIA</h3>
        <form onSubmit={handleDaysOffSubmit}>
          <p className="describe">
            O dia selecionado ficará indisponível para agendamento
          </p>
          <label>
            <span>Data:</span>
            <input
              type="date"
              value={selectedDayOff}
              onChange={(e) => setSelectedDayOff(e.target.value)}
              min={dateNow}
              required
            />
          </label>
          <button type="submit" className="btn">
            Adicionar
          </button>
        </form>
      </Modal>

      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        <h3 className="title-modal">NOVO AGENDAMENTO</h3>

        <form className="form" onSubmit={handlePayment}>
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

          {filterService && filterService.length > 0 ? (
            <select
              value={String(selectedService)}
              onChange={handleSelectService}
              required
            >
              <option value="">Selecione uma opção</option>
              {filterService.map((service) => (
                <option value={service.serviceName} key={service._id}>
                  {service.serviceName}
                </option>
              ))}
            </select>
          ) : (
            <></>
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
