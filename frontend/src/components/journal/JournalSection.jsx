import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import JournalModal from "./JournalModal";
import JournalEntriesList from "./JournalEntriesList";
import JournalSummaryCard from "./JournalSummaryCard";

const JournalSection = ({ userId: propUserId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [journalEntries, setJournalEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(propUserId);
  const [stats, setStats] = useState({
    totalEntries: 0,
    weeklyEntries: 0,
    lastEntry: null,
    moodDistribution: {}
  });

  useEffect(() => {
    const getUser = async () => {
      if (!propUserId) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUserId(user.id);
        }
      } else {
        setUserId(propUserId);
      }
    };
    
    getUser();
  }, [propUserId]);

  useEffect(() => {
    if (userId) {
      fetchJournalEntries();
    }
  }, [userId]);

  const fetchJournalEntries = async () => {
    try {
      const { data, error } = await supabase
        .from("journal_entries")
        .select("*")
        .eq("patient_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setJournalEntries(data || []);
      calculateStats(data || []);
    } catch (error) {
      console.error("Error fetching journal entries:", error);
      toast({
        title: "Failed to load journal",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (entries) => {
    // Total entries
    const totalEntries = entries.length;

    // Weekly entries (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weeklyEntries = entries.filter(
      entry => new Date(entry.created_at) >= weekAgo
    ).length;

    // Last entry
    const lastEntry = entries[0] || null;

    // Mood distribution (last 10 entries)
    const recentEntries = entries.slice(0, 10);
    const moodDistribution = recentEntries.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {});

    setStats({
      totalEntries,
      weeklyEntries,
      lastEntry,
      moodDistribution
    });
  };

  const handleDeleteEntry = async (entryId) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;

    try {
      const { error } = await supabase
        .from("journal_entries")
        .delete()
        .eq("id", entryId);

      if (error) throw error;

      toast({
        title: "Entry deleted",
        description: "Your journal entry has been removed.",
      });

      fetchJournalEntries();
    } catch (error) {
      console.error("Error deleting entry:", error);
      toast({
        title: "Failed to delete",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <JournalSummaryCard 
        stats={stats}
        onWriteClick={() => setIsModalOpen(true)}
      />

      {/* Entries List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-2xl p-6 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            Your Journal Entries
          </h3>
        </div>

        <JournalEntriesList
          entries={journalEntries}
          loading={loading}
          onDeleteEntry={handleDeleteEntry}
        />
      </motion.div>

      {/* Write Modal */}
      {isModalOpen && (
        <JournalModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          userId={userId}
          onEntryAdded={fetchJournalEntries}
        />
      )}
    </div>
  );
};

export default JournalSection;
