"use server";

import prisma from "@/lib/prisma";
import { DueStatus } from "@/app/generated/prisma";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateDueStatus(id: string) {
  const { error } = await (await createClient()).auth.getUser();

  if (error) return { error: "Session error or user not found" };

  const actionItem = await prisma.actionItem.findUnique({
    where: {
      id,
    },
  });

  if (!actionItem) return { error: "Action item does not exist" };

  // FIXME: Temporary fix. Should update to previous status, not TBD.
  //        Or give user the option to choose.
  if (actionItem.dueStatus === DueStatus.COMPLETED)
    await prisma.actionItem.update({ where: { id }, data: { dueStatus: DueStatus.TBD } });
  else await prisma.actionItem.update({ where: { id }, data: { dueStatus: DueStatus.COMPLETED } });

  revalidatePath("/dashboard/meetings");
  revalidatePath(`/dashboard/meetings/meeting/${id}`);
}
