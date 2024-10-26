import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import styles from './styles/Blank.module.scss';

const Blank = ({ blankId, answer, onDrop }) => {
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: 'WORD',
        drop: (item) => onDrop(blankId, item.word),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    });

    return (
        <div ref={drop} className={`${styles.blank} ${canDrop ? styles.canDrop : ''} ${isOver ? styles.isOver : ''}`}>
            {answer ? (
                <div className={styles.answer}>
                    {answer}
                </div>
            ) : (
                <span>[_input]</span>
            )}
        </div>
    );
};



export default Blank;


Blank.propTypes = {
    blankId: PropTypes.string.isRequired,
    answer: PropTypes.string,
    onDrop: PropTypes.func.isRequired,
};