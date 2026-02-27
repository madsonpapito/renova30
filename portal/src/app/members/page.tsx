"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import {
    PlayCircle, FileText, Star, Users, ChevronRight,
    Flame, Target, Heart, Zap, Download, CheckCircle2, Lock
} from 'lucide-react';

const MODULES = [
    {
        id: 'protocolo',
        icon: FileText,
        title: 'Meu Protocolo Personalizado',
        subtitle: 'PDF com seu plano hormonal de 12 semanas',
        href: '/members/protocolo',
        color: 'from-orange-500 to-amber-400',
        locked: false,
        tag: 'NOVO ✨'
    },
    {
        id: 'treinos',
        icon: Flame,
        title: 'Treinos Renova 30',
        subtitle: '12 semanas de treinos de 10 min em casa',
        href: '/members/treinos',
        color: 'from-rose-500 to-pink-500',
        locked: false,
        tag: 'Semana 1'
    },
    {
        id: 'alimentacao',
        icon: Heart,
        title: 'Alimentação Hormonal',
        subtitle: 'Plano de 28 dias + cardápios semanais',
        href: '/members/alimentacao',
        color: 'from-green-500 to-emerald-400',
        locked: false,
        tag: 'Módulo 4'
    },
    {
        id: 'bonus',
        icon: Star,
        title: 'Bônus Exclusivos',
        subtitle: 'Guia de Compras + Comer Emocional + Áudios',
        href: '/members/bonus',
        color: 'from-violet-500 to-purple-500',
        locked: false,
        tag: '3 Bônus'
    },
];

const WEEK_DAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

export default function MembersDashboard() {
    const [day] = useState(12);
    const week = Math.ceil(day / 7);
    const completedDays = day % 7 || 7;

    return (
        <div className="min-h-screen bg-[#0F0F13] text-white font-sans">

            {/* ─── TOP BAR ─── */}
            <header className="bg-[#18181F] border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-50 backdrop-blur">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center font-black text-sm text-white shadow-lg">R30</div>
                    <span className="font-black text-white text-lg tracking-tight">Renova <span className="text-orange-400">30</span></span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-amber-300 flex items-center justify-center font-black text-[#1C1C1E] text-sm cursor-pointer shadow">A</div>
                </div>
            </header>

            {/* ─── HERO WELCOME ─── */}
            <section className="px-6 pt-8 pb-6 max-w-2xl mx-auto">
                <p className="text-orange-400 font-bold text-sm tracking-widest uppercase mb-1">Bem-vinda de volta 👋</p>
                <h1 className="text-3xl font-black text-white leading-tight mb-1">Sua jornada<br /> de transformação</h1>
                <p className="text-gray-400 text-sm">Você está no <span className="text-white font-bold">Dia {day}</span> · Semana {week} de 12</p>
            </section>

            {/* ─── PROGRESS CARD ─── */}
            <section className="px-6 max-w-2xl mx-auto mb-8">
                <div className="bg-gradient-to-r from-orange-600/20 to-amber-500/10 border border-orange-500/30 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <p className="text-xs text-orange-300 font-bold uppercase tracking-wider">Progresso Semanal</p>
                            <p className="text-xl font-black mt-0.5">Semana {week} <span className="text-gray-400 font-normal text-base">/ 12</span></p>
                        </div>
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex flex-col items-center justify-center shadow-lg shadow-orange-500/30">
                            <span className="text-xl font-black leading-none">{day}</span>
                            <span className="text-[10px] font-bold opacity-80">dias</span>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                        {WEEK_DAYS.map((d, i) => (
                            <div key={d} className="flex-1 flex flex-col items-center gap-1">
                                <div className={`w-full h-2 rounded-full transition-all ${i < completedDays ? 'bg-orange-400' : 'bg-white/10'}`} />
                                <span className="text-[10px] text-gray-500">{d}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── TREINO DO DIA ─── */}
            <section className="px-6 max-w-2xl mx-auto mb-8">
                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Treino de Hoje</h2>
                <Link href="/members/treinos" className="block bg-gradient-to-r from-rose-600 to-pink-500 rounded-2xl p-5 shadow-xl shadow-rose-500/20 hover:scale-[1.01] transition-transform">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-rose-100 font-bold uppercase tracking-wider mb-1">Semana {week} · Dia {completedDays}</p>
                            <h3 className="text-xl font-black text-white">Barriga Plana</h3>
                            <p className="text-rose-100 text-sm mt-1">10 minutos · Nível Iniciante</p>
                        </div>
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur">
                            <PlayCircle className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </Link>
            </section>

            {/* ─── MÓDULOS ─── */}
            <section className="px-6 max-w-2xl mx-auto mb-10">
                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Seus Módulos</h2>
                <div className="flex flex-col gap-3">
                    {MODULES.map((mod) => {
                        const Icon = mod.icon;
                        return (
                            <Link key={mod.id} href={mod.href} className="flex items-center gap-4 bg-[#18181F] hover:bg-[#1E1E28] border border-white/5 rounded-2xl p-4 transition-all group">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="font-bold text-white text-sm truncate">{mod.title}</p>
                                        {mod.tag && <span className="text-[10px] font-black bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full flex-shrink-0">{mod.tag}</span>}
                                    </div>
                                    <p className="text-gray-500 text-xs mt-0.5 truncate">{mod.subtitle}</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400 flex-shrink-0 transition-colors" />
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* ─── COMUNIDADE ─── */}
            <section className="px-6 max-w-2xl mx-auto mb-10">
                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Comunidade</h2>
                <a href="https://t.me/renova30grupo" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-gradient-to-r from-blue-600/20 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-4 hover:scale-[1.01] transition-transform">
                    <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <p className="font-bold text-white text-sm">Grupo das Alunas</p>
                        <p className="text-blue-300 text-xs mt-0.5">Acesse a comunidade no Telegram →</p>
                    </div>
                </a>
            </section>

            {/* ─── FOOTER ─── */}
            <footer className="pb-20 text-center text-xs text-gray-700">Renova 30 © 2026 · Todos os direitos reservados</footer>
        </div>
    );
}
