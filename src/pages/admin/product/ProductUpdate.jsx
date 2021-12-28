import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";


const initialState = {
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    subs: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS", "Hewlett-Packard"],
    color: "",
    brand: "",
  };

const ProductUpdate = ({ match }) => {

    const navigate = useNavigate();

    const [values, setValues] = useState(initialState);
    const [categories, setCategories] = useState([]);
 
    const [loading, setLoading] = useState(false);
    const [subOptions, setSubOptions] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  // router
//   const { slug } = match.params;
    let { slug } = useParams();


    
  useEffect(() => {
      loadProduct();
      loadCategories();
  }, []);
    
  const loadProduct = () => {
    getProduct(slug).then((p) => {
      // console.log("single product", p);
      setValues({ ...values, ...p.data });
    });
  };


    const loadCategories = () =>
    getCategories().then((c) => {
      console.log("GET CATEGORIES IN UPDATE PRODUCT", c.data);
      setCategories(c.data);
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
    
        // values.subs = arrayOfSubs;
        // values.category = selectedCategory ? selectedCategory : values.category;
    
        updateProduct(slug, values, user.token)
          .then((res) => {
            setLoading(false);
            toast.success(`"${res.data.title}" is updated`);
            navigate("/admin/products");
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            toast.error(err.response.data.err);
          });
      }
    
      const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        // console.log(e.target.name, " ----- ", e.target.value);
    };
    

    const handleCatagoryChange = (e) => {
        e.preventDefault();
        console.log("CLICKED CATEGORY", e.target.value);
        setValues({ ...values, subs: [], category: e.target.value });
        getCategorySubs(e.target.value).then((res) => {
          console.log("SUB OPTIONS ON CATGORY CLICK", res);
          setSubOptions(res.data);
        });
      };
    

    
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

              <div className="col-md-10">
              {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4 style={{marginTop:"20px"}}>Product update</h4>
          )}
          <h3 style={{marginTop:"20px"}}>Product update</h3>
                  {/* {JSON.stringify(values)} */}
                  

                  <ProductUpdateForm
                      
                      handleSubmit={handleSubmit}
                      
                      handleChange={handleChange}
                      
                      setValues={setValues}
                      
                      values={values}

                      handleCatagoryChange={handleCatagoryChange}

                      categories={categories}

                      subOptions={subOptions}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
