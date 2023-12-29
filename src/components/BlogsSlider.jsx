import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Blog from './Blog.jsx';
import { useRef } from 'react';
import sliderLeft from '../images/slider-left.png';
import sliderRight from '../images/slider-right.png';


// eslint-disable-next-line react/prop-types
const BlogSlider = ( blogItemsProp ) => {
  const blogItems = blogItemsProp.blogItems;
  const slider = useRef(null);
  
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
    <div className='header-and-buttons'>
      <h2>მსგავსი სტატიები</h2>
      <div className="direction-buttons">
        <div className='direction-button' onClick={() => slider?.current?.slickPrev()}>
          <img src={sliderLeft}/>
        </div>
        <div className='direction-button' onClick={() => slider?.current?.slickNext()}>
          <img src={sliderRight}/>
        </div>
      </div>
    </div>
    

      <Slider ref={slider} {...settings}>
        {blogItems?.map(blogItem => (
            <Blog key={blogItem.id} blog={blogItem} />
        ))}
      </Slider>
    </>
  );
};

export default BlogSlider;
