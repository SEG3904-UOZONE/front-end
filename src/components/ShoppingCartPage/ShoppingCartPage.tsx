import './ShoppingCartPage.scss'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { GetCourseClassStatus, GetMeetingDates, GetCourseUnits } from '../utils/Utils'
import axios from 'axios';

const AddCourseMainPage = (props: any) => {

    const location = useLocation();
    const [semesterCode, setSemesterCode] = useState<string>(location.state.semester);
    let isEmptyCart: boolean = true

     // Grouping the API data insude of an array of objects.
     let [cart, setCart] = useState<any[]>([]);
 
     // React hook to fetch the data
     useEffect(() => {
         axios.get('/cart')
             .then(res => setCart(res.data))
             .catch(err => console.error(err));
     }, []);

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
            <h1 className='mt-5 page-title'>Shopping Cart Page</h1>
            <div className='add-course-main-container my-5'>
                <div className="add-course-search">
                    <div className="free-serach py-4">
                        <h4 className='component-title'>{semesterCode.split('-').join(' ').toUpperCase()} Term</h4>
                        <Link to="/">
                            <button className='change-term-btn'>Change Term</button>
                        </Link>
                    </div>
                    <div className="free-serach my-3 py-4">
                        <h4 className='component-title'>Class Search</h4>
                        <p>Search classes based on different criterias</p>
                        <Link   to="/search-course"
                                state={{ 
                                    semester: semesterCode,
                                }}>
                            <button className='search-course-btn'>Search</button>
                        </Link>
                    </div>
                    <div className="requirements-search my-3 py-4">
                        <h4 className='component-title'>My Requirements Search</h4>
                        <p>Search classes based on your program requirements</p>
                        <button className='search-course-btn'>Search</button>
                    </div>
                </div>
                <div className="shopping-cart-container px-5">
                    <h2 className='mt-3'>Shopping Cart for the <b>{semesterCode.split('-').join(' ').toUpperCase()}</b> term</h2>
                    <div hidden={filteredCart.length == 0}>
                        <Link to="/confirm-courses"
                              state={{ 
                                semester: semesterCode,
                                courses: cart
                            }}>
                            <button className="btn mt-5" id='step-two-btn'>Add Courses to Schedule <i className="bi bi-arrow-right-circle"></i></button>
                        </Link>
                    </div>
                    {
                        filteredCart
                            .map((course, key) => {
                                return (    
                                    <div className='course-table my-5' key={key}>
                                        <h4 style={{color: '#8f001a'}}>{course.code+course.number} [{course.section}] - {course.name_en}</h4>
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                <th scope="col">Component</th>
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
                                                    course.classes.map((courseClass:any, index: number) => {
                                                        return (
                                                            <tr key={key+'-'+index}>
                                                                <td>{courseClass.type} - {courseClass.sectionCode}</td>
                                                                <td><b>{courseClass.day.en.substring(0,2)} :</b> {courseClass.startTime}-{courseClass.endTime}</td>
                                                                <td>{courseClass.location.address} <br/> ({courseClass.location.department}) {courseClass.location.room}</td>
                                                                <td>{courseClass.instructor}</td>
                                                                <td>{getCourseClassStatus(courseClass.seats.capacity, courseClass.seats.taken, course.isClosed)}</td>
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
                    <div className="alert alert-danger mt-5" role="alert" hidden={filteredCart.length != 0}>
                        <i style={{fontSize: "50px", display: "inline"}} className="bi bi-info-circle"></i>
                        <h4>Shopping Cart is empty, try adding some courses to proceed enrolling</h4>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddCourseMainPage