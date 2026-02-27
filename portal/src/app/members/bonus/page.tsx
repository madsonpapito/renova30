"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Download, HeadphonesIcon, BookOpen, ShoppingBag } from 'lucide-react';

const BONUS_ITEMS = [
    {
        id: 'guia-compras',
        icon: ShoppingBag,
        title: 'Guia de Compras Inteligente',
        subtitle: 'Aprenda a escolher os melhores alimentos no supermercado sem cair em armadilhas.',
        color: 'from-amber-500 to-orange-500',
        image: '/images/quiz/bonus-compras.png',
        type: 'PDF',
        downloadHref: '/pdfs/guia-compras.pdf',
        pages: '18 páginas',
    },
    {
        id: 'comer-emocional',
        icon: BookOpen,
        title: 'Comer Emocional',
        subtitle: 'Estratégias simples para blindar sua mente contra compulsão e ansiedade alimentar.',
        color: 'from-violet-500 to-purple-600',
        image: '/images/quiz/bonus-emocional.png',
        type: 'PDF',
        downloadHref: '/pdfs/comer-emocional.pdf',
        pages: '22 páginas',
    },
    {
        id: 'audios-guiados',
        icon: HeadphonesIcon,
        title: 'Áudios Guiados',
        subtitle: 'Três meditações exclusivas: Respiração, Relaxamento Profundo e Visualização Criativa.',
        color: 'from-cyan-500 to-blue-500',
        image: null,
        type: 'ÁUDIO',
        downloadHref: null,
        pages: '3 áudios',
    },
];

const AUDIO_TRACKS = [
    { title: 'Respiração Consciente', duration: '8 min', available: true },
    { title: 'Relaxamento Profundo', duration: '12 min', available: true },
    { title: 'Visualização Criativa', duration: '15 min', available: false },
];

export default function BonusPage() {
    return (
        <div className="min-h-screen bg-[#0F0F13] text-white font-sans pb-20">

            {/* Header */}
            <header className="bg-[#18181F] border-b border-white/10 px-6 py-4 flex items-center gap-4 sticky top-0 z-50">
                <Link href="/members" className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
                    <ArrowLeft className="w-5 h-5 text-gray-300" />
                </Link>
                <div>
                    <h1 className="font-black text-white text-lg leading-tight">Bônus Exclusivos</h1>
                    <p className="text-gray-500 text-xs">3 presentes para acelerar sua transformação</p>
                </div>
            </header>

            <main className="px-6 max-w-2xl mx-auto pt-8 flex flex-col gap-6">

                {/* Intro */}
                <div className="bg-gradient-to-r from-violet-600/20 to-purple-500/10 border border-violet-500/30 rounded-2xl p-5 text-center">
                    <p className="text-violet-300 font-bold text-sm uppercase tracking-wider mb-1">🎁 Seus Presentes</p>
                    <p className="text-gray-300 text-sm">Todos os bônus foram especialmente preparados para potencializar seus resultados com o Renova 30.</p>
                </div>

                {/* Bonus Cards */}
                {BONUS_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div key={item.id} className="bg-[#18181F] border border-white/5 rounded-2xl overflow-hidden">

                            {/* Card Header */}
                            <div className={`bg-gradient-to-r ${item.color} p-5 flex items-center gap-4`}>
                                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <span className="text-[10px] font-black bg-white/20 text-white px-2 py-0.5 rounded-full">{item.type}</span>
                                    <h2 className="font-black text-white text-lg leading-tight mt-1">{item.title}</h2>
                                    <p className="text-white/70 text-xs">{item.pages}</p>
                                </div>
                                {item.image && (
                                    <div className="w-20 h-20 relative flex-shrink-0">
                                        <Image src={item.image} alt={item.title} fill className="object-contain drop-shadow-xl" />
                                    </div>
                                )}
                            </div>

                            {/* Card Body */}
                            <div className="p-5">
                                <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.subtitle}</p>

                                {/* PDF Download */}
                                {item.type === 'PDF' && item.downloadHref && (
                                    <a
                                        href={item.downloadHref}
                                        download
                                        className="flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-3 font-bold text-sm text-white transition"
                                    >
                                        <Download className="w-4 h-4" />
                                        Baixar PDF Grátis
                                    </a>
                                )}

                                {/* Audio Tracks */}
                                {item.type === 'ÁUDIO' && (
                                    <div className="flex flex-col gap-2">
                                        {AUDIO_TRACKS.map((track) => (
                                            <div key={track.title} className={`flex items-center justify-between p-3 rounded-xl border ${track.available ? 'border-white/10 bg-white/5' : 'border-white/5 bg-white/[0.02] opacity-50'}`}>
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${track.available ? 'bg-cyan-500/20' : 'bg-gray-700/20'}`}>
                                                        <HeadphonesIcon className={`w-4 h-4 ${track.available ? 'text-cyan-400' : 'text-gray-600'}`} />
                                                    </div>
                                                    <span className="text-sm font-semibold">{track.title}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <span>{track.duration}</span>
                                                    {!track.available && <span className="text-yellow-500 font-bold">Em breve</span>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}

            </main>
        </div>
    );
}
