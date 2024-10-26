import styles from './styles/Message.module.scss';
import PropTypes from 'prop-types';

const Message = ({ message, errors }) => {
    return (
        <p className={errors ? styles.error : styles.message}>{message}</p>
    )
};

Message.propTypes = {
    message: PropTypes.string.isRequired,
    errors: PropTypes.bool.isRequired,
};

export default Message;
