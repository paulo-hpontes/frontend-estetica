import "./Contact.css";

import { BsFillTelephoneFill } from "react-icons/bs";
import { FaInstagramSquare } from "react-icons/fa";

const Contact = () => {
  return (
    <section id="contact">
      <div className="address">
        <div className="title">
          <h2>Onde estamos</h2>
          <hr />
        </div>
        <div className="address-content">
          <div>
            <h3>Endereço:</h3>
            <p>
              <strong>Rua:</strong> Oscar Romero, 105 - Terra Nova, Manaus/Am
            </p>
            <p>
            <strong>CEP:</strong> 69097-475
            </p>
            <button className="btn">
              <a
                href="https://maps.app.goo.gl/qGxRgkCRFmw9G4Mk8"
                target="_blank"
              >
                Veja no mapa
              </a>
            </button>
          </div>
          <img src="Logo.png" alt="logo do site Lash Designer" title="Logo" />
          <div className="contact-info">
            <h3>Contato:</h3>
            <p>
              <BsFillTelephoneFill />
              (92) 99459-7308
            </p>
            <p>
              <a
                href="https://www.instagram.com/ranni.lashdesigner?igsh=a3J1ZnY5NHpxN3Mz"
                target="_blank"
              >
                <FaInstagramSquare />
              </a>
              instagram
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
