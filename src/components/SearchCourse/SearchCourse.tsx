import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SearchCourse.scss'
import { useTranslation } from 'react-i18next';
import ProgressBar from '../utils/ProgressBar/ProgressBar';


const SearchCourse = () => {

    // i18n
    const { t, i18n } = useTranslation();

    const location = useLocation();
    const [semesterCode, setSemesterCode] = useState<string>(location.state.semester);

    let [hideAdvancedSearch, setHideAdvancedSearch] = useState<boolean>(true)
    let [advancedSearchText, setAdvancedSearchText] = useState<string>(`${t('search-page.advanced-search')}`)

    let [courseSubject, setCourseSubject] = useState("")
    let [courseNumber, setCourseNumber] = useState(0)

    let toggleAdvancedSearch = (): void => {
        setHideAdvancedSearch(!hideAdvancedSearch)
        if (hideAdvancedSearch) {
            setAdvancedSearchText(`${t('search-page.hide-advanced-search')}`);
        } else {
            setAdvancedSearchText(`${t('search-page.advanced-search')}`);
        }
    }

    return(
        <div className='search-course-main mb-5'>
            <div className='page-title'>
                <span>{t('search-page.title')}</span>
            </div>
            <ProgressBar step={'step-1'}/>
            <div id="form-container">
                <div className='cancel-div'>
                    <Link  to="/shopping-cart"
                            state={{semester: semesterCode}}>
                            <i className="bi bi-arrow-left-circle" style={{fontSize: "50px", color: "black"}}></i>
                    </Link>
                </div>
                <form className='form-section'>
                    <h2 className='my-4'>{t('search-page.description')}</h2>
                    <div className="form-group inline-filter">
                        <label htmlFor="subjectInput">{t('search-page.course-subject')}</label>
                        <input type="text" className="form-control" id="subjectInpu" placeholder="AAA" maxLength={3} onChange={e => setCourseSubject((e.target.value).toUpperCase())}/>
                    </div>
                    <div className="form-group inline-filter ">
                        <label htmlFor="courseNumberInput">{t('search-page.course-number')}</label>
                        <input type="number" className="form-control" id="courseNumberInput" placeholder="1234" max={9999} onChange={e => setCourseNumber(parseInt(e.target.value))}/>
                    </div>
                    <div className="form-group inline-filter" hidden={hideAdvancedSearch}>
                        <label htmlFor="courseCareerInput">{t('search-page.course-career')}</label>
                        <select className="form-control" defaultValue={'DEFAULT'} >
                            <option value="DEFAULT" disabled hidden></option>
                            <option value="undergraduate">Undergraduate</option>
                            <option value="graduate">Graduate</option>
                            <option value="education">Education</option>
                            <option value="law">Law</option>
                            <option value="medicine">Medicine</option>
                        </select>
                    </div>
                    <div className="form-group inline-filter" hidden={hideAdvancedSearch}>
                        <label htmlFor="courseNumberRangeInput">{t('search-page.number-range')}</label>
                        <select className="form-control" defaultValue={'DEFAULT'} >
                            <option value="DEFAULT" disabled hidden></option>
                            <option value="exactly">Is Exactly</option>
                            <option value="greaterThan">Greater than</option>
                            <option value="lessThan">Less than</option>
                            <option value="contains">Contains</option>
                        </select>
                    </div>
                    <div className="form-group inline-filter" hidden={hideAdvancedSearch}>
                        <label htmlFor="courseAttributeInput">{t('search-page.course-attribute')}</label>
                        <select className="form-control" defaultValue={'DEFAULT'} >
                            <option value="DEFAULT" disabled hidden></option>
                            <option value="Auditor">Auditor Permitted</option>
                            <option value="compExam">Comprehensive Exam</option>
                            <option value="language">Language of Study</option>
                            <option value="major">Major Paper</option>
                            <option value="multierm">Multi-term Course</option>
                            <option value="thesis">Thesis activity</option>
                            
                        </select>
                    </div>
                    <div className="form-group inline-filter" hidden={hideAdvancedSearch}>
                        <label htmlFor="courseComponentInput">{t('search-page.course-component')}</label>
                        <select className="form-control" defaultValue={'DEFAULT'} >
                            <option value="DEFAULT" disabled hidden></option>
                            <option value="lab">Laboratory</option>
                            <option value="lecture">Lecture</option>
                            <option value="dgd">DGD</option>
                        </select>
                    </div>
                    <div className="form-group inline-filter" hidden={hideAdvancedSearch}>
                        <label htmlFor="courseCampusInput">{t('search-page.campus')}</label>
                        <select className="form-control" defaultValue={'DEFAULT'} >
                            <option value="DEFAULT" disabled hidden></option>
                            <option value="uOttawa">University of Ottawa</option>
                            <option value="offCampus">Off Campus</option>
                        </select>
                    </div>
                    <div className="form-group inline-filter" hidden={hideAdvancedSearch}>
                        <label htmlFor="courseLocationInput">{t('search-page.location')}</label>
                        <select className="form-control" defaultValue={'DEFAULT'} >
                            <option value="DEFAULT" disabled hidden></option>
                            <option value="ARROSAR">AR Rosario</option>
                            <option value="ATBUNDE">AT Bundes</option>
                            <option value="CAALMON">CA Almonte</option>
                            <option value="CABARRY">CA Barry's Bay</option>
                            <option value="FRMETZ0">FR Metz</option>
                            <option value="FRRHONE">FR Rhônes - Alpes</option>
                            <option value="THCHULA">TH Chulalongkorn</option>
                            <option value="USPAYS0">United States</option>
                            <option value="ZZVIRTL">Virtual</option>
                        </select>
                    </div>
                    <Link  to="/courses-result"
                           state={{
                                courseSubject: courseSubject,
                                courseNumber: courseNumber,
                                semester: semesterCode
                            }}>
                        <button type="submit" id="submit-seach-btn">{t('common.search')}</button>
                    </Link>
                </form>
                <button className='btn btn-link mt-5' 
                            id='advanced-search-btn'
                            onClick={() => toggleAdvancedSearch()}>{advancedSearchText}</button>
            </div>
        </div>
    )
}

export default SearchCourse
