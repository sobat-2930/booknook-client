"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Spinner from "@/components/common/Spinner";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only redirect after the session check has finished (so reload is safe)
    if (!isPending && !session) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isPending, session, pathname, router]);

  if (isPending || !session) {
    return <Spinner label="Checking your session..." />;
  }

  return <>{children}</>;
}