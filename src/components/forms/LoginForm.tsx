"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth-client";
import { safeRedirect } from "@/lib/redirect";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = safeRedirect(params.get("redirect"));

  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email"));
    const password = String(fd.get("password"));

    setLoading(true);
    const { error } = await signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Login failed. Please check your email and password.");
      return;
    }

    toast.success("Welcome back to BookNook!");
    router.push(redirectTo);
    router.refresh();
  };

  const handleGoogle = async () => {
    const { error } = await signIn.social({ provider: "google", callbackURL: redirectTo });
    if (error) toast.error(error.message || "Google login failed. Please try again.");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required placeholder="you@example.com" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <button
            type="button"
            onClick={() => toast.info("Password reset is not available yet.")}
            className="text-xs text-primary hover:underline"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={show ? "text" : "password"}
            required
            placeholder="Your password"
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label="Toggle password visibility"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <Button type="submit" size="lg" disabled={loading} className="w-full rounded-full">
        {loading ? "Logging in..." : "Login"}
      </Button>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>

      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={handleGoogle}
        className="w-full rounded-full"
      >
        <FcGoogle className="mr-2 h-5 w-5" /> Continue with Google
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        New to BookNook?{" "}
        <Link
          href={`/register?redirect=${encodeURIComponent(redirectTo)}`}
          className="font-semibold text-primary hover:underline"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}