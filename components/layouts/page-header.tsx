import { cn } from '@/lib/utils';
import { Balancer } from 'react-wrap-balancer';
import { TypographyH1, TypographyLead } from '../ui/typography';

export function PageHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section className={cn('flex max-w-[980px] flex-col items-start gap-2 pt-8 md:pt-12', className)} {...props} />
  );
}

export function PageHeaderHeading(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <TypographyH1 {...props} />;
}

export function PageHeaderDescription({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <TypographyLead>
      <Balancer className={cn('max-w-[750px]', className)} {...props} />
    </TypographyLead>
  );
}
