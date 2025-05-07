import React, { useState, useEffect } from 'react';
import { getAccountIdAPI, getProfilesAPI, setProfile } from "../api";
import { useNavigate } from "react-router-dom";
import './Profile.css';
import ProfilePopUp from "./ProfilePopUp";


function ProfileSelection() {
    const [profiles, setProfiles] = useState([]);
    const [accountId, setAccountId] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editPorfileId, setEditPorfileId] = useState(false);

    const navigate = useNavigate();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleEditMode = () => {
        setEditMode(prevState => !prevState);
    };

    useEffect(() => {
        const fetchProfiles = async () => {
            const accountResponse = await getAccountIdAPI();
            if (!accountResponse) {
                navigate("/");
                return;
            }
            setAccountId(accountResponse)
            const response = await getProfilesAPI(accountId)
            setProfiles(response.data)
        };
        fetchProfiles();
    }, [accountId, isModalOpen, navigate]);

    const handleSelectProfile = (profileId) => {
        if (!editMode) {
            setProfile(profileId);
            navigate('/home');
        } else {
            setEditPorfileId(profileId);
            openModal();
        }
    };


    return (
        <div className="profile-selection-container">
            <h2>{editMode ? "Edit Profile" : "Select Profile"}</h2>
            <div className="profiles-grid">
                {profiles && profiles.map((profile) => (
                    <div
                        key={profile.id}
                        className="profile-box"
                        onClick={() => handleSelectProfile(profile.id)}
                    >
                        <div className="profile-avatar">
                            <img src="client.png" alt={profile.name} />
                        </div>
                        <span className="profile-name">{profile.name}</span>
                    </div>
                ))}
                {!editMode &&
                    <div
                        key={-1}
                        className="profile-box"
                        onClick={openModal}
                    >
                        <div className="profile-avatar">
                            <img src="google-plus.png" alt={"Add profile"} />
                        </div>
                        <span className="profile-name">{"Add profile"}</span>
                    </div>
                }
            </div>
            <div className='edit-container'>
                <img className='edit' src="editer.png" alt={"Edit Profile"} onClick={handleEditMode} />
            </div>
            <div>
                <ProfilePopUp isOpen={isModalOpen} onClose={closeModal} editMode={editMode} editProfileId={editPorfileId} />
            </div>
        </div >
    );
};

export default ProfileSelection;
