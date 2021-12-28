import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";

const CategoryUpdate = ({ match }) => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  let { slug } = useParams();

  useEffect(() => {
    console.log(slug);
    loadCategory();
  }, []);

  const loadCategory = () =>
    getCategory(slug).then((c) => setName(c.data.name));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateCategory(slug, { name }, user.token)
      .then((res) => {
        //console.log(res);
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        navigate("/admin/category");
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
              Update Category
            </h3>
          )}

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />

          <hr style={{ marginLeft: "220px" }} />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
