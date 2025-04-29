import { DueStatus, Prisma, ProcessStatus, User } from "@/app/generated/prisma";
import { User as SbUser } from "@supabase/supabase-js";

export interface IRecentUploadsCardProps {
  user: Prisma.UserGetPayload<{ include: { uploads: true; actionItems: true } }> | null;
}

export interface IActionItemsCardProps extends IRecentUploadsCardProps {}

export interface IMonthlyUsageCardProps extends IRecentUploadsCardProps {}

export interface IMeetingCardSkeletonProps {
  title: string;
  processStatus: ProcessStatus;
  uploader: string;
  createdAt: Date;
}

export interface IMeetingCardProps {
  title: string;
  processStatus: ProcessStatus;
  uploader: string;
  createdAt: Date;
  summary: string;
  actionItemsNum: number;
  meetingId: string;
}

export interface IMeetingProps {
  params: Promise<{ meetingId: string }>;
}

export interface ActionItemSnippetProps {
  id: string;
  action: string;
  dueDate: Date | null;
  assignee: User | null;
  dueStatus: DueStatus;
}

export interface IEmailAddressProps {
  user: SbUser;
}

export interface IPasswordProps {
  user: SbUser;
}

export interface IPricingCardProps {
  title: string;
  description: string;
  pricing: string;
  btnText: string;
  features: string[];
}
