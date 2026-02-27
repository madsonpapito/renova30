"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, CheckCircle2, ChevronDown } from 'lucide-react';

const PLANO_SEMANAS = [
    { semana: 1, foco: 'Ativação Hormonal', descricao: 'Despertar o metabolismo adormecido. Primeiros movimentos conscientes.', cor: 'from-orange-500 to-amber-400' },
    { semana: 2, foco: 'Queima Abdominal', descricao: 'Foco no core e na redução do cortisol para diminuir a barriga.', cor: 'from-rose-500 to-pink-500' },
    { semana: 3, foco: 'Energia e Disposição', descricao: 'Sequências para aumentar serotonina e melhorar o humor.', cor: 'from-violet-500 to-purple-500' },
    { semana: 4, foco: 'Desintoxicação', descricao: 'Movimentos linfáticos para desinchaço e eliminação de toxinas.', cor: 'from-cyan-500 to-blue-500' },
];

const CHECKLIST = [
    { label: 'Peso atual (kg)', key: 'peso' },
    { label: 'Medida abdominal (cm)', key: 'cintura' },
    { label: 'Energia do dia (1-10)', key: 'energia' },
    { label: 'Qualidade do sono', key: 'sono' },
    { label: 'Treino concluído?', key: 'treino' },
];

export default function ProtocoloPage() {
    const [checklist, setChecklist] = useState<Record<string, boolean>>({});
    const [expandedWeek, setExpandedWeek] = useState<number | null>(1);

    const toggle = (key: string) => setChecklist(prev => ({ ...prev, [key]: !prev[key] }));

    return (
        <div className="min-h-screen bg-[#0F0F13] text-white font-sans pb-20">

            {/* Header */}
            <header className="bg-[#18181F] border-b border-white/10 px-6 py-4 flex items-center gap-4 sticky top-0 z-50">
                <Link href="/members" className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
                    <ArrowLeft className="w-5 h-5 text-gray-300" />
                </Link>
                <div>
                    <h1 className="font-black text-white text-lg leading-tight">Meu Protocolo</h1>
                    <p className="text-gray-500 text-xs">Plano Hormonal Personalizado · 12 Semanas</p>
                </div>
            </header>

            <main className="px-6 max-w-2xl mx-auto pt-8 flex flex-col gap-8">

                {/* Perfil Hormonal Card */}
                <div className="bg-gradient-to-br from-orange-600/20 to-amber-500/10 border border-orange-500/30 rounded-2xl p-6">
                    <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-2">Seu Diagnóstico</p>
                    <h2 className="text-2xl font-black mb-1">Metabolismo Lento</h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        Com base nas suas respostas, identificamos que sua principal barreira é o <strong className="text-white">desequilíbrio hormonal pós-menopausa</strong>, causando retenção abdominal e baixa energia. O protocolo abaixo foi desenhado para reverter isso em 30 dias.
                    </p>
                    <a
                        href="/pdfs/protocolo-personalizado.pdf"
                        download
                        className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-3 rounded-xl transition shadow-lg shadow-orange-500/30"
                    >
                        <Download className="w-5 h-5" />
                        Baixar meu Protocolo PDF
                    </a>
                </div>

                {/* Plano de 12 Semanas */}
                <section>
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Plano de 12 Semanas</h2>
                    <div className="flex flex-col gap-3">
                        {PLANO_SEMANAS.map((s) => (
                            <div key={s.semana} className="bg-[#18181F] border border-white/5 rounded-2xl overflow-hidden">
                                <button
                                    onClick={() => setExpandedWeek(expandedWeek === s.semana ? null : s.semana)}
                                    className="w-full flex items-center gap-4 p-4 text-left"
                                >
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.cor} flex items-center justify-center flex-shrink-0 font-black text-white text-sm shadow-md`}>
                                        {s.semana}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">Semana {s.semana}</p>
                                        <p className="font-bold text-white text-sm">{s.foco}</p>
                                    </div>
                                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${expandedWeek === s.semana ? 'rotate-180' : ''}`} />
                                </button>
                                {expandedWeek === s.semana && (
                                    <div className="px-4 pb-4">
                                        <p className="text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-3">{s.descricao}</p>
                                        <p className="text-gray-600 text-xs mt-2">Treinos específicos disponíveis no módulo de Treinos.</p>
                                    </div>
                                )}
                            </div>
                        ))}
                        {/* Semanas em breve */}
                        {[5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
                            <div key={n} className="bg-[#18181F]/50 border border-white/5 rounded-2xl p-4 flex items-center gap-4 opacity-40">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-black text-gray-500 text-sm">{n}</div>
                                <div>
                                    <p className="text-[10px] text-gray-600 uppercase tracking-wider">Semana {n}</p>
                                    <p className="text-gray-500 text-sm font-bold">Disponível em breve</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Checklist Semanal */}
                <section>
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Checklist de Hoje</h2>
                    <div className="bg-[#18181F] border border-white/5 rounded-2xl p-5 flex flex-col gap-4">
                        {CHECKLIST.map((item) => (
                            <button
                                key={item.key}
                                onClick={() => toggle(item.key)}
                                className="flex items-center gap-3 text-left group"
                            >
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${checklist[item.key] ? 'border-green-500 bg-green-500' : 'border-gray-600 group-hover:border-orange-400'}`}>
                                    {checklist[item.key] && <CheckCircle2 className="w-4 h-4 text-white" />}
                                </div>
                                <span className={`text-sm font-semibold transition-colors ${checklist[item.key] ? 'text-gray-500 line-through' : 'text-white'}`}>
                                    {item.label}
                                </span>
                            </button>
                        ))}
                        <div className="border-t border-white/5 pt-3 mt-2 text-xs text-gray-600 text-center">
                            {Object.values(checklist).filter(Boolean).length} de {CHECKLIST.length} concluídos hoje
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}
