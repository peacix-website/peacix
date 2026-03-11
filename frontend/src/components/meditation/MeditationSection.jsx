import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Headphones, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2,
  Clock,
  CheckCircle,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

const meditationTracks = [
  {
    id: 1,
    title: "Morning Calm",
    duration: 300, // 5 minutes in seconds
    category: "Mindfulness",
    description: "Start your day with peace and clarity",
    color: "from-primary/20 to-primary/40"
  },
  {
    id: 2,
    title: "Stress Relief",
    duration: 600, // 10 minutes
    category: "Relaxation",
    description: "Release tension and find calm",
    color: "from-secondary/20 to-secondary/40"
  },
  {
    id: 3,
    title: "Deep Sleep",
    duration: 900, // 15 minutes
    category: "Sleep",
    description: "Prepare your mind for restful sleep",
    color: "from-accent/20 to-accent/40"
  },
  {
    id: 4,
    title: "Anxiety Support",
    duration: 420, // 7 minutes
    category: "Healing",
    description: "Gentle guidance through anxious moments",
    color: "from-primary/20 to-accent/30"
  },
  {
    id: 5,
    title: "Focus Boost",
    duration: 480, // 8 minutes
    category: "Productivity",
    description: "Enhance concentration and mental clarity",
    color: "from-secondary/20 to-primary/30"
  },
  {
    id: 6,
    title: "Gratitude Practice",
    duration: 360, // 6 minutes
    category: "Mindfulness",
    description: "Cultivate appreciation and thankfulness",
    color: "from-accent/20 to-primary/30"
  }
];

const MeditationPlayer = ({ track, userId, onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(75);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleComplete = async () => {
    try {
      const { error } = await supabase
        .from("meditation_sessions")
        .insert({
          patient_id: userId,
          track_name: track.title,
          duration_secs: track.duration,
          completed: true,
          completed_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Session Complete! 🧘",
        description: `You meditated for ${Math.floor(track.duration / 60)} minutes.`,
      });

      if (onComplete) onComplete();
      setIsPlaying(false);
      setCurrentTime(0);
    } catch (error) {
      console.error("Error saving meditation session:", error);
      toast({
        title: "Failed to save session",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Simulate timer when playing
  React.useEffect(() => {
    let interval;
    if (isPlaying && currentTime < track.duration) {
      interval = setInterval(() => {
        setCurrentTime(prev => prev + 1);
      }, 1000);
    } else if (currentTime >= track.duration) {
      handleComplete();
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, track.duration]);

  const progress = (currentTime / track.duration) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-border rounded-2xl p-6 space-y-6"
    >
      {/* Track Info */}
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-foreground">{track.title}</h3>
        <p className="text-muted-foreground">{track.description}</p>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary">{Math.floor(track.duration / 60)} min</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(track.duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentTime(Math.max(0, currentTime - 15))}
        >
          <SkipBack className="w-5 h-5" />
        </Button>

        <Button
          size="lg"
          className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90"
          onClick={handlePlayPause}
        >
          {isPlaying ? (
            <Pause className="w-8 h-8" />
          ) : (
            <Play className="w-8 h-8 ml-1" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentTime(Math.min(track.duration, currentTime + 15))}
        >
          <SkipForward className="w-5 h-5" />
        </Button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-3 justify-center">
        <Volume2 className="w-4 h-4 text-muted-foreground" />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(parseInt(e.target.value))}
          className="w-32 accent-primary"
        />
      </div>

      {/* Completion Message */}
      {currentTime >= track.duration && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 text-accent"
        >
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">Session Complete!</span>
        </motion.div>
      )}
    </motion.div>
  );
};

const MeditationTrackCard = ({ track, onSelect }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => onSelect(track)}
    className={`bg-gradient-to-br ${track.color} border border-border rounded-xl p-4 cursor-pointer hover:shadow-md transition-all`}
  >
    <div className="flex items-start justify-between mb-3">
      <div className="p-2 bg-background/50 rounded-lg">
        <Headphones className="w-5 h-5 text-foreground" />
      </div>
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Clock className="w-3 h-3" />
        {Math.floor(track.duration / 60)} min
      </div>
    </div>
    
    <h3 className="font-semibold text-foreground mb-1">{track.title}</h3>
    <p className="text-xs text-muted-foreground mb-3">{track.description}</p>
    
    <div className="flex items-center justify-between">
      <span className="text-xs px-2 py-1 bg-background/50 rounded-full text-foreground">
        {track.category}
      </span>
      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
        <Play className="w-4 h-4" />
      </Button>
    </div>
  </motion.div>
);

const MeditationSection = ({ userId }) => {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalMinutes: 0,
    weeklySessions: 0
  });

  React.useEffect(() => {
    fetchMeditationStats();
  }, [userId]);

  const fetchMeditationStats = async () => {
    try {
      const { data, error } = await supabase
        .from("meditation_sessions")
        .select("duration_secs, completed, created_at")
        .eq("patient_id", userId);

      if (error) throw error;

      const totalSessions = data?.length || 0;
      const totalMinutes = Math.floor(
        data?.reduce((acc, session) => acc + (session.duration_secs / 60), 0) || 0
      );

      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const weeklySessions = data?.filter(
        session => new Date(session.created_at) >= weekAgo && session.completed
      ).length || 0;

      setStats({
        totalSessions,
        totalMinutes,
        weeklySessions
      });
    } catch (error) {
      console.error("Error fetching meditation stats:", error);
    }
  };

  const handleSessionComplete = () => {
    fetchMeditationStats();
    setSelectedTrack(null);
  };

  return (
    <div className="space-y-6">
      {/* Stats Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-2xl p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Headphones className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Meditation
              </h3>
              <p className="text-xs text-muted-foreground">
                Mindfulness & relaxation
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-muted/50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-foreground">
              {stats.totalSessions}
            </p>
            <p className="text-xs text-muted-foreground mt-1">sessions</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-foreground">
              {stats.totalMinutes}
            </p>
            <p className="text-xs text-muted-foreground mt-1">minutes</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-foreground">
              {stats.weeklySessions}
            </p>
            <p className="text-xs text-muted-foreground mt-1">this week</p>
          </div>
        </div>
      </motion.div>

      {/* Player or Track Grid */}
      {selectedTrack ? (
        <MeditationPlayer
          track={selectedTrack}
          userId={userId}
          onComplete={handleSessionComplete}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {meditationTracks.map((track) => (
            <MeditationTrackCard
              key={track.id}
              track={track}
              onSelect={setSelectedTrack}
            />
          ))}
        </motion.div>
      )}

      {/* Benefits Section */}
      {!selectedTrack && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-accent/10 border border-accent/20 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold text-foreground">
              Benefits of Meditation
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Reduces Stress", desc: "Lower cortisol levels" },
              { title: "Improves Focus", desc: "Enhanced concentration" },
              { title: "Better Sleep", desc: "More restful nights" },
              { title: "Emotional Health", desc: "Improved mood stability" }
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">{benefit.title}</p>
                  <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MeditationSection;
