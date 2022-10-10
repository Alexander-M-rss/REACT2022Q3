import React from 'react';
import Header, { links } from '../components/header';

class Forms extends React.Component {
  render() {
    return (
      <>
        <Header title="Forms Page" links={[links.main, links.about]} />
      </>
    );
  }
}

export default Forms;
