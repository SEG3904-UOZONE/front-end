import './AddCourseMainPage.scss'
import courses from '../../../data/course.json'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react';

const AddCourseMainPage = (props: any) => {

    const location = useLocation();
    const [semesterCode, setSemesterCode] = useState<string>(location.state.semester);    
    

    

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
                    <div className="free-serach my-5">
                        <h4>Class Search</h4>
                        <p>Search classes based on different criterias</p>
                        <Link to="/search-course">
                            <button>Search</button>
                        </Link>
                    </div>
                    <div className="requirements-search my-5">
                        <h4>My Requirements Search</h4>
                        <p>Search classes based on your program requirements</p>
                        <button>Search</button>
                    </div>
                </div>
                <div className="shopping-cart-container px-5">
                    <h3>Shopping Cart for the {semesterCode.split('-').join(' ')} term</h3>
                    <table className="table">
                        <thead className="table-dark">
                            <tr>
                            <th scope="col">Course</th>
                            <th scope="col">Component</th>
                            <th scope="col">Day</th>
                            <th scope="col">Time</th>
                            <th scope="col">Instructor</th>
                            <th scope="col">Status</th>
                            <th scope="col">Units</th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                courses.map((course) => {
                                    return (
                                        <tr className={course.code+course.number+course.term+course.year}>
                                            <td>{course.code+course.number}</td>
                                            <td>
                                                {
                                                    course.classes.map((courseClass) => {
                                                        return (
                                                            <tr>
                                                                <div>{courseClass.type}</div>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </td>
                                            <td>
                                                {
                                                    course.classes.map((courseClass) => {
                                                        return (
                                                            <tr>
                                                                <div>{courseClass.day.en}</div>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </td>
                                            <td>
                                                {
                                                    course.classes.map((courseClass) => {
                                                        return (
                                                            <tr>
                                                                <div>{courseClass.startTime}-{courseClass.endTime}</div>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </td>
                                            <td>
                                                {
                                                    course.classes.map((courseClass) => {
                                                        return (
                                                            <tr>
                                                                <div>{courseClass.instructor}</div>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </td>
                                            <td>
                                                {
                                                    course.classes.map((courseClass) => {
                                                        return (
                                                            <tr>
                                                                <div>{getCourseClassStatus(courseClass.seats.capacity, courseClass.seats.taken, course.isClosed)}</div>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </td>
                                            <td>{course.units.toFixed(2)}</td>
                                            <td><button>Delete</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default AddCourseMainPage