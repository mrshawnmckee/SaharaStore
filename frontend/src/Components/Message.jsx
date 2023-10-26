import { Alert } from 'react-bootstrap';

// Variant is color red for danger, green for success, etc; children is whatever we are wrapping
const Message = ({ variant, children }) => {
  return (
    <Alert variant={variant}>
        {children}
    </Alert>
  )
}

// Set default to info, blue
Message.defaultProps = {
    variant: 'info',
};

export default Message
