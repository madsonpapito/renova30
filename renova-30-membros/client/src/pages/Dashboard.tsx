import { Calendar, Clock, Users, Download, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardProps {
  onNavigate: (section: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { profile, signOut } = useAuth();

  const daysInProgram = profile?.dias_no_programa ?? 0;
  const currentWeek = profile?.semana_atual ?? 1;
  const totalWeeks = 12;
  const firstName = profile?.nome?.split(' ')[0] ?? 'Aluna';

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-8 border border-border flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">
            Bem-vinda, {firstName}! 🌸
          </h1>
          <p className="text-lg text-foreground/80">
            {daysInProgram === 0
              ? 'Hoje é o seu primeiro dia! Vamos começar juntas.'
              : <>Você está há <span className="font-bold text-primary">{daysInProgram} dias</span> transformando sua vida</>
            }
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={signOut}
          className="flex items-center gap-2 shrink-0 text-foreground/60 hover:text-destructive hover:border-destructive"
        >
          <LogOut size={16} />
          Sair
        </Button>
      </div>

      {/* Progress Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Progress Card */}
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-xl font-bold text-foreground">
              Seu Progresso
            </h3>
            <Calendar className="text-primary" size={24} />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-foreground/80">
                  Semana {currentWeek} de {totalWeeks}
                </span>
                <span className="text-sm font-bold text-primary">
                  {Math.round((currentWeek / totalWeeks) * 100)}%
                </span>
              </div>
              <div className="w-full bg-border rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary to-accent h-full transition-all duration-500"
                  style={{ width: `${(currentWeek / totalWeeks) * 100}%` }}
                />
              </div>
            </div>
            <p className="text-sm text-foreground/70">
              Você está no caminho certo! Continue assim.
            </p>
          </div>
        </div>

        {/* Next Workout Card */}
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-xl font-bold text-foreground">
              Próximo Treino
            </h3>
            <Clock className="text-secondary" size={24} />
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-foreground/80 mb-1">Semana 1: Despertar Hormonal</p>
              <p className="text-2xl font-bold text-foreground">10 min</p>
            </div>
            <Button
              onClick={() => onNavigate('treinos')}
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              Acessar Treino
            </Button>
          </div>
        </div>

        {/* Community Card */}
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-xl font-bold text-foreground">
              Comunidade
            </h3>
            <Users className="text-accent" size={24} />
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-foreground/80 mb-1">Alunas Ativas</p>
              <p className="text-2xl font-bold text-foreground">1.247+</p>
            </div>
            <Button
              onClick={() => onNavigate('comunidade')}
              variant="outline"
              className="w-full"
            >
              Entrar no Grupo
            </Button>
          </div>
        </div>
      </div>

      {/* Depoimento Section */}
      <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
        <h2 className="font-display text-2xl font-bold text-foreground mb-6">
          Histórias de Transformação
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-primary/10 rounded-lg p-4 border-l-4 border-primary">
              <p className="text-foreground/80 italic mb-3">
                "Em 12 semanas perdi 8kg, minha energia voltou e me sinto 10 anos mais jovem. Renova 30 mudou minha vida!"
              </p>
              <p className="font-bold text-foreground">Vanessa M.</p>
              <p className="text-sm text-foreground/60">São Paulo, SP</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-secondary/10 rounded-lg p-4 border-l-4 border-secondary">
              <p className="text-foreground/80 italic mb-3">
                "Os treinos são curtos mas muito eficazes. A comunidade me motivou todos os dias. Recomendo!"
              </p>
              <p className="font-bold text-foreground">Carla S.</p>
              <p className="text-sm text-foreground/60">Rio de Janeiro, RJ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
        <h2 className="font-display text-2xl font-bold text-foreground mb-6">
          Acesso Rápido aos Bônus
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => onNavigate('bonus')}
            className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-primary/5 transition-colors"
          >
            <Download className="text-primary" size={24} />
            <div className="text-left">
              <p className="font-bold text-foreground">Guia Caça ao Tesouro</p>
              <p className="text-sm text-foreground/60">Nutrientes-chave para menopausa</p>
            </div>
          </button>
          <button
            onClick={() => onNavigate('bonus')}
            className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-secondary/5 transition-colors"
          >
            <Download className="text-secondary" size={24} />
            <div className="text-left">
              <p className="font-bold text-foreground">Quebre o Ciclo</p>
              <p className="text-sm text-foreground/60">Controle emocional + 3 áudios</p>
            </div>
          </button>
          <button
            onClick={() => onNavigate('bonus')}
            className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-accent/5 transition-colors"
          >
            <Download className="text-accent" size={24} />
            <div className="text-left">
              <p className="font-bold text-foreground">Protocolo do Intestino</p>
              <p className="text-sm text-foreground/60">Limpeza em 7 dias</p>
            </div>
          </button>
          <button
            onClick={() => onNavigate('bonus')}
            className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-primary/5 transition-colors"
          >
            <Download className="text-primary" size={24} />
            <div className="text-left">
              <p className="font-bold text-foreground">Chás Seca e Desincham</p>
              <p className="text-sm text-foreground/60">8 receitas para 8 dias</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
