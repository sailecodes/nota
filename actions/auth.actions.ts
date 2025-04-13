"use server";

import { z } from "zod";
import prisma from "@/utils/prisma";
import { signInSchema, signUpSchema } from "@/schemas/auth.schema";
import { createClient } from "@/utils/supabase/server";
import { supabaseAdmin } from "@/utils/supabase/admin";

export async function signUp(signUpData: z.infer<typeof signUpSchema>) {
  let parsedData;

  try {
    parsedData = signUpSchema.parse(signUpData);
  } catch (e) {
    return { error: "Data couldn't be parsed" };
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: signUpError,
  } = await supabase.auth.signUp({
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
  if (signUpError?.message) return { error: "Email already exists" };

  try {
    await prisma.user.create({
      data: {
        supabaseId: user!.id,
        firstName: user!.user_metadata.firstName,
        lastName: user!.user_metadata.lastName,
      },
    });
  } catch (e) {
    // Rollback previous Supabase auth table modification
    const { error: deleteUserError } = await supabaseAdmin.auth.admin.deleteUser(user!.id);

    if (deleteUserError) return { error: deleteUserError.message };
  }
}

export async function signIn(data: z.infer<typeof signInSchema>) {
  let parsedData;

  try {
    parsedData = signInSchema.parse(data);
  } catch (err) {
    return { msg: "Data couldn't be parsed. Check field values." };
  }

  const supabase = await createClient();

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: parsedData.email,
    password: parsedData.password,
  });

  if (signInError?.message) return { msg: signInError?.message };
}

export async function signOut() {}
