import { useDrag } from 'react-dnd';
import styles from './styles/DraggableWord.module.scss';
import PropTypes from 'prop-types';

const DraggableWord = ({ word }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: 'WORD',
        item: { word: word.word },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={dragRef}
            className={`${styles.draggableWord} ${word.color === "red" ? styles.highlight : ""}`}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            {word.word}
        </div>
    );
};

export default DraggableWord;


DraggableWord.propTypes = {
    word: PropTypes.shape({
        word: PropTypes.string.isRequired,
        color: PropTypes.string,
    }).isRequired,
};