import React from 'react';
import Header, { links } from '../components/header';

function Main() {
  return <Header title="Main Page" links={[links.about]} />;
}

export default Main;
