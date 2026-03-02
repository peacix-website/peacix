import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  MessageSquare,
  BookOpen,
  Calendar,
  Flame,
  Brain,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [greetingName, setGreetingName] = useState("");
  const [showAssessmentPrompt, setShowAssessmentPrompt] = useState(false);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        // ✅ Step 1: Get patient row using profile_id
        const { data: patient, error: patientError } = await supabase
          .from("patients")
          .select("id")
          .eq("profile_id", user.id)
          .single();

        if (patientError || !patient) {
          console.error("Patient fetch error:", patientError);
          return;
        }

        // ✅ Step 2: Fetch dashboard data using patient.id
        const { data, error } = await supabase
          .from("patient_dashboard")
          .select("*")
          .eq("patient_id", patient.id)
          .single();

        if (error) {
          console.error("Dashboard fetch error:", error);
          return;
        }

        setDashboardData(data);

        if (data?.full_name) {
          setGreetingName(data.full_name.split(" ")[0]);
        }

        if (!data?.last_mood) {
          setShowAssessmentPrompt(true);
        }
      } catch (err) {
        console.error("Dashboard load error:", err);
      }
    };

    loadDashboard();
  }, []);

  const handleMoodSelect = async (level) => {
    if (!dashboardData?.patient_id) return;

    const { error } = await supabase.from("mood_logs").insert({
      patient_id: dashboardData.patient_id,
      mood: level.toString(),
    });

    if (!error) {
      alert("Mood saved 💙");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-8">

      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-primary">
          {greetingName ? `Hey ${greetingName} 👋` : "Welcome 👋"}
        </h1>
        <p className="text-muted-foreground">
          We're glad you're here today.
        </p>
      </div>

      {/* Assessment Prompt */}
      {showAssessmentPrompt && (
        <div className="bg-accent/40 border border-border rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="text-lg font-semibold text-primary mb-2">
            Would you like us to understand you better?
          </h2>
          <p className="text-muted-foreground mb-4">
            Take a short assessment so we can personalize your experience.
          </p>
          <Button onClick={() => navigate("/assessment")}>
            Take Assessment
          </Button>
        </div>
      )}

      {/* Mood Check */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-8 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">
          Take a moment to check in with yourself
        </h2>

        <div className="flex justify-between text-center">
          {[
            { label: "Low", value: 1 },
            { label: "Down", value: 2 },
            { label: "Okay", value: 3 },
            { label: "Good", value: 4 },
            { label: "Great", value: 5 },
          ].map((mood) => (
            <div
              key={mood.value}
              onClick={() => handleMoodSelect(mood.value)}
              className="cursor-pointer p-3 rounded-xl hover:bg-accent transition"
            >
              <div className="text-3xl mb-1">🙂</div>
              <p className="text-sm text-muted-foreground">
                {mood.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="text-xl font-semibold mb-4">Quick actions</h2>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <QuickCard
          icon={<MessageSquare size={24} />}
          title="Chat with AI"
          onClick={() => navigate("/chat")}
        />
        <QuickCard icon={<BookOpen size={24} />} title="Journal" />
        <QuickCard icon={<Brain size={24} />} title="Meditate" />
        <QuickCard icon={<Calendar size={24} />} title="Book session" />
      </div>

      {/* Upcoming Session */}
      <h2 className="text-xl font-semibold mb-4">Upcoming session</h2>

      <div className="bg-card border border-border rounded-2xl p-6 mb-8 shadow-sm">
        {dashboardData?.next_appointment_at ? (
          <p>
            Your next session is on{" "}
            <span className="text-primary font-semibold">
              {new Date(
                dashboardData.next_appointment_at
              ).toLocaleString()}
            </span>
          </p>
        ) : (
          <p className="text-muted-foreground">
            No upcoming sessions scheduled.
          </p>
        )}
      </div>

      {/* Progress Section */}
      <h2 className="text-xl font-semibold mb-4">Your progress</h2>

      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
        <ProgressItem
          icon={<Flame size={20} />}
          label="Day streak"
          value={dashboardData?.streak_days ?? 0}
        />
        <ProgressItem
          icon={<BookOpen size={20} />}
          label="Journal entries"
          value={dashboardData?.total_journal_entries ?? 0}
        />
        <ProgressItem
          icon={<Brain size={20} />}
          label="Meditation minutes"
          value={dashboardData?.total_meditation_mins ?? 0}
        />
      </div>

      {/* Affirmation */}
      <h2 className="text-xl font-semibold mt-8 mb-4">Today's affirmation</h2>

      <div className="bg-accent/40 border border-border rounded-2xl p-8 text-center shadow-sm">
        <p className="text-lg font-semibold mb-2">
          You deserve peace and happiness.
        </p>
        <p className="text-muted-foreground">
          Remember this today.
        </p>
      </div>
    </div>
  );
};

const QuickCard = ({ icon, title, onClick }) => (
  <div
    onClick={onClick}
    className="bg-accent/30 border border-border rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-accent transition"
  >
    <div className="mb-3 text-primary">{icon}</div>
    <p className="font-medium">{title}</p>
  </div>
);

const ProgressItem = ({ icon, label, value }) => (
  <div className="flex justify-between items-center">
    <div className="flex items-center gap-3">
      <div className="text-primary">{icon}</div>
      <span>{label}</span>
    </div>
    <span className="font-semibold text-primary">{value}</span>
  </div>
);

export default Dashboard;