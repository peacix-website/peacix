import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/index.css";
import { supabase } from "@/lib/supabase";

const root = ReactDOM.createRoot(document.getElementById("root"));

supabase.auth.getSession().then(({ data: { session } }) => {
  root.render(<App session={session} />);
});

supabase.auth.onAuthStateChange((_event, session) => {
  root.render(<App session={session} />);
});