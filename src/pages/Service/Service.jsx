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
import { newProduct, getAllServices, resetMessage } from "../../slices/productsSlice";

const Service = () => {
  const { user } = useSelector((state) => state.auth);
  const { products, loading, error } = useSelector((state) => state.product);

  const [modalOpen, setModalOpen] = useState(false);
  const [errors, setErrors] = useState("");

  const [productType, setProductType] = useState("");
  const [productName, setProductName] = useState("");
  const [productValue, setProductValue] = useState(0);

  const dispatch = useDispatch();

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const validateForm = (data) => {
    const errosTemp = {};

    if (!data.serviceType){
      errosTemp.type = "Tipo do serviço é obrigatório";
    } 
      
    if (!data.serviceName){
      errosTemp.type = "Tipo do serviço é obrigatório";
    }
    if (!data.serviceValue || data.productValue === 0){
      errosTemp.value = "Valor do serviço é obrigatório";
    }

    setErrors(errosTemp);
  };

  const handleSelectChange = (e) => setProductType(e.target.value);

  const handleSubmit = async ()=> {

    const data = {
      serviceType: productType,
      serviceName: productName,
      serviceValue: productValue
    };

    validateForm(data);
    if (errors) return;

    await dispatch(newProduct(data));

    setProductType('');
    setProductName('');
    setProductValue(0);

    setTimeout(() => {
      dispatch(resetMessage());
    }, 3000)
  };
  

  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section id="services" className="container">
      <div className="title">
        <h2>Serviços</h2>
      </div>
      <div className="container-services">
        <div className="services-content">
          <h3>CÍLIOS</h3>
          {products &&
            products.map((product) => (
              <>
                {product.serviceType === "cilios" ? (
                  <div key={product._id}>
                    <p>{product.serviceName.toUpperCase()}</p>
                    <p>R$: {product.serviceValue}</p>
                    {user && user.admin && <FaTrashAlt />}
                  </div>
                ) : (
                  <></>
                )}
              </>
            ))}
        </div>
        <div className="services-content">
          <h3>SOBRANCELHAS</h3>
          {products &&
            products.map((product) => (
              <>
                {product.serviceType === "Sobrancelhas" ? (
                  <div key={product._id}>
                    <p>{product.serviceName.toUpperCase()}</p>
                    <p>R$: {product.serviceValue}</p>
                    {user && user.admin && <FaTrashAlt />}
                  </div>
                ) : (
                  <></>
                )}
              </>
            ))}
        </div>
        <div className="services-content">
          <h3>DEPILAÇÃO</h3>
          {products &&
            products.map((product) => (
              <>
                {product.serviceType === "Depilacao" ? (
                  <div key={product._id}>
                    <p>{product.serviceName.toUpperCase()}</p>
                    <p>R$: {product.serviceValue}</p>
                    {user && user.admin && <FaTrashAlt />}
                  </div>
                ) : (
                  <></>
                )}
              </>
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
            <form className="form">
              {errors.type && (
                <small>
                  <Message msg={errors.type} type="error" />
                </small>
              )}
              <select value={productType} onChange={handleSelectChange}>
                <option value="">Selecione uma opção</option>
                <option value="cilios">Cílios</option>
                <option value="Sobrancelhas">Sobranchelhas</option>
                <option value="Depilacao">Depilação</option>
              </select>

              {errors.titulo && (
                <small>
                  <Message msg={errors.titulo} type="error" />
                </small>
              )}
              <label>
                <span>Título do serviço:</span>
                <input
                  type="text"
                  placeholder="Serviço"
                  onChange={(e) => setProductName(e.target.value)}
                  value={productName}
                />
              </label>

              {errors.value && (
                <small>
                  <Message msg={errors.value} type="error" />
                </small>
              )}
              <label>
                <span>Valor do serviço:</span>
                <input
                  type="number"
                  onChange={(e) => setProductValue(e.target.value)}
                  value={productValue}
                />
              </label>
              {!loading && (
                <button type="submit" className="btn" onClick={handleSubmit}>
                  Adicionar
                </button>
              )}
              {loading && (
                <button type="submit" disabled>
                  Aguarde...
                </button>
              )}
            </form>
          </Modal>
        </>
      )}
    </section>
  );
};

export default Service;
