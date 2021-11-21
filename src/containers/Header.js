import React from 'react'
import { Link } from 'react-router-dom';

const Header = (props) => {
    return(
        <nav className="navbar navbar-expand-md navbar-dark bg-primary">
            <div className="container">
                <Link to="/home" className="navbar-brand">Employee Management</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <Link to="/department" className="nav-link">Department</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/employee" className="nav-link">Employee</Link>
                    </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/home" className="nav-link">welcome to ... </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link"><i className="fas fa-sign-out-alt"></i></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
 
export default Header;