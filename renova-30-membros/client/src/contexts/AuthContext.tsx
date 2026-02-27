import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface Profile {
    id: string;
    email: string;
    nome: string | null;
    semana_atual: number;
    dias_no_programa: number;
}

interface AuthContextType {
    user: User | null;
    session: Session | null;
    profile: Profile | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<{ error: string | null }>;
    signUp: (email: string, password: string, nome: string) => Promise<{ error: string | null }>;
    signOut: () => Promise<void>;
    updateProfile: (data: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Verifica sessão ativa ao carregar
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchProfile(session.user.id);
            } else {
                setLoading(false);
            }
        });

        // Escuta mudanças de autenticação em tempo real
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchProfile(session.user.id);
            } else {
                setProfile(null);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    async function fetchProfile(userId: string) {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error && error.code !== 'PGRST116') {
                console.error('Erro ao buscar perfil:', error);
            }
            setProfile(data ?? null);
        } finally {
            setLoading(false);
        }
    }

    async function signIn(email: string, password: string) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { error: error.message };
        return { error: null };
    }

    async function signUp(email: string, password: string, nome: string) {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) return { error: error.message };

        // Cria perfil no banco após cadastro
        if (data.user) {
            const { error: profileError } = await supabase.from('profiles').insert({
                id: data.user.id,
                email,
                nome,
                semana_atual: 1,
                dias_no_programa: 0,
            });
            if (profileError) console.error('Erro ao criar perfil:', profileError);
        }
        return { error: null };
    }

    async function signOut() {
        await supabase.auth.signOut();
    }

    async function updateProfile(data: Partial<Profile>) {
        if (!user) return;
        const { error } = await supabase
            .from('profiles')
            .update({ ...data, updated_at: new Date().toISOString() })
            .eq('id', user.id);
        if (!error) {
            setProfile(prev => prev ? { ...prev, ...data } : null);
        }
    }

    return (
        <AuthContext.Provider value={{ user, session, profile, loading, signIn, signUp, signOut, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
    return context;
}
