"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { signInSchema, signUpSchema } from "@/schemas";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function signUp(signUpData: z.infer<typeof signUpSchema>) {
  const { data: parsedData, error: parseError } = signUpSchema.safeParse(signUpData);

  if (parseError) return { error: "Data couldn't be parsed" };

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
          ? "http://localhost:3000/dashboard"
          : "https://nota-c44ulgj93-elias-iv-romans-projects.vercel.app/dashboard",
    },
  });

  // Only accounting for existing email error
  if (signUpError?.message) return { error: "Email already exists" };
  else if (!user) return { error: "User couldn't be created" };

  try {
    await prisma.user.create({
      data: {
        sbId: user.id,
        username: user.user_metadata.username,
        firstName: user.user_metadata.firstName,
        lastName: user.user_metadata.lastName,
      },
    });
  } catch (e) {
    // Rollback previous Supabase auth table modification
    const { error: deleteUserError } = await supabaseAdmin.auth.admin.deleteUser(user!.id);

    if (deleteUserError) return { error: deleteUserError.message };
    else return { error: "User couldn't be created" };
  }
}

export async function signIn(signInData: z.infer<typeof signInSchema>) {
  const { data: parsedData, error: parseError } = signInSchema.safeParse(signInData);

  if (parseError) return { error: "Data couldn't be parsed" };

  const supabase = await createClient();

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: parsedData.email,
    password: parsedData.password,
  });

  if (signInError?.message) return { error: signInError?.message };
}

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) return { error: error.message };
}
