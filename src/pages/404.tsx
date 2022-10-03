import React from 'react';
import Header, { links, HEADER_HEIGHT } from '../components/header';

function NotFound() {
  return (
    <>
      <Header title="Not Found" links={[links.main, links.about]} />
      <div
        style={{
          height: `calc(100vh - ${HEADER_HEIGHT})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p style={{ fontSize: '5rem' }}>404. Not Found</p>
      </div>
    </>
  );
}

export default NotFound;
