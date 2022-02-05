import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Landing = () => {
  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto h-[80vh]">
        <div className="flex justify-center space-x-1 mt-4 items-center antialiased">
          <span className="text-4xl">🤩</span>
          <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-black to-[#4c4c4d] font-bold text-4xl">
            Swagshop
          </h1>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
