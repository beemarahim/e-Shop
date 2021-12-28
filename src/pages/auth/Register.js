import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { MDBBtn } from 'mdb-react-ui-kit';
import { auth } from "../../firebase";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'





const Register = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");


    const {user} = useSelector ((state) => ({...state}));

    useEffect(() => {
        
        if (user && user.token)
            navigate("/")

    }, [user, navigate]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        // console.log("ENV--->", process.env.REACT_APP_REGISTER_REDIRECT_URL);

        const config = {

            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true
        };
        
        await auth.sendSignInLinkToEmail(email, config)
        toast.success(
            `Email is send to ${email}. Click the link to complete your registration.`
        );

        window.localStorage.setItem('emailForRegistration', email)

        setEmail("");

    };

    const registerForm = () => (
        
        <form onSubmit={handleSubmit}>

            <input type="email"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email"
                autoFocus />
        
    

            <MDBBtn className='text-dark' type="submit" color='light'  style={{ marginTop: "10px" }}>
                REGISTER
            </MDBBtn>

        </form>
    );

    return (
        <div className="container p-5">
            
            <div className="row">
                <div className="col-md-6 offset-md-3"  style={{marginTop:"40px"}}>

                    <h2>Register</h2>
                                  

                    {registerForm()}

                </div>
            </div>

        </div>
    );
};

export default Register;
