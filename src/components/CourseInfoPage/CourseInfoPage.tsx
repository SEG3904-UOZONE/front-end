import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './CourseInfoPage.scss'
import { GetCourseClassStatus } from '../utils/Utils'
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const CourseInfoPage = (props: any) => {

    // i18n
    const { t, i18n } = useTranslation();

    // set local variables
    const location = useLocation();
    const [selectedCourse, setSelectedCourse] = useState(location.state.course);
    const [selectedCourseOptionsToSend, setSelectedCourseOptionsToSend] = useState({...selectedCourse});
    const [labSession, setLabSession] = useState({});
    const [dgdSession, setDgdSession] = useState({});
    const [courseComponentsSet, setCourseComponentsSet] = useState(new Array);


    // Define all course components available from the selected course, such as LEC, DGD and LAB (if they exist)
    useEffect(() => {
        const courseComponentsSetLocal = new Set()
        for(let index=0; index < (selectedCourse.classes).length; index++) {
            courseComponentsSetLocal.add(selectedCourse.classes[index].type)
        }
        setCourseComponentsSet(Array.from(courseComponentsSetLocal))
    }, [])

    // Add a different selection button depending on the type of course component
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
            // lecture component is selected by default
            return(
                <input className="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled" checked disabled />
            )
        }
    }

    // Set the lab or dgd session based on the 
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

    // Helper function for the POST request
    const handlePost = async (): Promise<any> => {

        // add the selected lab and dgd sessions if they exist
        updateCourseWithSelectedOptions()

        // create a new object to return
        const newCourseToAdd = {
            cart_item_id: selectedCourseOptionsToSend.course_id + 100,
            code: selectedCourseOptionsToSend.code,
            number: selectedCourseOptionsToSend.number,
            term: selectedCourseOptionsToSend.term,
            year: selectedCourseOptionsToSend.year,
            section: selectedCourseOptionsToSend.section,
            units: selectedCourseOptionsToSend.units,
            isClosed: selectedCourseOptionsToSend.isClosed,
            name_en: selectedCourseOptionsToSend.name_en,
            name_fr: selectedCourseOptionsToSend.name_fr,
            startDate: selectedCourseOptionsToSend.startDate,
            endDate: selectedCourseOptionsToSend.endDate,
            classes: `${JSON.stringify(selectedCourseOptionsToSend.classes)}`
        }

        // Add the new course selected to the cart table
        await axios.post('/cart', newCourseToAdd)
                    .then(() => console.log("Course added successfully"))
                    .catch(err => console.log(err));
    }

    return (    
        <>
        <h1 className='page-title'>{t('course-info-page.title')}</h1>
        <div className='courseInfoPageContainer my-5'>
            <div className='cancel-div mx-5 mt-4'>
                    <Link  to="/courses-result"
                            state={{
                                semester:selectedCourse.term+'-'+selectedCourse.year,
                                courseSubject: selectedCourse.code,
                                courseNumber: selectedCourse.number
                            }}>
                            <i className="bi bi-arrow-left-circle" style={{fontSize: "50px", color: "black"}}></i>
                    </Link>
                </div>
            <h1 style={{color: "rgb(143, 0, 26)"}}>{selectedCourse.code+selectedCourse.number} - {selectedCourse.name_en}</h1>
            <div className="courseGeneralInfo mt-5">
                <div className="courseDetails">
                    <div>
                        <h3 style={{fontWeight: "600"}}>{t('course-info-page.course-details')}</h3>
                        <div className='px-2'>
                            <div>
                                <h5 style={{display: "inline"}}>{t('table.section')}:</h5> &nbsp; <span>{selectedCourse.section}</span>
                            </div>
                            <div>
                                <h5 style={{display: "inline"}}>{t('table.units')}:</h5> &nbsp; <span>{parseInt(selectedCourse.units).toFixed(2)}</span>
                            </div>
                            <div>
                                <h5 style={{display: "inline"}}>{t('course-info-page.grading')}:</h5> &nbsp; <span>D (50%) {t('course-info-page.passing-grade')}</span>
                            </div>
                            <div>
                                <h5>{t('table.meeting-dates')}:</h5>
                                <ul>
                                    <li>{t('course-info-page.start-date')}: {selectedCourse.startDate.split('-').join('/')}</li>
                                    <li>{t('course-info-page.end-date')}: {selectedCourse.endDate.split('-').join('/')}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="enrollmentInfo">
                    <h3 style={{fontWeight: "600"}}>{t('course-info-page.enrollment-info')}</h3>
                    <div className='px-2'>
                        <div>
                            <h5 style={{display: "inline"}}>{t('course-info-page.prerequisite')}:</h5> &nbsp; <span>ITI1120</span>
                        </div>
                        <div>
                            <h5 style={{display: "inline"}}>{t('course-info-page.language')}:</h5> &nbsp; <span>English</span>
                        </div>
                        <div>
                            <h5 style={{display: "inline"}}>{t('course-info-page.level')}:</h5> &nbsp; <span>First year course</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-5'>
                {
                    courseComponentsSet.map((component, key) => {
                        return(
                                
                                <div className='courseComponents' key={key}>
                                    <h4 style={{color: "rgb(143, 0, 26)"}}>{showCourseComponentName(component)}</h4>
                                    <table className="table table-striped mb-5">
                                        <thead>
                                            <tr>
                                            <th scope="col">{t('table.component')}</th>
                                            <th scope="col">{t('table.section')}</th>
                                            <th scope="col">{t('table.day')}</th>
                                            <th scope="col">{t('table.time')}</th>
                                            <th scope="col">{t('table.room')}</th>
                                            <th scope="col">{t('table.instructor')}</th>
                                            <th scope="col">{t('table.status')}</th>
                                            <th scope="col">{t('common.select')}</th>
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
                                                                <td>{GetCourseClassStatus(courseClass.seats.capacity, courseClass.seats.taken, selectedCourse.isClosed, t)}</td>
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
                      state={{semester: selectedCourse.term+'-'+selectedCourse.year}}>
                    <button className='back-btn'>{t('common.cancel')}</button>
                </Link>
                <Link to="/shopping-cart"
                      state={{
                        semester: selectedCourse.term+'-'+selectedCourse.year,
                      }}>
                    <button className='add-btn'
                            onClick={() => {handlePost()}}>{t('common.add')}</button>
                </Link>                
            </div>
        </div></>
    )
}

export default CourseInfoPage