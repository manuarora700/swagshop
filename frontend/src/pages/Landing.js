import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import products from "../constants/products";

const Landing = () => {
  return (
    <div>
      <Header />
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
      <Footer />
    </div>
  );
};

export default Landing;
