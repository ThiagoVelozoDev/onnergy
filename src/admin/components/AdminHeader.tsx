import { LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface AdminHeaderProps {
  onOpenSidebar: () => void;
}

export function AdminHeader({ onOpenSidebar }: AdminHeaderProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate("/admin/login", { replace: true });
  }

  return (
    <header className="flex h-20 items-center justify-between border-b border-white/5 bg-ink-950 px-4 sm:px-8">
      <button
        type="button"
        onClick={onOpenSidebar}
        aria-label="Abrir menu"
        className="rounded-md p-2 text-white lg:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>

      <span className="hidden text-sm font-semibold uppercase tracking-widest text-white/40 lg:block">
        ONNERGY Admin
      </span>

      <div className="flex items-center gap-4">
        <span className="hidden text-sm text-white/60 sm:block">{user?.email}</span>
        <button
          type="button"
          onClick={handleSignOut}
          className="flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white/70 hover:border-orange/40 hover:text-orange"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Sair
        </button>
      </div>
    </header>
  );
}
