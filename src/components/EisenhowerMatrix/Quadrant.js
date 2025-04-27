import React from "react";
import FlashCard from './FlashCard';

function Quadrant({ title, tasks, onDrop, onDragOver, customClassName, updateCardText, handleDragStart, handleDeleteCard }) {
    return (
        <div
            className={`quadrant ${customClassName}`}
            onDrop={onDrop}
            onDragOver={onDragOver}
        >
            <h5>{title}</h5>
            {tasks.map(task => (
                <FlashCard
                    key={task.id}
                    text={task.text}
                    onChange={(e) => updateCardText(task.id, e.target.value)}
                    onDragStart={(e) => handleDragStart(e, task.id, title)}
                    showDeleteIcon={title === "Delete"}
                    onDelete={() => handleDeleteCard(task.id, title)}
                />
            ))}
        </div>
    );
}

export default Quadrant;
