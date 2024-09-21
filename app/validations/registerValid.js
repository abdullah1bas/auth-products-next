import z from "zod";

// تعريف مخطط باستخدام Zod
export const signupSchema = z
  .object({
    first_name: z.string().min(3, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email({ message: "Not Valid Email" })
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Email does not match the required pattern"
      ),
    password: z
      .string()
      .min(6, { message: "password must be at least 6 characters" }),
    confirm_password: z
      .string()
      .min(6, { message: "confirm password must be at least 6 characters" }),
  })
  // refine de func bta5od callback func btrg3le al data obj.form.data
  .refine((data) => data.password === data.confirm_password, {
    // if condition lw mtnfzsh tl3le al mess de we mkan al input path
    message: "passwords don`t match",
    path: ["confirm_password"],
  });
