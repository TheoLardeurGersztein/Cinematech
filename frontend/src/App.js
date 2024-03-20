import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import './App.css';
import { Link } from 'react-router-dom';
import Contact from './contact'

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/lib" element={<Lib />} />
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
                    <li><Link to="/lib">About</Link></li>
                    <li><Link to="/1">Services</Link></li>
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

function Lib() {
    return (
        <div>
            <p>Ceci est la bibliotèque de films</p>
        </div>
    )
}




export default App;
