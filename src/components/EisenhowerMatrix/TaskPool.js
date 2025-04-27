import React from "react";
import FlashCard from './FlashCard';

function TaskPool({ taskPool, updateCardText, handleDragStart }) {
    return (
        <div className="d-flex flex-column gap-3">
            {taskPool.map((card) => (
                <FlashCard
                    key={card.id}
                    text={card.text}
                    onChange={(e) => updateCardText(card.id, e.target.value)}
                    onDragStart={(e) => handleDragStart(e, card.id, "taskPool")}   // ✅ Add "taskPool" here
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
                </FlashCard>
            ))}
        </div>
    );
}

export default TaskPool;
