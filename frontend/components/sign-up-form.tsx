"use client";

import Link from "next/link";
import { actions } from "@/actions";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { type FormState } from "@/validations/auth";
import { FormError } from "./form-error";

const styles = {
  container: "w-full max-w-md",
  header: "space-y-1",
  title: "text-3xl font-bold text-pink-500",
  content: "space-y-4",
  fieldGroup: "space-y-2",
  footer: "flex flex-col",
  button: "w-full",
  prompt: "mt-4 text-center text-sm",
  link: "ml-2 text-pink-500",
};

const INITIAL_STATE: FormState = {
  success: false,
  message: undefined,
  strapiErrors: null,
  zodErrors: null,
  data: {
    username: '',
    email: '',
    password: '',
  },
}


export function SignupForm() {
  const [state, formAction] = useActionState(actions.auth.resgisterUserAction, INITIAL_STATE);
  return (
    <div className={styles.container}>
      <form action={formAction}>
        <Card>
          <CardHeader className={styles.header}>
            <CardTitle className={styles.title}>Sign Up</CardTitle>
            <CardDescription>
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent className={styles.content}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="username"
                defaultValue={state.data?.username ?? ''}
              />       
              <FormError error={state.zodErrors?.username} />     
            </div>
            <div className={styles.fieldGroup}>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                defaultValue={state.data?.email ?? ''}
              />
              <FormError error={state.zodErrors?.email} />
            </div>
            <div className={styles.fieldGroup}>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
                defaultValue={state.data?.password ?? ''}
              />
              <FormError error={state.zodErrors?.password} />
            </div>
          </CardContent>
          <CardFooter className={styles.footer}>
            <Button className={styles.button}>Sign Up</Button>
            {state.strapiErrors && (
              <div className="mt-4 text-red-500">
                {state.strapiErrors.message || "An error occurred during registration."}
              </div>
            )}
          </CardFooter>
        </Card>
        <div className={styles.prompt}>
          Have an account?
          <Link className={styles.link} href="signin">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}