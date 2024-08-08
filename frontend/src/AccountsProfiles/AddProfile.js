import React, {useEffect, useState} from "react";
import {addProfileAPI, getAccountIdAPI} from "../api";
import {useNavigate} from "react-router-dom";
import "./AddProfile.css";


function AddProfile({isOpen, onClose}) {

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
    const handleAddProfile = async () => {
        if (!name) {
            setError('Name cannot be empty');
            return;
        }
        await addProfileAPI(name)
        onClose()
        navigate("/profiles")
    }

    if (!isOpen) {
        return null; // Don't render the modal if it's not open
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>Add Profile</h2>
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
                    <button className="add-profile-button" onClick={handleAddProfile}>Add Profile</button>
                </div>
            </div>
        </div>
    )
}

export default AddProfile