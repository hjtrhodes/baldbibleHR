import PropTypes from 'prop-types';
import './Button.css';

const Button = ({
  children,
  ariaLabel = 'button',
  className = 'btn',
  onClick, 
}) => {
  
  
  return (
    <button aria-label={ariaLabel} className={className} onClick={onClick} >
      <span>{children}</span>
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button;




