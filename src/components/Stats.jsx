import { Cpu, Thermometer, HardDrive, Bot } from "lucide-react";

const Usage = (props) => {
  const { value, icon: Icon, color = "text-purple-400" } = props;
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-24 h-24">
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          className="text-[#27272a]"
        />
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={`${color} transition-all duration-1000 ease-in-out`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute text-gray-400">
        <Icon size={24} />
      </div>
    </div>
  );
};

const Stats = () => {
  return (
    <div className="bg-card-dark p-6 rounded-3xl h-64 shadow-lg grid grid-cols-2 gap-4 place-items-center relative group hover:scale-[1.05] transition-transform duration-300 z-10">
      <div className="absolute inset-0 bg-transparent rounded-3xl border border-white/5 pointer-events-none"></div>
      {/* kiri atas */}
      <Usage value={45} icon={Cpu} color="text-purple-400" />
      {/* kanan atas */}
      <Usage value={40} icon={Thermometer} color="text-white" />
      {/* kiri bawah */}
      <Usage value={60} icon={HardDrive} color="text-red-400" />
      {/* kanan bawah */}
      <Usage value={90} icon={Bot} color="text-blue-400" />
    </div>
  );
};

export default Stats;
