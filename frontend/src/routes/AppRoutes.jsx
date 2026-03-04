import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

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
import BlogDetail from "@/pages/BlogDetail";
import Chat from "@/pages/Chat";

import ResourcesPage from "@/pages/ResourcesPage";
import GuidesPage from "@/pages/GuidesPage";
import FAQPage from "@/pages/FAQPage";

function AppRoutes({ session }) {
  return (
    <Routes>

      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/services" element={<ServicesPage />} />

      <Route path="/counselors" element={<AllCounselorsPage />} />
      <Route path="/counselor/:id" element={<CounselorDetail />} />

      <Route path="/auth" element={<Auth />} />

      {/* Resources */}
      <Route path="/resources">
        <Route index element={<ResourcesPage />} />
        <Route path="blog" element={<BlogPage session={session} />} />
        <Route path="blog/:id" element={<BlogDetail />} />
        <Route path="guides" element={<GuidesPage />} />
        <Route path="faqs" element={<FAQPage />} />
      </Route>

      <Route
        path="/services/assessment"
        element={<AssessmentEntry session={session} />}
      />

      <Route
        path="/assessment"
        element={<Assessment session={session} />}
      />

      {/* Protected */}
      <Route
        path="/dashboard"
        element={session ? <Dashboard /> : <Navigate to="/" />}
      />

      <Route
        path="/chat"
        element={session ? <Chat /> : <Navigate to="/" />}
      />

    </Routes>
  );
}

export default AppRoutes;