import { createClient } from "@deepgram/sdk";
import { transcribeWithAssemblyAI } from "../assemblyai/transcription";

const deepgram = createClient(process.env.DEEPGRAM_API_KEY!);

export async function transcribeWithDeepgram(fileUrl: string) {
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
        return await transcribeWithAssemblyAI(fileUrl);
      } catch (err) {
        throw new Error("Error occurred during transcription phase");
      }
    } else {
      console.error(`[deepgram/transcription.ts] ${error.message}`);

      throw new Error("Error occurred during transcription phase");
    }
  }

  return { transcript: result!.results.channels[0].alternatives[0].transcript };
}
