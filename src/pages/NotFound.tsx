import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { useSeo } from "@/hooks/useSeo";

export default function NotFound() {
  useSeo({ title: "Página não encontrada | ONNERGY" });

  return (
    <Container className="flex flex-col items-center justify-center gap-4 py-32 text-center">
      <span className="text-sm font-semibold uppercase tracking-widest text-gold">404</span>
      <h1 className="text-3xl font-bold">Página não encontrada</h1>
      <p className="max-w-md text-sm text-white/50">
        O conteúdo que você procura não existe ou foi movido.
      </p>
      <ButtonLink to="/" className="mt-4">
        Voltar para o início
      </ButtonLink>
    </Container>
  );
}
