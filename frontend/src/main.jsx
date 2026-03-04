import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import ErrorBoundary from "@/components/ErrorBoundary";
import "@/index.css";
import { supabase } from "@/lib/supabase";

const root = ReactDOM.createRoot(document.getElementById("root"));

supabase.auth.getSession().then(({ data: { session } }) => {
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App session={session} />
      </ErrorBoundary>
    </React.StrictMode>
  );
});

supabase.auth.onAuthStateChange((_event, session) => {
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App session={session} />
      </ErrorBoundary>
    </React.StrictMode>
  );
});