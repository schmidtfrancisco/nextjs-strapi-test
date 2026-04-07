"use server";

import { registerUserService } from "@/lib/strapi";
import { SignupFormSchema, type FormState } from "@/validations/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const cookieConfig = {
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: "/",
  httpOnly: true,
  domain: process.env.HOST ?? "localhost",
  secure: process.env.NODE_ENV === "production",
}


export async function resgisterUserAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const fields = {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
    email: formData.get("email") as string,
  }

  const validatedFields = SignupFormSchema.safeParse(fields);

  if (!validatedFields.success) {
    const flattenedErrors = z.flattenError(validatedFields.error);

    console.log("Validation errors:", flattenedErrors.fieldErrors);

    return {
      success: false,
      message: "Validation failed",
      strapiErrors: null,
      zodErrors: flattenedErrors.fieldErrors,
      data: fields,
    }
  }

  const response = await registerUserService(validatedFields.data);

  if (!response || response.error) {
    console.error("Strapi error:", response?.error);
    return {
      success: false,
      message: response?.error?.message || "Registration failed",
      strapiErrors: response?.error,
      zodErrors: null,
      data: fields,
    }
  }

  const cookiesStore = await cookies();
  cookiesStore.set('jwt', response.jwt, cookieConfig);
  redirect("/dashboard");
}