import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
const [menuOpen, setMenuOpen] = useState(false)

const location = useLocation()
const isLoginPage = location.pathname === "/login"

function toggleMenu(){
setMenuOpen(!menuOpen)
}
    return (
        <div className="container-header">
            <div className="container-header-inner">
                <button className='btn-user'><FontAwesomeIcon icon={faUser} /></button>
                <h1 className='title-header'>PULSEFIT</h1>
                <button className='btn-hamburger' onClick={toggleMenu}><FontAwesomeIcon icon={faBars} /></button>

                <nav className={`navbar ${menuOpen ? "" : "apri"}`}>
                    <Link to="/home" className={isLoginPage ? "disabled-link" : ""}>Home</Link>
                    <Link to="/courses" className={isLoginPage ? "disabled-link" : ""}>Corsi</Link>
                    <Link to="/plans" className={isLoginPage ? "disabled-link" : ""}>Piani Abbonamento</Link>

                </nav>
            </div>
        </div>
    )
}