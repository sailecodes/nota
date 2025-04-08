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
