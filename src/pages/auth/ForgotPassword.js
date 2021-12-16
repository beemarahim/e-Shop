import React, { useState, useEffect } from 'react'
import { auth } from "../../firebase";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MDBBtn } from 'mdb-react-ui-kit';

const ForgotPassword = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const {user} = useSelector ((state) => ({...state}));

    useEffect(() => {
        
        if (user && user.token)
            navigate("/")

    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        const config = {

            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true
        };

        await auth
            .sendPasswordResetEmail(email, config)
            .then(() => {
            
                setEmail('')
                setLoading(false)
                toast.success("Check your email for password reset link");

            })
            .catch((error) => {
            
                setLoading(false);
                toast.error(error.message);
                console.log("ERROR MESSAGE IN FORGOT PASSWORD", error);

            });
    };

    return (

        <div className='container p-5' >

            <div className="row">
            <div className="col-md-6 offset-md-3"  style={{marginTop:"40px"}}>
                    {loading ? (<h2 className='text-danger' >Loading...</h2>) : (<h2>Forgot Password</h2>)}   
                    
                    <form onSubmit={handleSubmit}>
                        <input type="email" className='form-control' value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                            placeholder='Type your email'
                            autoFocus />
                        
                        <MDBBtn className='text-dark' type="submit" color='light'  style={{ marginTop: "10px" }} disabled={!email}>
            SUBMIT
            </MDBBtn>

                    </form>
</div>
</div>
      

    </div>
    ) 


}

export default ForgotPassword;
