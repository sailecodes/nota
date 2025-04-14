import { z } from "zod";

export const signUpSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Please provide an email address" })
    .email({ message: "Please provide a valid email address" }),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().nonempty({ message: "Please provide a first name" }),
  lastName: z.string().nonempty({ message: "Please provide a last name" }),
});

export const signInSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Please provide an email address" })
    .email({ message: "Please provide a valid email address" }),
  password: z.string().nonempty("Please provide a password"),
});

export const profileInformationSchema = z.object({
  firstName: z.string().nonempty({ message: "First name cannot be blank" }),
  lastName: z.string().nonempty({ message: "Last name cannot be blank" }),
});

export const emailAddressSchema = z.object({
  emailAddress: z.string().email({ message: "Must be a valid email" }),
});

export const passwordSchema = z.object({
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

export const geminiResponseSchema = z.object({
  summary: z.string(),
  actionItems: z.array(
    z.object({
      action: z.string(),
      assignee: z.string().optional(),
      dueDate: z.string().optional(),
    })
  ),
});

export const actionItemSchema = z.object({
  actionItems: z.array(
    z.object({
      action: z.string(),
      assignee: z.string().optional(),
      dueDate: z.string().optional(),
    })
  ),
});
