import type { Metadata } from "next";
import { Suspense } from "react";
import AuthShell from "@/components/forms/AuthShell";
import RegisterForm from "@/components/forms/RegisterForm";
import Spinner from "@/components/common/Spinner";

export const metadata: Metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <AuthShell title="Join BookNook" subtitle="Create your free account in a minute.">
      <Suspense fallback={<Spinner label="Loading..." />}>
        <RegisterForm />
      </Suspense>
    </AuthShell>
  );
}