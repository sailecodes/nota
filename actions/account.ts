"use server";

import { profileInformationSchema, emailAddressSchema } from "@/lib/zodSchemas";
// import { auth, clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

export const updateProfileInformation = async (
  data: z.infer<typeof profileInformationSchema>
) => {};

export const changeEmailAddress = async (data: z.infer<typeof emailAddressSchema>) => {};
