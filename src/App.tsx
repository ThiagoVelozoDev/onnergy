import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ToastProvider } from "@/components/ui/Toast";
import { PublicLayout } from "@/components/layout/PublicLayout";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Courses from "@/pages/Courses";
import Trainings from "@/pages/Trainings";
import Portfolio from "@/pages/Portfolio";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import { ProtectedRoute } from "@/admin/components/ProtectedRoute";
import { AdminLayout } from "@/admin/components/AdminLayout";
import LoginPage from "@/admin/pages/LoginPage";
import DashboardPage from "@/admin/pages/DashboardPage";
import { ComingSoonPage } from "@/admin/pages/ComingSoonPage";

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/servicos" element={<Services />} />
            <Route path="/cursos" element={<Courses />} />
            <Route path="/treinamentos" element={<Trainings />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/contato" element={<Contact />} />
          </Route>

          <Route path="/admin/login" element={<LoginPage />} />

          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="hero" element={<ComingSoonPage title="Hero" />} />
              <Route path="servicos" element={<ComingSoonPage title="Serviços" />} />
              <Route path="cursos" element={<ComingSoonPage title="Cursos" />} />
              <Route path="treinamentos" element={<ComingSoonPage title="Treinamentos" />} />
              <Route path="portfolio" element={<ComingSoonPage title="Portfólio" />} />
              <Route path="empresa" element={<ComingSoonPage title="Empresa" />} />
              <Route path="estatisticas" element={<ComingSoonPage title="Estatísticas" />} />
              <Route path="leads" element={<ComingSoonPage title="Leads" />} />
              <Route path="midia" element={<ComingSoonPage title="Mídia" />} />
              <Route path="menu" element={<ComingSoonPage title="Menu" />} />
              <Route path="footer" element={<ComingSoonPage title="Footer" />} />
              <Route path="seo" element={<ComingSoonPage title="SEO" />} />
              <Route path="configuracoes" element={<ComingSoonPage title="Configurações" />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}
