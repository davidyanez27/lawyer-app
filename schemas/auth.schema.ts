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


export const documentSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    }),
  age_pronoun: z
    .string({
      required_error: "Age pronoun is required",
    }), 
    marital_status: z
    .string({
      required_error: "marital status is required",
    }), 
    nationality: z
    .string({
      required_error: "Nationality is required",
    }), 
    address: z
    .string({
      required_error: "Address is required",
    }),
    id: z
    .string({
      required_error: "Id is required",
    }),
    templateName: z
    .string({
      required_error: "templateName is required",
    }),
});


