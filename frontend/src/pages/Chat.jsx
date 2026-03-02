import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [patientId, setPatientId] = useState(null);
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    loadChat();
  }, []);

  const loadChat = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // Get patient using profile_id
      const { data: patient, error } = await supabase
        .from("patients")
        .select("id")
        .eq("profile_id", user.id)
        .single();

      if (error || !patient) {
        console.error("Patient fetch error:", error);
        return;
      }

      setPatientId(patient.id);

      const { data: chatData, error: chatError } = await supabase
        .from("ai_chat_logs")
        .select("*")
        .eq("patient_id", patient.id)
        .order("created_at", { ascending: true });

      if (chatError) {
        console.error("Chat fetch error:", chatError);
        return;
      }

      setMessages(chatData || []);
    } catch (err) {
      console.error("Load chat error:", err);
    }
  };

  const sendMessage = async (text) => {
    if (!text.trim() || !patientId) return;

    try {
      setLoading(true);

      const userMessage = {
        is_user: true,
        message: text,
      };

      setMessages((prev) => [...prev, userMessage]);

      // Save user message
      const { error: insertError } = await supabase
        .from("ai_chat_logs")
        .insert({
          patient_id: patientId,
          is_user: true,
          message: text,
        });

      if (insertError) {
        console.error("User insert error:", insertError);
        return;
      }

      const history = [
        ...messages.slice(-10).map((m) => ({
          role: m.is_user ? "user" : "model",
          content: m.message,
        })),
        { role: "user", content: text },
      ];

      // 🔥 DO NOT manually override Authorization
      const { data, error } = await supabase.functions.invoke(
        "peacix-ai",
        {
          body: {
            messages: history,
            language,
          },
        }
      );

      if (error) {
        console.error("AI invoke error:", error);
        return;
      }

      if (!data?.reply) {
        console.error("Invalid AI response:", data);
        return;
      }

      const aiReply = data.reply;

      await supabase.from("ai_chat_logs").insert({
        patient_id: patientId,
        is_user: false,
        message: aiReply,
      });

      setMessages((prev) => [
        ...prev,
        { is_user: false, message: aiReply },
      ]);
    } catch (err) {
      console.error("Send message error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col p-6">
      <div className="text-xs text-muted-foreground text-center mb-3">
        Peacix AI is not a replacement for professional therapy.
      </div>

      <button
        onClick={() =>
          setLanguage(language === "en" ? "hi" : "en")
        }
        className="text-sm mb-4 text-primary"
      >
        {language === "en"
          ? "Switch to Hindi"
          : "Switch to English"}
      </button>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}

        {loading && (
          <div className="text-sm text-muted-foreground">
            Peacix is typing...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={sendMessage} disabled={loading} />
    </div>
  );
};

export default Chat;