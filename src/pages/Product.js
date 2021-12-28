import React, { useEffect, useState } from "react";
import { getProduct } from "../functions/product";
import { useParams } from "react-router-dom";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});

let  slug  = useParams();

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  const loadSingleProduct = () =>
    getProduct(slug).then((res) => setProduct(res.data));

  return <>{JSON.stringify(product)}</>;
};

export default Product;


