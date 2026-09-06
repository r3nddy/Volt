export const RADIO_STATIONS = [
  {
    id: "lifting-dreams",
    name: "Lifting Dreams",
    description:
      "Instrumental piano yang menenangkan untuk fokus dan relaksasi",
    moods: ["focus", "chill", "relax", "study"],
    youtubeId: "vqRnjwJyaNU",
    source: "Aakash Gandhi",
  },
  {
    id: "axol-alex-skrindo-you",
    name: "You",
    description: "Musik Electro House yang energik dan bebas hak cipta",
    moods: ["energetic", "workout", "upbeat"],
    youtubeId: "sA_p0rQtDXE",
    source: "Axol x Alex Skrindo / NoCopyrightSounds",
  },
  {
    id: "love-yourself-justin-bieber",
    name: "Love Yourself",
    description:
      "Lagu pop akustik santai tentang perpisahan dan mencintai diri sendiri",
    moods: ["chill", "acoustic", "sad", "pop"],
    youtubeId: "TMSIR210mRg",
    source: "Justin Bieber / Mrs Downey",
  },
];

export const DEFAULT_RADIO_STATION = RADIO_STATIONS[0];

export function getRadioStation(id) {
  return RADIO_STATIONS.find((station) => station.id === id) ?? null;
}
