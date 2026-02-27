import { TrendingUp, Award, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Progresso() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl font-bold text-foreground mb-2">
          Minha Transformação
        </h1>
        <p className="text-lg text-foreground/80">
          Acompanhe seu progresso semana a semana
        </p>
      </div>

      {/* Tracker Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-foreground">Peso</h3>
            <TrendingUp className="text-primary" size={24} />
          </div>
          <p className="text-3xl font-bold text-primary mb-1">68.5 kg</p>
          <p className="text-sm text-foreground/70">-2.5 kg desde o início</p>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-foreground">Cintura</h3>
            <TrendingUp className="text-secondary" size={24} />
          </div>
          <p className="text-3xl font-bold text-secondary mb-1">82 cm</p>
          <p className="text-sm text-foreground/70">-4 cm desde o início</p>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-foreground">Energia</h3>
            <TrendingUp className="text-accent" size={24} />
          </div>
          <p className="text-3xl font-bold text-accent mb-1">8/10</p>
          <p className="text-sm text-foreground/70">Melhorou muito!</p>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-foreground">Semanas</h3>
            <Calendar className="text-primary" size={24} />
          </div>
          <p className="text-3xl font-bold text-primary mb-1">4/12</p>
          <p className="text-sm text-foreground/70">33% do caminho</p>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
        <h2 className="font-display text-2xl font-bold text-foreground mb-6">
          Seu Progresso por Semana
        </h2>
        <div className="space-y-4">
          {[
            { semana: 1, peso: 71.0, cintura: 86, energia: 4, sintomas: 'Cansaço, afrontamentos' },
            { semana: 2, peso: 70.2, cintura: 85, energia: 5, sintomas: 'Menos afrontamentos' },
            { semana: 3, peso: 69.5, cintura: 83, energia: 7, sintomas: 'Muito melhor!' },
            { semana: 4, peso: 68.5, cintura: 82, energia: 8, sintomas: 'Ótimo!' },
          ].map((item) => (
            <div key={item.semana} className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-primary/5 transition-colors">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                S{item.semana}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-6 mb-2">
                  <div>
                    <p className="text-xs text-foreground/60">Peso</p>
                    <p className="font-bold text-foreground">{item.peso} kg</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60">Cintura</p>
                    <p className="font-bold text-foreground">{item.cintura} cm</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60">Energia</p>
                    <p className="font-bold text-foreground">{item.energia}/10</p>
                  </div>
                </div>
                <p className="text-sm text-foreground/70">{item.sintomas}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Journal */}
      <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
        <h2 className="font-display text-2xl font-bold text-foreground mb-6">
          Seu Journal
        </h2>
        <p className="text-foreground/80 mb-6">
          Escreva como você se sente, seus sintomas e vitórias
        </p>
        <div className="space-y-4">
          {[
            { data: '27 de fevereiro', titulo: 'Dia 12 - Sentindo-me incrível!', conteudo: 'Minha barriga está visivelmente menor. Dormi bem ontem e acordei com energia. Fiz o treino de hoje sem dificuldade.' },
            { data: '26 de fevereiro', titulo: 'Dia 11 - Pequenas vitórias', conteudo: 'Consegui resistir ao doce à noite! Usei a técnica do "Quebre o Ciclo" e funcionou. Estou muito orgulhosa de mim.' },
            { data: '25 de fevereiro', titulo: 'Dia 10 - Afrontamentos diminuíram', conteudo: 'Notei que os afrontamentos estão menos frequentes. Minha energia está melhor. Os treinos estão ficando mais fáceis.' },
          ].map((entry, idx) => (
            <div key={idx} className="p-4 rounded-lg border border-border hover:bg-primary/5 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-foreground">{entry.titulo}</h3>
                <p className="text-xs text-foreground/60">{entry.data}</p>
              </div>
              <p className="text-sm text-foreground/80">{entry.conteudo}</p>
            </div>
          ))}
        </div>
        <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">
          Adicionar Nova Entrada
        </Button>
      </div>

      {/* Certificates */}
      <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl p-8 border border-border">
        <h2 className="font-display text-2xl font-bold text-foreground mb-6">
          Seus Certificados
        </h2>
        <p className="text-foreground/80 mb-6">
          Você receberá um certificado digital a cada 12 semanas completadas
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl p-6 border-2 border-accent/30 text-center">
            <Award className="mx-auto text-accent mb-4" size={48} />
            <h3 className="font-display text-xl font-bold text-foreground mb-2">
              Ciclo 1 Completo
            </h3>
            <p className="text-sm text-foreground/70 mb-4">
              Quando você completar as 12 semanas
            </p>
            <p className="text-xs text-foreground/60">
              "Concluí o Ciclo Renova 30 – Nível 1"
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 border-2 border-border/50 text-center opacity-60">
            <Award className="mx-auto text-foreground/40 mb-4" size={48} />
            <h3 className="font-display text-xl font-bold text-foreground/60 mb-2">
              Ciclo 2 Completo
            </h3>
            <p className="text-sm text-foreground/50 mb-4">
              Próximo desafio (24 semanas)
            </p>
            <p className="text-xs text-foreground/40">
              "Concluí o Ciclo Renova 30 – Nível 2"
            </p>
          </div>
        </div>
      </div>

      {/* Motivation */}
      <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-8">
        <h2 className="font-display text-2xl font-bold text-foreground mb-4">
          Você está no caminho certo!
        </h2>
        <p className="text-lg text-foreground/80 mb-6">
          Você já completou 4 semanas de 12. Continue assim e verá resultados incríveis!
        </p>
        <div className="w-full bg-border rounded-full h-4 overflow-hidden mb-4">
          <div
            className="bg-gradient-to-r from-primary to-accent h-full transition-all duration-500"
            style={{ width: '33%' }}
          />
        </div>
        <p className="text-sm text-foreground/70">
          Próximo marco: Semana 6 (50% do caminho) 🎯
        </p>
      </div>
    </div>
  );
}
