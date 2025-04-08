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
    error,
  } = await supabase.auth.getUser();

  if (!user) return { success: false, msg: "Unauthorized access to private route." };
  else if (error) return { success: false, msg: error?.message };

  await supabase.auth.updateUser({
    data: { firstName: profileInformation.firstName, lastName: profileInformation.lastName },
  });
};

export const changeEmailAddress = async (data: z.infer<typeof emailAddressSchema>) => {};
