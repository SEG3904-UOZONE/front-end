import { useState } from 'react';
import './HomePage.scss'

const HomePage = () => {

    const [semesterCode, setSemesterCode] = useState<String>('');

    return(
        <div>
            <button className='btn btn-primary' 
                    value={'fall-2022'} 
                    onClick={e => setSemesterCode((e.target as HTMLButtonElement).value)}
                    >Fall 2022
            </button>
            <button className='btn btn-primary'
                    value={'winter-2023'} 
                    onClick={e => setSemesterCode((e.target as HTMLButtonElement).value)}
                    >Winter 2023
            </button>
        </div>
    )
}


export default HomePage