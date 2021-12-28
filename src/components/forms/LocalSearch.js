import React from 'react'

const LocalSearch = ({keyword, setKeyword}) => {
   
    const handleSearchChange = (e) => {
    
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase())
    
      };



    return (
        
        <div className='container'>

             <input type="search"
            placeholder="Filter"
            value={keyword}
            onChange={handleSearchChange}
            className="form-control"
            style={{ marginLeft: "190px", width: "400px" }}
        /> 


      </div>


    );




};

export default LocalSearch;
