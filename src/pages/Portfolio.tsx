import { useEffect, useState } from "react";
import { Video } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { getIcon } from "@/components/icon-map";
import { Reveal } from "@/components/ui/Reveal";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import { usePortfolioCategories } from "@/hooks/usePortfolioCategories";
import { usePortfolioItems } from "@/hooks/usePortfolioItems";
import { useSeo } from "@/hooks/useSeo";
import { cn } from "@/lib/utils";

export default function Portfolio() {
  useSeo({
    title: "Portfólio | ONNERGY Engenharia Elétrica",
    description: "Fotos e vídeos dos nossos projetos em energia solar, QGBT, subestações, automação e muito mais.",
  });

  const { categories, loading: loadingCategories, error: categoriesError } = usePortfolioCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedCategoryId && categories.length > 0) {
      setSelectedCategoryId(categories[0].id);
    }
  }, [categories, selectedCategoryId]);

  const { items, loading: loadingItems, error: itemsError } = usePortfolioItems(selectedCategoryId);

  return (
    <>
      <PageHero
        eyebrow="Portfólio"
        title="Nosso trabalho em campo"
        description="Escolha uma categoria para ver fotos e vídeos reais dos projetos que já entregamos."
      />

      <section className="py-16">
        <Container>
          {loadingCategories && <LoadingState message="Carregando categorias..." />}
          {!loadingCategories && categoriesError && <ErrorState message={categoriesError} />}
          {!loadingCategories && !categoriesError && categories.length === 0 && (
            <EmptyState title="Nenhuma categoria disponível no momento." />
          )}

          {!loadingCategories && !categoriesError && categories.length > 0 && (
            <>
              <div className="flex flex-wrap gap-3" role="tablist" aria-label="Categorias do portfólio">
                {categories.map((category) => {
                  const Icon = getIcon(category.icon);
                  const active = category.id === selectedCategoryId;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setSelectedCategoryId(category.id)}
                      className={cn(
                        "flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors",
                        active
                          ? "border-orange bg-orange text-ink-950"
                          : "border-ink-950/10 bg-white/90 text-ink-950/70 hover:border-orange/40 hover:text-orange-dark",
                      )}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {category.title}
                    </button>
                  );
                })}
              </div>

              <div className="mt-10">
                {loadingItems && <LoadingState message="Carregando mídia..." />}
                {!loadingItems && itemsError && <ErrorState message={itemsError} />}
                {!loadingItems && !itemsError && items.length === 0 && (
                  <EmptyState
                    title="Nenhuma foto ou vídeo cadastrado para esta categoria ainda."
                    description="Em breve adicionaremos novos registros dos nossos projetos."
                  />
                )}

                {!loadingItems && !itemsError && items.length > 0 && (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item, index) => (
                      <Reveal
                        key={item.id}
                        as="figure"
                        delay={Math.min(index, 6) * 80}
                        className="overflow-hidden rounded-2xl border border-ink-950/10 bg-white/90"
                      >
                        <div className="relative">
                          {item.media_type === "photo" ? (
                            <img
                              src={item.media_url}
                              alt={item.title}
                              className="h-56 w-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <video
                              src={item.media_url}
                              poster={item.thumbnail_url ?? undefined}
                              controls
                              className="h-56 w-full bg-ink-950 object-cover"
                            />
                          )}
                          {item.media_type === "video" && (
                            <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-ink-950/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                              <Video className="h-3 w-3" aria-hidden="true" />
                              Vídeo
                            </span>
                          )}
                        </div>
                        <figcaption className="p-4 text-sm font-medium text-ink-950">{item.title}</figcaption>
                      </Reveal>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  );
}
