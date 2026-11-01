"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "@/lib/auth-client";

export default function ProfileCard() {
  const { data: session } = useSession();
  const user = session?.user;
  if (!user) return null;

  return (
    <div className="w-full -rotate-1 rounded-2xl border-2 border-foreground/70 bg-card p-8 text-center shadow-xl">
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
        Member Card
      </p>
      <Avatar className="mx-auto mt-5 h-24 w-24 border-4 border-primary">
        <AvatarImage src={user.image ?? undefined} alt={user.name} />
        <AvatarFallback className="text-3xl">{user.name?.[0]?.toUpperCase() ?? "U"}</AvatarFallback>
      </Avatar>
      <h1 className="mt-5 text-3xl font-bold">{user.name}</h1>
      <p className="mt-1 text-muted-foreground">{user.email}</p>
    </div>
  );
}