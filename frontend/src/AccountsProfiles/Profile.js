import React, {useState, useEffect} from 'react';
import {getAccountIdAPI, getProfilesAPI, setProfile} from "../api";
import {useNavigate} from "react-router-dom";
import './Profile.css';


function ProfileSelection() {
    const [profiles, setProfiles] = useState([]);
    const [accountId, setAccountId] = useState(0)

    const navigate = useNavigate();

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
    }, [accountId]);

    const handleSelectProfile = (profileId) => {
        setProfile(profileId);
        navigate('/lib');

    };

    const handleAddProfile = () => {
        navigate("/profiles/add")
    };


    return (
        <div className="profile-selection-container">
            <h2>Select Profile</h2>
            <div className="profiles-grid">
                {profiles && profiles.map((profile) => (
                    <div
                        key={profile.id}
                        className="profile-box"
                        onClick={() => handleSelectProfile(profile.id)}
                    >
                        <div className="profile-avatar">
                            <img src="client.png" alt={profile.name}/>
                        </div>
                        <span className="profile-name">{profile.name}</span>
                    </div>
                ))}
                <div
                    key={-1}
                    className="profile-box"
                    onClick={() => handleAddProfile("title")}
                >
                    <div className="profile-avatar">
                        <img src="google-plus.png" alt={"Add profile"}/>
                    </div>
                    <span className="profile-name">{"Add profile"}</span>
                </div>
            </div>
        </div>
    );
};

export default ProfileSelection;
