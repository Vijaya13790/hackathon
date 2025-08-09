import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './Context/AppContext';
import ProductsPage from './Products/Product';

const App: React.FC = () => {
  return (
    <AppProvider>
      {/* <div> Hello</div> */}
  
      <Router>
        <Routes>
          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* <Route path="/register" element={<RegisterPage />} /> */}
          <Route path="/" element={<ProductsPage />} />
          {/* <Route path="/products/:id" element={<ProductsPage1 />} /> */}
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;