import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AssessmentEntry = ({ session }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [alreadyTaken, setAlreadyTaken] = useState(false);

  useEffect(() => {
    const checkAssessment = async () => {
      if (!session) {
        navigate("/auth");
        return;
      }

      // 🔹 Get patient linked to logged-in user
      const { data: patient } = await supabase
        .from("patients")
        .select("id")
        .eq("user_id", session.user.id)
        .single();

      if (!patient) {
        setLoading(false);
        return;
      }

      // 🔹 Check if assessment already exists
      const { data: assessment } = await supabase
        .from("patient_assessments")
        .select("id")
        .eq("patient_id", patient.id)
        .maybeSingle();

      if (assessment) {
        setAlreadyTaken(true);
      }

      setLoading(false);
    };

    checkAssessment();
  }, [session, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking assessment...
      </div>
    );
  }

  if (alreadyTaken) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl text-center space-y-4">
          <h2 className="text-2xl font-semibold text-primary">
            Assessment Already Taken
          </h2>
          <p className="text-muted-foreground">
            You have already completed your clinical assessment.
          </p>

          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate("/dashboard")}>
              Go to Dashboard
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/assessment")}
            >
              Retake Assessment
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // If not taken → redirect to actual assessment page
  navigate("/assessment");
  return null;
};

export default AssessmentEntry;