import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import {
  createSub,
  getSub,
  removeSub,
  getSubs
} from "../../../functions/sub";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";



const SubCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [subs, setSubs] = useState([]);

  const [keyword, setKeyword] = useState("");
  useEffect(() => {
      loadCategories();
      loadSubs();
      
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

    const loadSubs = () =>
    getSubs().then((s) => setSubs(s.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        //console.log(res);
        setLoading(false);
        setName("");
          toast.success(`"${res.data.name}" is created`);
          loadSubs();
        
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });

    //console.log(name);
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
            toast.error(`${res.data.name} deleted`);
            loadSubs();
          
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

 


  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  

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
              Create Sub Category
            </h3>
                  )}
                  

                  <div className="form-group">
                      <label >Parent Category </label>
                      <select name="category" style={{width:"380px"}} className="form-control"   onChange={(e) => setCategory(e.target.value)}>
<option >Please Select</option>
                          {categories.length > 0 &&
                              categories.map((c) => (<option key={c._id} value={c._id} >{c.name}</option>))}
                          
                      </select>


                  </div>

                 

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName = { setName }
          />

         
          <LocalSearch
            keyword={keyword}
            setKeyword={setKeyword}
          />

<hr style={{ marginLeft: "200px" }} />


                  

          {subs.filter(searched(keyword)).map((s) => (
            <div 
              style={{ marginLeft: "250px", width:"1000px" }}
              className='alert alert-success '
              key={s._id}
            >
              {s.name}
              <span 
                onClick={() => handleRemove(s.slug)}
                style={{ marginLeft: "10px" }}
                className='btn btn-lg text-danger   float-right '
              >
                {" "}
                <DeleteOutlined />{" "}
              </span>
              <Link to={`/admin/sub/${s.slug}`}>
                <span 
                  style={{ marginRight: "10px" }}
                  className='btn btn-lg   text-warning'
                >
                  {" "}
                  <EditOutlined />
                </span>
              </Link>
            </div>
          ))}
               


        </div>
      </div>
    </div>
  );
};

export default SubCreate;
