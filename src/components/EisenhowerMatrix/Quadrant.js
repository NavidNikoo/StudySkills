import React from "react";

function Quadrant({ title, tasks, onDrop, onDragOver }) {
    return (
        <div
            className="quadrant"
            onDrop={onDrop}
            onDragOver={onDragOver}
        >
            <h5>{title}</h5>
            {tasks.map(task => (
                <div key={task.id} className="task-card">
                    {task.text}
                </div>
            ))}
        </div>
    );
}


export default Quadrant;
