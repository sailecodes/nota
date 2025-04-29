"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { signInSchema, signUpSchema } from "@/schemas";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createServerAction } from "@/utils";

export const signUp = createServerAction(async function (signUpData: z.infer<typeof signUpSchema>) {
  const { data: parsedData, error: parseError } = signUpSchema.safeParse(signUpData);

  if (parseError) throw new Error("Invalid data. Please provide valid credentials.");

  const supabase = await createClient();

  const {
    data: { user },
    error: signUpError,
  } = await supabase.auth.signUp({
    email: parsedData.email,
    password: parsedData.password,
    options: {
      data: {
        username: parsedData.username,
        firstName: parsedData.firstName,
        lastName: parsedData.lastName,
      },
      emailRedirectTo:
        process.env.NODE_ENV !== "production"
          ? `${process.env.DEV_URL}/dashboard`
          : `${process.env.PROD_URL}/dashboard`,
    },
  });

  // Only accounting for existing email error
  if (signUpError?.message) throw new Error("Email already exists");
  else if (!user) throw new Error("Something went wrong. Please try again.");

  try {
    await prisma.user.create({
      data: {
        sbId: user.id,
        username: user.user_metadata.username,
        firstName: user.user_metadata.firstName,
        lastName: user.user_metadata.lastName,
      },
    });

    return { data: null };
  } catch (e) {
    // Rollback previous Supabase auth table modification
    const { error: deleteUserError } = await supabaseAdmin.auth.admin.deleteUser(user!.id);

    console.error("[Sign up rollback failed] ", deleteUserError);

    if (deleteUserError) throw new Error("Something went wrong. Please try again.");
    else throw new Error("User couldn't be created. Please try again.");
  }
});

export const signIn = createServerAction(async function (signInData: z.infer<typeof signInSchema>) {
  const { data: parsedData, error: parseError } = signInSchema.safeParse(signInData);

  if (parseError) throw new Error("Invalid data. Please provide valid credentials.");

  const supabase = await createClient();

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: parsedData.email,
    password: parsedData.password,
  });

  if (signInError) throw new Error("Invalid credentials. Please try again.");

  return { data: null };
});

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) return { error: error.message };
}
