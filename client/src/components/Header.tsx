import { Link } from "wouter";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2">
              <img src="/assets/logo.webp" alt="Classic Fashion Show" className="h-12" />
            </div>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/#schedule">
              <span className="hover:text-primary transition-colors">Schedule</span>
            </Link>
            <Link href="/#tickets">
              <span className="hover:text-primary transition-colors">Tickets</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
