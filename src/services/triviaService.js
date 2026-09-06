import { openRouterChat } from "../api/aiApi";

const MODEL = "google/gemini-2.0-flash-lite-001:free";

const FALLBACK_TRIVIA = [
  "Linus Torvalds menciptakan Git hanya dalam waktu 2 minggu karena ia benci dengan VCS yang ada saat itu.",
  "Keyboard QWERTY awalnya dirancang untuk memperlambat pengetikan agar mesin tik mekanik tidak macet.",
  "Bug komputer pertama tercatat pada tahun 1947 ketika seekor ngengat asli terjebak di dalam sirkuit komputer Harvard Mark II.",
  "Domain web pertama yang pernah didaftarkan adalah symbolics.com pada 15 Maret 1985.",
  "Nama JavaScript dipilih untuk memanfaatkan kepopuleran Java saat itu, meskipun keduanya bahasa pemrograman yang sangat berbeda.",
  "Sekitar 90% dari seluruh mata uang di dunia saat ini hanya ada dalam bentuk digital di komputer.",
  "Python dinamai berdasarkan acara komedi TV Inggris 'Monty Python's Flying Circus', bukan hewan ular.",
];

const SYSTEM_PROMPT = `Kamu adalah generator trivia teknologi untuk aplikasi Volt.
Beri SATU fakta random menarik tentang dunia teknologi, programming, open-source, atau internet.
Aturan:
- 1-2 kalimat pendek dalam Bahasa Indonesia
- Maksimal 200 karakter
- Fakta harus akurat dan menarik
- Jangan gunakan markdown, bullet, atau list
- Jangan mulai dengan "Tahukah kamu?" — itu akan ditambahkan oleh UI`;

/**
 * @returns {Promise<string>}
 */
export async function getTrivia() {
  try {
    return await openRouterChat(MODEL, {
      system: SYSTEM_PROMPT,
      user: "Berikan satu fakta random teknologi yang menarik dan belum banyak diketahui orang.",
      maxTokens: 200,
    });
  } catch (err) {
    console.warn(
      "[TriviaService] API gagal, menggunakan fallback trivia:",
      err.message,
    );
    const randomIndex = Math.floor(Math.random() * FALLBACK_TRIVIA.length);
    return FALLBACK_TRIVIA[randomIndex];
  }
}

export default { getTrivia };
