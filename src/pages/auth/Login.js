import React, { useState, useEffect } from "react";

import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
import { Link } from "react-router-dom";
import { createOrUpdateUser } from '../../functions/auth';




const Login = () => {
 
  
const navigate = useNavigate();

  const [email, setEmail] = useState("beemarahim21@gmail.com");
  const [password, setPassword] = useState("789456");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) navigate("/");
  }, [user, navigate]);

  let dispatch = useDispatch();


  
const roleBasedRedirect = (res) => {
 
    
  if (res.data.role === "admin") {
    navigate ("/admin/dashboard")
  } else {

    navigate("/")
  }
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(email, password);

    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      // console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();


      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));

      // navigate("/");

     
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

        createOrUpdateUser(idTokenResult.token)
          .then((res) =>  { 

          dispatch({
            type: "LOGGED_IN_USER",
            payload: {

              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,

            },
          });
            
          roleBasedRedirect(res);
        })
          .catch((err) => console.log(err));
        
      //  navigate("/");
        
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <input
          type='email'
          className='form-control'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Your email'
          style={{ marginBottom: "10px" }}
          autoFocus
        />
      </div>

      <div className='form-group'>
        <input
          type='password'
          className='form-control'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Your password'
        />
      </div>

      <Button
        onClick={handleSubmit}
        type='primary'
        className='mb-3'
        block
        shape='round'
        icon={<MailOutlined />}
        size='large'
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>
    </form>
  );

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3' style={{ marginTop: "40px" }}>
          {loading ? (
            <h2 className='text-danger'>Loading...</h2>
          ) : (
            <h2>Login</h2>
          )}

          {loginForm()}

          <Button
            onClick={googleLogin}
            type='danger'
            className='mb-3'
            block
            shape='round'
            icon={<GoogleOutlined />}
            size='large'
            style={{ marginTop: "10px" }}
          >
            Login with Google
          </Button>

          <Link
            to='/forgot/password'
            className='text-danger'
            style={{ marginTop: "20px", marginLeft: "420px" }}
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
