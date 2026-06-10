import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ink border-t border-border">
      <div className="container-luxe py-20 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="font-display text-3xl">House of Shakya<span className="text-gold">.</span></div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Premium interior design and turnkey construction. Built without chaos —
            where design matches reality.
          </p>
        </div>
        <div>
          <div className="eyebrow mb-4">Navigate</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li><Link href="/projects" className="hover:text-gold">Projects</Link></li>
            <li><Link href="/about" className="hover:text-gold">Studio</Link></li>
            <li><Link href="/team" className="hover:text-gold">Team</Link></li>
            <li><Link href="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-4">Studio</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Lalitpur, Nepal</li>
            <li>hello@houseofshakya.com</li>
            <li>+977 98XXXXXXXX</li>
            <li><a href="https://wa.me/9779800000000" className="hover:text-gold">WhatsApp</a></li>
          </ul>
        </div>
      </div>
      <div className="container-luxe py-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
        <span>© {new Date().getFullYear()} House of Shakya</span>
        <span>Designed &amp; Developed by Tech Nirvana</span>
      </div>
    </footer>
  );
}
