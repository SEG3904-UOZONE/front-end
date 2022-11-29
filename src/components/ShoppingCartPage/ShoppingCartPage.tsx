import './ShoppingCartPage.scss'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { GetCourseClassStatus, GetMeetingDates, GetCourseUnits } from '../utils/Utils'
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import ProgressBar from '../utils/ProgressBar/ProgressBar';


const AddCourseMainPage = (props: any) => {

    // i18n
    const { t, i18n } = useTranslation();

    const location = useLocation();
    const [semesterCode, setSemesterCode] = useState<string>(location.state.semester);
    let isEmptyCart: boolean = true

    // Extract academic term name
    const academicTerm = (semesterCode: string) => {
        const semesterAndYear = semesterCode.split('-')
        if (semesterAndYear[0] == 'fall') {
            return `${t('common.fall').toUpperCase()} ${semesterAndYear[1]}`
        } else {
            return `${t('common.winter').toUpperCase()} ${semesterAndYear[1]}`
        }
    }

     // Grouping the API data insude of an array of objects.
     let [cart, setCart] = useState<any[]>([]);
 
     // React hook to fetch the data
     useEffect(() => {
         axios.get('/cart')
             .then(res => setCart(res.data))
             .catch(err => console.error(err));
     }, []);

    
    // filter the cart based on the selected term
    let filteredCart = cart.filter(course => {
        const semester = semesterCode.split('-')
        if ((course.term == semester[0]) && (course.year == semester[1]) ) {
            isEmptyCart = false
            return course
        }
    })

     // Helper function to remove a course from the list of courses
    const removeCourseFromList = (index: number, courseId: any, name: String) => {
        if (index == 0) {
            return(
                <button className='btn btn-danger delete-icon-btn'
                    onClick={async () => {
                        if (window.confirm("Are you sure to delete the course " + name + " ?") == true) {
                            await axios.delete('/cart/'+courseId).then(res => console.log(res));
                            window.location.reload();
                        }
                    }}
                    ><i className="bi bi-trash"></i>
                </button>
            )
        }
    }

    return(
        <>
            <h1 className='mt-5 page-title'>{t('shopping-cart-page.shopping-cart')}</h1>
            <div hidden={filteredCart.length != 0}><ProgressBar step={'step-0'}/></div>
            <div hidden={filteredCart.length == 0}><ProgressBar step={'step-2'}/></div>
            <div className='add-course-main-container my-5'>
                <div className="add-course-search">
                    <div className="py-4" id='changeTermComponent'>
                        <h4 className='component-title'>{academicTerm(semesterCode)} {t('common.term-long')}</h4>
                        <Link to="/">
                            <button className='change-term-btn'>{t('shopping-cart-page.change-term')}</button>
                        </Link>
                    </div>
                    <div className="free-search my-3 py-4">
                        <h4 className='component-title'>{t('shopping-cart-page.class-search.title')}</h4>
                        <p>{t('shopping-cart-page.class-search.description')}</p>
                        <Link   to="/search-course"
                                state={{ 
                                    semester: semesterCode,
                                }}>
                            <button className='search-course-btn'>{t('common.search')}</button>
                        </Link>
                    </div>
                    <div className="requirements-search my-3 py-4">
                        <h4 className='component-title'>{t('shopping-cart-page.requirements-search.title')}</h4>
                        <p>{t('shopping-cart-page.requirements-search.description')}</p>
                        <button className='search-course-btn'>{t('common.search')}</button>
                    </div>
                </div>
                <div className="shopping-cart-container px-5">
                    <h2 className='mt-3'>{t('shopping-cart-page.description')} <b>{academicTerm(semesterCode)}</b> {t('common.term-long')}</h2>
                    <div hidden={filteredCart.length == 0}>
                        <Link to="/confirm-courses"
                              state={{ 
                                semester: semesterCode,
                                courses: cart
                            }}>
                            <button className="btn mt-5" id='step-two-btn'>{t('shopping-cart-page.add-courses')} <i className="bi bi-arrow-right-circle"></i></button>
                        </Link>
                    </div>
                    <div className="cart-tables">
                        {
                            filteredCart
                                .map((course, key) => {
                                    return (    
                                        <div className='course-table my-5' key={key}>
                                            <h4 style={{color: '#8f001a'}}>{course.code+course.number} [{course.section}] - {course.name_en}</h4>
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                    <th scope="col">{t('table.component')}</th>
                                                    <th scope="col">{t('table.date-time')}</th>
                                                    <th scope="col">{t('table.room')}</th>
                                                    <th scope="col">{t('table.instructor')}</th>
                                                    <th scope="col">{t('table.status')}</th>
                                                    <th scope="col">{t('table.units')}</th>
                                                    <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        course.classes.map((courseClass:any, index: number) => {
                                                            return (
                                                                <tr key={key+'-'+index}>
                                                                    <td>{courseClass.type} - {courseClass.sectionCode}</td>
                                                                    <td><b>{courseClass.day.en.substring(0,2)} :</b> {courseClass.startTime}-{courseClass.endTime}</td>
                                                                    <td>{courseClass.location.address} <br/> ({courseClass.location.department}) {courseClass.location.room}</td>
                                                                    <td>{courseClass.instructor}</td>
                                                                    <td>{GetCourseClassStatus(courseClass.seats.capacity, courseClass.seats.taken, course.isClosed, t)}</td>
                                                                    <td>{GetCourseUnits(course, index)}</td>
                                                                    <td>{removeCourseFromList(index, course.cart_item_id, course.code+course.number)}</td>
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
                    <div className="alert alert-danger mt-5" role="alert" hidden={filteredCart.length != 0}>
                        <i style={{fontSize: "50px", display: "inline"}} className="bi bi-info-circle"></i>
                        <h4>{t('shopping-cart-page.empty-cart')}</h4>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddCourseMainPage