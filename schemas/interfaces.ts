import { IRecentUploadsCardProps } from "./interfaces";
import { DueStatus, Prisma, ProcessStatus, RoleType, User } from "@/app/generated/prisma";
import { EDueStatus, EProcessStatus, ERoleType, ESubscription } from "@/utils/enum";

// export interface IUser {
//   id: string;
//   sbId: string;
//   username: string;
//   firstName: string;
//   lastName: string;
//   teams?: ITeam[];
//   roles?: IRole[];
//   uploads?: IUpload[];
//   totalMonthlyUploads: number;
//   actionItems?: IActionItem[];
//   subscription: ESubscription;
//   createdAt: Date;
//   updatedAt: Date;
// }

// // TODO: Future ftr
// export interface ITeam {
//   id: string;
//   name: string;
//   organization?: string;
//   members?: IUser[];
//   roles?: IRole[];
//   uploads?: IUpload[];
//   createdAt: Date;
//   updatedAt: Date;
// }

// // TODO: Future ftr
// export interface IRole {
//   id: string;
//   user?: IUser;
//   userId?: string;
//   type: RoleType;
//   team?: ITeam;
//   teamId?: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface IUpload {
//   id: string;
//   title: string;
//   fileUrl: string;
//   processStatus: ProcessStatus;
//   result?: IResult;
//   uploader?: IUser;
//   uploaderId?: string;
//   team?: ITeam | undefined;
//   teamId?: string | undefined;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface IResult {
//   id: string;
//   summary: string;
//   transcript: string;
//   insights: string[];
//   actionItems?: IActionItem[];
//   upload?: IUpload;
//   uploadId?: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface IActionItem {
//   id: string;
//   action: string;
//   assignee?: IUser;
//   assigneeId?: string;
//   dueDate?: Date;
//   dueStatus: DueStatus;
//   result?: IResult;
//   resultId?: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

export interface IRecentUploadsCardProps {
  user: Prisma.UserGetPayload<{ include: { uploads: true; actionItems: true } }> | null;
}

export interface IActionItemsCardProps extends IRecentUploadsCardProps {}

export interface IMonthlyUsageCardProps extends IRecentUploadsCardProps {}

export interface IMeetingCardSkeletonProps {
  title: string;
  processStatus: ProcessStatus;
  uploader: string;
  dateUploaded: Date;
}

export interface IMeetingCardProps {
  title: string;
  processStatus: ProcessStatus;
  uploader: string;
  dateUploaded: Date;
  summary: string;
  numOfActionItems: number;
  meetingId: string;
}
