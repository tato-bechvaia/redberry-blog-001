import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/mainPage';
import FullBlog from './components/FullBlog';
import AddBlogForm from './components/AddBlogForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/blog-208" element={<FullBlog />} /> */}
        <Route path="/blogs/:id" element={<FullBlog />} />
        <Route path="/submit-blog" element={<AddBlogForm />} />
      </Routes>
    </Router>
  );
}

export default App
