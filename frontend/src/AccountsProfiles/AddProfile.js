import React, {useEffect, useState} from "react";
import {addProfileAPI, getAccountIdAPI} from "../api";
import {useNavigate} from "react-router-dom";

function AddProfile() {

    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccountId = async () => {
            const accountResponse = await getAccountIdAPI();
            if (!accountResponse) {
                navigate("/");
                return;
            }

        };
        fetchAccountId();
    }, );
    const handleAddprofile = () => {
        addProfileAPI(name)
        navigate("/profiles")
    }

    return (
        <div>
            <input
                className="name-input"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button className="add-profile-button" onClick={handleAddprofile}>Add Profile</button>
        </div>
    )
}

export default AddProfile