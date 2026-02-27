import { useEffect, useState } from 'react';
import { TrendingUp, Award, Calendar, Scale, Ruler, Zap, Smile, Plus, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface Checkin {
  id: string;
  semana: number;
  peso: number | null;
  cintura: number | null;
  humor: number | null;
  energia: number | null;
  treinos_feitos: number;
  notas: string | null;
  created_at: string;
}

export default function Progresso() {
  const { user, profile } = useAuth();
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [loadingCheckins, setLoadingCheckins] = useState(true);
  const [showNovoCheckin, setShowNovoCheckin] = useState(false);
  const [saving, setSaving] = useState(false);

  const [novoForm, setNovoForm] = useState({
    peso: '',
    cintura: '',
    energia: '5',
    humor: '5',
    notas: '',
    treinos_feitos: '0',
  });

  useEffect(() => {
    if (user) fetchCheckins();
  }, [user]);

  async function fetchCheckins() {
    setLoadingCheckins(true);
    const { data, error } = await supabase
      .from('checkins')
      .select('*')
      .eq('user_id', user!.id)
      .order('semana', { ascending: true });

    if (!error && data) setCheckins(data);
    setLoadingCheckins(false);
  }

  const baseline = checkins.find(c => c.semana === 0);
  const ultimoCheckin = checkins.filter(c => c.semana > 0).at(-1);
  const semanaAtual = profile?.semana_atual ?? 1;
  const diasNoPrograma = profile?.dias_no_programa ?? 0;

  // Calcula diferenças
  const difPeso = baseline?.peso && ultimoCheckin?.peso
    ? (ultimoCheckin.peso - baseline.peso).toFixed(1)
    : null;
  const difCintura = baseline?.cintura && ultimoCheckin?.cintura
    ? (ultimoCheckin.cintura - baseline.cintura).toFixed(1)
    : null;

  async function handleNovoCheckin(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);

    const { error } = await supabase.from('checkins').insert({
      user_id: user.id,
      semana: semanaAtual,
      peso: novoForm.peso ? parseFloat(novoForm.peso) : null,
      cintura: novoForm.cintura ? parseFloat(novoForm.cintura) : null,
      humor: parseInt(novoForm.humor),
      energia: parseInt(novoForm.energia),
      treinos_feitos: parseInt(novoForm.treinos_feitos),
      notas: novoForm.notas || null,
    });

    if (!error) {
      await fetchCheckins();
      setShowNovoCheckin(false);
      setNovoForm({ peso: '', cintura: '', energia: '5', humor: '5', notas: '', treinos_feitos: '0' });
    }
    setSaving(false);
  }

  if (loadingCheckins) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  const semHasDados = checkins.length === 0;

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">
            Minha Transformação
          </h1>
          <p className="text-lg text-foreground/80">
            {semHasDados
              ? 'Inicie sua jornada no Dashboard para ver seu progresso aqui'
              : `Acompanhe seu progresso semana a semana — Dia ${diasNoPrograma} de 84`}
          </p>
        </div>
        {!semHasDados && (
          <Button
            onClick={() => setShowNovoCheckin(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 shrink-0"
          >
            <Plus size={16} />
            Novo Check-in
          </Button>
        )}
      </div>

      {/* Sem dados */}
      {semHasDados ? (
        <div className="bg-card rounded-2xl p-12 border border-border text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="text-primary" size={32} />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Sem dados ainda
          </h2>
          <p className="text-foreground/70 mb-6 max-w-sm mx-auto">
            Clique em "Iniciar Minha Jornada" no Dashboard para registrar suas medidas iniciais e acompanhar seu progresso real aqui.
          </p>
        </div>
      ) : (
        <>
          {/* Cards de Métricas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Peso */}
            <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-foreground text-sm">Peso Atual</h3>
                <Scale className="text-primary" size={20} />
              </div>
              <p className="text-2xl font-bold text-primary mb-1">
                {ultimoCheckin?.peso ?? baseline?.peso ?? '—'} kg
              </p>
              {difPeso !== null && (
                <p className={`text-xs font-medium ${parseFloat(difPeso) < 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {parseFloat(difPeso) < 0 ? '↓' : '↑'} {Math.abs(parseFloat(difPeso))} kg desde o início
                </p>
              )}
              {!difPeso && <p className="text-xs text-foreground/50">Medida inicial</p>}
            </div>

            {/* Cintura */}
            <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-foreground text-sm">Cintura</h3>
                <Ruler className="text-secondary" size={20} />
              </div>
              <p className="text-2xl font-bold text-secondary mb-1">
                {ultimoCheckin?.cintura ?? baseline?.cintura ?? '—'} cm
              </p>
              {difCintura !== null && (
                <p className={`text-xs font-medium ${parseFloat(difCintura) < 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {parseFloat(difCintura) < 0 ? '↓' : '↑'} {Math.abs(parseFloat(difCintura))} cm desde o início
                </p>
              )}
              {!difCintura && <p className="text-xs text-foreground/50">Medida inicial</p>}
            </div>

            {/* Energia */}
            <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-foreground text-sm">Energia</h3>
                <Zap className="text-yellow-500" size={20} />
              </div>
              <p className="text-2xl font-bold text-yellow-500 mb-1">
                {ultimoCheckin?.energia ?? baseline?.energia ?? '—'}/10
              </p>
              <p className="text-xs text-foreground/50">Última medição</p>
            </div>

            {/* Semana */}
            <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-foreground text-sm">Semana</h3>
                <Calendar className="text-primary" size={20} />
              </div>
              <p className="text-2xl font-bold text-primary mb-1">
                {semanaAtual}/12
              </p>
              <p className="text-xs text-foreground/50">
                {Math.round((semanaAtual / 12) * 100)}% do programa
              </p>
            </div>
          </div>

          {/* Histórico de Check-ins */}
          {checkins.filter(c => c.semana > 0).length > 0 && (
            <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Histórico de Check-ins
              </h2>
              <div className="space-y-4">
                {checkins.filter(c => c.semana > 0).map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-primary/5 transition-colors">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                      S{item.semana}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center flex-wrap gap-4 mb-1">
                        {item.peso && (
                          <div>
                            <p className="text-xs text-foreground/60">Peso</p>
                            <p className="font-bold text-foreground">{item.peso} kg</p>
                          </div>
                        )}
                        {item.cintura && (
                          <div>
                            <p className="text-xs text-foreground/60">Cintura</p>
                            <p className="font-bold text-foreground">{item.cintura} cm</p>
                          </div>
                        )}
                        {item.energia && (
                          <div>
                            <p className="text-xs text-foreground/60">Energia</p>
                            <p className="font-bold text-foreground">{item.energia}/10</p>
                          </div>
                        )}
                        {item.humor && (
                          <div>
                            <p className="text-xs text-foreground/60">Humor</p>
                            <p className="font-bold text-foreground">{item.humor}/10</p>
                          </div>
                        )}
                        {item.treinos_feitos > 0 && (
                          <div>
                            <p className="text-xs text-foreground/60">Treinos</p>
                            <p className="font-bold text-foreground">{item.treinos_feitos}x</p>
                          </div>
                        )}
                      </div>
                      {item.notas && (
                        <p className="text-sm text-foreground/70 mt-1">{item.notas}</p>
                      )}
                    </div>
                    <p className="text-xs text-foreground/40 shrink-0">
                      {new Date(item.created_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Barra de Progresso Geral */}
          <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-8">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Você está no caminho certo! 🎯
            </h2>
            <p className="text-foreground/80 mb-4">
              Semana {semanaAtual} de 12. Continue assim e verá resultados incríveis!
            </p>
            <div className="w-full bg-border rounded-full h-4 overflow-hidden mb-3">
              <div
                className="bg-gradient-to-r from-primary to-accent h-full transition-all duration-500"
                style={{ width: `${Math.round((semanaAtual / 12) * 100)}%` }}
              />
            </div>
            <p className="text-sm text-foreground/70">
              Próximo marco: Semana {Math.min(semanaAtual + 2, 12)} 🌸
            </p>
          </div>
        </>
      )}

      {/* Certificados */}
      <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl p-8 border border-border">
        <h2 className="font-display text-2xl font-bold text-foreground mb-6">
          Seus Certificados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`bg-card rounded-xl p-6 border-2 text-center ${semanaAtual >= 12 ? 'border-accent' : 'border-border/50 opacity-60'}`}>
            <Award className={`mx-auto mb-4 ${semanaAtual >= 12 ? 'text-accent' : 'text-foreground/40'}`} size={48} />
            <h3 className="font-display text-xl font-bold text-foreground mb-2">Ciclo 1 Completo</h3>
            <p className="text-sm text-foreground/70 mb-2">
              {semanaAtual >= 12 ? '✅ Conquistado!' : 'Quando você completar as 12 semanas'}
            </p>
          </div>
          <div className="bg-card rounded-xl p-6 border-2 border-border/50 text-center opacity-40">
            <Award className="mx-auto text-foreground/40 mb-4" size={48} />
            <h3 className="font-display text-xl font-bold text-foreground/60 mb-2">Ciclo 2 Completo</h3>
            <p className="text-sm text-foreground/50">Próximo desafio (24 semanas)</p>
          </div>
        </div>
      </div>

      {/* Modal Novo Check-in */}
      {showNovoCheckin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowNovoCheckin(false)} />
          <div className="relative bg-card rounded-2xl shadow-2xl border border-border w-full max-w-md z-10 overflow-hidden">
            <div className="bg-gradient-to-r from-secondary to-primary p-5 flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-bold text-white">Check-in Semanal</h2>
                <p className="text-white/80 text-sm">Semana {semanaAtual}</p>
              </div>
              <button onClick={() => setShowNovoCheckin(false)} className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-lg">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleNovoCheckin} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Peso (kg)</label>
                  <input type="number" step="0.1" placeholder="Ex: 70.2" value={novoForm.peso}
                    onChange={e => setNovoForm(f => ({ ...f, peso: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Cintura (cm)</label>
                  <input type="number" step="0.5" placeholder="Ex: 85" value={novoForm.cintura}
                    onChange={e => setNovoForm(f => ({ ...f, cintura: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Energia: <span className="text-primary font-bold">{novoForm.energia}/10</span>
                </label>
                <input type="range" min="1" max="10" value={novoForm.energia}
                  onChange={e => setNovoForm(f => ({ ...f, energia: e.target.value }))}
                  className="w-full accent-primary" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Humor: <span className="text-primary font-bold">{novoForm.humor}/10</span>
                </label>
                <input type="range" min="1" max="10" value={novoForm.humor}
                  onChange={e => setNovoForm(f => ({ ...f, humor: e.target.value }))}
                  className="w-full accent-primary" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Treinos feitos esta semana</label>
                <input type="number" min="0" max="7" placeholder="0" value={novoForm.treinos_feitos}
                  onChange={e => setNovoForm(f => ({ ...f, treinos_feitos: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Como foi esta semana?</label>
                <textarea placeholder="Escreva como você se sente..." value={novoForm.notas}
                  onChange={e => setNovoForm(f => ({ ...f, notas: e.target.value }))}
                  rows={2} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
              </div>
              <Button type="submit" disabled={saving} className="w-full bg-primary hover:bg-primary/90 text-white font-bold">
                {saving ? 'Salvando...' : '✅ Salvar Check-in'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
