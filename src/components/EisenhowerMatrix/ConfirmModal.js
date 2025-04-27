import React from 'react';
import './ConfirmModal.css';

function ConfirmModal({ message, onConfirm, onCancel }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>
                <div className="modal-buttons">
                    <button className="cancel-btn" onClick={onCancel}>Cancel</button>
                    <button className="confirm-btn" onClick={onConfirm}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
