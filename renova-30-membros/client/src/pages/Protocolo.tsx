import { Download, CheckCircle2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Protocolo() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl font-bold text-foreground mb-2">
          Meu Protocolo Renova 30
        </h1>
        <p className="text-lg text-foreground/80">
          Seu plano personalizado de 12 semanas
        </p>
      </div>

      {/* Main Protocol Card */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-8 border border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Seu Plano Personalizado
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-primary flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-medium text-foreground">Duração: 12 semanas</p>
                  <p className="text-sm text-foreground/70">Renovável quando completar</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-secondary flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-medium text-foreground">Frequência: 3-5 treinos/semana</p>
                  <p className="text-sm text-foreground/70">10 minutos cada</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-medium text-foreground">Alimentação: Plano de 28 dias</p>
                  <p className="text-sm text-foreground/70">Renovável a cada ciclo</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="bg-card rounded-lg p-6 border border-border">
              <p className="text-sm text-foreground/70 mb-2">Seu Objetivo Principal</p>
              <p className="font-display text-2xl font-bold text-primary mb-6">
                Barriga Plana + Energia
              </p>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2 mb-3">
                <Download size={18} />
                Download Protocolo Completo
              </Button>
              <p className="text-xs text-foreground/60 text-center">
                PDF de 20 páginas com seu plano detalhado
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Progression */}
      <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
        <h2 className="font-display text-2xl font-bold text-foreground mb-6">
          Sua Progressão por Semana
        </h2>
        <div className="space-y-4">
          {[
            { semana: '1-2', tema: 'Despertar Hormonal', foco: 'Mobilidade + Ativação' },
            { semana: '3-4', tema: 'Queima da Barriga', foco: 'Core + Metabolismo' },
            { semana: '5-6', tema: 'Força e Tonificação', foco: 'Glúteos + Pernas' },
            { semana: '7-8', tema: 'Energia e Metabolismo', foco: 'Cardio + Força' },
            { semana: '9-10', tema: 'Definição Avançada', foco: 'Resistência + Tônus' },
            { semana: '11-12', tema: 'Manutenção Jovem', foco: 'Manutenção de Resultados' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 pb-4 border-b border-border last:border-b-0">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold flex-shrink-0">
                {item.semana}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground">{item.tema}</h3>
                <p className="text-sm text-foreground/70">{item.foco}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
        <h2 className="font-display text-2xl font-bold text-foreground mb-6">
          Seu Checklist Semanal
        </h2>
        <p className="text-foreground/80 mb-6">
          Acompanhe seu progresso com este checklist simples:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-bold text-foreground">Métrica</th>
                <th className="text-center py-3 px-2 font-bold text-foreground/70">Seg</th>
                <th className="text-center py-3 px-2 font-bold text-foreground/70">Ter</th>
                <th className="text-center py-3 px-2 font-bold text-foreground/70">Qua</th>
                <th className="text-center py-3 px-2 font-bold text-foreground/70">Qui</th>
                <th className="text-center py-3 px-2 font-bold text-foreground/70">Sex</th>
                <th className="text-center py-3 px-2 font-bold text-foreground/70">Sab</th>
                <th className="text-center py-3 px-2 font-bold text-foreground/70">Dom</th>
              </tr>
            </thead>
            <tbody>
              {['Treino Completo', 'Peso', 'Medidas', 'Energia (1-10)', 'Sintomas'].map((metric, idx) => (
                <tr key={idx} className="border-b border-border/50">
                  <td className="py-3 px-4 text-foreground font-medium">{metric}</td>
                  {[...Array(7)].map((_, i) => (
                    <td key={i} className="text-center py-3 px-2">
                      <input type="checkbox" className="w-4 h-4 rounded" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-8">
        <h2 className="font-display text-2xl font-bold text-foreground mb-6">
          Seus Próximos Passos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
              1
            </div>
            <p className="font-medium text-foreground">Hoje</p>
            <p className="text-sm text-foreground/70">Leia este protocolo completamente</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-secondary-foreground font-bold">
              2
            </div>
            <p className="font-medium text-foreground">Amanhã</p>
            <p className="text-sm text-foreground/70">Comece o Treino "Despertar Hormonal"</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-accent-foreground font-bold">
              3
            </div>
            <p className="font-medium text-foreground">Esta Semana</p>
            <p className="text-sm text-foreground/70">Acesse a Biblioteca de Treinos</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/60 text-primary-foreground font-bold">
              4
            </div>
            <p className="font-medium text-foreground">Próxima Semana</p>
            <p className="text-sm text-foreground/70">Inicie o Plano de Alimentação</p>
          </div>
        </div>
      </div>
    </div>
  );
}
