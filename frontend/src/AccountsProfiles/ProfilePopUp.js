import React, { useEffect, useState } from "react";
import { addProfileAPI, renameProfileAPI, getAccountIdAPI, removeProfileAPI } from "../api";
import { useNavigate } from "react-router-dom";
import "./AddProfile.css";


function ProfilePopUp({ isOpen, onClose, editMode, editProfileId }) {

    const [name, setName] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAccountId = async () => {
            const accountResponse = await getAccountIdAPI();
            if (!accountResponse) {
                navigate("/");
                return;
            }
        };
        fetchAccountId();
    }, [navigate]);

    const handleSubmit = async () => {
        if (!name) {
            setError('Name cannot be empty');
            return;
        }
        if (editMode) {
            await renameProfileAPI(editProfileId, name);
        } else {
            await addProfileAPI(name);
        }
        onClose();
        setName('');
    }

    const handleRemove = async () => {
        await removeProfileAPI(editProfileId);
        onClose();

    }

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>{editMode ? "Edit Profile" : "Add Profile"}</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <input
                        className="name-input"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button className="add-profile-button" onClick={handleSubmit}>{editMode ? "Rename Profile" : "Add Profile"}</button>
                    {editMode && <button className="remove-profile-button" onClick={handleRemove}>Remove Profile</button>}
                </div>
            </div>
        </div>
    )
}

export default ProfilePopUp