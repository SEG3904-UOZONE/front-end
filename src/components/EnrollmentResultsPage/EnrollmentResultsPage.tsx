import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './EnrollmentResultsPage.scss'
import { useTranslation } from 'react-i18next';
import ProgressBar from '../utils/ProgressBar/ProgressBar';


const EnrollmentResultsPage = () => {

    // i18n
    const { t, i18n } = useTranslation();

    const location = useLocation();
    const [courses, setCourses] = useState([...location.state.courses])

    const getCourseEnrollmentStatus = (isSuccessful: boolean) => {
        if (isSuccessful) {
            return(
                <>
                    <i className="bi bi-check" style={{fontSize: "45px", color: "green"}}></i>
                    <p>{t('enrollment-results-page.enrolled')}</p>
                </>
            )
        }
        return(
            <>
                <i className="bi bi-x" style={{fontSize: "45px", color: "red"}}></i>
                <p>{t('enrollment-results-page.error')}</p>
            </>
        )
    }
    
    return(
        <div style={{fontSize: "20px"}}>
            <h1 className='page-title'>{t('enrollment-results-page.title')}</h1>
            <ProgressBar step={'step-4'}/>
            <div className='enrollmentResultsPageContainer my-5'>
            <div className="alert alert-info my-5" role="alert">
                <i style={{fontSize: "50px", display: "inline"}} className="bi bi-info-circle"></i>
                <p>{t('enrollment-results-page.info')}</p>
            </div>
            <div className="resultsTable">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th style={{width: "20%"}} scope="col">{t('enrollment-results-page.course')}</th>
                            <th scope="col">{t('enrollment-results-page.message')}</th>
                            <th scope="col" style={{width: "20%"}}>{t('enrollment-results-page.status')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            courses.map((course, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{course.code} {course.number}</td>
                                        <td>{t('enrollment-results-page.success-message')}</td>
                                        <td>{getCourseEnrollmentStatus(true)}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className='resultsRedirectionButtons my-5'>
                <Link to="/shopping-cart"
                      state={{semester: courses[0].term+'-'+courses[0].year}}>
                    <button className='back-btn'>{t('common.shopping-cart')}</button>
                </Link>
                <Link to="/search-course"
                      state={{
                        semester: courses[0].term+'-'+courses[0].year
                      }}>
                    <button className='confirm-btn'>{t('enrollment-results-page.search-courses')}</button>
                </Link>
            </div>
        </div>
        </div>
    )
}

export default EnrollmentResultsPage