import { Link } from "wouter";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          <Link href="/">
            <img 
              src="/assets/logo.svg" 
              alt="Classic Fashion Show" 
              className="h-12"
            />
          </Link>
          <Link href="/#tickets">
            <span className="text-primary hover:text-primary/80 transition-colors font-semibold">
              Book Tickets
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}