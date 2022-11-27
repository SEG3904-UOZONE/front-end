import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import ShoppingCartPage from './components/ShoppingCartPage/ShoppingCartPage';
import ConfirmCoursesPage from './components/ConfirmCoursesPage/ConfirmCoursesPage';
import CourseInfoPage from './components/CourseInfoPage/CourseInfoPage';
import CoursesResultPage from './components/CoursesResultPage/CoursesResultPage';
import EnrollmentResultsPage from './components/EnrollmentResultsPage/EnrollmentResultsPage';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import SearchCourse from './components/SearchCourse/SearchCourse';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="shopping-cart" element={<ShoppingCartPage />} />
          <Route path="search-course" element={<SearchCourse />} />
          <Route path="courses-result" element={<CoursesResultPage />} />
          <Route path="course-info" element={<CourseInfoPage />} />
          <Route path="confirm-courses" element={<ConfirmCoursesPage />} />
          <Route path="enrollment-results" element={<EnrollmentResultsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
