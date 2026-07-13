import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects3D from '../components/Projects3D';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Hero />
      <About />

      {/* 3D Projects Section */}
      <div id="projects" className="mt-10 w-full pb-20">
        <Projects3D />
      </div>
    </div>
  );
};

export default Home;
