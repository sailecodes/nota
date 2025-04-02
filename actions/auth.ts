"use server";

import { signInSchema, signUpSchema } from "@/lib/schemas/auth";
import { createClient } from "@/lib/utils/supabase/server";
import { z } from "zod";

export async function signUp(data: z.infer<typeof signUpSchema>) {
  let parsedData;

  try {
    const { email, password, firstName, lastName } = signUpSchema.parse(data);
    parsedData = { email, password, firstName, lastName };
  } catch (err) {
    return { errMsg: "Something went wrong. Please try again!" };
  }

  const supabase = await createClient();

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
  if (error?.message) return { errMsg: "Email already exists" };
}

export async function signIn(data: z.infer<typeof signInSchema>) {
  let parsedData;

  try {
    const { email, password } = signInSchema.parse(data);
    parsedData = { email, password };
  } catch (err) {
    return { errMsg: "Something went wrong. Please try again!" };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: parsedData.email,
    password: parsedData.password,
  });

  if (error?.message) return { errMsg: error?.message };
}
