import {
  Award,
  Box,
  Cog,
  FileText,
  GraduationCap,
  Instagram,
  Linkedin,
  MessageCircle,
  Network,
  Presentation,
  Radio,
  ShieldCheck,
  Sun,
  TowerControl,
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
  sun: Sun,
  box: Box,
  network: Network,
  cog: Cog,
  radio: Radio,
  presentation: Presentation,
  "tower-control": TowerControl,
};

export function getIcon(name?: string | null): LucideIcon {
  return (name && ICONS[name]) || Zap;
}
