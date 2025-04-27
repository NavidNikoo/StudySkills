import React, { useState } from "react";
import ConfirmModal from './ConfirmModal';
import './FlashCard.css';

function FlashCard({ text, onChange, onDragStart, showDeleteIcon, onDelete }) {
    const [hovered, setHovered] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <div
            className="flashcard"
            draggable
            onDragStart={onDragStart}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ position: "relative" }}
        >
            <textarea
                className="form-control text-center card-textarea"
                placeholder="Type your task..."
                value={text}
                onChange={onChange}
                rows={1}
                style={{
                    resize: "none",
                    overflow: "hidden",
                    minHeight: "50px",
                }}
            />

            {/* Trash Icon */}
            {showDeleteIcon && hovered && (
                <button
                    className="trash-icon"
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowConfirm(true);  // open modal
                    }}
                    style={{
                        position: "absolute",
                        bottom: "5px",
                        right: "5px",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "20px",
                    }}
                >
                    🗑️
                </button>
            )}

            {/* Confirm Modal */}
            {showConfirm && (
                <ConfirmModal
                    message="Are you sure you want to delete this task?"
                    onConfirm={() => {
                        onDelete();
                        setShowConfirm(false);
                    }}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </div>
    );
}

export default FlashCard;
