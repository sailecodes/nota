"use server";

import { userInformationSchema } from "@/lib/zodSchemas";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const updateUserInformation = async (data: z.infer<typeof userInformationSchema>) => {
  const { userId } = await auth();

  // TODO: Add better error statement
  if (!userId) throw new Error("Unauthorized access");

  const { firstName, lastName, username } = userInformationSchema.parse(data);

  await (await clerkClient()).users.updateUser(userId, { firstName, lastName, username });

  revalidatePath("/dashboard/account");
};
