import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory
} from "../../../functions/category";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";



const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        //console.log(res);
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadCategories();
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
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadCategories();
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
              Create Category
            </h3>
          )}

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


                  

          {categories.filter(searched(keyword)).map((c) => (
            <div
              style={{ marginLeft: "250px", width:"1000px" }}
              className='alert alert-success '
              key={c._id}
            >
              {c.name}
              <span
                onClick={() => handleRemove(c.slug)}
                style={{ marginLeft: "10px" }}
                className='btn btn-lg text-danger   float-right '
              >
                {" "}
                <DeleteOutlined />{" "}
              </span>
              <Link to={`/admin/category/${c.slug}`}>
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

export default CategoryCreate;







