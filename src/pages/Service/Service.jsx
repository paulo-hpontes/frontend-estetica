import "./Service.css";
import { IoAddCircle } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";

// Components
import Modal from "../../components/Modal/Modal";
import Message from "../../components/Messages/Message";
import Loading from "../../components/Loading/Loading";

// React Hooks
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

// Redux
import {
  newProduct,
  getAllProducts,
  deleteProduct,
  reset,
} from "../../slices/productsSlice";

const Service = () => {
  const { user } = useSelector((state) => state.auth);
  const { products, loading, error, success, message } = useSelector(
    (state) => state.product
  );

  const [modalOpen, setModalOpen] = useState(false);

  const [productType, setProductType] = useState("");
  const [productName, setProductName] = useState("");
  const [productValue, setProductValue] = useState(0);

  const dispatch = useDispatch();

  const resetMessage = () => {
    setTimeout(() => {
      dispatch(reset());
    }, 3000);
  }

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleSelectChange = (e) => setProductType(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      serviceType: productType,
      serviceName: productName,
      serviceValue: productValue,
    };

    await dispatch(newProduct(data));

    setProductType("");
    setProductName("");
    setProductValue();
    setModalOpen(false);

    resetMessage();
  };
  
  const handleDeleteService = async (id) => {
    await dispatch(deleteProduct(id));
    resetMessage();
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section id="services" className="container">
      <div className="title">
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
      <div className="container-services">
        <div className="services-content">
          <h3>CÍLIOS</h3>
          {products &&
            products.map((product) => (
              <span key={product._id}>
                {product.serviceType === "cilios" ? (
                  <div>
                    <p>{product.serviceName.toUpperCase()}</p>
                    <p>R$: {product.serviceValue}</p>
                    {user && user.admin && (
                      <button
                        className="btn"
                        onClick={() => handleDeleteService(product._id)}
                      >
                        <FaTrashAlt />
                      </button>
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </span>
            ))}
        </div>
        <div className="services-content">
          <h3>SOBRANCELHAS</h3>
          {products &&
            products.map((product) => (
              <span key={product._id}>
                {product.serviceType === "Sobrancelhas" ? (
                  <div key={product._id}>
                    <p>{product.serviceName.toUpperCase()}</p>
                    <p>R$: {product.serviceValue}</p>
                    {user && user.admin && (
                      <button
                        className="btn"
                        onClick={() => handleDeleteService(product._id)}
                      >
                        <FaTrashAlt />
                      </button>
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </span>
            ))}
        </div>
        <div className="services-content">
          <h3>DEPILAÇÃO</h3>
          {products &&
            products.map((product) => (
              <span key={product._id}>
                {product.serviceType === "Depilacao" ? (
                  <div key={product._id}>
                    <p>{product.serviceName.toUpperCase()}</p>
                    <p>R$: {product.serviceValue}</p>
                    {user && user.admin && (
                      <button
                        className="btn"
                        onClick={() => handleDeleteService(product._id)}
                      >
                        <FaTrashAlt />
                      </button>
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
            <h3>ADICIONE NOVO SERVIÇO</h3>
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
                  onChange={(e) => setProductValue(e.target.value)}
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
        </>
      )}
    </section>
  );
};

export default Service;
