import {
  BarChart3,
  Building2,
  Camera,
  GraduationCap,
  Image,
  Inbox,
  LayoutDashboard,
  LayoutPanelLeft,
  Menu as MenuIcon,
  PanelTop,
  Search,
  Settings,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { ADMIN_NAV_ITEMS } from "@/config/site";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  "layout-dashboard": LayoutDashboard,
  "panel-top": PanelTop,
  wrench: Wrench,
  "graduation-cap": GraduationCap,
  users: Users,
  "building-2": Building2,
  "bar-chart-3": BarChart3,
  inbox: Inbox,
  image: Image,
  camera: Camera,
  menu: MenuIcon,
  "layout-panel-left": LayoutPanelLeft,
  search: Search,
  settings: Settings,
};

interface AdminSidebarProps {
  onNavigate?: () => void;
}

export function AdminSidebar({ onNavigate }: AdminSidebarProps) {
  return (
    <div className="flex h-full flex-col border-r border-white/5 bg-ink-950">
      <div className="flex h-20 items-center border-b border-white/5 px-6">
        <Logo />
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Navegação do admin">
        {ADMIN_NAV_ITEMS.map((item) => {
          const Icon = ICONS[item.icon] ?? LayoutDashboard;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-paper",
                  isActive && "bg-orange/10 text-orange",
                )
              }
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
