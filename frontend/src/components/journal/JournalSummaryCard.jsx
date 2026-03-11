import React from "react";
import { motion } from "framer-motion";
import { BookOpen, TrendingUp, Calendar, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";

const JournalSummaryCard = ({ stats, onWriteClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-6 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Journal
            </h3>
            <p className="text-xs text-muted-foreground">
              Track your thoughts & feelings
            </p>
          </div>
        </div>
        <Button 
          onClick={onWriteClick}
          size="sm"
          className="bg-primary hover:bg-primary/90"
        >
          <PenTool className="w-4 h-4 mr-1" />
          Write
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Total Entries */}
        <div className="bg-muted/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Total</span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {stats.totalEntries || 0}
          </p>
          <p className="text-xs text-muted-foreground mt-1">entries</p>
        </div>

        {/* Current Streak */}
        <div className="bg-muted/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="text-xs text-muted-foreground">This Week</span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {stats.weeklyEntries || 0}
          </p>
          <p className="text-xs text-muted-foreground mt-1">entries</p>
        </div>
      </div>

      {/* Last Entry */}
      {stats.lastEntry && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-1">
                Last entry
              </p>
              <p className="text-sm text-foreground line-clamp-2">
                {stats.lastEntry.content}
              </p>
            </div>
            <span className="text-xs text-muted-foreground ml-2 whitespace-nowrap">
              {formatLastEntryDate(stats.lastEntry.created_at)}
            </span>
          </div>
        </div>
      )}

      {/* Mood Distribution */}
      {stats.moodDistribution && Object.keys(stats.moodDistribution).length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">
            Recent moods
          </p>
          <div className="flex gap-2 flex-wrap">
            {Object.entries(stats.moodDistribution).map(([mood, count]) => (
              <div
                key={mood}
                className="px-3 py-1.5 bg-primary/10 rounded-full flex items-center gap-1"
              >
                <span className="text-sm">{getMoodEmoji(mood)}</span>
                <span className="text-xs text-primary font-medium">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Helper functions
const getMoodEmoji = (mood) => {
  const emojis = {
    happy: '😊',
    neutral: '😐',
    sad: '😢',
    energetic: '⚡',
    calm: '😌'
  };
  return emojis[mood] || '📝';
};

const formatLastEntryDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric'
  }).format(date);
};

export default JournalSummaryCard;
