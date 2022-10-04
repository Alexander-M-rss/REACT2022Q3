import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesComponent from './components/routes';

import './App.css';

function App() {
  return (
    <div className="app">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <RoutesComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
