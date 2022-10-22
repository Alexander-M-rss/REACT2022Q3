import React from 'react';
import Header, { links } from '../components/header';
import AboutUs from '../components/aboutUs';

function About() {
  return (
    <>
      <Header title="About Us" links={[links.main, links.forms]} />
      <AboutUs />
    </>
  );
}

export default About;
