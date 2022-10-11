import React from 'react';
import Header, { links } from '../components/header';
import Form from 'components/form';

class Forms extends React.Component {
  render() {
    return (
      <>
        <Header title="Forms Page" links={[links.main, links.about]} />
        <Form />
      </>
    );
  }
}

export default Forms;
