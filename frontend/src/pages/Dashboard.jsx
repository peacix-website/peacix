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
  Video,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [greetingName, setGreetingName] = useState("");
  const [showAssessmentPrompt, setShowAssessmentPrompt] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        // Store user ID for later use
        setUserId(user.id);

        // ✅ Step 1: Get profile data
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileError || !profile) {
          console.error("Profile fetch error:", profileError);
          return;
        }

        // ✅ Step 2: Get patient data using profile_id
        const { data: patient, error: patientError } = await supabase
          .from("patients")
          .select("*")
          .eq("profile_id", user.id)
          .single();

        if (patientError) {
          console.error("Patient fetch error:", patientError);
        }

        // ✅ Step 3: Get last mood entry
        const { data: lastMood, error: moodError } = await supabase
          .from("mood_entries")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (moodError) {
          console.error("Mood fetch error:", moodError);
        }

        // ✅ Step 4: Get upcoming appointment
        const { data: upcomingAppointment, error: apptError } = await supabase
          .from("appointments")
          .select(`
            *,
            clinicians (
              profiles (
                full_name,
                avatar_url
              )
            )
          `)
          .eq("patient_id", patient?.id || user.id)
          .eq("status", "scheduled")
          .gte("scheduled_at", new Date().toISOString())
          .order("scheduled_at", { ascending: true })
          .limit(1)
          .maybeSingle();

        if (apptError) {
          console.error("Appointment fetch error:", apptError);
        }

        // ✅ Step 5: Get journal count
        const { count: journalCount, error: journalError } = await supabase
          .from("journal_entries")
          .select("*", { count: "exact", head: true })
          .eq("patient_id", user.id);

        if (journalError) {
          console.error("Journal count error:", journalError);
        }

        // ✅ Step 6: Get meditation stats
        const { data: meditationStats, error: meditationError } = await supabase
          .from("meditation_sessions")
          .select("duration_secs, completed")
          .eq("patient_id", patient?.id || user.id)
          .eq("completed", true);

        if (meditationError) {
          console.error("Meditation fetch error:", meditationError);
        }

        const totalMeditationMins = meditationStats 
          ? Math.floor(meditationStats.reduce((acc, session) => acc + (session.duration_secs / 60), 0))
          : 0;

        // ✅ Compile dashboard data
        const dashboardPayload = {
          full_name: profile.full_name,
          avatar_url: profile.avatar_url,
          streak_days: patient?.streak_days || 0,
          total_journal_entries: journalCount || 0,
          total_meditation_mins: totalMeditationMins,
          last_mood: lastMood,
          next_appointment: upcomingAppointment,
          phq9_score: patient?.phq9_score,
          gad7_score: patient?.gad7_score,
        };

        setDashboardData(dashboardPayload);

        if (profile.full_name) {
          setGreetingName(profile.full_name.split(" ")[0]);
        }

        if (!lastMood) {
          setShowAssessmentPrompt(true);
        }
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
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
      
      {loading ? (
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold text-primary mb-4">
            Loading your dashboard...
          </h1>
        </div>
      ) : (
        <>
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
            <QuickCard 
              icon={<BookOpen size={24} />} 
              title="Journal" 
              onClick={() => navigate("/journal")}
            />
            <QuickCard 
              icon={<Brain size={24} />} 
              title="Meditate" 
              onClick={() => navigate("/meditation")}
            />
            <QuickCard 
              icon={<Calendar size={24} />} 
              title="Book session" 
              onClick={() => navigate("/services")}
            />
          </div>

          {/* Upcoming Session */}
          <h2 className="text-xl font-semibold mb-4">Upcoming session</h2>

          <div className="bg-card border border-border rounded-2xl p-6 mb-8 shadow-sm">
            {dashboardData?.next_appointment ? (
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {dashboardData.next_appointment.clinicians?.profiles?.full_name || "Your Clinician"}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(dashboardData.next_appointment.scheduled_at).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  {dashboardData.next_appointment.session_type === 'video' && (
                    <Video className="w-6 h-6 text-primary" />
                  )}
                </div>
                
                {dashboardData.next_appointment.meeting_url && (
                  <Button asChild className="mt-2">
                    <a 
                      href={dashboardData.next_appointment.meeting_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join Session
                    </a>
                  </Button>
                )}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground mb-4">
                  No upcoming sessions scheduled.
                </p>
                <Button onClick={() => navigate("/counselors")}>
                  Find a Counselor
                </Button>
              </div>
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
        </>
      )}
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