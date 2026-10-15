import React from "react";
import { motion } from "framer-motion";

import Hero from "../components/Hero";
import About from "../components/About";
import Features from "../components/Features";
import Services from "../components/Services";
import Testimonies from "../components/Testimonies";
import UpcomingEvents from "../components/Upcoming";
import FloatingActions from "../components/FloatingActions";
import NewsletterSignup from "../components/NewsLetterSignUp";


const Homepage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      <Hero />
      <About />
      <Features />
      <Services />
      <Testimonies />
      <UpcomingEvents />
      <NewsletterSignup/>
       <FloatingActions />
    </motion.div>
  );
};

export default Homepage;
