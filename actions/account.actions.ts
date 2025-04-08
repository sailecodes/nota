"use server";

import {
  emailAddressSchema,
  passwordSchema,
  profileInformationSchema,
} from "@/lib/schemas/account.schema";
import { supabaseAdmin } from "@/lib/utils/supabase/admin";
import { createClient } from "@/lib/utils/supabase/server";
import { z } from "zod";

export const updateProfileInformation = async (data: z.infer<typeof profileInformationSchema>) => {
  const supabase = await createClient();

  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser();

  if (!user) return { success: false, msg: "Unauthorized access." };
  else if (getUserError) return { success: false, msg: getUserError.message };

  let parsedData;

  try {
    parsedData = profileInformationSchema.parse(data);
  } catch (err) {
    return { success: false, msg: "Data couldn't be parsed. Check field values." };
  }

  const { error: updateUserError } = await supabase.auth.updateUser({
    data: { firstName: parsedData.firstName, lastName: parsedData.lastName },
  });

  if (updateUserError) return { success: false, msg: updateUserError.message };
};

export const changeEmailAddress = async (data: z.infer<typeof emailAddressSchema>) => {
  const supabase = await createClient();

  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser();

  if (!user) return { success: false, msg: "Unauthorized access." };
  else if (getUserError) return { success: false, msg: getUserError.message };

  let parsedData;

  try {
    parsedData = emailAddressSchema.parse(data);
  } catch (err) {
    return { success: false, msg: "Data couldn't be parsed. Check field values." };
  }

  const { error: updateUserError } = await supabase.auth.updateUser(
    { email: parsedData.emailAddress },
    // TODO: Change url in prod
    { emailRedirectTo: "http://localhost:3000/dashboard/account" }
  );

  if (updateUserError) return { success: false, msg: updateUserError.message };
};

export const sendPasswordResetLink = async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser();

  if (!user) return { success: false, msg: "Unauthorized access." };
  else if (getUserError) return { success: false, msg: getUserError.message };

  const { error: updateUserError } = await supabase.auth.resetPasswordForEmail(user.email!, {
    // TODO: Change url in prod
    redirectTo: "http://localhost:3000/reset-password",
  });

  if (updateUserError) return { success: false, msg: updateUserError.message };
};

export const resetPassword = async (data: z.infer<typeof passwordSchema>) => {
  const supabase = await createClient();

  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser();

  if (!user) return { success: false, msg: "Unauthorized access." };
  else if (getUserError) return { success: false, msg: getUserError.message };

  let parsedData;

  try {
    parsedData = passwordSchema.parse(data);
  } catch (err) {
    return { success: false, msg: "Data couldn't be parsed. Check field values." };
  }

  const { error: updateUserError } = await supabase.auth.updateUser({
    password: parsedData.newPassword,
  });

  if (updateUserError) return { success: false, msg: updateUserError.message };
};

export const deleteAccount = async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser();

  if (!user) return { success: false, msg: "Unauthorized access." };
  else if (getUserError) return { success: false, msg: getUserError.message };

  console.log(user);

  const { error: deleteUserError } = await supabaseAdmin.auth.admin.deleteUser(user.id);

  if (deleteUserError) return { success: false, msg: deleteUserError.message };
};
