import { Link } from "wouter";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          <Link href="/">
            <img 
              src="/assets/logo.webp" 
              alt="Classic Fashion Show" 
              className="h-16 w-auto object-contain"
            />
          </Link>
          <Link href="/#tickets">
            <span className="text-white hover:text-white/80 transition-colors font-semibold border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              Book Tickets
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
