import {
  Award,
  FileText,
  GraduationCap,
  Instagram,
  Linkedin,
  MessageCircle,
  ShieldCheck,
  Users,
  Wrench,
  Youtube,
  Zap,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  zap: Zap,
  "shield-check": ShieldCheck,
  "graduation-cap": GraduationCap,
  users: Users,
  "file-text": FileText,
  wrench: Wrench,
  award: Award,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  whatsapp: MessageCircle,
};

export function getIcon(name?: string | null): LucideIcon {
  return (name && ICONS[name]) || Zap;
}
