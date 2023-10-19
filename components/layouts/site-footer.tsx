import Balancer from 'react-wrap-balancer';
import { TypographyH2, TypographyLead } from '../ui/typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Icons } from '@/components/icons';

export default async function SiteFooter() {
  return (
    <footer className="container gap-4 py-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <TypographyH2 className="border-none">Utveckling</TypographyH2>
          <TypographyLead className="pb-2">
            <Balancer>Följ utvecklingen på GitHub! Alla bidrag till förbättringar är mycket välkommna! 😊</Balancer>
          </TypographyLead>
          <Button asChild>
            <Link target="_blank" href="https://github.com/husenap/sigrid-interface">
              <Icons.gitHub className="mr-2 h-4 w-4" /> GitHub
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
