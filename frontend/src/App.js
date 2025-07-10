import {
    BrowserRouter as Router,
    Routes,
    Route, useLocation, useNavigate,
} from "react-router-dom";
import './App.css';
import { Link } from 'react-router-dom';
import Home from './Media/Home'
import Search from './Media/Search'
import Discover from "./Media/Discover";
import MovieDetails from "./Media/MovieDetails";
import SeriesViewer from "./Media/SeriesViewer";
import SeriesDetails from "./Media/SeriesDetails";
import Login from "./AccountsProfiles/Login";
import { useEffect, useRef, useState } from "react";
import { getAccountInfoAPI, getProfileInfoAPI, logout } from "./api";
import Profile from "./AccountsProfiles/Profile";
import Library from "./Media/Library";
import VideoPlayer from "./Media/VideoPlayer"


function App() {
    const [isToolbarVisible, setToolbarVisible] = useState(false);

    const toggleToolbar = (isToolbarVisible) => {
        setToolbarVisible(isToolbarVisible);
    };


    return (
        <Router>
            <Header toggleToolbar={toggleToolbar} />
            <Toolbar isToolbarVisible={isToolbarVisible} toggleToolbar={toggleToolbar} />
            <div className="main-content">
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/logout" element={<Login />} />
                    <Route exact path="/profiles" element={<Profile />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/discover" element={<Discover />} />
                    <Route path="/search/movies/details" element={<MovieDetails />} />
                    <Route path="/search/series/details" element={<SeriesDetails />} />
                    <Route path="/discover/movies/details" element={<MovieDetails />} />
                    <Route path="/discover/series/details" element={<SeriesDetails />} />
                    <Route path="/lib" element={<Library />} />
                    <Route path="/lib/series/:id" element={<SeriesViewer />} />
                    <Route path="/home/series/:id" element={<SeriesViewer />} />
                    <Route path="/lib/movies/:id" element={<VideoPlayer />} />
                    <Route path="/home/movies/:id" element={<VideoPlayer />} />


                </Routes>
            </div>

        </Router>
    );
}

function Toolbar({ isToolbarVisible, toggleToolbar }) {

    const [accountInfo, setAccountInfo] = useState(null);
    const [profileInfo, setProfileInfo] = useState(null);
    const toolbarRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const fetchUserInfo = async () => {
            /*
            try {
                const accountInfoResponse = await getAccountInfoAPI();
                setAccountInfo(accountInfoResponse);
            } catch (error) {
                console.log("Failed to fetch account info:");
            }
            */
            try {
                const profileInfoResponse = await getProfileInfoAPI();
                setProfileInfo(profileInfoResponse);
            } catch (error) {
                console.log("Failed to fetch profile info:");
            }
        };
        fetchUserInfo();
    }, [location]);

    useEffect(() => {
        toggleToolbar(false); // Hide the toolbar whenever the location changes
    }, [location]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (toolbarRef.current && !toolbarRef.current.contains(event.target)) {
                toggleToolbar(false); // Hide the toolbar if the user clicks outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className={`toolbar ${isToolbarVisible ? 'visible' : ''}`} ref={toolbarRef}>
            <div className="header-left">
                <img
                    src="/list.png"
                    alt="Logo"
                    className="logo"
                    onClick={() => toggleToolbar(false)} // Close toolbar when clicking the logo inside the toolbar
                />
                <h1>Cinematech</h1>
            </div>

            <ul className="menu">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/search">Search</Link></li>
                <li><Link to="/discover">Discover</Link></li>
                <li><Link to="/lib">Library</Link></li>
                {profileInfo && (
                    <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
                )}
            </ul>
        </nav>
    );
}



function Header({ toggleToolbar }) {
    //const [accountInfo, setAccountInfo] = useState(null);
    const [profileInfo, setProfileInfo] = useState(null);

    let navigate = useNavigate();
    const location = useLocation();

    const handleLogin = () => {
        navigate(`/`);
    };

    const handleHome = () => {
        navigate(`/home`);
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            /*
            try {
                const accountInfoResponse = await getAccountInfoAPI();
                setAccountInfo(accountInfoResponse);
            } catch (error) {
                console.log("Failed to fetch account info:");
            }
            */
            try {
                const profileInfoResponse = await getProfileInfoAPI();
                setProfileInfo(profileInfoResponse);
            } catch (error) {
                console.log("Failed to fetch profile info:");
            }
        };
        fetchUserInfo();
    }, [location]);

    const handleLogoClick = () => {
        toggleToolbar(prevState => !prevState);
    };

    return (
        <div className="cinematech">
            <header className="App-header">
                <div className="header-left">
                    <img
                        src="list.png"
                        alt="Logo"
                        className="logo"
                        onClick={handleLogoClick}
                    />
                    <h1 className="title" onClick={handleHome}>Cinematech</h1>
                </div>

                <div className="header-right">
                    <p>
                        {profileInfo?.name}
                    </p>
                    <img
                        src="user.png"
                        className="logo"
                        onClick={handleLogin}
                    />
                </div>
            </header>
        </div>
    );
}



export default App;
