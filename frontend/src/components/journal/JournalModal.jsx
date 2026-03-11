import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Plus, 
  Tag, 
  Smile, 
  Frown, 
  Meh, 
  Sun, 
  Cloud,
  Save,
  X,
  PenTool,
  Heart,
  Brain,
  Lightbulb
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

const moodOptions = [
  { value: 'happy', label: 'Happy', icon: Smile, color: 'text-green-600' },
  { value: 'neutral', label: 'Neutral', icon: Meh, color: 'text-yellow-600' },
  { value: 'sad', label: 'Sad', icon: Frown, color: 'text-blue-600' },
  { value: 'energetic', label: 'Energetic', icon: Sun, color: 'text-orange-600' },
  { value: 'calm', label: 'Calm', icon: Cloud, color: 'text-indigo-600' },
];

const JournalModal = ({ isOpen, onClose, userId, patientId, onEntryAdded }) => {
  const [entry, setEntry] = useState({
    mood: '',
    moodLabel: '',
    content: '',
    gratitude: ['', '', ''],
    negativeThought: '',
    reframedThought: '',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMoodSelect = (mood) => {
    setEntry(prev => ({
      ...prev,
      mood: mood.value,
      moodLabel: mood.label
    }));
  };

  const handleGratitudeChange = (index, value) => {
    const newGratitude = [...entry.gratitude];
    newGratitude[index] = value;
    setEntry(prev => ({ ...prev, gratitude: newGratitude }));
  };

  const addTag = () => {
    if (tagInput.trim() && !entry.tags.includes(tagInput.trim())) {
      setEntry(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setEntry(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async () => {
    if (!entry.mood || !entry.content.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select a mood and write something.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const wordCount = entry.content.trim().split(/\s+/).length;
      
      const gratitudeArray = entry.gratitude.filter(g => g.trim());

      const { error } = await supabase.from("journal_entries").insert({
        patient_id: userId,
        mood: entry.mood,
        mood_label: entry.moodLabel,
        content: entry.content,
        gratitude: gratitudeArray.length > 0 ? gratitudeArray : [],
        negative_thought: entry.negativeThought || null,
        reframed_thought: entry.reframedThought || null,
        tags: entry.tags.length > 0 ? entry.tags : [],
        word_count: wordCount
      });

      if (error) throw error;

      toast({
        title: "Journal Entry Saved 🌸",
        description: "Your thoughts have been recorded successfully.",
      });

      // Reset form
      setEntry({
        mood: '',
        moodLabel: '',
        content: '',
        gratitude: ['', '', ''],
        negativeThought: '',
        reframedThought: '',
        tags: []
      });

      if (onEntryAdded) onEntryAdded();
      onClose();
    } catch (error) {
      console.error("Error saving journal entry:", error);
      toast({
        title: "Failed to Save",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      style={{ maxHeight: '100vh' }}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-card border border-border rounded-2xl w-full max-w-3xl my-8 mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              Write Your Journal
            </h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content - Scrollable */}
        <div className="p-6 space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto">
          
          {/* Mood Selection */}
          <section>
            <label className="block text-sm font-medium text-foreground mb-3">
              How are you feeling right now?
            </label>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {moodOptions.map((mood) => {
                const Icon = mood.icon;
                return (
                  <button
                    key={mood.value}
                    onClick={() => handleMoodSelect(mood)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      entry.mood === mood.value
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mx-auto mb-1 ${mood.color}`} />
                    <span className="text-xs text-foreground">{mood.label}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Main Writing Area */}
          <section>
            <label className="block text-sm font-medium text-foreground mb-2">
              What's on your mind? *
            </label>
            <textarea
              value={entry.content}
              onChange={(e) => setEntry(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Write freely about your thoughts, feelings, and experiences..."
              rows={6}
              className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-primary focus:outline-none resize-none"
            />
          </section>

          {/* Gratitude Section */}
          <section className="bg-accent/10 border border-accent/20 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-accent" />
              <label className="text-sm font-medium text-foreground">
                Gratitude Practice
              </label>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              List 3 things you're grateful for today
            </p>
            {[0, 1, 2].map((index) => (
              <input
                key={index}
                type="text"
                value={entry.gratitude[index]}
                onChange={(e) => handleGratitudeChange(index, e.target.value)}
                placeholder={`I'm grateful for ${index + 1}...`}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-accent focus:outline-none text-sm"
              />
            ))}
          </section>

          {/* Cognitive Reframing */}
          <section className="bg-secondary/10 border border-secondary/20 rounded-xl p-4 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-5 h-5 text-secondary" />
              <label className="text-sm font-medium text-foreground">
                Thought Reframing (Optional)
              </label>
            </div>
            
            <div>
              <label className="block text-xs text-muted-foreground mb-1">
                Negative thought (if any)
              </label>
              <input
                type="text"
                value={entry.negativeThought}
                onChange={(e) => setEntry(prev => ({ ...prev, negativeThought: e.target.value }))}
                placeholder="What negative thoughts are you having?"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-secondary focus:outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs text-muted-foreground mb-1">
                Reframe it positively
              </label>
              <input
                type="text"
                value={entry.reframedThought}
                onChange={(e) => setEntry(prev => ({ ...prev, reframedThought: e.target.value }))}
                placeholder="Is there a more balanced way to view this?"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-secondary focus:outline-none text-sm"
              />
            </div>
          </section>

          {/* Tags */}
          <section>
            <label className="block text-sm font-medium text-foreground mb-2">
              Add tags to organize your entry
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
                placeholder="Add a tag..."
                className="flex-1 px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:outline-none text-sm"
              />
              <Button onClick={addTag} variant="outline" size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {entry.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-border flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {entry.content.trim().split(/\s+/).filter(Boolean).length} words
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? "Saving..." : "Save Entry"}
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default JournalModal;
