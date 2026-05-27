import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy-deep flex items-center justify-center px-6 text-center">
      <div>
        <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">404</p>
        <h1 className="text-4xl md:text-5xl font-semibold text-cream mb-4">Page Not Found</h1>
        <p className="text-cream/50 mb-8 text-sm">The page you're looking for doesn't exist or has been moved.</p>
        <Link href="/" className="inline-block px-6 py-3 text-sm font-semibold rounded bg-forest text-cream hover:bg-forest-deep transition-all duration-200">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
