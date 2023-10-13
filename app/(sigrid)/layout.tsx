import { StudentAuthProvider } from "@/components/providers/auth-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <StudentAuthProvider>{children}</StudentAuthProvider>;
}
