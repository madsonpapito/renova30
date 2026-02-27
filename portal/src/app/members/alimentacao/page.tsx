"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, ChevronDown } from 'lucide-react';

const CARDAPIOS = [
    {
        semana: 1,
        titulo: 'Semana Anti-Inflamatória',
        refeicoes: [
            { tipo: 'Café da Manhã', descricao: 'Ovos mexidos com espinafre + 1 fruta vermelha' },
            { tipo: 'Almoço', descricao: 'Filé de frango grelhado + salada verde + arroz integral' },
            { tipo: 'Lanche', descricao: 'Iogurte grego sem açúcar + amêndoas' },
            { tipo: 'Jantar', descricao: 'Sopa de legumes com frango desfiado leve' },
        ]
    },
    {
        semana: 2,
        titulo: 'Semana Desintoxicante',
        refeicoes: [
            { tipo: 'Café da Manhã', descricao: 'Mingau de aveia com canela + 1 banana' },
            { tipo: 'Almoço', descricao: 'Peixe assado + mandioca cozida + folhas verdes' },
            { tipo: 'Lanche', descricao: 'Chá verde sem açúcar + 3 castanhas-do-pará' },
            { tipo: 'Jantar', descricao: 'Omelete de 3 ovos com legumes coloridos' },
        ]
    },
];

const SUBSTITUICOES = [
    { original: 'Leite de vaca', substituto: 'Leite de amêndoa / aveia', tag: 'Sem lactose' },
    { original: 'Pão de forma', substituto: 'Pão de mandioca / milho', tag: 'Sem glúten' },
    { original: 'Carne vermelha', substituto: 'Frango ou peixe', tag: 'Vegetariano' },
    { original: 'Açúcar branco', substituto: 'Mel ou adoçante natural', tag: 'Todos' },
    { original: 'Massa de trigo', substituto: 'Macarrão de arroz ou abobrinha', tag: 'Sem glúten' },
];

const TAG_COLORS: Record<string, string> = {
    'Sem lactose': 'bg-yellow-400/10 text-yellow-400',
    'Sem glúten': 'bg-cyan-400/10 text-cyan-400',
    'Vegetariano': 'bg-green-400/10 text-green-400',
    'Todos': 'bg-gray-400/10 text-gray-400',
};

export default function AlimentacaoPage() {
    const [expandedWeek, setExpandedWeek] = useState<number | null>(1);

    return (
        <div className="min-h-screen bg-[#0F0F13] text-white font-sans pb-20">

            {/* Header */}
            <header className="bg-[#18181F] border-b border-white/10 px-6 py-4 flex items-center gap-4 sticky top-0 z-50">
                <Link href="/members" className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
                    <ArrowLeft className="w-5 h-5 text-gray-300" />
                </Link>
                <div>
                    <h1 className="font-black text-white text-lg leading-tight">Alimentação Hormonal</h1>
                    <p className="text-gray-500 text-xs">Plano de 28 dias anti-inflamatório</p>
                </div>
            </header>

            <main className="px-6 max-w-2xl mx-auto pt-8 flex flex-col gap-8">

                {/* Intro */}
                <div className="bg-gradient-to-r from-green-600/20 to-emerald-500/10 border border-green-500/30 rounded-2xl p-5">
                    <p className="text-green-400 font-bold text-xs uppercase tracking-widest mb-2">💚 Princípio Base</p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        Sua alimentação foi pensada para <strong className="text-white">regular os hormônios naturalmente</strong>, sem dietas restritivas. Foco em alimentos anti-inflamatórios que potencializam o efeito do Pilates.
                    </p>
                </div>

                {/* Cardápios Semanais */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Cardápios Semanais</h2>
                        <a href="/pdfs/cardapio-28-dias.pdf" download className="flex items-center gap-1 text-orange-400 text-xs font-bold hover:text-orange-300 transition">
                            <Download className="w-3 h-3" /> Baixar PDF
                        </a>
                    </div>

                    <div className="flex flex-col gap-3">
                        {CARDAPIOS.map((c) => (
                            <div key={c.semana} className="bg-[#18181F] border border-white/5 rounded-2xl overflow-hidden">
                                <button
                                    onClick={() => setExpandedWeek(expandedWeek === c.semana ? null : c.semana)}
                                    className="w-full flex items-center gap-4 p-4 text-left"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center font-black text-white text-sm shadow-md flex-shrink-0">
                                        {c.semana}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">Semana {c.semana}</p>
                                        <p className="font-bold text-white text-sm">{c.titulo}</p>
                                    </div>
                                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${expandedWeek === c.semana ? 'rotate-180' : ''}`} />
                                </button>

                                {expandedWeek === c.semana && (
                                    <div className="px-4 pb-4 flex flex-col gap-3 border-t border-white/5">
                                        {c.refeicoes.map((r, idx) => (
                                            <div key={idx} className="pt-3">
                                                <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-1">{r.tipo}</p>
                                                <p className="text-gray-300 text-sm">{r.descricao}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Semanas em breve */}
                        {[3, 4].map(n => (
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

                {/* Guia de Substituições */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Guia de Substituições</h2>
                        <a href="/pdfs/substituicoes.pdf" download className="flex items-center gap-1 text-orange-400 text-xs font-bold hover:text-orange-300 transition">
                            <Download className="w-3 h-3" /> PDF
                        </a>
                    </div>
                    <div className="bg-[#18181F] border border-white/5 rounded-2xl overflow-hidden">
                        {SUBSTITUICOES.map((s, idx) => (
                            <div key={idx} className={`flex items-center gap-3 p-4 ${idx !== SUBSTITUICOES.length - 1 ? 'border-b border-white/5' : ''}`}>
                                <div className="flex-1">
                                    <p className="text-xs text-gray-500 line-through">{s.original}</p>
                                    <p className="text-sm font-bold text-white">{s.substituto}</p>
                                </div>
                                <span className={`text-[10px] font-black px-2 py-1 rounded-full flex-shrink-0 ${TAG_COLORS[s.tag]}`}>{s.tag}</span>
                            </div>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
}
