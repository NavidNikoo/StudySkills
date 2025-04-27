import React, { useState } from "react";

function TaskInput({ addTask }) {
    const [inputTask, setInputTask] = useState("");
    const [selectedQuadrant, setSelectedQuadrant] = useState("UrgentImportant");

    const handleAdd = () => {
        addTask(selectedQuadrant, inputTask);
        setInputTask("");
    };

    return (
        <div className="row mb-4">
            <div className="col-md-4">
                <input
                    type="text"
                    className="form-control input-field"
                    placeholder="Enter a task..."
                    value={inputTask}
                    onChange={(e) => setInputTask(e.target.value)}
                />
            </div>
            <div className="col-md-4">
                <select
                    className="form-select select-field"
                    value={selectedQuadrant}
                    onChange={(e) => setSelectedQuadrant(e.target.value)}
                >
                    <option value="UrgentImportant">Urgent & Important</option>
                    <option value="NotUrgentImportant">Not Urgent & Important</option>
                    <option value="UrgentNotImportant">Urgent & Not Important</option>
                    <option value="NotUrgentNotImportant">Not Urgent & Not Important</option>
                </select>
            </div>
            <div className="col-md-4">
                <button className="btn btn-primary w-100" onClick={handleAdd}>Add Task</button>
            </div>
        </div>
    );
}

export default TaskInput;
