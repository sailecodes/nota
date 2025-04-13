"use server";

import { createClient } from "@deepgram/sdk";
import { AssemblyAI } from "assemblyai";

const deepgram = createClient(process.env.DEEPGRAM_API_KEY!);
const assemblyAI = new AssemblyAI({ apiKey: process.env.ASSEMBLYAI_API_KEY! });

export async function transcribe(fileUrl: string) {
  const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
    { url: fileUrl },
    { model: "nova-3", smart_format: true }
  );

  // Errors from Deepgram and AssemblyAI are relevant only to the developer,
  // hence the use of console.error(). Errors are subsequently thrown to ensure
  // user experience, e.g. allowing users to retry failed transcriptions.
  if (error) {
    if (error.message.includes("ASR_PAYMENT_REQUIRED")) {
      try {
        return await fallbackTranscribe(fileUrl);
      } catch (err) {
        throw new Error("Error occurred during transcription phase");
      }
    } else {
      console.error(`[deepgram/transcription.ts] ${error.message}`);

      throw new Error("Error occurred during transcription phase");
    }
  }

  return { transcript: result!.results.channels[0].alternatives[0].transcript, model: "Deepgram" };
}

async function fallbackTranscribe(fileUrl: string) {
  const transcript = await assemblyAI.transcripts.transcribe({
    audio: fileUrl,
    speech_model: "nano",
    language_detection: true,
  });

  if (transcript.status === "error") {
    console.error(`[assemblyai/transcription.ts] ${transcript.error}`);

    throw new Error();
  }

  return { transcript: transcript.text, model: "AssemblyAI" };
}
