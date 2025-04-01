import { z } from "zod";

export const userInformationSchema = z.object({
  firstName: z.string().nonempty({ message: "First name cannot be blank" }),
  lastName: z.string().nonempty({ message: "Last name cannot be blank" }),
  username: z.string().nonempty({ message: "Username cannot be blank" }),
});

export const userEmailSchema = z.object({
  emailAddress: z.string().email({ message: "Must be a valid email " }),
});
