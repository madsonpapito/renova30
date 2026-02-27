import { Download, FileText, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BONUS_ITEMS } from '@/lib/pdf-urls';

interface BonusProps {
  onNavigate?: (section: string) => void;
}

const colorMap: Record<number, string> = {
  1: 'from-primary to-primary/80',
  2: 'from-secondary to-secondary/80',
  3: 'from-accent to-accent/80',
  4: 'from-primary/60 to-secondary/60',
  5: 'from-secondary/60 to-accent/60',
};

export default function Bonus({ onNavigate }: BonusProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-4xl font-bold text-foreground mb-2">
          Bônus Exclusivos
        </h1>
        <p className="text-lg text-foreground/80">
          5 PDFs + áudios guiados para potencializar seus resultados
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-6">
        <p className="text-foreground/80">
          <span className="font-bold text-secondary">Todos os bônus estão disponíveis</span> para download imediato. Você pode acessá-los a qualquer momento, quantas vezes quiser.
        </p>
      </div>

      {/* Bonus Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BONUS_ITEMS.map((bonus) => {
          const gradientClass = colorMap[bonus.id];
          return (
            <div
              key={bonus.id}
              className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Header com Gradient */}
              <div className={`bg-gradient-to-r ${gradientClass} p-6 text-white`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold mb-2">
                      {bonus.titulo}
                    </h3>
                    <p className="text-sm opacity-90">{bonus.descricao}</p>
                  </div>
                  <FileText size={32} className="flex-shrink-0" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6 text-sm">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-primary" />
                    <span className="text-foreground/70">{bonus.paginas} páginas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-border rounded-full text-xs font-medium text-foreground">
                      {bonus.tipo}
                    </span>
                  </div>
                </div>

                {/* Bonus Features */}
                {bonus.id === 3 && (
                  <div className="mb-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <div className="flex items-start gap-2 mb-2">
                      <Headphones size={16} className="text-accent flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-foreground text-sm">Incluso: 3 Áudios Guiados</p>
                        <p className="text-xs text-foreground/60 mt-1">
                          • Respiração 4-7-8 (5 min)
                          <br />
                          • Meditação Anti-Estresse (10 min)
                          <br />
                          • Visualização Corporal (8 min)
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* CTA */}
                <a href={bonus.url} download target="_blank" rel="noopener noreferrer" className="block">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2">
                    <Download size={18} />
                    Download Agora
                  </Button>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* How to Use */}
      <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
        <h2 className="font-display text-2xl font-bold text-foreground mb-6">
          Como Usar os Bônus
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
              1
            </div>
            <h3 className="font-bold text-foreground">Download</h3>
            <p className="text-sm text-foreground/70">
              Clique no botão "Download Agora" para salvar o PDF no seu dispositivo
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-secondary-foreground font-bold">
              2
            </div>
            <h3 className="font-bold text-foreground">Leia/Ouça</h3>
            <p className="text-sm text-foreground/70">
              Abra o PDF ou áudio no seu leitor favorito e comece a aprender
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-accent-foreground font-bold">
              3
            </div>
            <h3 className="font-bold text-foreground">Aplique</h3>
            <p className="text-sm text-foreground/70">
              Siga as instruções e combine com seus treinos do Renova 30
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
        <h2 className="font-display text-2xl font-bold text-foreground mb-6">
          Perguntas Frequentes
        </h2>
        <div className="space-y-4">
          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground hover:text-primary transition-colors">
              Posso acessar os PDFs em qualquer dispositivo?
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-3 text-sm text-foreground/70 pl-4">
              Sim! Os PDFs são compatíveis com todos os dispositivos (computador, tablet, celular). Você pode ler offline também.
            </p>
          </details>
          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground hover:text-primary transition-colors">
              Quantas vezes posso fazer download?
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-3 text-sm text-foreground/70 pl-4">
              Quantas vezes quiser! Você tem acesso vitalício aos bônus. Pode fazer download novamente a qualquer momento.
            </p>
          </details>
          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground hover:text-primary transition-colors">
              Os áudios do "Quebre o Ciclo" estão inclusos?
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-3 text-sm text-foreground/70 pl-4">
              Sim! Os 3 áudios guiados estão inclusos no bônus "Quebre o Ciclo". Você pode ouvi-los quantas vezes quiser.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
