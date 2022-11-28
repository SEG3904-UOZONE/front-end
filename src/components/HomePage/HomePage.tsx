import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './HomePage.scss'
import { useTranslation } from 'react-i18next';

const HomePage = () => {

    // i18n
    const { t, i18n } = useTranslation();

    const [semesterCode, setSemesterCode] = useState<string>('');
    const navigate = useNavigate();
    const openfile = async (newSemesterCodeVal: string) => {
        await setSemesterCode(newSemesterCodeVal)   
        await navigate("/shopping-cart", {
            state: {
                semester: newSemesterCodeVal
            }
        });
        window.location.reload();
    }

    return(
        <div>
            <div className='page-title'>
                <span>{t('home-page.select-term-title')}</span>
            </div>
            <div>
                <h2>{t('home-page.description')}</h2>
            </div>
            <div className='term-selection-container'>
                <div className="link-btn mx-5">
                    <Link 
                        to="/shopping-cart"
                        state={{semester: semesterCode}}>
                        <button className='btn'
                                id='fall-2022-btn' 
                                value={'fall-2022'} 
                                onClick={async (e) => {
                                    openfile((e.target as HTMLButtonElement).value);
                                }}
                                >{t('home-page.fall')} 2022
                        </button>
                    </Link>
                </div>
                <div className="link-btn mx-5">
                    <Link 
                        to="/shopping-cart"
                        state={{semester: semesterCode}}>
                        <button className='btn'
                                id='winter-2023-btn' 
                                value={'winter-2023'} 
                                onClick={async (e) => {
                                    openfile((e.target as HTMLButtonElement).value);
                                }}
                                >{t('home-page.winter')} 2023
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default HomePage