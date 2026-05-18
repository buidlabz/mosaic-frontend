import Image from "next/image"
import { GalleryVerticalEnd } from "lucide-react"

import { SignupVerificationForm } from "@/components/signup-verification-form"

export default function SignupVerificationPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Mosaic Africa
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupVerificationForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/login.avif"
          alt="Image"
          fill
          sizes="50vw"
          className="object-cover dark:brightness-[0.5]"
        />
      </div>
    </div>
  )
}
