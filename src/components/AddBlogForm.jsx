import { useEffect, useState } from "react";
import {getAllCategories, createBlog} from '../Controller.js';
import redberryLogo from '../images/redberry-logo.png';
import {format} from 'date-fns';
import Select from 'react-select';
import galleryImage from '../images/gallery.png'
import deleteImage from '../images/add.png';
import { Link } from "react-router-dom";

const AddBlogForm = function() {

    const georgianSymbols = [
      'ა', 'ბ', 'გ', 'დ', 'ე', 'ვ', 'ზ', 'თ', 'ი', 'კ',
      'ლ', 'მ', 'ნ', 'ო', 'პ', 'ჟ', 'რ', 'ს', 'ტ', 'უ',
      'ფ', 'ქ', 'ღ', 'ყ', 'შ', 'ჩ', 'ც', 'ძ', 'წ', 'ჭ',
      'ხ', 'ჯ', 'ჰ'
    ];

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
    const [allCategories, setAllCategories] = useState([]);

    const [submitButtonColor, setSubmitButtonColor] = useState('#E4E3EB');

    console.log(categoriesOptions);
    console.log(categories.map(category => category.value));
    console.log(allCategories);

    const customStyles = {
      control: (provided) => ({
        ...provided,
        width: 288,
        // height: 44,
        borderRadius: 12,
        border: '1px solid #E4E3EB',
        position: 'relative', // Position relative for the custom container
      }),
      multiValue: (provided) => ({
        ...provided,
        backgroundColor: '#E4E3EB',
        borderRadius: 12,
        display: 'flex',
        position: 'absolute',
        top: '10px',
        right: 0,
        left: 0,
      }),
      multiValueLabel: (provided) => ({
        ...provided,
        color: '#666',
        padding: '8px',
      }),
      dropdownIndicator: (provided) => ({
        ...provided,
        color: '#666',
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
          ? state.data.background_color
          : 'white',
        color: state.isSelected ? '#FFFFFF' : state.data.text_color,
        height: 32,
        borderRadius: 30,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 10,
        margin: '2px',
        cursor: 'pointer',
        ':hover': {
          backgroundColor: state.isSelected
            ? state.data.background_color
            : '#E4E3EB',
        },
      }),
      menu: (provided) => ({
        ...provided,
        width: 288,
        borderRadius: 8,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }),
    };

    console.log(email?.includes('@'))
    console.log(email?.split('@').length === 2);
    console.log(email.includes('redberry.ge'));
    
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const fetchedCategories = await getAllCategories();
          // setCategories(fetchedCategories.data.map(category => category.id));
          setAllCategories(fetchedCategories.data);
          fetchedCategories.data.forEach((category, i) => categoriesOptions[i] = {value: category.id, label: category.title});
        } catch (error) {
          console.error('Error fetching categories:', error.message);
        }
      };
      fetchData();
    }, [categoriesOptions]);

    const handleSubmit = async (event) => {
      event.preventDefault();

      if(!image) return;
      console.log('image works')
      console.log(author.split(' ').length >= 2)
      if(author.length < 4 || !author.split(' ').length >= 2) return
      console.log('author works too')
      if(title.length < 4) return;
      console.log('title working babee!!!')

      if(bio.length < 4) return;
      console.log('biooo does too')

      if(categories.length === 0) return;
      console.log(categories.map(category =>  category.value))
      console.log('categories tooo')
      if(email[0] === '@' || !email.includes('@') || !email?.split('@').length === 2 || !email?.includes('redberry.ge')) return;

      console.log('hardest was email')

      setSubmitButtonColor('#5D37F3')
      
      const formData = {
        image: image,
        author: author,
        title: title,
        description: bio,
        publish_date: date,
        categories: categories.map(category => category.value),
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

    const handleCategoriesChange = (selectedOptions) => {
      setCategories(selectedOptions);
    };

    if(pseudoUser === null) return <div><Link to='/'>Sign up to Submit Your Blog!</Link></div>
    console.log(author)
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
                <div 
                  className="validation-element"
                  style={
                    author.length >= 4 && author.split(' ')[author.split(' ').length - 1] !== '' ? {color: '#85858D'} : {color: '#EA1919'}
                  }
                >
                  • მინიმუმ 4 სიმბოლო
                </div>
                <div 
                  className="validation-element"
                  style={
                    author.split(' ').length >=2 ? {color: '#85858D'} : {color: '#EA1919'}
                  }
                >
                  • მინიმუმ ორი სიტყვა
                </div>
                <div 
                  className="validation-element"
                  style={
                    [...author].some(char => georgianSymbols.includes(char)) ? {color: '#85858D'} : {color: '#EA1919'}
                  }
                >
                  • მხოლოდ ქართული სიმბოლოები
                </div>
              </label>
              
              <label>
                <div className="desc-element">სათაური*</div>
                <input placeholder="შეიყვანეთ სათაური" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <div className="validation-element"
                  style={title.length >= 4 ? {color: '#85858D'} : {color: '#EA1919'}}
                >მინიმუმ 4 სიმბოლო</div>
              </label>
            </div>
            
            <div className="form-blog-description">
              <label>
                <div className="desc-element">აღწერა*</div>
                <textarea placeholder="შეიყვანეთ აღწერა" className="form-bio" rows='10' cols='50' value={bio} onChange={(e) => setBio(e.target.value)} />
                <div 
                  className="validation-element"
                  style={bio.length >= 2 ? {color: '#85858D'} : {color: '#EA1919'}}
                  >მინიმუმ 4 სიმბოლო</div>
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
                    value={categories}
                    onChange={handleCategoriesChange}
                    styles={customStyles}
                  />
                </div>
              </label>
            </div>
            
            <div className="form-row">
              <label>
                <div className="desc-element">ელ-ფოსტა</div>
                <input className="submit-blog-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <div className="validation-element"
                  style={email[0] !== '@' &&email?.includes('@') && email?.split('@').length === 2 && email.includes('redberry.ge') ? {color: '#85858D'} : {color: '#EA1919'}}
                >მეილი უნდა მთავრდებოდეს redberry.ge-ით</div>
              </label>
            </div>
            <button style={{backgroundColor: submitButtonColor}} className="submit-blog-button" type="submit">გამოქვეყნება</button>
          </form>
        </div>
      </>
    );
};
  
export default AddBlogForm;

