"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "@/components/common/Logo";
import { signOut, useSession } from "@/lib/auth-client";
import ThemeToggle from "./ThemeToggle";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
];
const privateLinks = [
  { href: "/add-book", label: "Add Book" },
  { href: "/my-books", label: "My Books" },
  { href: "/my-borrows", label: "My Borrows" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const links = user ? [...publicLinks, ...privateLinks] : publicLinks;

  const linkClass = (href: string): string =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${
      pathname === href
        ? "bg-secondary text-secondary-foreground"
        : "text-foreground/70 hover:bg-muted hover:text-foreground"
    }`;

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("You have been logged out.");
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Logo />

        {/* Desktop links */}
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-full bg-muted" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full outline-none ring-primary focus-visible:ring-2">
                <Avatar className="h-9 w-9 border-2 border-primary">
                  <AvatarImage src={user.image ?? undefined} alt={user.name} />
                  <AvatarFallback>{user.name?.[0]?.toUpperCase() ?? "U"}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-destructive"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="rounded-full">
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="mt-10 flex flex-col gap-2 px-4">
                {links.map((l) => (
                  <Link key={l.href} href={l.href} className={linkClass(l.href)}>
                    {l.label}
                  </Link>
                ))}
                {!isPending && !user && (
                  <div className="mt-4 flex flex-col gap-2">
                    <Button asChild variant="outline" className="rounded-full">
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild className="rounded-full">
                      <Link href="/register">Register</Link>
                    </Button>
                  </div>
                )}
                {user && (
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="mt-4 rounded-full text-destructive"
                  >
                    Logout
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}