import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './CourseInfoPage.scss'
import { GetCourseClassStatus } from '../utils/Utils'

const CourseInfoPage = (props: any) => {

    const location = useLocation();
    const [selectedCourse, setSelectedCourse] = useState(location.state.course);
    const [selectedCourseOptionsToSend, setSelectedCourseOptionsToSend] = useState({...selectedCourse});
    const [labSession, setLabSession] = useState({});
    const [dgdSession, setDgdSession] = useState({});
    const [courseComponentsSet, setCourseComponentsSet] = useState(new Array);

    useEffect(() => {
        const courseComponentsSetLocal = new Set()
        for(let index=0; index < (selectedCourse.classes).length; index++) {
            courseComponentsSetLocal.add(selectedCourse.classes[index].type)
        }
        setCourseComponentsSet(Array.from(courseComponentsSetLocal))
    }, [])

    const selectButton = (component: any, index: number) => {
        if (component.type != 'LEC') {
            return(
                <input className="form-check-input" 
                       type="radio" 
                       name={component.type+"RadioButton"} 
                       id={component.type+"RadioButton"}
                       onClick={() => selectDGDOrLAB(component)}/>
            )
        } else {
            return(
                <input className="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled" checked disabled />
            )
        }
    }

    const selectDGDOrLAB = (component: any): void => {
        if (component.type == 'DGD') {
            setDgdSession(component)
        } else { // equals to LAB
            setLabSession(component)
        }
        
    }

    const updateCourseWithSelectedOptions = (): void => {
        let selectedOptions: Array<any> = [];
        selectedCourse.classes.forEach((session: any) => {
            if (session.type == 'LEC') {
                selectedOptions.push(session)
            }
        });

        // add the DGD and Lab sessions
        if (Object.keys(dgdSession).length !== 0) {
            selectedOptions.push(dgdSession)
        }
        if (Object.keys(labSession).length !== 0) {
            selectedOptions.push(labSession)
        }

        // Update the selected lab and dgd
        selectedCourseOptionsToSend.classes = selectedOptions
    }

    const showCourseComponentName = (component: string): string => {
        switch (component) {
            case 'LEC':
                return 'Lecture';
            case 'LAB':
                return 'Laboratory';
            case 'DGD':
                return 'Group Discussion'
            default:
                return '';
        }
    }

    return (    
        <>
        <h1 className='mt-5'>Course Info Page</h1>
        <div className='courseInfoPageContainer my-5'>
            <h1 className='mt-5'>{selectedCourse.code+selectedCourse.number} - {selectedCourse.name_en}</h1>
            <div className="courseGeneralInfo mt-5">
                <div className="courseDetails">
                    <div>
                        <h3>Course Details</h3>
                        <div className='px-4'>
                            <div>
                                <h5 style={{display: "inline"}}>Section:</h5> &nbsp; <span>{selectedCourse.section}</span>
                            </div>
                            <div>
                                <h5 style={{display: "inline"}}>Units:</h5> &nbsp; <span>{parseInt(selectedCourse.units).toFixed(2)}</span>
                            </div>
                            <div>
                                <h5 style={{display: "inline"}}>Grading:</h5> &nbsp; <span>D (50%) Passing Grade</span>
                            </div>
                            <div>
                                <h5>Meeting Dates:</h5>
                                <ul>
                                    <li>Start Date: {selectedCourse.startDate.split('-').join('/')}</li>
                                    <li>End Date: {selectedCourse.endDate.split('-').join('/')}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="enrollmentInfo">
                    <h3>Enrollement info</h3>
                    <div className='px-4'>
                        <div>
                            <h5 style={{display: "inline"}}>Prerequisite:</h5> &nbsp; <span>ITI1120</span>
                        </div>
                        <div>
                            <h5 style={{display: "inline"}}>Language:</h5> &nbsp; <span>English</span>
                        </div>
                        <div>
                            <h5 style={{display: "inline"}}>Level:</h5> &nbsp; <span>First year course</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-5'>
                {
                    courseComponentsSet.map((component, key) => {
                        return(
                                
                                <div className='courseComponents' key={key}>
                                    <h4>{showCourseComponentName(component)}</h4>
                                    <table className="table table-striped mb-5">
                                        <thead>
                                            <tr>
                                            <th scope="col">Component</th>
                                            <th scope="col">Section</th>
                                            <th scope="col">Day</th>
                                            <th scope="col">Time</th>
                                            <th scope="col">Room</th>
                                            <th scope="col">Instructor</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Select</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                                selectedCourse.classes.map((courseClass: any, index: any) => {                                            
                                                    if (component == courseClass.type) {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{courseClass.type}</td>
                                                                <td>{selectedCourse.section} - {courseClass.sectionCode}</td>
                                                                <td>{courseClass.day.en}</td>
                                                                <td>{courseClass.startTime}-{courseClass.endTime}</td>
                                                                <td>{courseClass.location.address} <br/> ({courseClass.location.department}) {courseClass.location.room}</td>
                                                                <td>{courseClass.instructor}</td>
                                                                <td>{GetCourseClassStatus(courseClass.seats.capacity, courseClass.seats.taken, selectedCourse.isClosed)}</td>
                                                                <td>{selectButton(courseClass, index)}</td>
                                                            </tr>
                                                        )
                                                    }
                                                })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                        )
                    })
                }
            </div>
            <div className='cancelOrSelectContainer mb-5'>
                <Link to="/shopping-cart"
                      state={{semester: selectedCourse.term+selectedCourse.year}}>
                    <button className='cancelButton btn btn-danger'>Cancel</button>
                </Link>
                <Link to="/shopping-cart"
                      state={{
                        semester: selectedCourse.term+selectedCourse.year,
                        selectCourseOptions: selectedCourseOptionsToSend
                      }}>
                    <button className='nextButton btn btn-primary'
                            onClick={() => {updateCourseWithSelectedOptions()}}>Add</button>
                </Link>
                
            </div>
        </div></>
    )
}

export default CourseInfoPage