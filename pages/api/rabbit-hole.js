// pages/api/rabbit-hole.js
// Uses Google Gemini FREE tier — 1,500 requests/day at zero cost
// Get your free key at: aistudio.google.com

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { topic } = req.body;

  if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
    return res.status(400).json({ error: "Topic is required" });
  }

  if (topic.trim().length > 100) {
    return res.status(400).json({ error: "Topic too long — keep it under 100 characters" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server configuration error — API key missing" });
  }

  const prompt = `You are the world's most fascinating storyteller. Create a "rabbit hole" journey starting from "${topic.trim()}" through 5 wildly unexpected, mind-blowing connected stops.

Each stop must reveal a genuinely shocking TRUE fact, connect naturally to the next stop, and get progressively more mind-blowing.

Respond in EXACTLY this format — nothing before SUBTITLE, nothing after the last WOW:

SUBTITLE: [one punchy sentence max 12 words describing this rabbit hole's arc]

STOP1_HEADLINE: [punchy title max 10 words]
STOP1_BODY: [2-3 sentences. True facts. Wrap the most shocking phrase in **double asterisks**. End connecting to stop 2.]
STOP1_WOW: [ultra-short reaction max 8 words]

STOP2_HEADLINE: [title]
STOP2_BODY: [2-3 sentences with **bold**. Connect to stop 3.]
STOP2_WOW: [reaction]

STOP3_HEADLINE: [title]
STOP3_BODY: [2-3 sentences with **bold**. Connect to stop 4.]
STOP3_WOW: [reaction]

STOP4_HEADLINE: [title]
STOP4_BODY: [2-3 sentences with **bold**. Connect to stop 5.]
STOP4_WOW: [reaction]

STOP5_HEADLINE: [most mind-blowing title]
STOP5_BODY: [2-3 sentences. Grand finale. **Bold** the most shocking part. Make the reader want to share immediately.]
STOP5_WOW: [mic-drop reaction max 8 words]

Rules: All facts TRUE. Specific names, numbers, dates. Write like texting your most curious friend. Start directly with SUBTITLE:`;

  try {
    // FREE Gemini API call
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.9,
            maxOutputTokens: 1200,
          }
        })
      }
    );

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.error("Gemini API error:", errData);

      // Handle rate limit specifically
      if (response.status === 429) {
        return res.status(429).json({ error: "Too many requests — please wait a moment and try again." });
      }

      return res.status(502).json({ error: "AI service error. Please try again." });
    }

    const data = await response.json();

    // Extract text from Gemini response format
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!text || text.length < 100) {
      return res.status(502).json({ error: "Empty response. Please try again." });
    }

    // Parse stops
    const stops = [];
    for (let n = 1; n <= 5; n++) {
      const hMatch = text.match(new RegExp(`STOP${n}_HEADLINE:\\s*([^\\n]+)`));
      const bMatch = text.match(new RegExp(`STOP${n}_BODY:\\s*([\\s\\S]*?)(?=STOP${n}_WOW:|STOP${n+1}_HEADLINE:|$)`));
      const wMatch = text.match(new RegExp(`STOP${n}_WOW:\\s*([^\\n]+)`));

      if (hMatch) {
        stops.push({
          headline: hMatch[1].trim(),
          body: bMatch ? bMatch[1].trim().replace(/STOP\d.*$/s, "").trim() : "",
          wow: wMatch ? wMatch[1].trim() : ""
        });
      }
    }

    if (stops.length < 3) {
      return res.status(502).json({ error: "Could not generate a proper rabbit hole for that topic. Try something else!" });
    }

    const subMatch = text.match(/SUBTITLE:\s*([^\n]+)/);

    return res.status(200).json({
      topic: topic.trim(),
      subtitle: subMatch ? subMatch[1].trim() : `A journey through ${topic}`,
      stops
    });

  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Server error. Please try again." });
  }
}
