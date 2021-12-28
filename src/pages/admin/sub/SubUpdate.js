import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import {
  updateSub,
  getSub
} from "../../../functions/sub";
import { Link, Navigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const SubUpdate = ({match}) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [parent, setParent] = useState("");

    const navigate = useNavigate();

  
    let { slug } = useParams();

  useEffect(() => {
      loadCategories();
      loadSub();
      
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

    const loadSub = () =>
        getSub(slug).then((s) => {
        
            setName(s.data.name);
            setParent(s.data.parent);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateSub(slug, { name, parent }, user.token)
      .then((res) => {
        //console.log(res);
        setLoading(false);
        setName("");
          toast.success(`"${res.data.name}" is updated`);
         navigate("/admin/sub")
        
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });

    //console.log(name);
  };



 


  

  

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>

        <div className='col'>
          {loading ? (
            <h3
              className='text-danger'
              style={{ marginTop: "60px", marginLeft: "200px" }}
            >
              Loading...
            </h3>
          ) : (
            <h3 style={{ marginTop: "60px", marginLeft: "200px" }}>
              Update Sub Category
            </h3>
                  )}
                  

                  <div className="form-group">
                      <label >Parent Category </label>
                      <select name="category" style={{ width: "380px" }} className="form-control"
                          onChange={(e) => setParent(e.target.value)}>
<option >Please Select</option>
                          {categories.length > 0 &&
                              categories.map((c) => (<option key={c._id} value={c._id} selected={c._id === parent} >{c.name}</option>))}
                          
                      </select>


                  </div>

                 

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName = { setName }
          />

         

<hr style={{ marginLeft: "200px" }} />


                  

               


        </div>
      </div>
    </div>
  );
};

export default SubUpdate;
