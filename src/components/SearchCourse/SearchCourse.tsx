import { useState } from 'react';
import { Link } from 'react-router-dom';
import './SearchCourse.scss'

const SearchCourse = () => {

    let [hideAdvancedSearch, setHideAdvancedSearch] = useState<boolean>(true)
    let [advancedSearchText, setAdvancedSearchText] = useState<string>('Advanced Search')

    let toggleAdvancedSearch = (): void => {
        setHideAdvancedSearch(!hideAdvancedSearch)
        if (hideAdvancedSearch) {
            setAdvancedSearchText('Hide Advanced Search');
        } else {
            setAdvancedSearchText('Advanced Search');
        }
    }

    return(
        <div className='search-course-main'>
            <h1 className='mt-5'>Search Course</h1>
            <div id="form-container">
                <form className='mt-5 form-section'>
                    <h2 className='my-5'>Insert course information</h2>
                    <div className="form-group inline-filter">
                        <label htmlFor="subjectInput">Course Subject</label>
                        <input type="text" className="form-control" id="subjectInpu" placeholder="AAA" />
                    </div>
                    <div className="form-group inline-filter ">
                        <label htmlFor="courseNumberInput">Course Number</label>
                        <input type="text" className="form-control" id="courseNumberInput" placeholder="1234" />
                    </div>
                    <div className="form-group inline-filter" hidden={hideAdvancedSearch}>
                        <label htmlFor="courseCareerInput">Course Career</label>
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
                        <label htmlFor="courseNumberRangeInput">Number Range</label>
                        <select className="form-control" defaultValue={'DEFAULT'} >
                            <option value="DEFAULT" disabled hidden></option>
                            <option value="exactly">Is Exactly</option>
                            <option value="greaterThan">Greater than</option>
                            <option value="lessThan">Less than</option>
                            <option value="contains">Contains</option>
                        </select>
                    </div>
                    <div className="form-group inline-filter" hidden={hideAdvancedSearch}>
                        <label htmlFor="courseAttributeInput">Course Attribute</label>
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
                        <label htmlFor="courseComponentInput">Course Component</label>
                        <select className="form-control" defaultValue={'DEFAULT'} >
                            <option value="DEFAULT" disabled hidden></option>
                            <option value="lab">Laboratory</option>
                            <option value="lecture">Lecture</option>
                            <option value="dgd">DGD</option>
                        </select>
                    </div>
                    <div className="form-group inline-filter" hidden={hideAdvancedSearch}>
                        <label htmlFor="courseCampusInput">Campus</label>
                        <select className="form-control" defaultValue={'DEFAULT'} >
                            <option value="DEFAULT" disabled hidden></option>
                            <option value="uOttawa">University of Ottawa</option>
                            <option value="offCampus">Off Campus</option>
                        </select>
                    </div>
                    <div className="form-group inline-filter" hidden={hideAdvancedSearch}>
                        <label htmlFor="courseLocationInput">Location</label>
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
                    <Link to="/courses-result">
                        <button type="submit" id="submit-seach-btn">Search</button>
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
