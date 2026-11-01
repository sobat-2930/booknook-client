import Logo from "@/components/common/Logo";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <section className="paper">
      <div className="mx-auto grid min-h-[80vh] max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2">
        {/* Left visual */}
        <div className="hidden md:block">
          <Logo />
          <h2 className="mt-8 text-5xl font-bold leading-tight">
            Every great story starts with a <span className="text-primary">library card.</span>
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Join BookNook to add your favourite books, borrow new ones, and keep track of what you are reading.
          </p>
          <div className="mt-10 w-64 -rotate-3 rounded-xl border-2 border-foreground/70 bg-card p-5 shadow-lg">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
              Member Card
            </p>
            <div className="mt-4 h-5 border-b border-dashed border-foreground/40" />
            <div className="mt-4 h-5 border-b border-dashed border-foreground/40" />
            <p className="mt-4 font-display text-sm font-bold tracking-widest text-primary">BOOKNOOK</p>
          </div>
        </div>

        {/* Form card */}
        <div className="w-full rounded-2xl border bg-card p-8 shadow-sm md:p-10">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="mt-1 mb-6 text-sm text-muted-foreground">{subtitle}</p>
          {children}
        </div>
      </div>
    </section>
  );
}