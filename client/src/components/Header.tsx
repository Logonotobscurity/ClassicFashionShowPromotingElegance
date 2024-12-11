import { Link } from "wouter";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-center">
          <Link href="/">
            <img 
              src="/assets/logo.webp" 
              alt="Classic Fashion Show" 
              className="h-16 w-auto object-contain"
            />
          </Link>
        </nav>
      </div>
    </header>
  );
}
