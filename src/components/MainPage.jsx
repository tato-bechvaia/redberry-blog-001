import { useEffect, useState } from 'react';
import { getAllBlogs, getAllCategories} from '../Controller';
import Blog from './Blog';
import Modal from './Modal';
import redberryLogo from '../images/redberry-logo.png';
import redberryPlane from '../images/redberry-plane.png';

const MainPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedBlogs = await getAllBlogs();
        const fetchedCategories = await getAllCategories();
        
        setBlogs(fetchedBlogs?.data);
        setAllCategories(fetchedCategories);

        setFilteredCategories([]);
        setFilteredBlogs(fetchedBlogs?.data);
        
      } catch (error) {
        console.error('Error fetching blogs:', error.message);
      }
    };

    fetchData();  
  }, []);

  const filterCategories = function(e) {
    const categoryId= +e.target.id;
    const categoryIndex = filteredCategories?.indexOf(categoryId);
    
    if(categoryIndex === -1) {
      filteredCategories?.push(categoryId);
    }

    if(categoryIndex !== -1) {
      filteredCategories?.splice(categoryIndex, 1);
    }

    if(filteredCategories?.length === 0) {
      setFilteredBlogs(blogs);
      return;
    }

    setFilteredBlogs(blogs?.filter(blog => blog?.categories?.map(category => category.id).some(element => filteredCategories?.includes(element))));
  }

  const handleCategoryButtonClick = function(e) {
    const clickedButton = e.target;
    
    clickedButton.style.border = clickedButton.style.border ? '' : 'solid black 1px';
    filterCategories(e);
    if(filteredCategories?.length === 0) {
      setFilteredBlogs(blogs);
    }
  };


  return (
    <div className='main-page'>
        <nav className='main-nav'>
            <img className='redberry-logo-image' src={redberryLogo} alt="Redberry Logo" />
            <Modal/>
        </nav>

        <div className='headers'>
            <h1>ბლოგი</h1>
            <img className='redberry-plane-image' src={redberryPlane} alt="Redberry Plane Image" />
        </div>
        
        <div className='all-categories'>
            {allCategories?.data?.map(category => (
                <button 
                    key={category.id}
                    id={category.id}
                    className='category-button' 
                    style={{color: category.text_color, backgroundColor: category.background_color}}
                    onClick={(e) => handleCategoryButtonClick(e)}
                >
                  {category.title}
                </button>
            ))}
        </div>
              
        <div className='all-blogs filtered-blogs'>
            {filteredBlogs?.map(blog => (
            <div className='blog-big-container' key={blog.id}>
              <Blog blog={blog}/>
            </div>
            ))}
        </div>
    </div>
  );
};

export default MainPage;
