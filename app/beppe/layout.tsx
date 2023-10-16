import { SupervisorAuthProvider } from '@/components/providers/supervisor-auth-provider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SupervisorAuthProvider>{children}</SupervisorAuthProvider>;
}
