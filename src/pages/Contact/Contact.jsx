import "./Contact.css";

import { BsFillTelephoneFill } from "react-icons/bs";
import { FaInstagramSquare } from "react-icons/fa";

const Contact = () => {
  return (
    <section id="contact">
      <div className="img"><img src="Logo.png" alt="logo do site Lash Designer" title="Logo" draggable="false"/></div>
      <div className="address">
        <div className="title">
          <h2>Onde estamos</h2>
          <hr />
        </div>
        <div className="address-content">
          <div>
            <h3>Endereço:</h3>
            <p>
              <strong>Rua:</strong> Treze de Maio, 609
            </p>
            <p>
              <strong>Bairro:</strong> Terra Nova, Manaus/Am
            </p>
            <p>
            <strong>CEP:</strong> 69093-449
            </p>
            <button className="btn">
              <a
                href="https://maps.app.goo.gl/zFkPcCLmkNj6TkVa9"
                target="_blank"
              >
                Veja no mapa
              </a>
            </button>
          </div>
          <div className="contact-info">
            <h3>Contato:</h3>
            <p>
              <BsFillTelephoneFill size={30} style={{"marginRight": ".5rem"}}/>
              <strong>(92) 99206-5565</strong>
            </p>
           
              <a
                href="https://www.instagram.com/ranni.lashdesigner?igsh=a3J1ZnY5NHpxN3Mz"
                target="_blank"
              >
                <p>
                  <FaInstagramSquare size={30} style={{"marginRight": ".5rem"}}/>instagram
                </p>
              </a>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
