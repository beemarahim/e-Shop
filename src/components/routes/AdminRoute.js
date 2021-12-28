import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../functions/auth"; 


import History from "../../pages/user/History";


// const useAuth = () => {

//     const user = { token : false };
//     return user && user.token;

// }


// const UserRoute = () => {

//     const isAuth = useAuth();
//     return isAuth ? <LoadingToRedirect/> : <History/>

// }







 const AdminRoute = ({ children, ...rest }) => {
    
    const { user } = useSelector((state) => ({ ...state }));
    const [ok, setOk] = useState(false);


    useEffect(() => {

        if (user && user.token) {
            currentAdmin(user.token)
                .then((res) => {
                
                    console.log("CURRENT ADMIN RES", res);
                    setOk(true);
                })
                .catch((err) => {
                
                    console.log("ADMIN ROUTE ERR", err);
                    setOk(false);

                });
        }

    }, [user]);



    return ok ? (

        <Routes>

<Route {...rest} />

        </Routes>

       
    ) : (
            
        <LoadingToRedirect/>
            
    );





};


export default AdminRoute; 