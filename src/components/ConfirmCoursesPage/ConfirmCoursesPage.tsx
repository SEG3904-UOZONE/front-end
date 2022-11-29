import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ConfirmCoursesPage.scss'
import { GetCourseClassStatus, GetMeetingDates, GetCourseUnits } from '../utils/Utils'
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import ProgressBar from '../utils/ProgressBar/ProgressBar';


const ConformCoursesPage = () => {

    // i18n
    const { t, i18n } = useTranslation();

    const location = useLocation();
    const [shoppingCartCourses, setShoppingCartCourses] = useState([...location.state.courses])

    const removeCourseFromList = (index: number, key: number) => {
        if (index == 0) {
            return(
                <button className='btn btn-danger delete-icon-btn'
                    onClick={() => {
                        shoppingCartCourses.splice(key, 1)
                        setShoppingCartCourses([...shoppingCartCourses])                       
                    }}
                    ><i className="bi bi-trash"></i>
                </button>
            )
        }
    }

    // Helper function for the delete request
    const handleCourseDelete = async (shoppingCartCourses: any) => {
        shoppingCartCourses.forEach(async (course: { cart_item_id: string; }) => {
            await axios.delete('/cart/'+course.cart_item_id).then(res => console.log(res));
        });
    }
    

    return(
        <>
        <h1 className='page-title'>{t('confirm-courses-page.title')}</h1>
        <ProgressBar step={'step-3'}/>
        <div className='confirmationPageContainer my-5'>
            <div className="alert alert-info mt-5" role="alert">
                <i style={{fontSize: "50px", display: "inline"}} className="bi bi-info-circle"></i>
                <p>{t('confirm-courses-page.description')}</p>
            </div>
            <div className='cancelOrConfirmContainer'>
                <Link to="/shopping-cart"
                      state={{semester: location.state.semester}}>
                    <button className='back-btn' 
                            style={{fontSize: "1.7rem"}}>
                            <i className="bi bi-arrow-left-circle"></i> {t('common.back')}
                    </button>
                </Link>
                <Link to="/enrollment-results"
                      state={{
                        courses: shoppingCartCourses
                      }}>
                    <button className='confirm-btn'
                            style={{fontSize: "1.7rem"}}
                            onClick={() => handleCourseDelete(shoppingCartCourses)}
                            >{t('common.confirm')} <i className="bi bi-arrow-right-circle"></i>
                    </button>
                </Link>
            </div>
            <div className='mb-5'>
            {
                shoppingCartCourses.map((course: any, key: number) => {
                    return (    
                        <div className='course-table courseTable my-5' key={key}>
                            <h4 style={{color: '#8f001a'}}>{course.code+course.number} [{course.section}] - {course.name_en}</h4>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">{t('table.component')}</th>
                                    <th scope="col">{t('table.day')}</th>
                                    <th scope="col">{t('table.time')}</th>
                                    <th scope="col">{t('table.room')}</th>
                                    <th scope="col">{t('table.instructor')}</th>
                                    <th scope="col">{t('table.meeting-dates')}</th>
                                    <th scope="col">{t('table.status')}</th>
                                    <th scope="col">{t('table.units')}</th>
                                    <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                        course.classes.map((courseClass: any, index: number) => {
                                            return (
                                                <tr key={key+'-'+index}>
                                                    <td>{courseClass.type} - {courseClass.sectionCode}</td>
                                                    <td>{courseClass.day.en}</td>
                                                    <td>{courseClass.startTime}-{courseClass.endTime}</td>
                                                    <td>{courseClass.location.address} <br/> ({courseClass.location.department}) {courseClass.location.room}</td>
                                                    <td>{courseClass.instructor}</td>
                                                    <td>{GetMeetingDates(course, index)}</td>
                                                    <td>{GetCourseClassStatus(courseClass.seats.capacity, courseClass.seats.taken, course.isClosed, t)}</td>
                                                    <td>{GetCourseUnits(course, index)}</td>
                                                    <td>{removeCourseFromList(index, key)}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    )}
                )}
            </div>
        </div>
        </>
    )
}

export default ConformCoursesPage