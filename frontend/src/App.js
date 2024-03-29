import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import './App.css';
import { Link } from 'react-router-dom';
import Contact from './contact'
import Library from './library'
import Search from './search'
import Discover from "./discover";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/lib" element={<Library />} />
                <Route path="/search" element={<Search />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </Router>
    );
}

function Header() {
    return (
        <header className="App-header">
            <h2 className="title">Cinematech</h2>
            <nav className="menu">
                <ul className="menu">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/lib">My Library</Link></li>
                    <li><Link to="/search">Search</Link></li>
                    <li><Link to="/discover">Discover</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
}

function Home() {
    return (
        <div>
            <p>Bienvenu sur mon site !!</p>
        </div>
    );
}




export default App;
