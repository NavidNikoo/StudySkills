import React, { useState } from "react";
import TaskPool from "./TaskPool";
import Quadrant from "./Quadrant";
import './EisenhowerMatrix.css';
import FlashCard from './FlashCard';

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
        setTasks(prev => {
            const updatedTasks = { ...prev };
            for (const key in updatedTasks) {
                updatedTasks[key] = updatedTasks[key].map(card =>
                    card.id === id ? { ...card, text: newText } : card
                );
            }
            return updatedTasks;
        });
    };

    const handleDragStart = (e, id, source) => {
        e.dataTransfer.setData("cardId", id);
        e.dataTransfer.setData("source", source);
    };

    const handleDrop = (e, target) => {
        const cardId = e.dataTransfer.getData("cardId");
        const source = e.dataTransfer.getData("source");

        if (!cardId) return;  // <- 💥 prevent dropping nothing

        let draggedCard = null;

        if (source === "taskPool") {
            draggedCard = taskPool.find(card => card.id.toString() === cardId);
            if (!draggedCard) return;
            setTaskPool(prev => prev.filter(card => card.id.toString() !== cardId));
        } else if (source) {
            draggedCard = tasks[source]?.find(card => card.id.toString() === cardId);
            if (!draggedCard) return;
            setTasks(prev => ({
                ...prev,
                [source]: prev[source].filter(card => card.id.toString() !== cardId)
            }));
        } else {
            console.error("No source found while dropping card!");
            return;
        }

        if (target === "taskPool") {
            setTaskPool(prev => [...prev, draggedCard]);
        } else {
            setTasks(prev => ({
                ...prev,
                [target]: [...prev[target], draggedCard]
            }));
        }
    };


    const allowDrop = (e) => {
        e.preventDefault();
    };

    const handleDeleteCard = (id, quadrant) => {
        setTasks(prev => ({
            ...prev,
            [quadrant]: prev[quadrant].filter(card => card.id !== id)
        }));
    };

    return (
        <div className="outer-container">
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
                    <div
                        className="task-pool-sidebar p-3"
                        onDrop={(e) => handleDrop(e, "taskPool")}
                        onDragOver={allowDrop}
                    >
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

                        <div className="matrix-layout">
                            {/* Top Labels */}
                            <div></div>
                            <div className="top-label">Urgent</div>
                            <div className="top-label">Not Urgent</div>

                            {/* Quadrants */}
                            <div className="side-label">Important</div>
                            <Quadrant
                                title="Do"
                                tasks={tasks.Do}
                                onDrop={(e) => handleDrop(e, "Do")}
                                onDragOver={allowDrop}
                                customClassName="do-quadrant"
                                handleDragStart={handleDragStart}
                                updateCardText={updateCardText}
                            />
                            <Quadrant
                                title="Schedule"
                                tasks={tasks.Schedule}
                                onDrop={(e) => handleDrop(e, "Schedule")}
                                onDragOver={allowDrop}
                                customClassName="schedule-quadrant"
                                handleDragStart={handleDragStart}
                                updateCardText={updateCardText}
                            />

                            <div className="side-label">Not Important</div>
                            <Quadrant
                                title="Delegate"
                                tasks={tasks.Delegate}
                                onDrop={(e) => handleDrop(e, "Delegate")}
                                onDragOver={allowDrop}
                                customClassName="delegate-quadrant"
                                handleDragStart={handleDragStart}
                                updateCardText={updateCardText}
                            />
                            <Quadrant
                                title="Delete"
                                tasks={tasks.Delete}
                                onDrop={(e) => handleDrop(e, "Delete")}
                                onDragOver={allowDrop}
                                customClassName="delete-quadrant"
                                handleDragStart={handleDragStart}
                                updateCardText={updateCardText}
                                handleDeleteCard={handleDeleteCard}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default EisenhowerMatrix;
