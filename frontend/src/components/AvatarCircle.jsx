import { AVATAR_OPTIONS, DEFAULT_AVATAR } from "../utils/avatars";

// user.avatar bir emoji karakteri olarak saklanır (örn: "🦊").
// Eşleşen arka plan rengini AVATAR_OPTIONS içinden bulur, bulamazsa varsayılanı kullanır.
const AvatarCircle = ({ avatar, size = 40, className = "" }) => {
  const match = AVATAR_OPTIONS.find((a) => a.emoji === avatar);
  const bg = match?.bg || "linear-gradient(135deg,#7C3AED,#EC4899)";
  const emoji = avatar || DEFAULT_AVATAR;

  return (
    <div
      className={`rounded-full flex items-center justify-center flex-shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        background: bg,
        fontSize: size * 0.55,
        lineHeight: 1,
      }}
    >
      {emoji}
    </div>
  );
};

export default AvatarCircle;
