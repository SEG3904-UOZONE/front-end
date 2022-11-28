
import './Header.scss'
import logo from '../../assets/Ottawa_resize.png'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const Header = () => {

    const { t, i18n } = useTranslation();
    let [switchLanguage, setSwitchLanguage] = useState<boolean>(false)

    const changeLanguage = (switchLanguage: boolean): void => {
        switchLanguage ? i18n.changeLanguage('en') : i18n.changeLanguage('fr');
        setSwitchLanguage(!switchLanguage)
    }

    return(
        <div className="top-bar">
            <div className="header">
                <button id='homeIcon'><i className="bi bi-house-door"></i></button>
                <button id='searchIcon'><i className="bi bi-search"></i></button>
                <button id='languageIcon'
                    onClick={() => changeLanguage(switchLanguage)}
                    ><i className="bi bi-globe"></i>
                </button>
                <button id='accountIcon'><i className="bi bi-person-circle"></i></button>
                <button id='moreIcon'><i className="bi bi-three-dots-vertical"></i></button>
            </div>
            <div className="logo-wrapper">
                <img className='logo' src={logo} alt="uOttawa logo" />
                <div className="site-name"><span id='uozone'>uoZone</span></div>
            </div>
            <nav className="d-flex flex-row">
                <a href="#">{t('header.navbar.my-schedule-link')}</a>
                <Link to="/" id='add-link'>{t('header.navbar.add-link')}</Link>                
                <a href="#">{t('header.navbar.drop-link')}</a>
                <a href="#">{t('header.navbar.swap-link')}</a>
                <a href="#">{t('header.navbar.term-information-link')}</a>
            </nav>
        </div>
    );
}

export default Header;