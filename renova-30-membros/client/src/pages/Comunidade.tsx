import { Users, MessageCircle, Heart, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Comunidade() {
  const depoimentos = [
    {
      id: 1,
      nome: 'Vanessa M.',
      cidade: 'São Paulo, SP',
      texto: 'Em 12 semanas perdi 8kg, minha energia voltou e me sinto 10 anos mais jovem!',
      likes: 234,
      foto: '👩‍🦰',
    },
    {
      id: 2,
      nome: 'Carla S.',
      cidade: 'Rio de Janeiro, RJ',
      texto: 'Os treinos são curtos mas muito eficazes. A comunidade me motivou todos os dias.',
      likes: 189,
      foto: '👩‍🦱',
    },
    {
      id: 3,
      nome: 'Mariana L.',
      cidade: 'Belo Horizonte, MG',
      texto: 'Não acreditava que conseguiria em 12 semanas. Mas consegui! Recomendo muito!',
      likes: 156,
      foto: '👩',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl font-bold text-foreground mb-2">
          Comunidade Renova 30
        </h1>
        <p className="text-lg text-foreground/80">
          Conecte-se com outras alunas, compartilhe progressos e receba apoio
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-foreground">Alunas Ativas</h3>
            <Users className="text-primary" size={24} />
          </div>
          <p className="text-3xl font-bold text-primary mb-1">1.247+</p>
          <p className="text-sm text-foreground/70">Mulheres transformando suas vidas</p>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-foreground">Mensagens Diárias</h3>
            <MessageCircle className="text-secondary" size={24} />
          </div>
          <p className="text-3xl font-bold text-secondary mb-1">500+</p>
          <p className="text-sm text-foreground/70">Dicas, dúvidas e celebrações</p>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-foreground">Transformações</h3>
            <Heart className="text-accent" size={24} />
          </div>
          <p className="text-3xl font-bold text-accent mb-1">89%</p>
          <p className="text-sm text-foreground/70">Atingem seus objetivos</p>
        </div>
      </div>

      {/* Join Community */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-8 border border-border">
        <h2 className="font-display text-2xl font-bold text-foreground mb-4">
          Junte-se à Comunidade Exclusiva
        </h2>
        <p className="text-foreground/80 mb-6">
          Nossa comunidade fechada é um espaço seguro onde você pode compartilhar seus progressos, tirar dúvidas e receber apoio de outras mulheres na mesma jornada.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://t.me/renova30oficial"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2">
              <ExternalLink size={18} />
              Entrar no Telegram
            </Button>
          </a>
          <a
            href="https://www.facebook.com/groups/renova30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground flex items-center justify-center gap-2">
              <ExternalLink size={18} />
              Entrar no Facebook
            </Button>
          </a>
        </div>
      </div>

      {/* Community Rules */}
      <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
        <h2 className="font-display text-2xl font-bold text-foreground mb-6">
          Regras da Comunidade
        </h2>
        <div className="space-y-4">
          {[
            { titulo: 'Apoio Mútuo', desc: 'Somos todas amigas aqui. Vamos nos apoiar e celebrar nossas vitórias juntas.' },
            { titulo: 'Compartilhe Progressos', desc: 'Poste suas fotos antes/depois, pesos, medidas e como você se sente.' },
            { titulo: 'Tire Dúvidas', desc: 'Não tem dúvida boba. Pergunte! Outras alunas ou Laís responderão.' },
            { titulo: 'Respeito', desc: 'Cada corpo é diferente. Respeite o ritmo e a jornada de cada uma.' },
            { titulo: 'Sem Spam', desc: 'Não promova produtos ou serviços. Este é um espaço exclusivo para alunas.' },
          ].map((rule, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 rounded-lg border border-border/50">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                ✓
              </div>
              <div>
                <h3 className="font-bold text-foreground">{rule.titulo}</h3>
                <p className="text-sm text-foreground/70">{rule.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
        <h2 className="font-display text-2xl font-bold text-foreground mb-6">
          Histórias da Comunidade
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {depoimentos.map((depoimento) => (
            <div key={depoimento.id} className="p-6 rounded-lg border border-border hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">{depoimento.foto}</div>
                <div>
                  <h3 className="font-bold text-foreground">{depoimento.nome}</h3>
                  <p className="text-xs text-foreground/60">{depoimento.cidade}</p>
                </div>
              </div>
              <p className="text-sm text-foreground/80 italic mb-4 border-l-4 border-primary/30 pl-4">
                {depoimento.texto}
              </p>
              <div className="flex items-center gap-2 text-sm text-foreground/60">
                <Heart size={16} />
                {depoimento.likes} pessoas amaram
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Sessions */}
      <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-8">
        <h2 className="font-display text-2xl font-bold text-foreground mb-6">
          Lives Mensais
        </h2>
        <p className="text-foreground/80 mb-6">
          Laís faz lives mensais na comunidade para responder perguntas, dar dicas e celebrar as transformações das alunas.
        </p>
        <div className="space-y-4">
          {[
            { data: 'Próxima: 15 de março', tema: 'Perguntas da Semana', descricao: 'Você faz as perguntas, Laís responde ao vivo!' },
            { data: 'Próxima: 29 de março', tema: 'Histórias de Sucesso', descricao: 'Alunas compartilham suas transformações' },
          ].map((live, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-white/50 border border-secondary/20">
              <p className="text-xs font-bold text-secondary mb-1">{live.data}</p>
              <h3 className="font-bold text-foreground">{live.tema}</h3>
              <p className="text-sm text-foreground/70">{live.descricao}</p>
            </div>
          ))}
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
              A comunidade é realmente fechada?
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-3 text-sm text-foreground/70 pl-4">
              Sim! Apenas alunas do Renova 30 podem entrar. Isso garante um espaço seguro e exclusivo.
            </p>
          </details>
          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground hover:text-primary transition-colors">
              Laís responde todas as dúvidas?
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-3 text-sm text-foreground/70 pl-4">
              Laís posta dicas semanais/mensais, mas não promete responder individualmente. Porém, outras alunas são muito ativas em ajudar!
            </p>
          </details>
          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground hover:text-primary transition-colors">
              Posso compartilhar fotos antes/depois?
              <span className="transition group-open:rotate-180\">▼</span>
            </summary>
            <p className="mt-3 text-sm text-foreground/70 pl-4">
              Claro! Muitas alunas compartilham e recebem muito apoio. Mas é totalmente opcional.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
