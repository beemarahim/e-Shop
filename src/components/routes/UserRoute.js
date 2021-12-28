import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";


import History from "../../pages/user/History";


// const useAuth = () => {

//     const user = { token : false };
//     return user && user.token;

// }


// const UserRoute = () => {

//     const isAuth = useAuth();
//     return isAuth ? <LoadingToRedirect/> : <History/>

// }






const UserRoute = ({ children, ...rest }) => {
    
    const { user } = useSelector((state) => ({ ...state }));

    return user && user.token ? (

        <Routes>

<Route {...rest} />

        </Routes>

       
    ) : (
            
        <LoadingToRedirect/>
            
    );





};


export default UserRoute; 