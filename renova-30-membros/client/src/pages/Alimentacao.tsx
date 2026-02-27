import { Apple, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Alimentacao() {
  const [toast, setToast] = useState('');

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  const receitas = [
    { id: 1, nome: 'Vitamina Hormonal', tempo: '5 min', tipo: 'Café' },
    { id: 2, nome: 'Salada Verde com Proteína', tempo: '10 min', tipo: 'Almoço' },
    { id: 3, nome: 'Sopa de Legumes', tempo: '15 min', tipo: 'Jantar' },
    { id: 4, nome: 'Lanche Anti-Fome', tempo: '2 min', tipo: 'Lanche' },
    { id: 5, nome: 'Smoothie de Frutas', tempo: '5 min', tipo: 'Café' },
    { id: 6, nome: 'Peixe com Vegetais', tempo: '20 min', tipo: 'Almoço' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl font-bold text-foreground mb-2">
          Alimentação Renova 30
        </h1>
        <p className="text-lg text-foreground/80">
          Plano de 28 dias com receitas que resetam seus hormônios
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Apple className="text-primary" size={24} />
            </div>
            <h3 className="font-bold text-foreground">Nutrientes-Chave</h3>
          </div>
          <p className="text-sm text-foreground/70">
            Linhaça, sementes, vegetais crucíferos e proteínas magras que estimulam hormônios naturais
          </p>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-secondary/10 rounded-lg">
              <Clock className="text-secondary" size={24} />
            </div>
            <h3 className="font-bold text-foreground">Receitas Rápidas</h3>
          </div>
          <p className="text-sm text-foreground/70">
            12 vídeos de 5-10 minutos cada. Fáceis de preparar, deliciosas e nutritivas
          </p>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-accent/10 rounded-lg">
              <Users className="text-accent" size={24} />
            </div>
            <h3 className="font-bold text-foreground">Listas Prontas</h3>
          </div>
          <p className="text-sm text-foreground/70">
            Econômica, Equilibrada ou Low Carb. Escolha a que mais combina com você
          </p>
        </div>
      </div>

      {/* 28-Day Plan */}
      <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
        <h2 className="font-display text-2xl font-bold text-foreground mb-6">
          Seu Plano de 28 Dias
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'].map((semana, idx) => (
            <div key={idx} className="p-4 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer">
              <h3 className="font-bold text-foreground mb-2">{semana}</h3>
              <ul className="text-sm text-foreground/70 space-y-1">
                <li>✓ Cardápios completos</li>
                <li>✓ Café, almoço, lanche, jantar</li>
                <li>✓ Receitas balanceadas</li>
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Recipes */}
      <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
        <h2 className="font-display text-2xl font-bold text-foreground mb-6">
          Receitas em Vídeo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {receitas.map((receita) => (
            <div key={receita.id} className="rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 h-32 flex items-center justify-center">
                <Apple className="text-primary" size={40} />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-foreground mb-2">{receita.nome}</h3>
                <div className="flex items-center gap-4 text-sm text-foreground/70 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {receita.tempo}
                  </span>
                  <span className="px-2 py-1 bg-border rounded text-xs font-medium">
                    {receita.tipo}
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="w-full text-sm"
                  onClick={() => showToast('🎬 Vídeos de receitas em breve! Enquanto isso, use o Guia Caça ao Tesouro nos Bônus.')}
                >
                  Em Breve 🎬
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shopping Lists */}
      <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
        <h2 className="font-display text-2xl font-bold text-foreground mb-6">
          Listas de Compras Prontas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border-2 border-primary/30 hover:border-primary transition-colors">
            <h3 className="font-bold text-foreground mb-3">Econômica</h3>
            <p className="text-sm text-foreground/70 mb-4">
              R$ 100-120/semana
            </p>
            <p className="text-xs text-foreground/60 mb-4">
              Frango, ovos, feijão, vegetais básicos. Alimentação balanceada sem luxo.
            </p>
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm"
              onClick={() => showToast('📋 Lista sendo preparada! Baixe o Guia de Compras nos Bônus por enquanto.')}
            >
              Download Lista
            </Button>
          </div>

          <div className="p-6 rounded-lg border-2 border-secondary/30 hover:border-secondary transition-colors">
            <h3 className="font-bold text-foreground mb-3">Equilibrada</h3>
            <p className="text-sm text-foreground/70 mb-4">
              R$ 150-180/semana
            </p>
            <p className="text-xs text-foreground/60 mb-4">
              Variedade completa. Frango, peixe, ovos, muitos vegetais e frutas.
            </p>
            <Button
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-sm"
              onClick={() => showToast('📋 Lista sendo preparada! Baixe o Guia de Compras nos Bônus por enquanto.')}
            >
              Download Lista
            </Button>
          </div>

          <div className="p-6 rounded-lg border-2 border-accent/30 hover:border-accent transition-colors">
            <h3 className="font-bold text-foreground mb-3">Low Carb</h3>
            <p className="text-sm text-foreground/70 mb-4">
              R$ 180-220/semana
            </p>
            <p className="text-xs text-foreground/60 mb-4">
              Redução de carboidratos. Salmão, frango, muitos vegetais, sementes.
            </p>
            <Button
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-sm"
              onClick={() => showToast('📋 Lista sendo preparada! Baixe o Guia de Compras nos Bônus por enquanto.')}
            >
              Download Lista
            </Button>
          </div>
        </div>
      </div>

      {/* Principles */}
      <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-8">
        <h2 className="font-display text-2xl font-bold text-foreground mb-6">
          Os 10 Princípios de Ouro
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            '1. Coma proteína em toda refeição',
            '2. Beba 3 litros de água por dia',
            '3. Coma linhaça todos os dias',
            '4. Evite açúcar refinado',
            '5. Coma devagar e mastigue bem',
            '6. Não pule o café da manhã',
            '7. Coma vegetais crus',
            '8. Durma 7-8 horas',
            '9. Coma de 3 em 3 horas',
            '10. Não coma após as 20h',
          ].map((principio, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white/50">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                ✓
              </span>
              <p className="text-sm text-foreground">{principio}</p>
            </div>
          ))}
        </div>
      </div>
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-foreground text-background px-6 py-3 rounded-full shadow-lg text-sm font-medium">
          {toast}
        </div>
      )}
    </div>
  );
}
