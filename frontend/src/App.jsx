import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import AppRoutes from "@/routes/AppRoutes";

import { Toaster } from "@/components/ui/toaster";

function App({ session }) {
  return (
    <Router>

      {/* Scroll page to top on route change */}
      <ScrollToTop />

      {/* Global Header (visible on all pages) */}
      <Header session={session} />

      {/* All page routes */}
      <AppRoutes session={session} />

      {/* Global Toast Notifications */}
      <Toaster />

    </Router>
  );
}

export default App;