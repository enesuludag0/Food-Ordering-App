import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Process from "../components/Process";
import PopularFoods from "../components/PopularFoods";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <Process />
      <PopularFoods />
    </div>
  );
};

export default Home;
