import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const Landing = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };
    fetchProducts();
  }, []);
  return (
    <div>
      <main className="max-w-7xl mx-auto">
        <div className="flex space-x-1 mt-4 justify-center antialiased mb-14">
          <span className="text-4xl">🤩</span>
          <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-black to-[#4c4c4d] font-bold text-4xl">
            Latest Products
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20  mx-auto">
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Landing;
