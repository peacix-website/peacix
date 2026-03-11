import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  Calendar, 
  Tag, 
  Trash2, 
  Eye, 
  Search,
  Filter,
  Heart,
  Brain,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";

const JournalEntriesList = ({ entries, loading, onDeleteEntry }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMood, setSelectedMood] = useState("all");
  const [expandedEntry, setExpandedEntry] = useState(null);

  const moodEmojis = {
    happy: '😊',
    neutral: '😐',
    sad: '😢',
    energetic: '⚡',
    calm: '😌'
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesMood = selectedMood === "all" || entry.mood === selectedMood;
    
    return matchesSearch && matchesMood;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const toggleExpand = (entryId) => {
    setExpandedEntry(expandedEntry === entryId ? null : entryId);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-6 animate-pulse">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-muted rounded-full"></div>
              <div className="h-4 bg-muted rounded w-1/3"></div>
            </div>
            <div className="h-4 bg-muted rounded w-full mb-2"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No journal entries yet
        </h3>
        <p className="text-muted-foreground">
          Start writing to track your thoughts and feelings
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search entries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="all">All Moods</option>
            <option value="happy">Happy</option>
            <option value="neutral">Neutral</option>
            <option value="sad">Sad</option>
            <option value="energetic">Energetic</option>
            <option value="calm">Calm</option>
          </select>
        </div>
      </div>

      {/* Entries List */}
      <AnimatePresence>
        {filteredEntries.map((entry) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-card border border-border rounded-xl overflow-hidden"
          >
            {/* Entry Header */}
            <div className="p-4 flex items-start justify-between border-b border-border">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{moodEmojis[entry.mood]}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      {entry.mood_label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      • {entry.word_count} words
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {formatDate(entry.created_at)}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpand(entry.id)}
                >
                  {expandedEntry === entry.id ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteEntry(entry.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Entry Content */}
            {expandedEntry === entry.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 space-y-4">
                  
                  {/* Main Content */}
                  <div className="prose prose-sm max-w-none">
                    <p className="text-foreground whitespace-pre-wrap">
                      {entry.content}
                    </p>
                  </div>

                  {/* Gratitude Section */}
                  {entry.gratitude && entry.gratitude.length > 0 && (
                    <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-4 h-4 text-accent" />
                        <span className="text-sm font-medium text-foreground">
                          Gratitude
                        </span>
                      </div>
                      <ul className="space-y-1">
                        {entry.gratitude.map((item, idx) => (
                          <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                            <span className="text-accent">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Thought Reframing */}
                  {(entry.negative_thought || entry.reframed_thought) && (
                    <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-3 space-y-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="w-4 h-4 text-secondary" />
                        <span className="text-sm font-medium text-foreground">
                          Thought Reframing
                        </span>
                      </div>
                      {entry.negative_thought && (
                        <div>
                          <span className="text-xs text-muted-foreground">Negative thought:</span>
                          <p className="text-sm text-foreground mt-1">
                            {entry.negative_thought}
                          </p>
                        </div>
                      )}
                      {entry.reframed_thought && (
                        <div>
                          <span className="text-xs text-muted-foreground">Reframed thought:</span>
                          <p className="text-sm text-foreground mt-1">
                            {entry.reframed_thought}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tags */}
                  {entry.tags && entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {filteredEntries.length === 0 && entries.length > 0 && (
        <div className="text-center py-8">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">
            No entries match your search
          </p>
        </div>
      )}
    </div>
  );
};

export default JournalEntriesList;
