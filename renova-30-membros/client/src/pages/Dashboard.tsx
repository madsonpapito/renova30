import { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Download, LogOut, Rocket, X, Scale, Ruler, Zap, Smile, Pencil, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface DashboardProps {
  onNavigate: (section: string) => void;
}

interface BaselineCheckin {
  id: string;
  peso: number | null;
  cintura: number | null;
  humor: number | null;
  energia: number | null;
  notas: string | null;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { profile, signOut, user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [baseline, setBaseline] = useState<BaselineCheckin | null | undefined>(undefined); // undefined = loading
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    peso: '',
    cintura: '',
    quadril: '',
    energia: '5',
    humor: '5',
    notas: '',
  });

  const daysInProgram = profile?.dias_no_programa ?? 0;
  const currentWeek = profile?.semana_atual ?? 1;
  const totalWeeks = 12;
  const firstName = profile?.nome?.split(' ')[0] ?? 'Aluna';

  const progressPercent = daysInProgram === 0
    ? 0
    : Math.min(Math.round((daysInProgram / 84) * 100), 100);

  // Busca checkin baseline (semana 0) ao carregar
  useEffect(() => {
    if (!user) return;
    supabase
      .from('checkins')
      .select('id, peso, cintura, humor, energia, notas')
      .eq('user_id', user.id)
      .eq('semana', 0)
      .maybeSingle()
      .then(({ data }) => {
        setBaseline(data ?? null);
        // Se existir, pré-preenche o formulário
        if (data) {
          setForm({
            peso: data.peso?.toString() ?? '',
            cintura: data.cintura?.toString() ?? '',
            quadril: '',
            energia: data.energia?.toString() ?? '5',
            humor: data.humor?.toString() ?? '5',
            notas: data.notas ?? '',
          });
        }
      });
  }, [user]);

  function abrirModal(editMode = false) {
    setIsEditing(editMode);
    setShowModal(true);
    setSaved(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);

    try {
      if (isEditing && baseline) {
        // EDIÇÃO — atualiza o checkin existente
        const { error } = await supabase
          .from('checkins')
          .update({
            peso: form.peso ? parseFloat(form.peso) : null,
            cintura: form.cintura ? parseFloat(form.cintura) : null,
            humor: parseInt(form.humor),
            energia: parseInt(form.energia),
            notas: form.notas || (form.quadril ? `Quadril: ${form.quadril} cm` : null),
          })
          .eq('id', baseline.id);

        if (!error) {
          // Atualiza baseline local com novos valores
          setBaseline(prev => prev ? {
            ...prev,
            peso: form.peso ? parseFloat(form.peso) : null,
            cintura: form.cintura ? parseFloat(form.cintura) : null,
            humor: parseInt(form.humor),
            energia: parseInt(form.energia),
            notas: form.notas || null,
          } : null);
          setSaved(true);
          setTimeout(() => {
            setShowModal(false);
            setSaved(false);
          }, 1500);
        }
      } else {
        // NOVO — insere baseline
        const novoBaseline = {
          user_id: user.id,
          semana: 0,
          peso: form.peso ? parseFloat(form.peso) : null,
          cintura: form.cintura ? parseFloat(form.cintura) : null,
          humor: parseInt(form.humor),
          energia: parseInt(form.energia),
          treinos_feitos: 0,
          notas: form.notas || (form.quadril ? `Medidas iniciais — Quadril: ${form.quadril} cm` : null),
        };

        const { data, error } = await supabase
          .from('checkins')
          .insert(novoBaseline)
          .select('id, peso, cintura, humor, energia, notas')
          .single();

        if (!error && data) {
          setBaseline(data);
          // Atualiza dias_no_programa para 1
          await supabase
            .from('profiles')
            .update({ dias_no_programa: 1, updated_at: new Date().toISOString() })
            .eq('id', user.id);

          setSaved(true);
          setTimeout(() => {
            setShowModal(false);
            setSaved(false);
            onNavigate('progresso');
          }, 1500);
        }
      }
    } finally {
      setSaving(false);
    }
  }

  const jornadaIniciada = baseline !== undefined && baseline !== null;
  const loadingBaseline = baseline === undefined;

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
                  {daysInProgram === 0 ? 'Jornada não iniciada' : `Semana ${currentWeek} de ${totalWeeks}`}
                </span>
                <span className="text-sm font-bold text-primary">
                  {progressPercent}%
                </span>
              </div>
              <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary to-accent h-full transition-all duration-700"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Botão dinâmico baseado no estado */}
            {loadingBaseline ? (
              <div className="flex items-center justify-center py-2">
                <Loader2 size={18} className="animate-spin text-primary/50" />
              </div>
            ) : jornadaIniciada ? (
              // Jornada já iniciada → botão Editar
              <Button
                variant="outline"
                onClick={() => abrirModal(true)}
                className="w-full flex items-center gap-2 text-foreground/70 border-border hover:border-primary hover:text-primary"
              >
                <Pencil size={14} />
                Editar Medidas Iniciais
              </Button>
            ) : (
              // Jornada não iniciada → botão Iniciar
              <Button
                onClick={() => abrirModal(false)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
              >
                <Rocket size={16} />
                Iniciar Minha Jornada
              </Button>
            )}
          </div>
        </div>

        {/* Next Workout */}
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-xl font-bold text-foreground">
              Próximo Treino
            </h3>
            <Clock className="text-secondary" size={24} />
          </div>
          <p className="text-sm text-foreground/70 mb-3">
            Semana {currentWeek}: Despertar Hormonal
          </p>
          <p className="text-3xl font-bold text-foreground mb-4">10 min</p>
          <Button
            onClick={() => onNavigate('treinos')}
            className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          >
            Acessar Treino
          </Button>
        </div>

        {/* Community */}
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-xl font-bold text-foreground">
              Comunidade
            </h3>
            <Users className="text-accent" size={24} />
          </div>
          <p className="text-sm text-foreground/70 mb-3">Alunas Ativas</p>
          <p className="text-3xl font-bold text-foreground mb-4">1.247+</p>
          <Button
            variant="outline"
            onClick={() => onNavigate('comunidade')}
            className="w-full"
          >
            Entrar no Grupo
          </Button>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
        <h2 className="font-display text-2xl font-bold text-foreground mb-6">
          Histórias de Transformação
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-foreground/80 italic mb-3">
              "Em 12 semanas perdi 8kg, minha energia voltou e me sinto 10 anos mais jovem. Renova 30 mudou minha vida!"
            </p>
            <p className="font-bold text-foreground">Vanessa M.</p>
            <p className="text-sm text-foreground/60">São Paulo, SP</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20">
            <p className="text-foreground/80 italic mb-3">
              "Os treinos são curtos mas muito eficazes. A comunidade me motivou todos os dias. Recomendo!"
            </p>
            <p className="font-bold text-foreground">Carla S.</p>
            <p className="text-sm text-foreground/60">Rio de Janeiro, RJ</p>
          </div>
        </div>
      </div>

      {/* Quick Access Bonus */}
      <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
        <h2 className="font-display text-2xl font-bold text-foreground mb-6">
          Acesso Rápido aos Bônus
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'Guia Caça ao Tesouro', desc: 'Nutrientes-chave para menopausa' },
            { title: 'Quebre o Ciclo', desc: 'Controle emocional + 3 áudios' },
          ].map((b) => (
            <div
              key={b.title}
              className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-primary/5 transition-colors cursor-pointer"
              onClick={() => onNavigate('bonus')}
            >
              <Download className="text-primary shrink-0" size={20} />
              <div>
                <p className="font-bold text-foreground">{b.title}</p>
                <p className="text-sm text-foreground/70">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== MODAL INICIAR / EDITAR JORNADA ===== */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-card rounded-2xl shadow-2xl border border-border w-full max-w-md z-10 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white">
                    {isEditing ? '✏️ Editar Medidas Iniciais' : '🌸 Sua Jornada Começa Agora'}
                  </h2>
                  <p className="text-white/80 text-sm mt-1">
                    {isEditing
                      ? 'Corrija qualquer medida incorreta'
                      : 'Registre suas medidas iniciais para acompanhar seu progresso real'}
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-2">
                    <Scale size={14} className="text-primary" />
                    Peso atual (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Ex: 72.5"
                    value={form.peso}
                    onChange={e => setForm(f => ({ ...f, peso: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-2">
                    <Ruler size={14} className="text-secondary" />
                    Cintura (cm)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    placeholder="Ex: 88"
                    value={form.cintura}
                    onChange={e => setForm(f => ({ ...f, cintura: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>

              {!isEditing && (
                <div>
                  <label className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-2">
                    <Ruler size={14} className="text-accent" />
                    Quadril (cm) <span className="text-foreground/50 font-normal">(opcional)</span>
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    placeholder="Ex: 102"
                    value={form.quadril}
                    onChange={e => setForm(f => ({ ...f, quadril: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              )}

              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-3">
                  <Zap size={14} className="text-yellow-500" />
                  Nível de energia: <span className="text-primary font-bold ml-1">{form.energia}/10</span>
                </label>
                <input
                  type="range" min="1" max="10"
                  value={form.energia}
                  onChange={e => setForm(f => ({ ...f, energia: e.target.value }))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-foreground/50 mt-1">
                  <span>Sem energia</span>
                  <span>Cheia de energia</span>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-3">
                  <Smile size={14} className="text-pink-500" />
                  Humor: <span className="text-primary font-bold ml-1">{form.humor}/10</span>
                </label>
                <input
                  type="range" min="1" max="10"
                  value={form.humor}
                  onChange={e => setForm(f => ({ ...f, humor: e.target.value }))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-foreground/50 mt-1">
                  <span>😞 Difícil</span>
                  <span>😊 Ótimo</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Como você está se sentindo?{' '}
                  <span className="text-foreground/50 font-normal">(opcional)</span>
                </label>
                <textarea
                  placeholder="Ex: Cansada, com afrontamentos frequentes, mas determinada a mudar..."
                  value={form.notas}
                  onChange={e => setForm(f => ({ ...f, notas: e.target.value }))}
                  rows={2}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={saving || saved}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-bold py-3 text-base"
              >
                {saved
                  ? (isEditing ? '✅ Medidas atualizadas!' : '✅ Jornada iniciada! Redirecionando...')
                  : saving
                    ? 'Salvando...'
                    : isEditing
                      ? '💾 Salvar Correções'
                      : '🚀 Iniciar Minha Jornada'}
              </Button>

              <p className="text-xs text-center text-foreground/50">
                Suas medidas ficam guardadas com segurança apenas para você
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
