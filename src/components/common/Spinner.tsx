export default function Spinner({ label = "Loading books..." }: { label?: string }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-primary" />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}