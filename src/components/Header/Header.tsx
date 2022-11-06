
import './Header.scss'
import logo from '../../assets/Ottawa_resize.png'

const Header = () => {
    return(
        <div className="top-bar">
            <div className="wrapper"></div>
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