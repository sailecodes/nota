import { AssemblyAI } from "assemblyai";

const assemblyAI = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY!,
});

export async function transcribeWithAssemblyAI(fileUrl: string) {
  const transcript = await assemblyAI.transcripts.transcribe({
    audio: fileUrl,
    speech_model: "nano",
    language_detection: true,
  });

  if (transcript.status === "error") {
    console.error(`[assemblyai/transcription.ts] ${transcript.error}`);

    throw new Error("Error occurred during transcription phase");
  }

  return { transcript: transcript.text };
}
