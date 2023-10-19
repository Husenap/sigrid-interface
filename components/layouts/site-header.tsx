import MainNav from '@/components/layouts/main-nav';
import MobileNav from '@/components/layouts/mobile-nav';
import { ThemeToggle } from '@/components/theme-toggle';

export default async function SiteHeader() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center gap-4">
        <MainNav />
        <MobileNav />

        <div className="flex flex-1 items-center justify-end">
          <nav className="flex items-center gap-2">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
