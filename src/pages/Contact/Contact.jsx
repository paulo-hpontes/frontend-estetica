import { useState } from 'react';
import './Contact.css';

import { BsFillTelephoneFill } from "react-icons/bs";
import { FaInstagramSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Contact = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <section className='container' id='contact'>

    <div className='address'>
      <div className='title'>
        <h2>Onde estamos</h2>
        <hr/>
      </div>
      <div className='address-content'>
        <h3>Endereço:</h3>
        <p>Rua: Oscar Romero, 105 - Terra Nova, Manaus/Am <br/> CEP: 69097-475</p>
        <button className='btn'><a href="https://maps.app.goo.gl/qGxRgkCRFmw9G4Mk8" target='_blank'>Veja no mapa</a></button>
      </div>
      <div className='contact-info'>
        <p><BsFillTelephoneFill />(92) 99459-7308</p>
        <p><MdEmail />email@email.com</p>
        <a href="https://www.instagram.com/ranni.lashdesigner?igsh=a3J1ZnY5NHpxN3Mz" target='_blank'>
          <FaInstagramSquare />
        </a>
      </div>
    </div>

    <div className='contact-us'>
      <div className='title'>
        <h2>Fale conosco</h2>
        <hr/>
      </div>
      <form className='form-contact'>
        <label>
          <span>Nome</span>
          <input type='text' value={name} onChange={((e) => setName(e.target.value))}/>
        </label>
        
        <label>
          <span>E-mail</span>
          <input type='email' value={email} onChange={((e) => setEmail(e.target.value))}/>
        </label>
        
        <label>
          <span>Menssagem</span>
          <textarea value={message} onChange={((e) => setMessage(e.target.value))}/>
        </label>
        <button type='submit' className='btn'>Enviar</button>
      </form>
    </div>

    </section>
  )
}

export default Contact;
