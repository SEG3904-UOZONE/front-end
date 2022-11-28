import './CoursesResultPage.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GetCourseUnits } from '../utils/GetCourseUnits';
import { GetCourseClassStatus } from '../utils/GetCourseClassStatus';
import { useTranslation } from 'react-i18next';


const CoursesResultPage = (props: any) => {

    // i18n
    const { t, i18n } = useTranslation();

    // Grouping the API data inside of an array of objects.
    let [courses, setCourses] = useState<any[]>([]);
 
    // React hook to fetch the data of courses
    useEffect(() => {
        axios.get('/courses')
            .then(res => setCourses(res.data))
            .catch(err => console.error(err));
    }, []);

    // Extract academic term name
    const academicTerm = (semesterCode: string) => {
        const semesterAndYear = semesterCode.split('-')
        if (semesterAndYear[0] == 'fall') {
            return `${t('common.fall').toUpperCase()} ${semesterAndYear[1]}`
        } else {
            return `${t('common.winter').toUpperCase()} ${semesterAndYear[1]}`
        }
    }
    
    // set the local variables
    const location = useLocation();
    const courseSubject = location.state.courseSubject
    const courseNumber = location.state.courseNumber
    const [semesterCode, setSemesterCode] = useState<string>(location.state.semester);
    const navigate = useNavigate();
    let isEmptySearchResults: boolean = true

    // filter the search results based on the selected criterias
    const filteredSearchResults = courses.filter(course => {
        const semester = semesterCode.split('-')
        if ((course.code == courseSubject) 
            && (course.number == courseNumber)
            && (course.term == semester[0])
            && (course.year == semester[1]) ) {
                isEmptySearchResults = false
                return course
        }
    })
    
    const selectButton = (course: any, index: number) => {
        if (index == 0) {
            return(
                <Link 
                        to="/course-info"
                        state={{course: course}}
                        onClick={() => {
                            navigate("/course-info", {
                                state: {
                                    course: course
                                }
                            });
                        }}
                        >
                        <button className='btn btn-danger dark-red-btn'>{t('common.select')}</button>
                    </Link>
            )
        }
    }

    const meetingDates = (course: any, index: number) => {
        if (index == 0) {
            return(
                <>{course.startDate.split('-').join('/')} <br/> {course.endDate.split('-').join('/')}</>
            )
        }
    }
    

    return(
        <>
            <h1 className='page-title'>{t('courses-result-page.title')}</h1>
            <div className='courses-result-main-container my-5'>
                <div className="courses-list-container px-5">
                    <h2 className='my-3'><b>{courseSubject} {courseNumber}</b> {t('courses-result-page.description')} <b>{academicTerm(semesterCode)}</b> {t('common.term-long')}</h2>
                    <div className="alert alert-info mt-5" role="alert" hidden={isEmptySearchResults}>
                        <i style={{fontSize: "50px", display: "inline"}} className="bi bi-info-circle"></i>
                        <p>{t('courses-result-page.info')}</p>
                    </div>
                    <div className="alert alert-danger mt-5" role="alert" hidden={!isEmptySearchResults}>
                        <i style={{fontSize: "50px", display: "inline"}} className="bi bi-info-circle"></i>
                        <p>{t('courses-result-page.empty-courses')}</p>
                    </div>
                    <div className='resultsRedirectionButtons my-5'>
                        <Link to="/shopping-cart"
                            state={{semester: semesterCode}}>
                            <button className='back-btn'>{t('common.shopping-cart')}</button>
                        </Link>
                        <Link to="/search-course"
                            state={{
                                semester: semesterCode,
                            }}>
                            <button className='modify-search-btn'>{t('common.modify-search')}</button>
                        </Link>
                    </div>
                    <div className="courses-result-tables">
                        {
                            filteredSearchResults
                                .map((course: any, key: number) => {
                                    return (    
                                        <div className='course-table my-5' key={key}>
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
                                                                    <td>{meetingDates(course, index)}</td>
                                                                    <td>{GetCourseClassStatus(courseClass.seats.capacity, courseClass.seats.taken, course.isClosed, t)}</td>
                                                                    <td>{GetCourseUnits(course, index)}</td>
                                                                    <td>{selectButton(course, index)}</td>
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
                </div>
            </>
    )
}


export default CoursesResultPage