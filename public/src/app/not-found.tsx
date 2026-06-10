import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="eyebrow mb-6">404</div>
        <h1 className="font-display text-6xl font-light">Page not found</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block border-b border-gold pb-1 text-sm uppercase tracking-[0.3em] text-gold"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
