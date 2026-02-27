import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function LoginPage() {
    const { signIn, signUp } = useAuth();
    const [mode, setMode] = useState<'login' | 'cadastro'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nome, setNome] = useState('');
    const [showPwd, setShowPwd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        if (mode === 'login') {
            const { error } = await signIn(email, password);
            if (error) {
                setError('Email ou senha inválidos. Verifique suas credenciais.');
            }
        } else {
            if (!nome.trim()) { setError('Digite seu nome.'); setLoading(false); return; }
            if (password.length < 6) { setError('A senha precisa ter pelo menos 6 caracteres.'); setLoading(false); return; }
            const { error } = await signUp(email, password, nome);
            if (error) {
                setError('Erro ao criar conta. Tente novamente.');
            } else {
                setSuccess('Conta criada! Verifique seu email para ativar o acesso.');
            }
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary mb-4 shadow-lg">
                        <span className="text-2xl font-black text-white">R</span>
                    </div>
                    <h1 className="text-3xl font-black text-foreground">Renova 30</h1>
                    <p className="text-foreground/60 mt-1">Área Exclusiva de Alunas</p>
                </div>

                {/* Card */}
                <div className="bg-card border border-border rounded-2xl shadow-xl p-8">
                    {/* Tabs */}
                    <div className="flex rounded-xl bg-border/30 p-1 mb-6">
                        <button
                            onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'login' ? 'bg-card shadow text-foreground' : 'text-foreground/50 hover:text-foreground'}`}
                        >
                            Entrar
                        </button>
                        <button
                            onClick={() => { setMode('cadastro'); setError(''); setSuccess(''); }}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'cadastro' ? 'bg-card shadow text-foreground' : 'text-foreground/50 hover:text-foreground'}`}
                        >
                            Criar Conta
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {mode === 'cadastro' && (
                            <div>
                                <label className="block text-sm font-semibold text-foreground mb-1.5">Seu nome</label>
                                <input
                                    type="text"
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                    placeholder="Como posso te chamar?"
                                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-semibold text-foreground mb-1.5">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="seu@email.com"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-foreground mb-1.5">Senha</label>
                            <div className="relative">
                                <input
                                    type={showPwd ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder={mode === 'cadastro' ? 'Mínimo 6 caracteres' : '••••••••'}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPwd(!showPwd)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground transition"
                                >
                                    {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-xl px-4 py-3 text-sm font-medium">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm font-medium">
                                {success}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 font-bold text-base rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white shadow-lg transition"
                        >
                            {loading ? (
                                <Loader2 size={20} className="animate-spin mr-2" />
                            ) : null}
                            {loading ? 'Aguarde...' : mode === 'login' ? 'Acessar Minha Área' : 'Criar Conta Agora'}
                        </Button>
                    </form>

                    {mode === 'login' && (
                        <p className="text-center text-sm text-foreground/50 mt-4">
                            Ainda não tem conta?{' '}
                            <button onClick={() => setMode('cadastro')} className="text-primary font-semibold hover:underline">
                                Criar acesso
                            </button>
                        </p>
                    )}
                </div>

                <p className="text-center text-xs text-foreground/40 mt-6">
                    🔒 Área segura e exclusiva para alunas do Renova 30
                </p>
            </div>
        </div>
    );
}
