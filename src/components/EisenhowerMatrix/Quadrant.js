import React from "react";

function Quadrant({ title, tasks, onDrop, onDragOver }) {
    return (
        <div
            className="col-md-6 p-2"
            onDrop={onDrop}
            onDragOver={onDragOver}
        >
            <div className="matrix-box h-100">
                <h5>{title}</h5>
                <ul className="list-group">
                    {tasks.map((task) => (
                        <li className="list-group-item" key={task.id}>
                            {task.text}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Quadrant;
