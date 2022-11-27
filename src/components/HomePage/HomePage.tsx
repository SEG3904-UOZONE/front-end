import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './HomePage.scss'

const HomePage = () => {

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
                <span>Select Term</span>
            </div>
            <div>
                <h2>Select an acadamic term to proceed</h2>
            </div>
            <div className='term-selection-container'>
                <div className="link-btn mx-5">
                    <Link 
                        to="/shopping-cart"
                        state={{semester: semesterCode}}>
                        <button className='btn' 
                                value={'fall-2022'} 
                                onClick={async (e) => {
                                    openfile((e.target as HTMLButtonElement).value);
                                }}
                                >Fall 2022
                        </button>
                    </Link>
                </div>
                <div className="link-btn mx-5">
                    <Link 
                        to="/shopping-cart"
                        state={{semester: semesterCode}}>
                        <button className='btn'
                                value={'winter-2023'} 
                                onClick={async (e) => {
                                    openfile((e.target as HTMLButtonElement).value);
                                }}
                                >Winter 2023
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default HomePage