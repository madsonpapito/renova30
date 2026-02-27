import { useState } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Protocolo from "./pages/Protocolo";
import Treinos from "./pages/Treinos";
import Alimentacao from "./pages/Alimentacao";
import Bonus from "./pages/Bonus";
import Progresso from "./pages/Progresso";
import Comunidade from "./pages/Comunidade";
import LoginPage from "./pages/Login";
import { Loader2 } from "lucide-react";

function AppContent() {
  const { user, loading } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  // Tela de loading enquanto verifica sessão
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-lg">
            <span className="text-2xl font-black text-white">R</span>
          </div>
          <div className="flex items-center gap-2 text-foreground/60">
            <Loader2 size={18} className="animate-spin" />
            <span>Carregando...</span>
          </div>
        </div>
      </div>
    );
  }

  // Sem usuário → mostra login
  if (!user) return <LoginPage />;

  const renderPage = () => {
    switch (activeSection) {
      case 'dashboard': return <Dashboard onNavigate={setActiveSection} />;
      case 'protocolo': return <Protocolo />;
      case 'treinos': return <Treinos />;
      case 'alimentacao': return <Alimentacao />;
      case 'bonus': return <Bonus />;
      case 'progresso': return <Progresso />;
      case 'comunidade': return <Comunidade />;
      default: return <Dashboard onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 lg:ml-64">
        <div className="p-6 lg:p-8">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <AppContent />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
