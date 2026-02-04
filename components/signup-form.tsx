"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/components/auth-provider"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { registerUser, registerInstitution } = useAuth();
  const [role, setRole] = useState<string>("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      if (role === "institution") {
        await registerInstitution({
            ...data,
            institutionName: data.institutionName || data.name // Fallback if not provided
        });
      } else {
        await registerUser(data);
      }
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Join Mosaic Africa</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Sign up to access crypto credit scores and seamless swaps.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg text-center">
            {error}
          </div>
        )}

        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input id="name" name="name" type="text" placeholder="John Doe" required />
        </Field>
        
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" name="email" type="email" placeholder="m@example.com" required />
        </Field>

        <Field>
          <FieldLabel htmlFor="role">I am a...</FieldLabel>
          <Select defaultValue="user" onValueChange={(val) => setRole(val || "user")}>
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">User (Client)</SelectItem>
              <SelectItem value="institution">Institution</SelectItem>
            </SelectContent>
          </Select>
          <input type="hidden" name="role" value={role} />
        </Field>

        {role === "institution" && (
          <Field>
            <FieldLabel htmlFor="institutionName">Institution Name</FieldLabel>
            <Input id="institutionName" name="institutionName" type="text" placeholder="My DeFi Protocol" required />
          </Field>
        )}

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" name="password" type="password" required />
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>

        <Field>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </Field>

        <Field>
           <div className="text-center text-sm">
            Already have an account? <Link href="/login/user" className="underline underline-offset-4">Sign in</Link>
           </div>
        </Field>
      </FieldGroup>
    </form>
  )
}

