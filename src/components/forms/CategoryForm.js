import React from "react";

const CategoryForm = ({handleSubmit, name, setName }) => (
    
<form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label style={{ marginTop: "30px", marginLeft: "68px" }}> Name</label>
        <input
          style={{ marginLeft: "296px", width: "400px" }}
          type='text'
          className='form-control'
          onChange={(e) => setName(e.target.value)}
          value={name}
          autoFocus
          required
        />

        <button
          style={{ marginLeft: "69px", marginTop: "10px" }}
          className='btn btn-primary'
        >
          Save
        </button>
      </div>
    </form>



);


export default CategoryForm;




