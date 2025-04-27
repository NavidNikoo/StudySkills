import React, { useState } from "react";
import TaskPool from "./TaskPool";
import Quadrant from "./Quadrant";
import './EisenhowerMatrix.css';

function EisenhowerMatrix() {
    const [taskPool, setTaskPool] = useState([]);
    const [tasks, setTasks] = useState({
        Do: [],
        Schedule: [],
        Delegate: [],
        Delete: []
    });

    const createCard = () => {
        setTaskPool(prev => {
            if (prev.length >= 6) return prev;
            return [...prev, { id: Date.now(), text: "" }];
        });
    };

    const updateCardText = (id, newText) => {
        setTaskPool(prev =>
            prev.map(card =>
                card.id === id ? { ...card, text: newText } : card
            )
        );
    };

    const handleDragStart = (e, id) => {
        e.dataTransfer.setData("cardId", id);
    };

    const handleDrop = (e, quadrant) => {
        const cardId = e.dataTransfer.getData("cardId");
        const draggedCard = taskPool.find(card => card.id.toString() === cardId);

        if (!draggedCard) return;

        setTasks(prev => ({
            ...prev,
            [quadrant]: [...prev[quadrant], draggedCard]
        }));

        setTaskPool(prev => prev.filter(card => card.id.toString() !== cardId));
    };

    const allowDrop = (e) => {
        e.preventDefault();
    };

    return (
        <div className="outer-container">
            {/* Flex container for Cards + Matrix */}
            <div className="flex-container">
                {/* Left: Card Column */}
                <div className="card-column">
                    <button
                        className="btn btn-success mb-3 w-100"
                        onClick={createCard}
                        disabled={taskPool.length >= 6}
                    >
                        Create Card
                    </button>
                    <div className="task-pool-sidebar p-3">
                        <TaskPool
                            taskPool={taskPool}
                            updateCardText={updateCardText}
                            handleDragStart={handleDragStart}
                        />
                    </div>
                </div>

                {/* Right: Matrix Column */}
                <div className="matrix-column">
                    <div className="matrix-container p-4">
                        <h2 className="matrix-header mb-4">Eisenhower Matrix</h2>

                        {/* Labels: Urgent / Not Urgent */}
                        <div className="d-flex justify-content-center mb-2">
                            <div className="matrix-label text-center">Urgent</div>
                            <div className="matrix-label text-center">Not Urgent</div>
                        </div>

                        <div className="d-flex">
                            {/* Labels: Important / Not Important */}
                            <div className="d-flex flex-column justify-content-between me-2" style={{ height: "100%" }}>
                                <div className="side-label">Important</div>
                                <div className="side-label">Not Important</div>
                            </div>

                            {/* Quadrants */}
                            <div className="w-100">
                                <div className="row">
                                    <Quadrant
                                        title="Do"
                                        tasks={tasks.Do}
                                        onDrop={(e) => handleDrop(e, "Do")}
                                        onDragOver={allowDrop}
                                    />
                                    <Quadrant
                                        title="Schedule"
                                        tasks={tasks.Schedule}
                                        onDrop={(e) => handleDrop(e, "Schedule")}
                                        onDragOver={allowDrop}
                                    />
                                </div>
                                <div className="row">
                                    <Quadrant
                                        title="Delegate"
                                        tasks={tasks.Delegate}
                                        onDrop={(e) => handleDrop(e, "Delegate")}
                                        onDragOver={allowDrop}
                                    />
                                    <Quadrant
                                        title="Delete"
                                        tasks={tasks.Delete}
                                        onDrop={(e) => handleDrop(e, "Delete")}
                                        onDragOver={allowDrop}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default EisenhowerMatrix;
