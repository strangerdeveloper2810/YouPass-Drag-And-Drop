import { useState, useEffect } from 'react';
import Blank from '../Blank';
import DraggableWord from '../DraggableWord';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './styles/DragDropQuestion.module.scss';
import Message from '../Message';

const fetchQuestionData = async () => {
    return {
        question: {
            paragraph:
                "The sky is [_input] and the grass is [_input]. You should drag the word <span style='color: red;'>green</span> to the correct blank.",
            blanks: [
                { id: 1, position: "first", correctAnswer: "blue", type: "input" },
                { id: 2, position: "second", correctAnswer: "green", type: "drag" },
            ],
            dragWords: [
                { word: "blue", color: "default", id: 1 },
                { word: "green", color: "red", id: 2 },
                { word: "yellow", color: "default", id: 3 },
                { word: "red", color: "default", id: 4 },
            ],
        },
    };
};

const DragDropQuestion = () => {
    const [data, setData] = useState(null);
    const [answers, setAnswers] = useState({});
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchQuestionData().then((res) => setData(res.question));
    }, []);

    const handleDrop = (blankId, word) => {
        const blank = data.blanks.find((b) => b.id === Number(blankId));

        if (blank) {
            // Đè lên giá trị cũ
            setAnswers((prev) => ({ ...prev, [blankId]: word }));

            // Không kiểm tra ngay, chỉ cần cập nhật giá trị
            setMessage(""); // Xóa thông báo nếu có
        } else {
            setMessage("Blank not found."); // Optional: handle the case where blank is not found
        }
    };

    const handleSubmit = () => {
        const isCorrect = data.blanks.every((b) => answers[b.id] === b.correctAnswer);
        setMessage(isCorrect ? "Chính xác!" : "Sai rồi!");
    };


    if (!data) return <p>Loading...</p>;

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.container}>
                <div className={styles.paragraph} dangerouslySetInnerHTML={{ __html: data.paragraph }} />
                <div className={styles.blanks}>
                    {data.blanks.map((blank) => (
                        <Blank
                            key={blank.id}
                            blankId={String(blank.id)}
                            answer={answers[blank.id]}
                            onDrop={handleDrop}
                        />
                    ))}
                </div>
                <div className={styles.draggableWords}>
                    {data.dragWords.map((word) => (
                        <DraggableWord key={word.id} word={word} />
                    ))}
                </div>
                <button onClick={handleSubmit}>Submit</button>
                {message && <Message message={message} errors={message.includes("Sai")} />}
            </div>
        </DndProvider>
    );
};

export default DragDropQuestion;
