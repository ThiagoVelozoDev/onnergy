import { useState, type FormEvent } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useSeo } from "@/hooks/useSeo";

interface LocationState {
  from?: { pathname: string };
}

export default function LoginPage() {
  useSeo({ title: "Login | ONNERGY Admin" });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { session, loading, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!loading && session) {
    const redirectTo = (location.state as LocationState | null)?.from?.pathname ?? "/admin/dashboard";
    return <Navigate to={redirectTo} replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signIn(email, password);
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "E-mail ou senha inválidos.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-950 px-4">
      <Card className="w-full max-w-sm p-8">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-center text-lg font-bold text-paper">Acesso administrativo</h1>
        <p className="mt-1 text-center text-xs text-white/50">Entre com suas credenciais para continuar.</p>

        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <Input
            label="E-mail"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <Input
            label="Senha"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error && <p className="text-xs text-red-400">{error}</p>}

          <Button type="submit" size="lg" className="mt-2 w-full" disabled={submitting}>
            <LogIn className="h-4 w-4" aria-hidden="true" />
            {submitting ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
