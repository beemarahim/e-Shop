import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {

    const [count, setCount] = useState(5);
    let navigate = useNavigate();

    useEffect(() => {
        
        const interval = setInterval(() => {
    
            setCount((currentCount) => --currentCount);

        }, 1000);

        //when =0 redirect to login

        count === 0 && navigate('/');

        //cleanup

        return () => clearInterval(interval);

    }, [count, navigate]);

    return (

        <div className="container p-20 text-center">

            <h3>Redirecting you in {count} seconds</h3>

        </div>
    );

};

export default LoadingToRedirect;