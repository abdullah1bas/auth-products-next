import { z } from "zod";

// تعريف مخطط باستخدام Zod
export const loginSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email({ message: "Not Valid Email" }),
    password: z
      .string()
      .min(6, { message: "password must be at least 6 characters" }),
    remember: z.boolean(),
  })
  // refine de func bta5od callback func btrg3le al data obj.form.data
  // .refine(
  //   (data) => {
  //     if (!data.remember) {
  //       localStorage.removeItem("password");
  //       localStorage.removeItem("email");
  //     }
  //   },
  //   { path: ["remember"] }
  // );
