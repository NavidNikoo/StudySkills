import React from "react";

function TaskPool({ taskPool, updateCardText, handleDragStart }) {
    return (
        <div className="d-flex flex-column gap-3">
            {taskPool.map((card) => (
                <div
                    key={card.id}
                    className="task-item-big"
                    draggable
                    onDragStart={(e) => handleDragStart(e, card.id)}
                >
            <textarea
                className="form-control text-center card-textarea"
                placeholder="Type your task..."
                value={card.text}
                onChange={(e) => {
                    updateCardText(card.id, e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = (e.target.scrollHeight) + 'px';
                }}
                rows={1}
            />
                </div>
            ))}
        </div>
    );
}

export default TaskPool;
