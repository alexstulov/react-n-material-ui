import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

const Header = ({ onServiceChange }: {onServiceChange: () => void}) => {
    return (
        <nav className="header navbar navbar-expand-md navbar-dark bg-dark">
            <a className="navbar-brand" href="/">Star DB</a>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">People</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/starships">Starships</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/planets">Planets</Link>
                    </li>
                </ul>
            </div>
            <button className="btn btn-primary btn-sm" onClick={onServiceChange}>S</button>
        </nav>
    );
};

export default Header;