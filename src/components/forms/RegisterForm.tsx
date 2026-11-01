"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, signUp } from "@/lib/auth-client";
import { safeRedirect } from "@/lib/redirect";

interface Rule {
  label: string;
  test: (p: string) => boolean;
}

const rules: Rule[] = [
  { label: "At least 6 characters", test: (p) => p.length >= 6 },
  { label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p) => /[a-z]/.test(p) },
];

export default function RegisterForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = safeRedirect(params.get("redirect"));

  const [password, setPassword] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name"));
    const email = String(fd.get("email"));
    const photo = String(fd.get("photo") ?? "").trim();

    const failed = rules.find((r) => !r.test(password));
    if (failed) {
      toast.error(`Invalid password: ${failed.label.toLowerCase()} is required.`);
      return;
    }

    setLoading(true);
    const { error } = await signUp.email({
      name,
      email,
      password,
      image: photo || undefined,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Registration failed. Please try again.");
      return;
    }

    toast.success("Account created! Please log in.");
    router.push(`/login?redirect=${encodeURIComponent(redirectTo)}`);
  };

  const handleGoogle = async () => {
    const { error } = await signIn.social({ provider: "google", callbackURL: redirectTo });
    if (error) toast.error(error.message || "Google sign up failed. Please try again.");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required placeholder="Your full name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required placeholder="you@example.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="photo">Photo URL</Label>
        <Input id="photo" name="photo" type="url" placeholder="https://example.com/me.jpg" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Create a password"
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

        {password.length > 0 && (
          <ul className="space-y-1 pt-1 text-xs">
            {rules.map((r) => {
              const ok = r.test(password);
              return (
                <li
                  key={r.label}
                  className={`flex items-center gap-2 ${ok ? "text-secondary" : "text-destructive"}`}
                >
                  {ok ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                  {r.label}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <Button type="submit" size="lg" disabled={loading} className="w-full rounded-full">
        {loading ? "Creating account..." : "Register"}
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
        Already have an account?{" "}
        <Link
          href={`/login?redirect=${encodeURIComponent(redirectTo)}`}
          className="font-semibold text-primary hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
}