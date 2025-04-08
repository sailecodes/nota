"use server";

import { signInSchema, signUpSchema } from "@/lib/schemas/auth.schema";
import { createClient } from "@/lib/utils/supabase/server";
import { z } from "zod";

export async function signUp(data: z.infer<typeof signUpSchema>) {
  const supabase = await createClient();

  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser();

  if (!user) return { success: false, msg: "Unauthorized access." };
  else if (getUserError) return { success: false, msg: getUserError.message };

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
      emailRedirectTo: process.env.SUPABASE_AUTH_REDIRECT_URL,
    },
  });

  // Only accounting for existing email error
  if (error?.message) return { msg: "Email already exists" };
}

export async function signIn(data: z.infer<typeof signInSchema>) {
  const supabase = await createClient();

  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser();

  if (!user) return { success: false, msg: "Unauthorized access." };
  else if (getUserError) return { success: false, msg: getUserError.message };

  let parsedData;

  try {
    parsedData = signInSchema.parse(data);
  } catch (err) {
    return { success: false, msg: "Data couldn't be parsed. Check field values." };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: parsedData.email,
    password: parsedData.password,
  });

  if (error?.message) return { msg: error?.message };
}

export async function signOut() {}
