import { z } from "zod";

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
