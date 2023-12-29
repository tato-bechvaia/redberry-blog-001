import { useEffect, useState } from "react";
import {getAllCategories, createBlog} from '../Controller.js';
import redberryLogo from '../images/redberry-logo.png';
import {format} from 'date-fns';
import Select from 'react-select';
import galleryImage from '../images/gallery.png'
import deleteImage from '../images/add.png';
import { Link } from "react-router-dom";

const AddBlogForm = function() {

    const pseudoUser = window.localStorage.getItem('user_email');

    const currDate = new Date();
    const todayDate = format(currDate, 'yyyy-MM-dd');

    const [image, setImage] = useState(null);
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [bio, setBio] = useState('');
    const [date, setDate] = useState(todayDate);
    const [categories, setCategories] = useState([]);
    const [email, setEmail] = useState('');
    const [categoriesOptions, setCategoriesOptions] = useState([]);
    const [fileSelected, setFileSelected] = useState(false);

    console.log(<input></input>)
      
    useEffect(() => {
      const fetchData = async () => {
        try {
          const fetchedCategories = await getAllCategories();
          // setCategories(fetchedCategories.data.map(category => category.id));
          fetchedCategories.data.forEach((category, i) => categoriesOptions[i] = {value: category.id, label: category.title});
        } catch (error) {
          console.error('Error fetching categories:', error.message);
        }
      };
      fetchData();
    }, [categoriesOptions]);

    const handleSubmit = async (event) => {
      event.preventDefault();
      
      const formData = {
        image: image,
        author: author,
        title: title,
        description: bio,
        publish_date: date,
        categories: categories,
        email: email,
      };

      try {
        const postBlogResponse = await createBlog(formData);
        console.log(postBlogResponse.status);
        
        if (postBlogResponse?.ok) {
          console.log('POST is successful', postBlogResponse);
        } else {
          console.error('Failed to create blog:', postBlogResponse.status, postBlogResponse.statusText);
        }
      } catch (error) {
        console.error('Error creating blog:', error.message);
      }
    };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImage(file);
        setFileSelected(true);
      }
    };

    const handleFileRemove = (e) => {
      e.preventDefault();
      setImage(null);
      setFileSelected(false);
    }

    if(pseudoUser === null) return <div><Link to='/'>Sign up to Submit Your Blog!</Link></div>

    return (
      <>
        <nav className='main-nav'>
            <img className='redberry-logo-image ' src={redberryLogo} alt="Redberry Logo" />
        </nav>
        <div className="submit-blog">
          <h1 className="submit-blog-header">ბლოგის დამატება</h1>
          <form onSubmit={handleSubmit}>
            <div className="desc-element">ატვირთეთ ფოტო</div>
            <div className={fileSelected ? 'form-upload-image-usual' : "form-upload-image-dashed"}> 
              <label className="file-label" htmlFor="fileInput">
                <div className="input-container">

                  {fileSelected ? 
                  <>
                    <div className="image-name-with-delete-button">
                      <img className="gallery-img" width='24px' height='24px' src={galleryImage} alt="gallery-img" />
                      <div>{image?.name}</div>
                      <img onClick={(e) => handleFileRemove(e)} className="file-delete-button" src={deleteImage} width='24px' height='24px' alt="" />
                    </div>                 
                  </>
               
                    :
                    <div>
                      <div>
                        ჩააგდეთ ფაილი აქ ან
                        <span className="choose-file"> აირჩიეთ ფაილი</span>
                      </div>
                      <input
                        type="file"
                        id="fileInput"
                        className="file-input image-input"
                        onChange={handleFileChange}
                      />
                    </div>
                  }

                </div>
              </label>
            </div>

            <div className="form-row">
              <label>
                <div className="desc-element">ავტორი*</div>
                <input  placeholder="შეიყვანეთ ავტორი" type="text" value={author} 
                onChange={(e) => {setAuthor(e.target.value); console.log(e)}}/>
                <div className="validation-element">
                  • მინიმუმ 4 სიმბოლო
                </div>
                <div className="validation-element">
                  • მინიმუმ ორი სიტყვა
                </div>
                <div className="validation-element">
                  • მხოლოდ ქართული სიმბოლოები
                </div>
              </label>
              
              <label>
                <div className="desc-element">სათაური*</div>
                <input placeholder="შეიყვანეთ სათაური" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <div className="validation-element" style={bio.length >= 2 ? {color: 'red'} : {color: 'blue'}}>მინიმუმ 2 სიმბოლო</div>
              </label>
            </div>
            
            <div className="form-blog-description">
              <label>
                <div className="desc-element">აღწერა*</div>
                <textarea placeholder="შეიყვანეთ აღწერა" className="form-bio" rows='10' cols='50' value={bio} onChange={(e) => setBio(e.target.value)} />
                <div className="validation-element">მინიმუმ 2 სიმბოლო</div>
              </label>
            </div>
            
            <div className="form-row">                    
              <label>
                <div className="desc-element">გამოქვეყნების თარიღი*</div>
                <input className="calendar-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </label>
              <label>
                <div className="desc-element">კატეგორიები*</div>
                <div>
                  <Select
                    closeMenuOnSelect={false}
                    isMulti
                    className="categories-dropdown"
                    options={categoriesOptions}
                    placeholder="აირჩიეთ კატეგორია"
                  />
                </div>
              </label>
            </div>

            <div className="form-row">
              <label>
                <div className="desc-element">ელ-ფოსტა</div>
                <input className="submit-blog-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <div className="validation-element">მეილი უნდა მთავრდებოდეს redberry.ge-ით</div>
              </label>
            </div>
            <button className="submit-blog-button" type="submit">გამოქვეყნება</button>
          </form>
        </div>
      </>
    );
};
  
export default AddBlogForm;

