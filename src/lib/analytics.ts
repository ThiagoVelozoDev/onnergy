const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/**
 * Só injeta o script do GA4 (gtag.js) se `VITE_GA_MEASUREMENT_ID` estiver
 * definida no .env — sem ID real configurado, esta função não faz nada.
 * Chamar uma única vez em `src/main.tsx`, fora da árvore React.
 */
export function initAnalytics(): void {
  if (!MEASUREMENT_ID) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  function gtag(...args: unknown[]): void {
    window.dataLayer?.push(args);
  }
  gtag("js", new Date());
  gtag("config", MEASUREMENT_ID);
}
