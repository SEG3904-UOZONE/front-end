import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './EnrollmentResultsPage.scss'

const EnrollmentResultsPage = () => {

    const location = useLocation();
    const [courses, setCourses] = useState([...location.state.courses])

    const getCourseEnrollmentStatus = (isSuccessful: boolean) => {
        if (isSuccessful) {
            return(
                <>
                    <i className="bi bi-check" style={{fontSize: "45px", color: "green"}}></i>
                    <p>Enrolled</p>
                </>
            )
        }
        return(
            <>
                <i className="bi bi-x" style={{fontSize: "45px", color: "red"}}></i>
                <p>Error</p>
            </>
        )
    }
    
    return(
        <div className='enrollmentResultsPageContainer my-5'>
            <h1>Enrollment Results</h1>
            <div className="alert alert-info my-5" role="alert">
                <i style={{fontSize: "50px", display: "inline"}} className="bi bi-info-circle"></i>
                <p>View the following status report for enrollment confirmations and errors.</p>
            </div>
            <div className="resultsTable">
                <table className="table table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th style={{width: "20%"}} scope="col">Course</th>
                            <th scope="col">Message</th>
                            <th scope="col" style={{width: "20%"}}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            courses.map((course, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{course.code} {course.number}</td>
                                        <td>You have successfully enrolled in this course. The course is now added to your Schedule</td>
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
                      state={{semester: courses[0].term+courses[0].year}}>
                    <button className='cancelButton btn btn-secondary'>Shopping Cart</button>
                </Link>
                <Link to="/search-course"
                      state={{
                        semester: location.state.semester,
                      }}>
                    <button className='nextButton btn btn-primary'>Search Courses</button>
                </Link>
            </div>
        </div>
    )
}

export default EnrollmentResultsPage