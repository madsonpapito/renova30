import { Play, Star, Filter, Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface TreinosProps {
  onNavigate?: (section: string) => void;
}

// Vídeos demo do YouTube (Pilates públicos — substituir pelos reais depois)
const videosDemo: Record<number, string> = {
  1: 'k6DSNSOM3o8', // 10 min Morning Pilates
  2: 'VaoV1PrYft4', // Core & Abs Pilates
  3: 'sTANio_2E0Q', // Glúteos & Pernas
  4: 'g_tea8ZNk5A', // Cardio energizante
  5: 'UItWltVZglo', // Relaxamento noturno
  6: 'eFOZOFG_lbo', // Coluna e postura
};

const treinos = [
  { id: 1, semana: 1, nome: 'Despertar Hormonal', descricao: 'Mobilidade + Ativação Suave', duracao: 10, nivel: 'Iniciante', objetivo: 'Geral' },
  { id: 2, semana: 1, nome: 'Queima da Barriga', descricao: 'Core + Metabolismo', duracao: 10, nivel: 'Iniciante', objetivo: 'Barriga Plana' },
  { id: 3, semana: 2, nome: 'Força e Tonificação', descricao: 'Glúteos + Pernas', duracao: 10, nivel: 'Iniciante', objetivo: 'Pernas Fortes' },
  { id: 4, semana: 2, nome: 'Energia e Metabolismo', descricao: 'Cardio + Força', duracao: 10, nivel: 'Intermediário', objetivo: 'Energia Total' },
  { id: 5, semana: 3, nome: 'Relaxamento Noturno', descricao: 'Alongamento + Respiração', duracao: 10, nivel: 'Iniciante', objetivo: 'Relaxamento' },
  { id: 6, semana: 3, nome: 'Dores nas Costas', descricao: 'Mobilidade + Estabilidade', duracao: 10, nivel: 'Iniciante', objetivo: 'Dores nas Costas' },
];

const niveis = ['Todos', 'Iniciante', 'Intermediário', 'Avançado'];
const objetivos = ['Todos', 'Geral', 'Barriga Plana', 'Pernas Fortes', 'Energia Total', 'Dores nas Costas', 'Relaxamento'];

export default function Treinos({ onNavigate }: TreinosProps) {
  const [filtroNivel, setFiltroNivel] = useState('Todos');
  const [filtroObjetivo, setFiltroObjetivo] = useState('Todos');
  const [favs, setFavs] = useState<number[]>([2, 5]);
  const [videoAberto, setVideoAberto] = useState<typeof treinos[0] | null>(null);

  function toggleFav(id: number) {
    setFavs(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  }

  const treinosFiltrados = treinos.filter(t => {
    const nivelMatch = filtroNivel === 'Todos' || t.nivel === filtroNivel;
    const objMatch = filtroObjetivo === 'Todos' || t.objetivo === filtroObjetivo;
    return nivelMatch && objMatch;
  });

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
            <label className="block text-sm font-medium text-foreground mb-3">Nível</label>
            <div className="flex flex-wrap gap-2">
              {niveis.map(nivel => (
                <button
                  key={nivel}
                  onClick={() => setFiltroNivel(nivel)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${filtroNivel === nivel
                      ? 'bg-primary text-primary-foreground font-medium'
                      : 'bg-border text-foreground hover:bg-border/80'
                    }`}
                >
                  {nivel}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Objetivo</label>
            <div className="flex flex-wrap gap-2">
              {objetivos.map(objetivo => (
                <button
                  key={objetivo}
                  onClick={() => setFiltroObjetivo(objetivo)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${filtroObjetivo === objetivo
                      ? 'bg-secondary text-secondary-foreground font-medium'
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

      {/* Treinos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {treinosFiltrados.map(treino => {
          const isFav = favs.includes(treino.id);
          return (
            <div key={treino.id} className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
              {/* Thumbnail clicável */}
              <div
                className="relative bg-gradient-to-br from-primary/20 to-secondary/20 h-40 flex items-center justify-center cursor-pointer group"
                onClick={() => setVideoAberto(treino)}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-t-xl" />
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="text-primary ml-1" size={28} fill="currentColor" />
                </div>
                <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                  Semana {treino.semana}
                </div>
                <div className="absolute bottom-2 left-3 flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded text-xs">
                  <Clock size={10} />
                  {treino.duracao} min
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg font-bold text-foreground truncate">{treino.nome}</h3>
                    <p className="text-sm text-foreground/70">{treino.descricao}</p>
                  </div>
                  <button
                    onClick={() => toggleFav(treino.id)}
                    className={`ml-2 shrink-0 transition-colors ${isFav ? 'text-accent' : 'text-foreground/30 hover:text-accent'}`}
                    title={isFav ? 'Remover dos favoritos' : 'Favoritar'}
                  >
                    <Star size={20} fill={isFav ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-1 bg-border rounded text-xs font-medium text-foreground/70">{treino.nivel}</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">{treino.objetivo}</span>
                </div>

                <Button
                  onClick={() => setVideoAberto(treino)}
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
          <p className="text-lg text-foreground/60">Nenhum treino encontrado com esses filtros.</p>
          <Button variant="outline" onClick={() => { setFiltroNivel('Todos'); setFiltroObjetivo('Todos'); }} className="mt-4">
            Limpar Filtros
          </Button>
        </div>
      )}

      {/* ===== MODAL DE VÍDEO ===== */}
      {videoAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay escuro */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setVideoAberto(null)}
          />

          {/* Modal */}
          <div className="relative bg-card rounded-2xl shadow-2xl border border-border w-full max-w-2xl z-10 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div>
                <h2 className="font-display text-xl font-bold text-foreground">{videoAberto.nome}</h2>
                <p className="text-sm text-foreground/60">{videoAberto.descricao} · {videoAberto.duracao} min · {videoAberto.nivel}</p>
              </div>
              <button
                onClick={() => setVideoAberto(null)}
                className="p-2 rounded-lg hover:bg-border transition-colors text-foreground/60 hover:text-foreground"
              >
                <X size={20} />
              </button>
            </div>

            {/* Player YouTube embed */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${videosDemo[videoAberto.id]}?autoplay=1&rel=0&modestbranding=1`}
                title={videoAberto.nome}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Footer */}
            <div className="p-4 flex items-center justify-between bg-card border-t border-border">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleFav(videoAberto.id)}
                  className={`flex items-center gap-1.5 text-sm transition-colors ${favs.includes(videoAberto.id) ? 'text-accent' : 'text-foreground/50 hover:text-accent'
                    }`}
                >
                  <Star size={16} fill={favs.includes(videoAberto.id) ? 'currentColor' : 'none'} />
                  {favs.includes(videoAberto.id) ? 'Favoritado' : 'Favoritar'}
                </button>
              </div>
              <Button variant="outline" size="sm" onClick={() => setVideoAberto(null)}>
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
