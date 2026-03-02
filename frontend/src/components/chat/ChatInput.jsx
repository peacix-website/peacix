import { useState } from "react";
import { Button } from "@/components/ui/button";

const ChatInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    onSend(text);
    setText("");
  };

  return (
    <div className="flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Share what’s on your mind..."
        className="flex-1 px-4 py-3 rounded-xl bg-card border border-border focus:outline-none"
      />
      <Button onClick={handleSend}>Send</Button>
    </div>
  );
};

export default ChatInput;