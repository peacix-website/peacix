import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/dashboard",
      },
    });
  };

  // EMAIL SIGNUP
  const handleSignup = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.full_name,
          role: "patient",
        },
      },
    });

    setLoading(false);

    if (!error) {
      alert("Check your email to verify account");
    } else {
      alert(error.message);
    }
  };

  // EMAIL LOGIN
  const handleLogin = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (!error) {
      navigate("/dashboard");
    } else {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="bg-card border border-border rounded-2xl p-8 w-full max-w-md shadow-lg">

        <h1 className="text-2xl font-bold text-primary mb-6 text-center">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h1>

        {isSignup && (
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full border border-border bg-background rounded-lg p-3 mb-4 focus:ring-2 focus:ring-primary outline-none"
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border border-border bg-background rounded-lg p-3 mb-4 focus:ring-2 focus:ring-primary outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border border-border bg-background rounded-lg p-3 mb-6 focus:ring-2 focus:ring-primary outline-none"
        />

        <Button
          onClick={isSignup ? handleSignup : handleLogin}
          className="w-full mb-4"
          disabled={loading}
        >
          {loading
            ? "Please wait..."
            : isSignup
            ? "Sign Up"
            : "Sign In"}
        </Button>

        <div className="text-center text-muted-foreground mb-4">
          or
        </div>

        <Button
          variant="outline"
          onClick={handleGoogleLogin}
          className="w-full"
        >
          Continue with Google
        </Button>

        <p className="text-sm text-center mt-6 text-muted-foreground">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => setIsSignup(!isSignup)}
            className="text-primary cursor-pointer hover:underline"
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </span>
        </p>

      </div>
    </div>
  );
};

export default Auth;