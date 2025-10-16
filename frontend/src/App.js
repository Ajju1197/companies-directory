import React from 'react';
import CompaniesDirectory from './components/CompaniesDirectory';
import './App.css';
import CompanyDetails from './components/CompanyDetails';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CompaniesDirectory/>} />;
        <Route path="/companyDetails/:id" element={<CompanyDetails/>} />;
      </Routes>
    </div>
  );
}

export default App;