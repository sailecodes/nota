"use server";

import { profileInformationSchema, emailAddressSchema } from "@/lib/zodSchemas";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

export const updateProfileInformation = async (data: z.infer<typeof profileInformationSchema>) => {
  const { userId } = await auth();

  // TODO: Add better error statement
  if (!userId) throw new Error("Unauthorized access");

  const { firstName, lastName, username } = profileInformationSchema.parse(data);

  await (await clerkClient()).users.updateUser(userId, { firstName, lastName, username });
};

export const changeEmailAddress = async (data: z.infer<typeof emailAddressSchema>) => {
  const { userId } = await auth();

  // TODO: Add better error statement
  if (!userId) throw new Error("Unauthorized access");

  const { emailAddress } = emailAddressSchema.parse(data);

  await (
    await clerkClient()
  ).emailAddresses.createEmailAddress({ userId, emailAddress, primary: false, verified: false });
};
