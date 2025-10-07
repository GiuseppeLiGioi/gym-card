import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
    return (
        <div className="container-header">
            <div className="container-header-inner">
                <button className='btn-user'><FontAwesomeIcon icon={faUser} /></button>
                <h1 className='title-header'>PULSEFIT</h1>
                <button className='btn-hamburger'><FontAwesomeIcon icon={faBars} /></button>
            </div>
        </div>
    )
}