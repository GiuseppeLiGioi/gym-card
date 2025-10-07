import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className="container-header">
            <div className="container-header-inner">
                <button className='btn-user'><FontAwesomeIcon icon={faUser} /></button>
                <h1 className='title-header'>PULSEFIT</h1>
                <button className='btn-hamburger' onClick={toggleMenu}><FontAwesomeIcon icon={faBars} /></button>

                <nav className={`navbar ${menuOpen ? "" : "apri"}`}>
                    <Link to="/home">Home</Link>
                    <Link to="/courses">Corsi</Link>
                    <Link to="/plans">Piani Abbonamento</Link>
                    <Link to="/user">Utente</Link>

                </nav>
            </div>
        </div>
    )
}