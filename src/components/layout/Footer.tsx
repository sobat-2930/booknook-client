import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaXTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa6";
import Logo from "@/components/common/Logo";

const socials = [
  { icon: FaXTwitter, label: "X" },
  { icon: FaFacebookF, label: "Facebook" },
  { icon: FaInstagram, label: "Instagram" },
  { icon: FaGithub, label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="mt-24 bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <div className="[&_span]:text-secondary-foreground [&_span_span]:text-accent">
            <Logo />
          </div>
          <p className="mt-4 max-w-xs text-sm opacity-80">
            A cozy little library on the web. Add a book, borrow a book, return a book.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold">Explore</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/books">All Books</Link></li>
            <li><Link href="/add-book">Add Book</Link></li>
            <li><Link href="/my-borrows">My Borrows</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold">Contact</h3>
          <ul className="pointer-events-none cursor-default select-none space-y-3 text-sm opacity-80">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@booknook.app</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +880 1700-000000</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> 12 Reading Lane, Book City</li>
          </ul>

          {/* Social icons: display only, not clickable */}
          <div className="pointer-events-none mt-5 flex cursor-default select-none gap-3">
            {socials.map(({ icon: Icon, label }) => (
              <span
                key={label}
                aria-label={label}
                role="img"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-secondary-foreground/30"
              >
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-secondary-foreground/20 py-5 text-center text-xs opacity-70">
        © {new Date().getFullYear()} BookNook. All rights reserved.
      </div>
    </footer>
  );
}