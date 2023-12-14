import PropTypes from 'prop-types';
import './Button.css';

const Button = ({
  className = 'btn',
  handleClickFunction, 
  size = 48,
}) => {
  
  const buttonSize = {
    width: `${size}px`,
    height: `${size}px`,
  };
  
  return (
    <button style={buttonSize} className={className} onClick={handleClickFunction} >
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  handleClickFunction: PropTypes.func,
  size: PropTypes.number,
}

export default Button;




