interface WhatsAppMessageParams {
  name: string;
  serviceName?: string | null;
  message?: string | null;
}

export function generateWhatsAppMessage({ name, serviceName, message }: WhatsAppMessageParams): string {
  const lines = [`Olá! Meu nome é ${name}.`, ""];

  if (serviceName) {
    lines.push("Tenho interesse em:", serviceName, "");
  }

  lines.push(message?.trim() || "Gostaria de receber mais informações.");

  return lines.join("\n");
}

function sanitizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("55") ? digits : `55${digits}`;
}

export function openWhatsApp(phone: string, message: string): void {
  const digits = sanitizePhone(phone);
  const url = `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
