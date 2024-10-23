import PropTypes from 'prop-types';

import './Message.css';

const Message = ({msg, type}) => {
  return (
    <div className={`message ${type}`}>
      <p>{msg}</p>
    </div>
  )
};

Message.propTypes = {
    msg: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
}

export default Message;
