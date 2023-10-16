import { StudentAuthProvider } from '@/components/providers/student-auth-provider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <StudentAuthProvider>{children}</StudentAuthProvider>;
}
