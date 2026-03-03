import React from "react";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";

import ScrollToTop from "@/components/ScrollToTop";
import Header from "@/components/Header";

import HomePage from "@/pages/HomePage";
import CounselorDetail from "@/pages/CounselorDetail";
import AllCounselorsPage from "@/pages/AllCounselors";
import AboutUsPage from "@/pages/AboutUs";
import ServicesPage from "@/pages/Services";
import Dashboard from "@/pages/Dashboard";
import Assessment from "@/pages/Assessment";
import AssessmentEntry from "@/pages/AssessmentEntry";
import Auth from "@/pages/Auth";
import BlogPage from "@/pages/BlogPage";
import Chat from "@/pages/Chat";
import BlogDetail from "@/pages/BlogDetail";
import { Toaster } from "@/components/ui/toaster";

function App({ session }) {
  return (
    <Router>
      <Header session={session} />
      <ScrollToTop />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/counselors" element={<AllCounselorsPage />} />
        <Route path="/counselor/:id" element={<CounselorDetail />} />
        <Route path="/auth" element={<Auth />} />

        {/* Blog */}
        <Route path="/blog" element={<BlogPage session={session} />} />
        <Route path="/blog/:id" element={<BlogDetail />} />

        {/* Smart Entry Route */}
        <Route
          path="/services/assessment"
          element={<AssessmentEntry session={session} />}
        />

        {/* 🔥 Assessment is now PUBLIC */}
        <Route
          path="/assessment"
          element={<Assessment session={session} />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={session ? <Dashboard /> : <Navigate to="/" />}
        />

        <Route
          path="/chat"
          element={session ? <Chat /> : <Navigate to="/" />}
        />
      </Routes>

      <Toaster />
    </Router>
  );
}

export default App;