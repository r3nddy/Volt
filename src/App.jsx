import ArchCard from "./components/ArchCard";
import MusicPlayer from "./components/MusicPlayer";
import WeatherCard from "./components/WeatherCard";

function App() {
  return (
    <div className="min-h-screen bg-bg-dark text-white p-8 flex items-center justify-center font-sans selection:bg-purple-500/30">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl h-full md:h-[80vh] max-h-225">
        <div className="flex flex-col gap-6 lg:col-span-1 h-full">
          <WeatherCard />
          <ArchCard />
          <MusicPlayer />
        </div>
      </div>
    </div>
  );
}

export default App;
