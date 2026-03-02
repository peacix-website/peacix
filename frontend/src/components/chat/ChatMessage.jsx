const ChatMessage = ({ message }) => {
  const isUser = message.is_user;

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-4 py-3 rounded-2xl shadow-sm ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-card border border-border"
        }`}
      >
        {message.message}
      </div>
    </div>
  );
};

export default ChatMessage;