// Layout
import "./Service.css";
import { IoAddCircle } from "react-icons/io5";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

// Components
import Modal from "../../components/Modal/Modal";
import Message from "../../components/Messages/Message";
import Loading from "../../components/Loading/Loading";

// React Hooks
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useLayoutEffect } from "react";

// Redux
import {
  newProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  reset,
} from "../../slices/productsSlice";

const Service = () => {
  const { user } = useSelector((state) => state.auth);
  const { products, loading, error, success, message } = useSelector(
    (state) => state.product
  );

  //  Modal for new service
  const [modalOpen, setModalOpen] = useState(false);
  const [productType, setProductType] = useState("");
  const [productName, setProductName] = useState("");
  const [productValue, setProductValue] = useState(0);
  const [time, setTime] = useState(0);

  // Modal for edit service
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [editId, setEditId] = useState("");
  const [editProductName, setEditProductName] = useState("");
  const [editProductValue, setEditProductValue] = useState(0);
  const [editTime, setEditTime] = useState(0);

  const dispatch = useDispatch();

  const resetMessage = () => {
    setTimeout(() => {
      dispatch(reset());
    }, 3000);
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleSelectChange = (e) => setProductType(e.target.value);

  const handleOpenEditModal = (product) => {
    setProductType(product.serviceType);
    setEditId(product._id);
    setEditProductName(product.serviceName);
    setEditProductValue(product.serviceValue);
    setEditTime(product.time);
    setModalEditOpen(true);
  };
  const handleCloseEditModal = () => setModalEditOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      serviceType: productType,
      serviceName: productName,
      serviceValue: productValue,
      time,
    };

    await dispatch(newProduct(data));

    setProductType("");
    setProductName("");
    setProductValue(0);
    setTime(0);
    setModalOpen(false);

    resetMessage();
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const data = {
      serviceName: editProductName,
      serviceValue: editProductValue,
      id: editId,
    };

    await dispatch(updateProduct(data));

    setProductType("");
    setEditProductName("");
    setEditProductValue(0);
    setModalEditOpen(false);

    resetMessage();
  };

  const handleDeleteService = async (id) => {
    await dispatch(deleteProduct(id));
    resetMessage();
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const { ref: ref3, inView: inView3 } = useInView({
    threshold: 0.5,
  });

  useLayoutEffect(() => {
    const animations = document.querySelectorAll(".hidden-service");
    if (inView || inView3) {
      animations.forEach((el) => {
        el.classList.add("show-service");
      });
    }
  }, [inView, inView3]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section id="services" className="container" >
      <div className="title-service hidden-service" ref={ref}>
        <h2>Serviços</h2>
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
      <div className="container-services" ref={ref3}>
        <div className="services-content hidden-service">
          <h3>Cílios</h3>
          {products &&
            products.map((product) => (
              <span key={product._id}>
                {product.serviceType === "cilios" ? (
                  <div className="services-details">
                    <p>{product.serviceName.toUpperCase()}</p>
                    <p>R$: {product.serviceValue}</p>
                    {user && user.admin && (
                      <div>
                        <button
                          className="btn"
                          onClick={() => handleDeleteService(product._id)}
                        >
                          <FaTrashAlt />
                        </button>

                        <button
                          className="btn"
                          onClick={() => handleOpenEditModal(product)}
                        >
                          <FaEdit />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </span>
            ))}
        </div>
        <div className="services-content hidden-service">
          <h3>Sobrancelhas</h3>
          {products &&
            products.map((product) => (
              <span key={product._id}>
                {product.serviceType === "Sobrancelhas" ? (
                  <div className="services-details">
                    <p>{product.serviceName.toUpperCase()}</p>
                    <p>R$: {product.serviceValue}</p>
                    {user && user.admin && (
                      <div>
                        <button
                          className="btn"
                          onClick={() => handleDeleteService(product._id)}
                        >
                          <FaTrashAlt />
                        </button>

                        <button
                          className="btn"
                          onClick={() => handleOpenEditModal(product)}
                        >
                          <FaEdit />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </span>
            ))}
        </div>
        <div className="services-content hidden-service">
          <h3>Depilação</h3>
          {products &&
            products.map((product) => (
              <span key={product._id}>
                {product.serviceType === "Depilacao" ? (
                  <div className="services-details">
                    <p>{product.serviceName.toUpperCase()}</p>
                    <p>R$: {product.serviceValue}</p>
                    {user && user.admin && (
                      <div>
                        <button
                          className="btn"
                          onClick={() => handleDeleteService(product._id)}
                        >
                          <FaTrashAlt />
                        </button>

                        <button
                          className="btn"
                          onClick={() => handleOpenEditModal(product)}
                        >
                          <FaEdit />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </span>
            ))}
        </div>
      </div>

      {user && user.admin && (
        <>
          <button className="btn open-modal" onClick={handleOpenModal}>
            <IoAddCircle />
          </button>
          <Modal
            isOpen={modalOpen}
            onClose={handleCloseModal}
            onSubmit={handleSubmit}
          >
            <h3 className="title-modal">NOVO SERVIÇO</h3>
            <small>{error && <Message msg={error} type="error" />}</small>
            <form className="form" onSubmit={handleSubmit}>
              {error && (
                <small>
                  <Message msg={error.message} type="error" />
                </small>
              )}
              <select
                value={productType}
                onChange={handleSelectChange}
                required
              >
                <option value="">Selecione uma opção</option>
                <option value="cilios">Cílios</option>
                <option value="Sobrancelhas">Sobranchelhas</option>
                <option value="Depilacao">Depilação</option>
              </select>

              <label>
                <span>Título do serviço:</span>
                <input
                  type="text"
                  placeholder="Serviço"
                  onChange={(e) => setProductName(e.target.value)}
                  value={productName}
                  required
                />
              </label>

              <label>
                <span>Valor do serviço:</span>
                <input
                  type="number"
                  placeholder="Valor R$"
                  onChange={(e) => setProductValue(e.target.value)}
                  required
                />
              </label>
              
              <label>
                <span>Tempo de duração (hrs):</span>
                <input
                  type="number"
                  placeholder="Duração"
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </label>
              {!loading && (
                <button type="submit" className="btn">
                  Adicionar
                </button>
              )}
              {loading && <button disabled>Aguarde...</button>}
            </form>
          </Modal>

          {/* Edit Modal */}
          <Modal
            isOpen={modalEditOpen}
            onClose={handleCloseEditModal}
            onSubmit={handleEditSubmit}
          >
            <h3 className="title-modal">EDITE SEU SERVIÇO</h3>
            <form className="form" onSubmit={handleEditSubmit}>
              {error && (
                <small>
                  <Message msg={error.message} type="error" />
                </small>
              )}
              <select value={productType} disabled required>
                <option value="">Selecione uma opção</option>
                <option value="cilios">Cílios</option>
                <option value="Sobrancelhas">Sobranchelhas</option>
                <option value="Depilacao">Depilação</option>
              </select>

              <label>
                <span>Título do serviço:</span>
                <input
                  type="text"
                  placeholder="Serviço"
                  onChange={(e) => setEditProductName(e.target.value)}
                  value={editProductName}
                  required
                />
              </label>

              <label>
                <span>Valor do serviço:</span>
                <input
                  type="number"
                  placeholder="Valor R$"
                  onChange={(e) => setEditProductValue(e.target.value)}
                  value={editProductValue}
                  required
                />
              </label>
              
              <label>
                <span>Tempo de duração (horas):</span>
                <input
                  type="number"
                  placeholder="Duração"
                  onChange={(e) => setEditTime(e.target.value)}
                  value={editTime}
                  required
                />
              </label>
              {!loading && (
                <button type="submit" className="btn">
                  Atualizar
                </button>
              )}
              {loading && <button disabled>Aguarde...</button>}
            </form>
          </Modal>
        </>
      )}
    </section>
  );
};

export default Service;
