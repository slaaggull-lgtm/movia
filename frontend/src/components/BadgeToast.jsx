const BadgeToast = ({ badges, onClose }) => {
  if (!badges || badges.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm">
      {badges.map((b) => (
        <div
          key={b.key}
          className="bg-movia-gradient text-white p-4 rounded-2xl shadow-2xl fade-in flex items-center gap-3"
        >
          <span className="text-3xl">{b.icon}</span>
          <div className="flex-1">
            <p className="font-bold">🎉 Yeni Rozet: {b.title}</p>
            <p className="text-sm opacity-90">{b.description}</p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white text-lg">
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default BadgeToast;
