// import Arrow from '../images/Arrow.png';
// import { arrowSvg } from '../images/ArrowSvg';
import { Link } from 'react-router-dom';
// import {useNavigate } from 'react-router-dom';
// import Arrow from '../images/Arrow3.svg';

const Blog = function(blog) {
    const currentBlog = blog.blog;
    
    return(
        <div className="blog-container">
            <img className="blog-image" src={currentBlog.image} alt="messi" />
            <div className="blog-info">
                <p className="blog-author blog-left-element">
                    {currentBlog.author}
                </p>

                <div className="blog-publish-date blog-left-element">
                    {currentBlog.publish_date}
                </div>

                <div className="blog-title blog-left-element">
                    <h3>{currentBlog.title.slice(0, 50)}</h3>
                </div>
                
                <div className="blog-categories">
                    {currentBlog.categories.map(category => (
                    <button 
                        key={`category-${category.id}`} 
                        className='in-blog-category-button' 
                        style={{color: category.text_color, backgroundColor: category.background_color}}
                    >
                        {category.title}
                    </button>
                    ))}
                </div>

                <div className="blog-description blog-left-element">
                    <p>{currentBlog.description.slice(0, 86)}...</p>
                </div>

                <div
                    // onClick={navigateToFullBlog} 
                    className="blog-left-element full-blog-navigate"
                >   
                    <Link className='link-button' to={`/blogs/${currentBlog?.id}`}>სრულად ნახვა </Link>
                </div>
            </div>
        </div>
    )
}

export default Blog;

