"use server";

import { emailAddressSchema, profileInformationSchema } from "@/lib/schemas";
import { createClient } from "@/lib/utils/supabase/server";
import { z } from "zod";

export const updateProfileInformation = async (
  profileInformation: z.infer<typeof profileInformationSchema>
) => {
  const supabase = await createClient();

  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser();

  if (!user) return { success: false, msg: "Unauthorized access to private route." };
  else if (getUserError) return { success: false, msg: getUserError.message };

  const { error: updateUserError } = await supabase.auth.updateUser({
    data: { firstName: profileInformation.firstName, lastName: profileInformation.lastName },
  });

  if (updateUserError) return { success: false, msg: updateUserError.message };
};

export const changeEmailAddress = async (emailAddress: z.infer<typeof emailAddressSchema>) => {
  const supabase = await createClient();

  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser();

  if (!user) return { success: false, msg: "Unauthorized access to private route." };
  else if (getUserError) return { success: false, msg: getUserError.message };

  const { error: updateUserError } = await supabase.auth.updateUser(
    { email: emailAddress.emailAddress },
    { emailRedirectTo: "http://localhost:3000/dashboard/account" }
  );

  if (updateUserError) return { success: false, msg: updateUserError.message };
};
