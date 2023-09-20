import { z } from "zod";

export const registerSchema = z.object({
  id: z.number({
    required_error: "Id is required",
  }),
  name: z.string({
    required_error: "name is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be a least 6 characters",
    })
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be a least 6 characters",
    }),
});
