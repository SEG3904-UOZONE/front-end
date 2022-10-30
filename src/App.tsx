import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddCourseMainPage from './components/AddCourse/AddCourseMainPage/AddCourseMainPage';
import HomePage from './components/HomePage/HomePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="shopping-cart" element={<AddCourseMainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
