"use client"

import React, { useState, useEffect } from 'react';
import { PlayCircle, ShieldCheck, TrendingDown, Flame, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function VSLPage() {
    const [showOffer, setShowOffer] = useState(false);

    // Simulando o delay do Pitch da VSL (Ex: 3 minutos. Para testes, vamos usar 10 segundos)
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowOffer(true);
        }, 10000); // 10 segundos
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-[#2C3E50] font-sans">
            {/* Header Red Flag */}
            <div className="bg-red-600 text-white text-center py-3 text-sm font-bold uppercase tracking-widest px-4 shadow-sm">
                Atenção: Assista este vídeo até o final para liberar sua vaga
            </div>

            <main className="max-w-3xl mx-auto px-4 py-8">

                {/* Diagnóstico */}
                <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6 mb-10 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
                    <span className="inline-block bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-black uppercase mb-4 tracking-whider">Diagnóstico Concluído</span>
                    <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#2C3E50] leading-tight mb-4">
                        A Carga Viva da sua Retenção de Gordura após os 40 foi descoberta
                    </h1>
                    <p className="text-gray-600 font-medium md:px-10 mb-6">
                        Analisamos suas respostas e descobrimos que o real motivo de você não conseguir emagrecer nem se sentir bem é a <strong className="text-red-500">Baixa Hormonal</strong>, causando o "Travamento Metabólico".
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-left border-t border-gray-100 pt-6">
                        <div className="bg-orange-50 w-full p-4 rounded-xl flex items-start gap-4 border border-orange-100">
                            <TrendingDown className="text-orange-500 w-8 h-8 mt-1" />
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm">Metabolismo</h4>
                                <p className="text-2xl font-black text-orange-600">-64%</p>
                                <span className="text-[10px] text-gray-500 font-medium uppercase">Desacelerado</span>
                            </div>
                        </div>
                        <div className="bg-red-50 w-full p-4 rounded-xl flex items-start gap-4 border border-red-100">
                            <Flame className="text-red-500 w-8 h-8 mt-1" />
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm">Queima Passiva</h4>
                                <p className="text-2xl font-black text-red-600">INATIVA</p>
                                <span className="text-[10px] text-gray-500 font-medium uppercase">Bloqueada por hormônios</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* VSL (Video Sales Letter) */}
                <div className="text-center mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
                        Como <span className="text-[#F2994A] underline decoration-4 underline-offset-4">reativar</span> essa queima de forma natural em 10 minutos por dia:
                    </h2>

                    {/* Fake Video Player */}
                    <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl group cursor-pointer border-4 border-gray-900">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000')] bg-cover bg-center opacity-40 group-hover:opacity-50 transition-opacity"></div>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <PlayCircle className="w-20 h-20 text-white opacity-90 group-hover:scale-110 transition-transform duration-300" />
                            <p className="text-white mt-4 font-bold tracking-wide">CLIQUE PARA ASSISTIR</p>
                        </div>
                    </div>
                    <p className="text-xs text-gray-400 font-medium mt-4">
                        🔊 Certifique-se que o som do seu dispositivo está ligado.
                    </p>
                </div>

                {/* Checkout Section (Delayed) */}
                <div className={`transition-all duration-1000 ease-in-out transform ${showOffer ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none absolute'}`}>

                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200 mt-12 text-center relative">
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-xs font-black tracking-widest shadow-md">
                            VAGAS LIBERADAS
                        </div>

                        <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Desbloqueie o Método Renova 30</h3>
                        <p className="text-gray-500 mb-6 font-medium">Acesso imediato de 1 ano completo + Bônus Exclusivos</p>

                        <div className="flex justify-center items-end gap-2 mb-8">
                            <span className="text-gray-400 line-through font-bold text-lg">De R$ 679</span>
                            <span className="text-5xl font-black text-green-600">R$ 67</span>
                        </div>

                        <a
                            href="https://pay.kiwify.com/tMxkqds"
                            className="block w-full bg-[#F2994A] hover:bg-[#E08535] text-white py-5 rounded-2xl font-black text-xl shadow-xl transition-all hover:scale-[1.02] hover:shadow-2xl flex items-center justify-center gap-3"
                        >
                            QUERO COMEÇAR AGORA <ArrowRight className="w-6 h-6" />
                        </a>

                        <div className="mt-6 flex flex-col items-center justify-center gap-3 text-sm font-medium text-gray-500">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-green-500" />
                                Garantia Incondicional de 7 Dias
                            </div>
                            <p>🔒 Pagamento 100% Seguro Processado pela Kiwify.</p>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
