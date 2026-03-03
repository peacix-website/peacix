import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const conditionTypes = [
  "Relieve Anxiety",
  "Conquer Depression",
  "Restful Sleep",
  "Manage Stress",
];

const Assessment = ({ session }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value, multi = false) => {
    if (multi) {
      const existing = answers[key] || [];
      const updated = existing.includes(value)
        ? existing.filter((v) => v !== value)
        : [...existing, value];

      setAnswers({ ...answers, [key]: updated });
    } else {
      setAnswers({ ...answers, [key]: value });
    }
  };

  const saveAssessmentToDB = async (userId) => {
    let { data: patient } = await supabase
      .from("patients")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (!patient) {
      const { data: newPatient } = await supabase
        .from("patients")
        .insert({ user_id: userId })
        .select()
        .single();

      patient = newPatient;
    }

    await supabase.from("patient_assessments").insert({
      patient_id: patient.id,
      type: selectedCondition,
      answers,
      score: 0,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // 🔹 If user NOT logged in
      if (!session) {
        localStorage.setItem(
          "pendingAssessment",
          JSON.stringify({
            type: selectedCondition,
            answers,
          })
        );

        navigate("/auth");
        return;
      }

      // 🔹 If logged in
      await saveAssessmentToDB(session.user.id);

      navigate("/dashboard");
    } catch (err) {
      console.error("Assessment error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="w-full max-w-3xl bg-card border border-border rounded-2xl p-8 shadow-xl">

        {step === 0 && (
          <>
            <h2 className="text-xl font-semibold text-primary mb-6">
              Tell Us About You
            </h2>

            <div className="space-y-4">
              <input
                placeholder="What is your name?"
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full border border-border bg-background rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
              />

              <div>
                <p className="mb-2 text-muted-foreground">Age Range</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Under 18","18–24","25–34","35–44",
                    "45–54","55–64","65+","Prefer not to say"
                  ].map((age) => (
                    <OptionCard
                      key={age}
                      label={age}
                      selected={answers.age === age}
                      onClick={() => handleChange("age", age)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 text-right">
              <Button onClick={() => setStep(1)}>Continue</Button>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold text-primary mb-6">
              What would you like help with?
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {conditionTypes.map((condition) => (
                <OptionCard
                  key={condition}
                  label={condition}
                  selected={selectedCondition === condition}
                  onClick={() => setSelectedCondition(condition)}
                />
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStep(0)}>
                Back
              </Button>
              <Button
                disabled={!selectedCondition}
                onClick={() => setStep(2)}
              >
                Continue
              </Button>
            </div>
          </>
        )}

        {step === 2 && selectedCondition && (
          <>
            <h2 className="text-xl font-semibold text-primary mb-6">
              {selectedCondition}
            </h2>

            {renderConditionQuestions(
              selectedCondition,
              answers,
              handleChange
            )}

            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Submitting..." : "Finish"}
              </Button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

const OptionCard = ({ label, selected, onClick }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer border rounded-lg p-3 text-center transition-all ${
      selected
        ? "bg-primary text-primary-foreground border-primary"
        : "bg-background border-border hover:bg-accent"
    }`}
  >
    {label}
  </div>
);

const renderConditionQuestions = (type, answers, handleChange) => {
  if (type === "Relieve Anxiety") {
    return (
      <QuestionBlock
        title="How often have you felt nervous recently?"
        options={[
          "Not at all",
          "Several days",
          "More than half the days",
          "Nearly every day",
        ]}
        answerKey="anxiety_frequency"
        answers={answers}
        handleChange={handleChange}
      />
    );
  }

  if (type === "Conquer Depression") {
    return (
      <QuestionBlock
        title="How often have you felt low recently?"
        options={[
          "Not at all",
          "Several days",
          "More than half the days",
          "Nearly every day",
        ]}
        answerKey="depression_frequency"
        answers={answers}
        handleChange={handleChange}
      />
    );
  }

  return null;
};

const QuestionBlock = ({
  title,
  options,
  answerKey,
  answers,
  handleChange,
}) => (
  <div>
    <p className="mb-3 font-medium">{title}</p>
    <div className="grid md:grid-cols-2 gap-3">
      {options.map((opt) => (
        <OptionCard
          key={opt}
          label={opt}
          selected={answers[answerKey] === opt}
          onClick={() => handleChange(answerKey, opt)}
        />
      ))}
    </div>
  </div>
);

export default Assessment;