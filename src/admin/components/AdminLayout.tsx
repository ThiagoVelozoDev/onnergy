import { useState } from "react";
import { Outlet } from "react-router-dom";
import { X } from "lucide-react";
import { AdminSidebar } from "@/admin/components/AdminSidebar";
import { AdminHeader } from "@/admin/components/AdminHeader";

export function AdminLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-ink-950 text-paper">
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="fixed h-screen w-64">
          <AdminSidebar />
        </div>
      </aside>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <div className="relative h-full w-72 bg-ink-950">
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Fechar menu"
              className="absolute right-3 top-5 z-10 rounded-md p-2 text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <AdminSidebar onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col lg:ml-64">
        <AdminHeader onOpenSidebar={() => setDrawerOpen(true)} />
        <main className="flex-1 overflow-x-hidden p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
