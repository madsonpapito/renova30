"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, PlayCircle, Clock, Lock, Flame, Zap, Heart } from 'lucide-react';

const FILTROS = ['Todos', 'Semana 1', 'Barriga', 'Energia', 'Alongamento'];

const TREINOS = [
    { id: 1, titulo: 'Barriga Plana', descricao: 'Core profundo + ativação do transverso abdominal', tempo: '10 min', nivel: 'Iniciante', semana: 1, categoria: 'Barriga', available: true, cor: 'from-rose-600 to-pink-500' },
    { id: 2, titulo: 'Energia Total', descricao: 'Sequência para despertar o corpo e aumentar a disposição', tempo: '12 min', nivel: 'Iniciante', semana: 1, categoria: 'Energia', available: true, cor: 'from-amber-500 to-orange-500' },
    { id: 3, titulo: 'Tonificação de Braços', descricao: 'Foco em bíceps, tríceps e ombros com o peso do corpo', tempo: '10 min', nivel: 'Iniciante', semana: 1, categoria: 'Todos', available: true, cor: 'from-violet-600 to-purple-500' },
    { id: 4, titulo: 'Flexibilidade Total', descricao: 'Alongamento profundo para liberar tensões musculares', tempo: '15 min', nivel: 'Iniciante', semana: 1, categoria: 'Alongamento', available: true, cor: 'from-cyan-500 to-blue-500' },
    { id: 5, titulo: 'Glúteos e Pernas', descricao: 'Ativação do glúteo médio e tonificação das coxas', tempo: '10 min', nivel: 'Intermediário', semana: 2, categoria: 'Barriga', available: false, cor: 'from-green-500 to-emerald-400' },
    { id: 6, titulo: 'Postura Perfeita', descricao: 'Trabalha coluna, ombros e pescoço para aliviar dores', tempo: '10 min', nivel: 'Iniciante', semana: 2, categoria: 'Alongamento', available: false, cor: 'from-orange-400 to-red-400' },
];

const NIVEL_COLOR: Record<string, string> = {
    'Iniciante': 'text-green-400 bg-green-400/10',
    'Intermediário': 'text-yellow-400 bg-yellow-400/10',
    'Avançado': 'text-red-400 bg-red-400/10',
};

export default function TreinosPage() {
    const [filtro, setFiltro] = useState('Todos');

    const treinosFiltrados = TREINOS.filter(t =>
        filtro === 'Todos' ? true :
            filtro.startsWith('Semana') ? `Semana ${t.semana}` === filtro :
                t.categoria === filtro
    );

    return (
        <div className="min-h-screen bg-[#0F0F13] text-white font-sans pb-20">

            {/* Header */}
            <header className="bg-[#18181F] border-b border-white/10 px-6 py-4 flex items-center gap-4 sticky top-0 z-50">
                <Link href="/members" className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
                    <ArrowLeft className="w-5 h-5 text-gray-300" />
                </Link>
                <div>
                    <h1 className="font-black text-white text-lg leading-tight">Treinos Renova 30</h1>
                    <p className="text-gray-500 text-xs">12 semanas · 10 min/dia</p>
                </div>
            </header>

            <main className="px-6 max-w-2xl mx-auto pt-8">

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    {[
                        { icon: Flame, label: 'Treinos', value: '4 feitos', cor: 'text-rose-400' },
                        { icon: Clock, label: 'Tempo total', value: '47 min', cor: 'text-amber-400' },
                        { icon: Zap, label: 'Sequência', value: '4 dias', cor: 'text-violet-400' },
                    ].map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <div key={i} className="bg-[#18181F] border border-white/5 rounded-xl p-3 flex flex-col items-center gap-1 text-center">
                                <Icon className={`w-5 h-5 ${s.cor}`} />
                                <p className="font-black text-sm">{s.value}</p>
                                <p className="text-gray-600 text-[10px] uppercase tracking-wider">{s.label}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Filtros */}
                <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1 scrollbar-hide">
                    {FILTROS.map(f => (
                        <button
                            key={f}
                            onClick={() => setFiltro(f)}
                            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${filtro === f ? 'bg-orange-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Treinos Grid */}
                <div className="flex flex-col gap-4">
                    {treinosFiltrados.map(treino => (
                        <div key={treino.id} className={`bg-[#18181F] border border-white/5 rounded-2xl overflow-hidden ${!treino.available ? 'opacity-60' : ''}`}>
                            <div className="p-4 flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${treino.cor} flex items-center justify-center flex-shrink-0 shadow-lg relative`}>
                                    {treino.available
                                        ? <PlayCircle className="w-7 h-7 text-white" />
                                        : <Lock className="w-5 h-5 text-white/60" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <h3 className="font-black text-white text-base truncate">{treino.titulo}</h3>
                                        {!treino.available && <span className="text-[10px] font-bold bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full flex-shrink-0">Semana {treino.semana}</span>}
                                    </div>
                                    <p className="text-gray-500 text-xs truncate mb-2">{treino.descricao}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="flex items-center gap-1 text-xs text-gray-500"><Clock className="w-3 h-3" />{treino.tempo}</span>
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${NIVEL_COLOR[treino.nivel]}`}>{treino.nivel}</span>
                                    </div>
                                </div>
                            </div>
                            {treino.available && (
                                <div className="px-4 pb-4">
                                    <button className={`w-full bg-gradient-to-r ${treino.cor} text-white font-black py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg hover:opacity-90 transition`}>
                                        <PlayCircle className="w-4 h-4" /> Iniciar Treino
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </main>
        </div>
    );
}
