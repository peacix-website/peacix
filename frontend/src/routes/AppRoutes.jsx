import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "@/pages/HomePage";
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
import ConditionsPage from "@/pages/ConditionsPage";
import ExpertsPage from "@/pages/ExpertsPage";
import ExpertDetail from "@/pages/ExpertDetail";
import ClinicsPage from "@/pages/ClinicsPage";
import BookingPage from "@/pages/BookingPage";
import JournalPage from "@/pages/JournalPage";
import MeditationPage from "@/pages/MeditationPage";
import ProtectedRoute from "@/components/ProtectedRoute";

function AppRoutes({ session }) {
  return (
    <Routes>

      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/services" element={<ServicesPage />} />

      <Route path="/experts" element={<ExpertsPage />} />
      <Route path="/expert/:id" element={<ExpertDetail />} />
      <Route path="/booking/:expertId" element={<BookingPage />} />

      <Route path="/auth" element={<Auth />} />

      {/* Resources */}
      <Route path="/resources">
        <Route index element={<ResourcesPage />} />
        <Route path="blog" element={<BlogPage session={session} />} />
        <Route path="blog/:id" element={<BlogDetail />} />
        <Route path="guides" element={<GuidesPage />} />
        <Route path="faqs" element={<FAQPage />} />
      </Route>

      {/* Conditions */}
      <Route path="/conditions">
        <Route index element={<ConditionsPage />} />
        <Route path="anxiety" element={<BlogPage session={session} />} />
        <Route path="depression" element={<BlogPage session={session} />} />
        <Route path="relationships" element={<BlogPage session={session} />} />
        <Route path="trauma" element={<BlogPage session={session} />} />
        <Route path="stress" element={<BlogPage session={session} />} />
        <Route path="self-esteem" element={<BlogPage session={session} />} />
      </Route>

      {/* Experts */}
      <Route path="/experts">
        <Route index element={<ExpertsPage />} />
        <Route path="therapists" element={<AllCounselorsPage />} />
        <Route path="psychiatrists" element={<AllCounselorsPage />} />
        <Route path="child" element={<AllCounselorsPage />} />
        <Route path="couples" element={<AllCounselorsPage />} />
      </Route>

      {/* Clinics */}
      <Route path="/clinics">
        <Route index element={<ClinicsPage />} />
        <Route path="hospital" element={<ClinicsPage />} />
      </Route>

      {/* Services */}
      <Route path="/services">
        <Route index element={<ServicesPage />} />
        <Route path="therapy" element={<ServicesPage />} />
        <Route path="psychiatry" element={<ServicesPage />} />
        <Route path="assessment" element={<AssessmentEntry session={session} />} />
      </Route>

      <Route
        path="/services/assessment"
        element={<AssessmentEntry session={session} />}
      />

      <Route
        path="/assessment"
        element={<Assessment session={session} />}
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['patient', 'clinician']}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/chat"
        element={
          <ProtectedRoute allowedRoles={['patient']}>
            <Chat />
          </ProtectedRoute>
        }
      />

      <Route
        path="/journal"
        element={
          <ProtectedRoute allowedRoles={['patient']}>
            <JournalPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/meditation"
        element={
          <ProtectedRoute allowedRoles={['patient']}>
            <MeditationPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/booking/:expertId"
        element={
          <ProtectedRoute allowedRoles={['patient']}>
            <BookingPage />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default AppRoutes;