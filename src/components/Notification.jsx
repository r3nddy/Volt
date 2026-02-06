const Notification = () => {
  return (
    <div className="bg-card-dark p-6 rounded-3xl flex-1 flex flex-col shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
      <h3 className="text-gray-400 font-medium mb-4 text-sm font-mono">
        Notifications
      </h3>
      <div className="flex-1 w-full h-full flex items-center justify-center opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
        <div className="text-9xl transform translate-y-4">🐋</div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-linear-to-t from-card-dark to-transparent"></div>
    </div>
  );
};

export default Notification;
