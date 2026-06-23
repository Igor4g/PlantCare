const nvidiaApiKey = process.env.EXPO_PUBLIC_NVIDIA_API_KEY;
const nvidiaUrl = "https://integrate.api.nvidia.com/v1/chat/completions";
const nvidiaModel = "minimaxai/minimax-m3";

export async function pflanzeMitKiErkennen(base64Bild) {
  if (!nvidiaApiKey) {
    throw new Error("NVIDIA_API_KEY_FEHLT");
  }

  const antwort = await fetch(nvidiaUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${nvidiaApiKey}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: nvidiaModel,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text:
                "Erkenne diese Zimmerpflanze. Antworte kurz auf Deutsch. " +
                "Gib wenn möglich den Pflanzennamen, eine Sicherheit in Prozent und 3 kurze Pflegetipps. " +
                "Wenn du unsicher bist, schreibe klar, dass es nur eine Vermutung ist.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Bild}`,
              },
            },
          ],
        },
      ],
      max_tokens: 600,
      temperature: 0.2,
      top_p: 0.9,
      stream: false,
    }),
  });

  const daten = await antwort.json();

  if (!antwort.ok) {
    throw new Error(daten?.error?.message || "KI-Anfrage fehlgeschlagen.");
  }

  return daten.choices?.[0]?.message?.content || "Keine Antwort erhalten.";
}
