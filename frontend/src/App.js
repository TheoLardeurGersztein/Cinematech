import {
    BrowserRouter as Router,
    Routes,
    Route, useLocation, useNavigate,
} from "react-router-dom";
import './App.css';
import {Link} from 'react-router-dom';
import Contact from './Contact/Contact'
import Library from './Media/Library'
import Search from './Media/Search'
import Discover from "./Media/Discover";
import MovieDetails from "./Media/MovieDetails";
import Downloads from "./Media/Downloads";
import MovieViewer from "./Media/MovieViewer"
import SeriesViewer from "./Media/SeriesViewer";
import SeriesDetails from "./Media/SeriesDetails";
import Login from "./AccountsProfiles/Login";
import {useEffect, useRef, useState} from "react";
import {getAccountInfoAPI, getProfileInfoAPI, logout} from "./api";
import Profile from "./AccountsProfiles/Profile";
import AddProfile from "./AccountsProfiles/AddProfile";

function App() {
    const [isToolbarVisible, setToolbarVisible] = useState(false);

    const toggleToolbar = (isToolbarVisible) => {
        setToolbarVisible(isToolbarVisible);
    };


    return (
        <Router>
            <Header toggleToolbar={toggleToolbar}/>
            <Toolbar isToolbarVisible={isToolbarVisible} toggleToolbar={toggleToolbar}/>
            <div className="main-content">

                <Routes>
                    <Route exact path="/" element={<Login/>}/>
                    <Route exact path="/logout" element={<Login/>}/>
                    <Route exact path="/profiles" element={<Profile/>}/>
                    <Route exact path="/profiles/add" element={<AddProfile/>}/>
                    <Route path="/lib" element={<Library/>}/>
                    <Route path="/search" element={<Search/>}/>
                    <Route path="/discover" element={<Discover/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/search/movies/details" element={<MovieDetails/>}/>
                    <Route path="/search/series/details" element={<SeriesDetails/>}/>
                    <Route path="/discover/movies/details" element={<MovieDetails/>}/>
                    <Route path="/discover/series/details" element={<SeriesDetails/>}/>
                    <Route path="/downloads" element={<Downloads/>}/>
                    <Route path="/lib/movies/:id" element={<MovieViewer/>}/>
                    <Route path="/lib/series/:id" element={<SeriesViewer/>}/>
                </Routes>
            </div>

        </Router>
    );
}

function Toolbar({
                     isToolbarVisible, toggleToolbar
                 }) {

    const [accountInfo, setAccountInfo] = useState(null);
    const [profileInfo, setProfileInfo] = useState(null);
    const toolbarRef = useRef(null);
    const location = useLocation();


    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const accountInfoResponse = await getAccountInfoAPI();
                setAccountInfo(accountInfoResponse);
            } catch (error) {
                console.log("Failed to fetch account info:");
            }
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
        toggleToolbar(false);
    }, [location]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (toolbarRef.current && !toolbarRef.current.contains(event.target)) {
                toggleToolbar(false);
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
                    src="list.png"
                    alt="Logo"
                    className="logo"
                    onClick={toggleToolbar}
                />
                <h1 className="title">Cinematech</h1>
            </div>

            <ul className="menu">
                <li><Link to="/lib">Home</Link></li>
                <li><Link to="/search">Search</Link></li>
                <li><Link to="/discover">Discover</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/downloads">Downloads</Link></li>
                {accountInfo && (
                    <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
                )}
                {accountInfo && (
                    <li><Link to="/profiles">Profiles</Link></li>
                )}

            </ul>
        </nav>


    )


}


function Header({toggleToolbar}) {
    const [accountInfo, setAccountInfo] = useState(null);
    const [profileInfo, setProfileInfo] = useState(null);

    let navigate = useNavigate();
    const location = useLocation();

    const handleLogin = () => {
        navigate(`/`);
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const accountInfoResponse = await getAccountInfoAPI();
                setAccountInfo(accountInfoResponse);
            } catch (error) {
                console.log("Failed to fetch account info:");
            }
            try {
                const profileInfoResponse = await getProfileInfoAPI();
                setProfileInfo(profileInfoResponse);
            } catch (error) {
                console.log("Failed to fetch profile info:");
            }
        };
        fetchUserInfo();
    }, [location]);

    return (

        <div className="cinematech">
            <header className="App-header">
                <div className="header-left">
                    <img
                        src="list.png"
                        alt="Logo"
                        className="logo"
                        onClick={toggleToolbar}

                    />
                    <h1 className="title">Cinematech</h1>
                </div>

                <div className="header-right">
                    <p>
                        {accountInfo?.username}
                        {accountInfo?.username && profileInfo?.name && ', '}
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
