import type { Metadata } from "next";
import { Suspense } from "react";
import AuthShell from "@/components/forms/AuthShell";
import LoginForm from "@/components/forms/LoginForm";
import Spinner from "@/components/common/Spinner";

export const metadata: Metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <AuthShell title="Welcome back" subtitle="Log in to borrow books and manage your shelf.">
      <Suspense fallback={<Spinner label="Loading..." />}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}