import {
    BrowserRouter as Router,
    Routes,
    Route, useLocation,
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
import {useEffect, useState} from "react";
import {getAccountInfoAPI, getProfileInfoAPI, logout} from "./api";
import Profile from "./AccountsProfiles/Profile";
import AddProfile from "./AccountsProfiles/AddProfile";

function App() {
    return (
        <Router>
            <Header/>
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
        </Router>
    );
}

function Header() {
    const [accountInfo, setAccountInfo] = useState(null);
    const [profileInfo, setProfileInfo] = useState(null);
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

    const handleLogout = () => {
        logout();
    };


    return (
        <header className="App-header">
            <h1 className="title">Cinematech</h1>
            <h4>{accountInfo && <p>Welcome, {accountInfo.username}</p>}</h4>
            <h4>{profileInfo && <p>Welcome, {profileInfo.name}</p>}</h4>

            <nav className="menu">
                <ul className="menu">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/lib">My Library</Link></li>
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
        </header>
    );
}


export default App;
