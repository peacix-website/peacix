
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';
import HomePage from '@/pages/HomePage';
import CounselorDetail from '@/pages/CounselorDetail';
import AllCounselorsPage from '@/pages/AllCounselors';
import AboutUsPage from '@/pages/AboutUs';
import ServicesPage from '@/pages/Services';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/counselors" element={<AllCounselorsPage />} />
        <Route path="/counselor/:id" element={<CounselorDetail />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
