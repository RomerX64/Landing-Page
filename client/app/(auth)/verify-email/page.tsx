import VerifyEmail from "@/components/verifyEmail";

// Esto indica a Next.js que no intente prerendizar esta página
export const dynamic = "force-dynamic";

export default function VerifyEmailPage() {
  return <VerifyEmail />;
}
