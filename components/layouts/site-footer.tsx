import Link from 'next/link';
import { TypographyH2 } from '../ui/typography';

export default async function SiteFooter() {
  return (
    <footer className="container gap-4 py-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <TypographyH2 className="border-none">Länkar</TypographyH2>
          <Link href="http://bjornix.cs.lth.se:8091/sigrid">Sigrid</Link>
        </div>
      </div>
    </footer>
  );
}
