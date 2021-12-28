import React, { useEffect, useState } from 'react';
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { removeProduct } from "../../../functions/product";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const AllProducts = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
      loadAllProducts();
    }, []);
  
    const loadAllProducts = () => {
      setLoading(true);
      getProductsByCount(100)
        .then((res) => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    };


    const handleRemove = (slug) => {
        // let answer = window.confirm("Delete?");
        if (window.confirm("Delete?")) {
          // console.log("send delete request", slug);
          removeProduct(slug, user.token)
            .then((res) => {
              loadAllProducts();
              toast.error(`${res.data.title} is deleted`);
            })
            .catch((err) => {
              if (err.response.status === 400) toast.error(err.response.data);
              console.log(err);
            });
        }
      };
  
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h3 style={{marginTop :"40px"}}>All Products</h3>
                )}
              
                <div className="col-md-10">

                <div className="row" style={{ marginTop:"20px", marginLeft :" 20px"}}>
            {products.map((product) => (
              <div style={{ marginTop:"40px"}}key={product._id} className="col-md-4">
                    <AdminProductCard product={product}
                handleRemove={handleRemove}    />
              </div>
            ))}
          </div>
        </div>       
</div>
               
          {/* <div className="col">{JSON.stringify(products)}</div> */}
        </div>
    //   </div>
    );
  };
  
  export default AllProducts;
   