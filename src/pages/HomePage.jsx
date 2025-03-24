import React from "react";
import NavBar from "../components/Shared/NavBar";
import Footer from "../components/Shared/Footer";
import IntroSection from "../components/HomePage/Sections/IntroSection";
import MentorsSection from "../components/HomePage/Sections/MentorsSection";
import AboutSection from "../components/HomePage/Sections/AboutSection";
import ShopeeSection from "../components/HomePage/Sections/ShopeeSection";
import SocialMediaSection from "../components/HomePage/Sections/SocialMediaSection";

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
