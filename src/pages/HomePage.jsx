import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import IntroSection from "../components/HomePage/IntroSection";
import MentorsSection from "../components/HomePage/MentorsSection";
import AboutSection from "../components/HomePage/AboutSection";
import ShopeeSection from "../components/HomePage/ShopeeSection";
import SocialMediaSection from "../components/HomePage/SocialMediaSection";

function HomePage() {
  return (
    <div>
      <NavBar />
      <IntroSection />
      <MentorsSection />
      <SocialMediaSection />
      <AboutSection />
      <ShopeeSection />
      <Footer />
    </div>
  );
}

export default HomePage;
