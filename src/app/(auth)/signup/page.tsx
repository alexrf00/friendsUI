import { SignupForm } from '@/features/auth/components/SignupForm'
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-sm text-slate-500">Enter your information to create an account</p>
        </div>

        <SignupForm />

        <div className="text-center text-sm">
          <p className="text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Login
            </Link>
          </p>
        </div>

        <div className="flex justify-center">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
