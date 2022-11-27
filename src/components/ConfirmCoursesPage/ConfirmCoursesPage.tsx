import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ConfirmCoursesPage.scss'
import { GetCourseClassStatus, GetMeetingDates, GetCourseUnits } from '../utils/Utils'
import axios from 'axios';

const ConformCoursesPage = () => {

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
        <h1 className='page-title'>Confirm Courses</h1>
        <div className='confirmationPageContainer my-5'>
            <div className="alert alert-info mt-5" role="alert">
                <i style={{fontSize: "50px", display: "inline"}} className="bi bi-info-circle"></i>
                <p>Select <b>Confirm</b> to process your request for the courses listed below and add it to your schedule.
                 To exit without addening these classes, select <b>Cancel</b>. Select the <b>Trash</b> icon to remove a course
                 from the list (it will still be saved in your Shopping Cart for later)</p>
            </div>
            <div className='cancelOrConfirmContainer'>
                <Link to="/shopping-cart"
                      state={{semester: location.state.semester}}>
                    <button className='back-btn' 
                            style={{fontSize: "1.7rem"}}>
                            <i className="bi bi-arrow-left-circle"></i> Back
                    </button>
                </Link>
                <Link to="/enrollment-results"
                      state={{
                        courses: shoppingCartCourses
                      }}>
                    <button className='confirm-btn'
                            style={{fontSize: "1.7rem"}}
                            onClick={() => handleCourseDelete(shoppingCartCourses)}
                            >Confirm <i className="bi bi-arrow-right-circle"></i>
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
                                                    <td>{GetMeetingDates(course, index)}</td>
                                                    <td>{GetCourseClassStatus(courseClass.seats.capacity, courseClass.seats.taken, course.isClosed)}</td>
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