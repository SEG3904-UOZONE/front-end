import './AddCourseMainPage.scss'
import coursesData from '../../../data/course.json'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react';
import { GetCourseClassStatus, GetMeetingDates, GetCourseUnits } from '../../utils/Utils'

const AddCourseMainPage = (props: any) => {

    const location = useLocation();
    const courses = new Array(...coursesData);
    const [semesterCode, setSemesterCode] = useState<string>(location.state.semester);
    
    // Add the new course if it exists
    if (location.state.selectCourseOptions != null) {
        courses.push(location.state.selectCourseOptions)
    }

    const removeCourseFromList = (index: number) => {
        if (index == 0) {
            return(
                <button className='btn btn-danger'><i className="bi bi-trash"></i></button>
            )
        }
    }

    

    let getCourseClassStatus = (capacity: number, taken: number, isClosed: boolean): string => {
        
        if (isClosed) {
            return "Closed"
        } else if ((capacity-taken) < 1) {
            return "Pending"
        }
        return "Open"
    }

    return(
        <>
            <h1>Shopping Cart Page</h1>
            <div className='add-course-main-container my-5'>
                <div className="add-course-search p-5">
                    <div hidden={courses.length == 0}>
                        <h4>Add Courses to Schedule</h4>
                        <p>Add the courses in the shopping cart to your schedule</p>
                        <Link to="/confirm-courses"
                              state={{ 
                                semester: semesterCode,
                                courses: courses
                            }}>
                            <button className="btn btn-info m-3">Add Courses</button>
                        </Link>
                    </div>
                    <div className="free-serach my-5">
                        <h4>Class Search</h4>
                        <p>Search classes based on different criterias</p>
                        <Link to="/search-course">
                            <button className='btn btn-warning'>Search</button>
                        </Link>
                    </div>
                    <div className="requirements-search my-5">
                        <h4>My Requirements Search</h4>
                        <p>Search classes based on your program requirements</p>
                        <button className='btn btn-warning'>Search</button>
                    </div>
                </div>
                <div className="shopping-cart-container px-5">
                    <h2>Shopping Cart for the {semesterCode.split('-').join(' ').toUpperCase()} term</h2>
                    {
                        courses.map((course, key) => {
                            return (    
                                <div className='course-table' key={key}>
                                    <table className="table table-striped">
                                        <thead className="table-dark">
                                            <tr>
                                            <th scope="col">Course</th>
                                            <th scope="col">Day & Time</th>
                                            <th scope="col">Room</th>
                                            <th scope="col">Instructor</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Units</th>
                                            <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                                course.classes.map((courseClass, index) => {
                                                    return (
                                                        <tr key={key+'-'+index}>
                                                            <td> {course.code}{course.number}</td>
                                                            <td><b>{courseClass.day.en.substring(0,2)} :</b> {courseClass.startTime}-{courseClass.endTime}</td>
                                                            <td>{courseClass.location.address} <br/> ({courseClass.location.department}) {courseClass.location.room}</td>
                                                            <td>{courseClass.instructor}</td>
                                                            <td>{getCourseClassStatus(courseClass.seats.capacity, courseClass.seats.taken, course.isClosed)}</td>
                                                            <td>{GetCourseUnits(course, index)}</td>
                                                            <td>{removeCourseFromList(index)}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        )}
                    <div hidden={courses.length != 0}>
                        <h4>Shopping Cart is empty</h4>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddCourseMainPage