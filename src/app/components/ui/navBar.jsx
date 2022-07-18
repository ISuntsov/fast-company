import React from 'react';
import { NavLink } from 'react-router-dom';
import NavProfile from './navProfile';

// import { useAuth } from '../../hooks/useAuth';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../../store/users';

const NavBar = () => {
    // const { currentUser } = useAuth();
    const isLoggedIn = useSelector(getIsLoggedIn());

    return (
        <nav className="navbar bg-light mb-3">
            <div className="container-fluid">
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            aria-current="page"
                            to="/"
                            exact>
                            Main
                        </NavLink>
                    </li>
                    {isLoggedIn && (
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/users">
                                Users
                            </NavLink>
                        </li>
                    )}
                </ul>
                <div className="d-flex">
                    {isLoggedIn ? (
                        <NavProfile />
                    ) : (
                        <NavLink className="nav-link" to="/login">
                            Login
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
