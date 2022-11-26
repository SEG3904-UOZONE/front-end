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
    const [semesterCode, setSemesterCode] = useState<string>('');
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
                        <button className='btn btn-primary'>Select</button>
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
            <h1 className='mt-5'>Courses Result Page</h1>
            <div className='courses-result-main-container my-5'>
                <div className="courses-list-container px-5">
                    <h3 className='mt-3'>Available Courses for the {semesterCode.split('-').join(' ')} term</h3>
                    {
                        courses
                            .filter(course => {
                                if ((course.code == courseSubject) && (course.number == courseNumber) ) {
                                    return course
                                }
                            })
                            .map((course: any, key: number) => {
                                return (    
                                    <div className='course-table' key={key}>
                                        <h4>{course.code+course.number} [{course.section}] - {course.name_en}</h4>
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