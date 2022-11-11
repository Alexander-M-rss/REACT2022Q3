import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesComponent from './components/routes';
import './App.css';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <div className="app">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
          <RoutesComponent />
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
