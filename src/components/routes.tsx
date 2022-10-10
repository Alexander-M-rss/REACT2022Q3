import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Main from '../pages/main';
import Forms from '../pages/forms';
import About from '../pages/about';
import NotFound from '../pages/404';

function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/forms" element={<Forms />} />
      <Route path="/about" element={<About />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default RoutesComponent;
