"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  clearSignupVerificationSession,
  readSignupVerificationSession,
  SignupVerificationSession,
} from "@/lib/signup-verification"

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback
}

export function SignupVerificationForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { verifySignupOtp } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [otp, setOtp] = useState("")
  const [session, setSession] = useState<SignupVerificationSession | null | undefined>(undefined)

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setSession(readSignupVerificationSession())
    })

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [])

  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!session?.userId) {
      setError("Missing signup session. Please sign up again.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      await verifySignupOtp({
        userId: session.userId,
        otp,
      })
      clearSignupVerificationSession()
      router.push("/dashboard/user")
    } catch (error: unknown) {
      setError(getErrorMessage(error, "OTP verification failed. Please try again."))
    } finally {
      setLoading(false)
    }
  }

  const handleBackToSignup = () => {
    clearSignupVerificationSession()
    setSession(null)
    router.push("/signup")
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleVerifyOtp} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Verify Your Email</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter the 6-digit code sent to {session?.email || "your email"}.
          </p>
        </div>

        {session?.message && (
          <div className="bg-[#00FF00]/10 border border-[#00FF00]/40 text-[#00FF00] text-sm p-3 rounded-lg text-center">
            {session.message}
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg text-center whitespace-pre-line">
            {error}
          </div>
        )}

        {session === null && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg text-center">
            Missing signup session. Please sign up again.
          </div>
        )}

        <Field>
          <FieldLabel htmlFor="otp">Verification Code</FieldLabel>
          <Input
            id="otp"
            name="otp"
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="123456"
            autoComplete="one-time-code"
            value={otp}
            onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))}
            required
          />
          <FieldDescription>
            The code expires in 10 minutes.
          </FieldDescription>
        </Field>

        <Field>
          <Button type="submit" disabled={loading || otp.length !== 6 || !session}>
            {loading ? "Verifying..." : "Verify Email"}
          </Button>
        </Field>

        <Field>
          <button
            type="button"
            onClick={handleBackToSignup}
            className="text-center text-sm underline underline-offset-4"
          >
            Back to sign up
          </button>
        </Field>

        <Field>
          <div className="text-center text-sm">
            Already verified?{" "}
            <Link href="/login/user" className="underline underline-offset-4">
              Sign in
            </Link>
          </div>
        </Field>
      </FieldGroup>
    </form>
  )
}
