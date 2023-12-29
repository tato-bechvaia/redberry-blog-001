import {useEffect, useState } from "react";
import { loginUser } from "../Controller";
import deleteImage from '../images/add.png';
// import errorMessageImage from '../images/info-circle.png';
import successImage from '../images/tick-circle.png';
import { Link } from "react-router-dom";

const Modal = function() {

    const [userEmail, setUserEmail] = useState(null);
    const [modal, setModal] = useState(false);
    const [erroMessage, setErrorMessage] = useState(false);
    const [loginSuccessful, setLoginSuccessful] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const pseudoEmail = window.localStorage.getItem('user_email');
            if(pseudoEmail) setLoginSuccessful(true);
            const responseCheck = await loginUser(pseudoEmail);
            if(responseCheck?.status === 204) {
                setUserEmail(pseudoEmail);
            }
        }

        fetchData();
    }, [userEmail])
    
    const handleUserLogin = async function() {
        setUserEmail(userEmail);
        console.log(userEmail);
        const userCheck = await loginUser(userEmail);
        if(userCheck?.status === 204){
            setLoginSuccessful(true);
            window.localStorage.setItem('user_email', userEmail);
        } else {
            setErrorMessage(true);
            window.localStorage.removeItem('user_email');
        }
        console.log(userCheck);
    }
    
    const toggleModal = function() {
        setModal(!modal);
    }
    
    return(
        <>
            {
            !loginSuccessful ? <button onClick={toggleModal} className='log-in-button'>შესვლა
            </button> : <Link to='/submit-blog'><button className='log-in-button'>დაამატე ბლოგი</button></Link> 
            }
            
            {modal && (
                <div className="overlay">
                    {!loginSuccessful && (
                        <div className={`login-modal`}>
                            <img className="modal-close-button" onClick={toggleModal} src={deleteImage} alt="" />
                            <h3>შესვლა</h3>
                            <div>ელ-ფოსტა</div>
                            <input onChange={(e) => setUserEmail(e.target.value)} type='email' className="modal-email" placeholder="example@redberry.ge"/>
                            {erroMessage && <p className="modal-error-message">ელ-ფოსტა არ მოიძებნა</p>}
                            <button className="modal-login-button" onClick={handleUserLogin}>
                                შესვლა
                            </button>
                        </div>
                    )}
                    {loginSuccessful && (
                        <div className={`login-modal`}>
                            <img className="modal-success-image" src={successImage} alt="" />
                            <h3>წარმატებული ავტორიზაცია</h3>
                            <button className="modal-success-button" onClick={toggleModal}>
                                კარგი
                            </button>
                        </div>                    
                    )}
                </div>
            )}
        </>
    )
}

export default Modal