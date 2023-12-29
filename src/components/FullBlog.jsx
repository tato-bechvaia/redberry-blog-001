// import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import redberryLogo from '../images/redberry-logo.png';
import ArrowButton from '../images/ArrowLink.jpg';
import { getBlogById, getAllBlogs } from '../Controller';
import { Link, useParams } from 'react-router-dom';
import BlogSlider from './BlogsSlider';
import Modal from './Modal';

const FullBlog = function () {

  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedBlog = await getBlogById(id);
        const fetchedAllBlogs = await getAllBlogs();
        setBlog(fetchedBlog);
        setFilteredBlogs(fetchedAllBlogs.data.filter(blog => blog.categories.map(category => category.id).some(element => fetchedBlog.categories.map(category => category.id).includes(element)) && blog.id !== fetchedBlog.id));
      } catch (error) {
        console.error(`Error fetching blog by id:`, error.message);
      }
    };

    fetchData();
  }, [id]);


  if (!blog) {
    // Handle the case when blog data is still loading or not found
    return <div>Loading...</div>;
  }


  
  return (
    blog && 
    <>
        <div className='full-blog-container'>
            <nav className='main-nav'>
                <img width='200px' className='redberry-logo-image' src={redberryLogo} alt='Redberry Logo' />
                {/* <button className='log-in-button'>შესვლა</button> */}
                <Modal/>
            </nav>
            <div className='arrow-button-container'>
                <Link className='arrow-link' to='/'><img className='arrow-button' src={ArrowButton} alt={'Arrow Link'}/></Link>
            </div>
            
            <div className='full-blog'>
                <img width='720px' height='328px' src={blog?.image} alt='' />
                <div className='full-blog-info'>
                    <div className='full-blog-author'>
                        {blog?.author}
                    </div>
                    <div className='full-blog-publish-date-and-email'>
                        {blog?.publish_date} • {blog?.email}
                    </div>
                    <div className='full-blog-title'>{blog?.title}</div>
                    <div className='full-blog-categories'>
                        {blog?.categories?.map((category) => (
                            <div 
                            className='full-blog-category' 
                            key={category?.id}
                            style={{color: category.text_color, backgroundColor: category.background_color}}
                            >
                                {category?.title}
                            </div>
                        ))}
                    </div>
                    <div className='full-blog-description'>
                        {blog?.description}
                    </div>
                </div>
            </div>
        </div>
        
        <div className='similar-blogs'>  
            <BlogSlider className='blogs-slider' blogItems={filteredBlogs} />
        </div>
    </>
  );
};

export default FullBlog;
