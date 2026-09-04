import { openRouterChat } from "../api/aiApi";

const MODEL = "anthropic/claude-haiku-4-5";

const SYSTEM_PROMPT = `Kamu adalah generator trivia teknologi untuk aplikasi Volt.
Beri SATU fakta random menarik tentang dunia teknologi, programming, open-source, atau internet.
Aturan:
- 1-2 kalimat pendek dalam Bahasa Indonesia
- Maksimal 200 karakter
- Fakta harus akurat dan menarik
- Jangan gunakan markdown, bullet, atau list
- Jangan mulai dengan "Tahukah kamu?" — itu akan ditambahkan oleh UI

Contoh output:
"Linus Torvalds menciptakan Git hanya dalam waktu 2 minggu karena ia benci dengan VCS yang ada saat itu."
"Keyboard QWERTY awalnya dirancang untuk memperlambat pengetikan agar mesin tik mekanik tidak macet."`;

/**
 * @returns {Promise<string>}
 */
export async function getTrivia() {
  return openRouterChat(MODEL, {
    system: SYSTEM_PROMPT,
    user: "Berikan satu fakta random teknologi yang menarik dan belum banyak diketahui orang.",
    maxTokens: 200,
  });
}

export default { getTrivia };