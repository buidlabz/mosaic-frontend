"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/components/auth-provider"

interface LoginFormProps extends React.ComponentProps<"form"> {
  title?: string;
  role?: "user" | "institution" | "admin";
}

export function LoginForm({
  className,
  title = "Login to your account",
  role,
  ...props
}: LoginFormProps) {
  const { login, forgotPassword, verifyResetOtp, resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"login" | "forgot" | "otp" | "reset">("login");
  const [message, setMessage] = useState<string | null>(null);
  const [resetEmail, setResetEmail] = useState("");
  const [resetOtp, setResetOtp] = useState("");
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await login({ email, password });
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("resetEmail") || "");

    try {
      const responseMessage = await forgotPassword({ email });
      setResetEmail(email);
      setMessage(responseMessage);
      setMode("otp");
    } catch (err: any) {
      setError(err.message || "Unable to send reset code.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyResetOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await verifyResetOtp({
        email: resetEmail,
        otp: resetOtp,
      });
      setResetToken(response.resetToken);
      setMessage(response.message);
      setMode("reset");
    } catch (err: any) {
      setError(err.message || "Invalid reset code.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (!resetToken) {
      setError("Missing reset token. Restart the reset flow.");
      setLoading(false);
      return;
    }

    try {
      const responseMessage = await resetPassword({
        resetToken,
        newPassword,
      });
      setMessage(responseMessage);
      setMode("login");
      setResetOtp("");
      setResetToken(null);
      setNewPassword("");
    } catch (err: any) {
      setError(err.message || "Unable to reset password.");
    } finally {
      setLoading(false);
    }
  };

  if (mode === "forgot") {
    return (
      <form className={cn("flex flex-col gap-6", className)} onSubmit={handleForgotPassword} {...props}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Forgot Password</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your email to receive a password reset code.
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-[#00FF00]/10 border border-[#00FF00]/40 text-[#00FF00] text-sm p-3 rounded-lg text-center">
              {message}
            </div>
          )}

          <Field>
            <FieldLabel htmlFor="resetEmail">Email</FieldLabel>
            <Input id="resetEmail" name="resetEmail" type="email" placeholder="m@example.com" required />
          </Field>

          <Field>
            <Button type="submit" disabled={loading}>
              {loading ? "Sending Code..." : "Send Reset Code"}
            </Button>
          </Field>

          <Field>
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError(null);
                setMessage(null);
              }}
              className="text-center text-sm underline underline-offset-4"
            >
              Back to login
            </button>
          </Field>
        </FieldGroup>
      </form>
    );
  }

  if (mode === "otp") {
    return (
      <form className={cn("flex flex-col gap-6", className)} onSubmit={handleVerifyResetOtp} {...props}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Enter Reset Code</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter the 6-digit code sent to {resetEmail}.
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-[#00FF00]/10 border border-[#00FF00]/40 text-[#00FF00] text-sm p-3 rounded-lg text-center">
              {message}
            </div>
          )}

          <Field>
            <FieldLabel htmlFor="otp">Reset Code</FieldLabel>
            <Input
              id="otp"
              name="otp"
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="123456"
              autoComplete="one-time-code"
              value={resetOtp}
              onChange={(event) => setResetOtp(event.target.value.replace(/\D/g, ""))}
              required
            />
          </Field>

          <Field>
            <Button type="submit" disabled={loading || resetOtp.length !== 6}>
              {loading ? "Verifying..." : "Verify Code"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    );
  }

  if (mode === "reset") {
    return (
      <form className={cn("flex flex-col gap-6", className)} onSubmit={handleResetPassword} {...props}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Set New Password</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Choose a new password for your account.
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-[#00FF00]/10 border border-[#00FF00]/40 text-[#00FF00] text-sm p-3 rounded-lg text-center">
              {message}
            </div>
          )}

          <Field>
            <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              required
            />
            <FieldDescription>
              Must be at least 6 characters long.
            </FieldDescription>
          </Field>

          <Field>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Reset Password"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    );
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        {role && <input type="hidden" name="role" value={role} />}
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg text-center">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-[#00FF00]/10 border border-[#00FF00]/40 text-[#00FF00] text-sm p-3 rounded-lg text-center">
            {message}
          </div>
        )}

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" name="email" type="email" placeholder="m@example.com" required />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                setMode("forgot");
                setError(null);
                setMessage(null);
              }}
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" name="password" type="password" required />
        </Field>
        <Field>
          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Field>
        <Field>
          <div className="text-center text-sm">
            Don&apos;t have an account? <Link href="/signup" className="underline underline-offset-4">Sign up</Link>
          </div>
        </Field>
      </FieldGroup>
    </form>
  )
}
