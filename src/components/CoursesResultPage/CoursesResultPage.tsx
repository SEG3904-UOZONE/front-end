import './CoursesResultPage.scss'
import courses from '../../data/course.json'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react';

const CoursesResultPage = (props: any) => {

    const location = useLocation();
    const [semesterCode, setSemesterCode] = useState<string>('');    
    

    

    let getCourseClassStatus = (capacity: number, taken: number, isClosed: boolean): string => {
        
        if (isClosed) {
            return "Closed"
        } else if ((capacity-taken) < 1) {
            return "Pending"
        }
        return "Open"
    }

    const selectButton = (index: number) => {
        if (index == 0) {
            return(
                <button>Select</button>
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

    const getCourseUnits = (course: any, index: number) => {
        if (index == 0) {
            return(
                <>{course.units.toFixed(2)}</>
            )
        }
    }

    return(
        <>
            <h1>Courses Result Page</h1>
            <div className='courses-result-main-container my-5'>
                <div className="courses-list-container px-5">
                    <h3>Available Courses for the {semesterCode.split('-').join(' ')} term</h3>
                    {
                        courses.map((course, key) => {
                            return (    
                                <div className='course-table' key={key}>
                                    <h4>{course.code+course.number} [{course.section}] - {course.name.en}</h4>
                                    <table className="table table-striped">
                                        <thead className="table-dark">
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
                                                course.classes.map((courseClass, index) => {
                                                    return (
                                                        <tr key={key+'-'+index}>
                                                            <td>{courseClass.type} - {courseClass.sectionCode}</td>
                                                            <td>{courseClass.day.en}</td>
                                                            <td>{courseClass.startTime}-{courseClass.endTime}</td>
                                                            <td>{courseClass.location.address} <br/> ({courseClass.location.department}) {courseClass.location.room}</td>
                                                            <td>{courseClass.instructor}</td>
                                                            <td>{meetingDates(course, index)}</td>
                                                            <td>{getCourseClassStatus(courseClass.seats.capacity, courseClass.seats.taken, course.isClosed)}</td>
                                                            <td>{getCourseUnits(course, index)}</td>
                                                            <td>{selectButton(index)}</td>
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