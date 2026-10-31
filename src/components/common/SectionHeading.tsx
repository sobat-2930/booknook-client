interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
      {subtitle && (
        <p className={`mt-3 max-w-2xl text-muted-foreground ${center ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}