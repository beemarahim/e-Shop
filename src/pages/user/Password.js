import React, { useState } from 'react';
import UserNav from '../../components/nav/UserNav';
import { auth } from "../../firebase";
import { toast } from 'react-toastify';


const Password = () => {

    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState("false");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        

        // console.log(password);

        await auth.currentUser.updatePassword(password)
            .then(() => {
                setLoading(false);
                setPassword("");
                toast.success("Password Updated");
                //
            })
            .catch(err => {
                setLoading(false);
              
                toast.error(err.message);
                //

            });

    };


    const passwordUpdateForm = () => <form onSubmit={handleSubmit}>

        <div className='form-group'>
    
            <label style={{ marginTop: "30px", marginLeft :"18px" } } >Your Password</label>
            
            <input
                
                style={{marginLeft :"248px", width: "400px"}}
            
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className='form-control'
                placeholder='Enter new password'
                disabled={loading === "true"}
                value={password}
            
            
            />



            <button
                className='btn btn-primary'
                style={{ marginLeft: "248px", marginTop: "10px" }}
                // disabled={!password || password.length < 6 || loading}

                disabled = {!password || password.length < 6 || loading === "true"}  >
                
                Submit
            </button>
    
    
        </div>

    </form>



    
    return (
    

        <div className="container-fluid">

            <div className="row">

                <div className="col-md-2">
                    <UserNav />
                </div>
                
                <div className="col">

                    { loading ? (<h3 style={{ marginTop: "60px", marginLeft: "200px" }}
                        >Password Update</h3>) :
                        
                        (<h3 style={{ marginTop: "60px", marginLeft: "200px" }}
                        className='text-danger'> Loading...</h3>)
                    }

                    
                    {passwordUpdateForm()}
                    

                </div>
            </div>

        </div>


    );

  
};


export default Password;