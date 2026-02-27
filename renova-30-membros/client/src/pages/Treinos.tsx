import { Play, Star, Filter, Clock, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface TreinosProps {
  onNavigate?: (section: string) => void;
}

const treinos = [
  {
    id: 1,
    semana: 1,
    nome: 'Despertar Hormonal',
    descricao: 'Mobilidade + Ativação Suave',
    duracao: 10,
    nivel: 'Iniciante',
    objetivo: 'Geral',
    favorito: false,
  },
  {
    id: 2,
    semana: 1,
    nome: 'Queima da Barriga',
    descricao: 'Core + Metabolismo',
    duracao: 10,
    nivel: 'Iniciante',
    objetivo: 'Barriga Plana',
    favorito: true,
  },
  {
    id: 3,
    semana: 2,
    nome: 'Força e Tonificação',
    descricao: 'Glúteos + Pernas',
    duracao: 10,
    nivel: 'Iniciante',
    objetivo: 'Pernas Fortes',
    favorito: false,
  },
  {
    id: 4,
    semana: 2,
    nome: 'Energia e Metabolismo',
    descricao: 'Cardio + Força',
    duracao: 10,
    nivel: 'Intermediário',
    objetivo: 'Energia Total',
    favorito: false,
  },
  {
    id: 5,
    semana: 3,
    nome: 'Relaxamento Noturno',
    descricao: 'Alongamento + Respiração',
    duracao: 10,
    nivel: 'Iniciante',
    objetivo: 'Relaxamento',
    favorito: true,
  },
  {
    id: 6,
    semana: 3,
    nome: 'Dores nas Costas',
    descricao: 'Mobilidade + Estabilidade',
    duracao: 10,
    nivel: 'Iniciante',
    objetivo: 'Dores nas Costas',
    favorito: false,
  },
];

export default function Treinos({ onNavigate }: TreinosProps) {
  const [filtroNivel, setFiltroNivel] = useState('Todos');
  const [filtroObjetivo, setFiltroObjetivo] = useState('Todos');
  const [favs, setFavs] = useState<number[]>([2, 5]);
  const [toastMsg, setToastMsg] = useState('');

  function showToast(msg: string) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  }

  function toggleFav(id: number) {
    setFavs(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  }

  const treinosFiltrados = treinos.filter((treino) => {
    const nivelMatch = filtroNivel === 'Todos' || treino.nivel === filtroNivel;
    const objetivoMatch = filtroObjetivo === 'Todos' || treino.objetivo === filtroObjetivo;
    return nivelMatch && objetivoMatch;
  });

  const niveis = ['Todos', 'Iniciante', 'Intermediário', 'Avançado'];
  const objetivos = [
    'Todos',
    'Geral',
    'Barriga Plana',
    'Pernas Fortes',
    'Energia Total',
    'Dores nas Costas',
    'Relaxamento',
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-4xl font-bold text-foreground mb-2">
          Biblioteca de Treinos
        </h1>
        <p className="text-lg text-foreground/80">
          30+ vídeos de Pilates de 10 minutos, organizados por objetivo e nível
        </p>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} className="text-primary" />
          <h2 className="font-display text-lg font-bold text-foreground">Filtrar Treinos</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Nível
            </label>
            <div className="flex flex-wrap gap-2">
              {niveis.map((nivel) => (
                <button
                  key={nivel}
                  onClick={() => setFiltroNivel(nivel)}
                  className={`px-4 py-2 rounded-lg transition-all ${filtroNivel === nivel
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-border text-foreground hover:bg-border/80'
                    }`}
                >
                  {nivel}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Objetivo
            </label>
            <div className="flex flex-wrap gap-2">
              {objetivos.map((objetivo) => (
                <button
                  key={objetivo}
                  onClick={() => setFiltroObjetivo(objetivo)}
                  className={`px-4 py-2 rounded-lg transition-all text-sm ${filtroObjetivo === objetivo
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-border text-foreground hover:bg-border/80'
                    }`}
                >
                  {objetivo}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-foreground text-background px-6 py-3 rounded-full shadow-lg text-sm font-medium animate-pulse">
          {toastMsg}
        </div>
      )}

      {/* Treinos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {treinosFiltrados.map((treino) => {
          const isFav = favs.includes(treino.id);
          return (
            <div
              key={treino.id}
              className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Thumbnail */}
              <div className="relative bg-gradient-to-br from-primary/20 to-secondary/20 h-40 flex items-center justify-center cursor-pointer group"
                onClick={() => showToast('🎬 Vídeos em breve! Por enquanto, siga o protocolo em PDF.')}>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <Play className="text-primary group-hover:scale-110 transition-transform" size={48} />
                <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                  Semana {treino.semana}
                </div>
                <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/40 text-white px-2 py-1 rounded text-xs">
                  <Clock size={10} />
                  {treino.duracao} min
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground">
                      {treino.nome}
                    </h3>
                    <p className="text-sm text-foreground/70">{treino.descricao}</p>
                  </div>
                  <button
                    onClick={() => toggleFav(treino.id)}
                    className={`transition-colors ${isFav ? 'text-accent' : 'text-foreground/30 hover:text-accent'}`}
                    title={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                  >
                    <Star size={20} fill={isFav ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-1 bg-border rounded text-xs font-medium text-foreground/70">
                    {treino.nivel}
                  </span>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                    {treino.objetivo}
                  </span>
                </div>

                <Button
                  onClick={() => showToast('🎬 Vídeos em breve! Siga seu protocolo PDF enquanto isso. 🌸')}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2"
                >
                  <Play size={16} />
                  Assistir Agora
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {treinosFiltrados.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-foreground/60">
            Nenhum treino encontrado com esses filtros.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setFiltroNivel('Todos');
              setFiltroObjetivo('Todos');
            }}
            className="mt-4"
          >
            Limpar Filtros
          </Button>
        </div>
      )}
    </div>
  );
}
