import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaXTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa6";
import Logo from "@/components/common/Logo";

const socials = [
  { icon: FaXTwitter, href: "https://x.com", label: "X" },
  { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaGithub, href: "https://github.com", label: "GitHub" },
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
          <ul className="space-y-3 text-sm opacity-80">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@booknook.app</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +880 1700-000000</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> 12 Reading Lane, Book City</li>
          </ul>
          <div className="mt-5 flex gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-secondary-foreground/30 transition hover:bg-accent hover:text-accent-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
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