import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesComponent from './components/routes';
import './App.css';
import { GlobalStatePovider } from 'state/context';

function App() {
  return (
    <div className="app">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <GlobalStatePovider>
          <RoutesComponent />
        </GlobalStatePovider>
      </BrowserRouter>
    </div>
  );
}

export default App;
