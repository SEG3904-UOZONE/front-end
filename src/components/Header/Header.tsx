
import './Header.scss'
import logo from '../../assets/Ottawa_resize.png'

const Header = () => {
    return(
        <div className="top-bar">
            <div className="header">
                <button id='homeIcon'><i className="bi bi-house-door"></i></button>
                <button id='searchIcon'><i className="bi bi-search"></i></button>
                <button id='languageIcon'><i className="bi bi-globe"></i></button>
                <button id='accountIcon'><i className="bi bi-person-circle"></i></button>
                <button id='moreIcon'><i className="bi bi-three-dots-vertical"></i></button>
            </div>
            <div className="logo-wrapper">
                <img className='logo' src={logo} alt="uOttawa logo" />
                <div className="site-name"><span id='uozone'>uoZone</span></div>
            </div>
            <nav className="d-flex flex-row">
                <a href="">My Class Schedule</a>
                <a href="" id='add-link'>Add</a>
                <a href="">Drop</a>
                <a href="">Swap</a>
                <a href="">Term Information</a>
            </nav>
        </div>
    );
}

export default Header;