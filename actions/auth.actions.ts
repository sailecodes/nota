"use server";

import { signInSchema, signUpSchema } from "@/lib/schemas/auth.schema";
import { createClient } from "@/lib/utils/supabase/server";
import { z } from "zod";

export async function signUp(data: z.infer<typeof signUpSchema>) {
  const supabase = await createClient();

  let parsedData;

  try {
    parsedData = signUpSchema.parse(data);
  } catch (err) {
    return { success: false, msg: "Data couldn't be parsed. Check field values." };
  }

  const { error } = await supabase.auth.signUp({
    email: parsedData.email,
    password: parsedData.password,
    options: {
      data: {
        firstName: parsedData.firstName,
        lastName: parsedData.lastName,
      },
      // TODO: Change url for prod
      emailRedirectTo: "http://localhost:3000/dashboard/overview",
    },
  });

  // Only accounting for existing email error
  if (error?.message) return { success: false, msg: "Email already exists" };
}

export async function signIn(data: z.infer<typeof signInSchema>) {
  let parsedData;

  try {
    parsedData = signInSchema.parse(data);
  } catch (err) {
    return { success: false, msg: "Data couldn't be parsed. Check field values." };
  }

  const supabase = await createClient();

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: parsedData.email,
    password: parsedData.password,
  });

  if (signInError?.message) return { success: false, msg: signInError?.message };
}

export async function signOut() {}
