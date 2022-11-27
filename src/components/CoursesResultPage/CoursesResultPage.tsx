import './CoursesResultPage.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GetCourseUnits } from '../utils/GetCourseUnits';

const CoursesResultPage = (props: any) => {

    // Grouping the API data inside of an array of objects.
    let [courses, setCourses] = useState<any[]>([]);
 
    // React hook to fetch the data of courses
    useEffect(() => {
        axios.get('/courses')
            .then(res => setCourses(res.data))
            .catch(err => console.error(err));
    }, []);
    
    // set the local variables
    const location = useLocation();
    const courseSubject = location.state.courseSubject
    const courseNumber = location.state.courseNumber
    const [semesterCode, setSemesterCode] = useState<string>(location.state.semester);
    const navigate = useNavigate();
    

    let getCourseClassStatus = (capacity: number, taken: number, isClosed: boolean): string => {
        
        if (isClosed) {
            return "Closed"
        } else if ((capacity-taken) < 1) {
            return "Pending"
        }
        return "Open"
    }

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
                        <button className='btn btn-danger dark-red-btn'>Select</button>
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
            <h1 className='page-title'>Courses Result Page</h1>
            <div className='courses-result-main-container my-5'>
                <div className="courses-list-container px-5">
                    <h2 className='my-3'>Available <b>{courseSubject} {courseNumber}</b> Courses for the <b>{semesterCode.split('-').join(' ').toUpperCase()}</b> term</h2>
                    <div className="alert alert-info mt-5" role="alert" hidden={courses.length!=0}>
                        <i style={{fontSize: "50px", display: "inline"}} className="bi bi-info-circle"></i>
                        <p>Select one of the courses based on the criterias you entered, you can also modify the search query, or return to the shopping cart</p>
                    </div>
                    <div className="alert alert-danger mt-5" role="alert" hidden={courses.length==0}>
                        <i style={{fontSize: "50px", display: "inline"}} className="bi bi-info-circle"></i>
                        <p>The search returned no results, you can modify the search query, or return to the shopping cart</p>
                    </div>
                    <div className='resultsRedirectionButtons my-5'>
                        <Link to="/shopping-cart"
                            state={{semester: semesterCode}}>
                            <button className='back-btn'>Shopping Cart</button>
                        </Link>
                        <Link to="/search-course"
                            state={{
                                semester: semesterCode,
                            }}>
                            <button className='modify-search-btn'>Modify Search</button>
                        </Link>
                    </div>
                    {
                        courses
                            .filter(course => {
                                const semester = semesterCode.split('-')
                                if ((course.code == courseSubject) 
                                    && (course.number == courseNumber)
                                    && (course.term == semester[0])
                                    && (course.year == semester[1]) ) {
                                    return course
                                }
                            })
                            .map((course: any, key: number) => {
                                return (    
                                    <div className='course-table my-5' key={key}>
                                        <h4 style={{color: '#8f001a'}}>{course.code+course.number} [{course.section}] - {course.name_en}</h4>
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                <th scope="col">Component</th>
                                                <th scope="col">Day</th>
                                                <th scope="col">Time</th>
                                                <th scope="col">Room</th>
                                                <th scope="col">Instructor</th>
                                                <th scope="col">Meeting Dates</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Units</th>
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
                                                                <td>{getCourseClassStatus(courseClass.seats.capacity, courseClass.seats.taken, course.isClosed)}</td>
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
            </>
    )
}


export default CoursesResultPage