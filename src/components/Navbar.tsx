import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto mt-3 max-w-7xl px-4">
        <nav className="glass flex items-center justify-between rounded-2xl px-4 py-3">
          <Link to="/"><Logo /></Link>
          <div className="hidden items-center gap-8 text-sm text-secondary-foreground md:flex">
            <a href="/#features" className="hover:text-white">Features</a>
            <a href="/#how" className="hover:text-white">How it works</a>
            <Link to="/pricing" className="hover:text-white">Pricing</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link to="/tool">Login</Link>
            </Button>
            <Button asChild size="sm" className="bg-brand-gradient text-white border-0 hover:opacity-90 shadow-glow">
              <Link to="/tool">Get Started</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
