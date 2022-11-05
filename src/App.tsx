import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddCourseMainPage from './components/AddCourse/AddCourseMainPage/AddCourseMainPage';
import CourseInfoPage from './components/CourseInfoPage/CourseInfoPage';
import CoursesResultPage from './components/CoursesResultPage/CoursesResultPage';
import HomePage from './components/HomePage/HomePage';
import SearchCourse from './components/SearchCourse/SearchCourse';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="shopping-cart" element={<AddCourseMainPage />} />
          <Route path="search-course" element={<SearchCourse />} />
          <Route path="courses-result" element={<CoursesResultPage />} />
          <Route path="course-info" element={<CourseInfoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
