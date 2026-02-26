"use client"

import React, { useState, useEffect } from 'react';
import { PlayCircle, ShieldCheck, CheckCircle2, ChevronDown, Lock } from 'lucide-react';
import Image from 'next/image';

const FAQ_ITEMS = [
    { question: 'Como vou acessar o método?', answer: 'Logo após o pagamento, você receberá um e-mail com seus dados de acesso ao nosso portal/aplicativo.' },
    { question: 'Quanto tempo por dia eu preciso?', answer: 'Com apenas 10 a 15 minutos diários você já consegue aplicar o método e começar a ver resultados.' },
    { question: 'Tem mensalidade?', answer: 'Não! O pagamento é único. Você paga uma vez e tem acesso completo por 12 meses.' },
    { question: 'E se eu não gostar?', answer: 'Você está protegida pela nossa garantia incondicional de 7 dias. Se não gostar, devolvemos 100% do valor.' },
    { question: 'A alimentação é restritiva?', answer: 'De forma alguma. O foco não é cortar o que você ama, mas sim usar a janela hormonal a seu favor.' }
];

export default function VSLPage() {
    const [showOffer, setShowOffer] = useState(false);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const CHECKOUT_LINK = "https://pay.onprofit.com.br/S8a9VlHo?off=l0DIGG";

    // Delay de 10 segundos para fins de teste. (Na versão final, mude para o tempo exato do pitch, ex: 10 * 60 * 1000)
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowOffer(true);
        }, 10000);
        return () => clearTimeout(timer);
    }, []);

    const toggleFaq = (index: number) => {
        if (openFaqIndex === index) {
            setOpenFaqIndex(null);
        } else {
            setOpenFaqIndex(index);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F5F5] text-gray-900 font-sans pb-20">
            {/* Header / Headline */}
            <div className="bg-white py-6 px-4 shadow-sm relative z-10 text-center flex flex-col items-center justify-center">
                <h1 className="text-xl sm:text-2xl font-black text-[#1C1C1E] uppercase max-w-2xl leading-tight">
                    ASSISTA ESSE VÍDEO RÁPIDO PARA LIBERAR SEU PROTOCOLO<br />
                    <span className="bg-[#F2994A] text-white px-2 mt-1 inline-block rounded-sm tracking-wider">
                        E ELIMINE 1KG POR SEMANA COM PILATES EM CASA
                    </span>
                </h1>
            </div>

            <main className="max-w-3xl mx-auto px-4 pt-8">

                {/* VSL (Video Player Placeholder) */}
                <div className="text-center mb-8 relative">
                    <div className="relative w-full max-w-[400px] mx-auto aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl group cursor-pointer border-4 border-[#1C1C1E]">
                        <div className="absolute inset-0 bg-gradient-to-t from-red-600/40 to-black/20 z-10"></div>
                        <div className="absolute inset-0 flex items-center justify-center flex-col z-20">
                            <span className="text-white text-sm font-bold mb-4">Você já começou a assistir este vídeo</span>
                            <PlayCircle className="w-16 h-16 text-white group-hover:scale-110 transition-transform duration-300" />
                            <p className="text-white mt-4 font-bold tracking-wide flex items-center gap-2">
                                🔊 Ative o Som!
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- SEÇÃO OCULTA: Aparece apenas após o tempo da VSL --- */}
                <div className={`transition-all duration-1000 ease-in-out transform flex flex-col gap-10 ${showOffer ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 hidden'}`}>

                    {/* Botão CTA Principal */}
                    <div className="text-center w-full max-w-sm mx-auto">
                        <a href={CHECKOUT_LINK} className="block w-full bg-[#F2994A] hover:bg-orange-500 text-white uppercase font-black text-lg py-4 rounded-xl shadow-[0_4px_14px_0_rgba(242,153,74,0.39)] hover:shadow-[0_6px_20px_rgba(242,153,74,0.23)] hover:scale-[1.02] transition-all">
                            INSCREVA-SE E ACESSE AGORA
                        </a>
                    </div>

                    {/* Prova Social */}
                    <div className="text-center mt-6">
                        <h2 className="text-xl font-black uppercase text-gray-800 mb-6 px-4">
                            ALGUMAS ALUNAS QUE ELIMINARAM 1KG POR SEMANA COM PILATES EM CASA
                        </h2>
                        <div className="relative max-w-md mx-auto aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-gray-200">
                            <Image
                                src="/images/quiz/depoimento-valquiria.jpg"
                                alt="Depoimento Valquiria Antes e Depois"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Preço de Ancoragem e Oferta */}
                    <div className="bg-white rounded-3xl shadow-md p-8 text-center max-w-md mx-auto relative mt-4 border-t-4 border-[#F2994A]">
                        <p className="text-red-600 line-through font-bold text-lg mb-1">DE R$ 679,00</p>
                        <p className="text-gray-600 font-bold mb-2">POR APENAS</p>
                        <h3 className="text-5xl font-black text-[#1C1C1E] mb-6">R$ 97,00</h3>

                        <a href={CHECKOUT_LINK} className="block w-full bg-[#F2994A] hover:bg-orange-500 text-white uppercase font-black text-lg py-4 rounded-xl shadow-lg transition-all mb-4">
                            INSCREVA-SE E ACESSE AGORA
                        </a>
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 font-semibold">
                            <Lock className="w-4 h-4 text-green-500" /> Compra 100% Segura e Protegida
                        </div>
                    </div>

                    {/* Entregáveis */}
                    <div className="text-center">
                        <h2 className="text-xl font-black uppercase text-gray-800 mb-6 px-4">
                            VEJA TUDO O QUE VOCÊ VAI RECEBER PARA ELIMINAR 1KG TODA SEMANA
                        </h2>

                        {/* Box Mockup (Placeholder for Mockup Core) */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm mb-6 border border-gray-100 flex flex-col items-center">
                            <div className="w-full max-w-xs relative rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                                <Image src="/images/quiz/mockup-completo.jpg" alt="O que você vai receber" width={400} height={300} className="w-full h-auto object-contain" />
                            </div>

                            <ul className="text-left space-y-3 font-semibold text-gray-700">
                                <li className="flex gap-2 items-center"><CheckCircle2 className="text-green-500 w-5 h-5 flex-shrink-0" /> <span className="underline decoration-green-400">12 meses de acesso ao APP</span></li>
                                <li className="flex gap-2 items-center"><CheckCircle2 className="text-green-500 w-5 h-5 flex-shrink-0" /> <span className="bg-yellow-100">Pagamento único</span></li>
                                <li className="flex gap-2 items-center"><CheckCircle2 className="text-green-500 w-5 h-5 flex-shrink-0" /> <span className="bg-yellow-100">Zero mensalidade</span></li>
                            </ul>
                        </div>
                        <a href={CHECKOUT_LINK} className="block w-full max-w-sm mx-auto bg-[#F2994A] hover:bg-orange-500 text-white uppercase font-black text-lg py-4 rounded-xl shadow-lg transition-all mt-4">
                            INSCREVA-SE E ACESSE AGORA
                        </a>
                    </div>

                    {/* Bônus */}
                    <div className="text-center mt-4">
                        <h2 className="text-xl font-black uppercase text-gray-800 mb-6 px-4">
                            EU QUERO TE DAR MAIS ALGUNS PRESENTES 🎁
                        </h2>
                        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-6 text-left border border-gray-100 max-w-md mx-auto">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                                <div className="w-32 h-32 relative flex-shrink-0">
                                    <Image src="/images/quiz/bonus-compras.png" alt="Guia de Compras" fill className="object-contain drop-shadow-md" />
                                </div>
                                <div className="flex-1 mt-2 sm:mt-0">
                                    <h4 className="font-bold text-gray-900 border-b border-gray-200 pb-1 mb-2">🎁 1. GUIA DE COMPRAS</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">Aprenda a escolher os melhores alimentos com inteligência para não cair em armadilhas de supermercado.</p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left pt-4 border-t border-gray-100">
                                <div className="w-32 h-32 relative flex-shrink-0">
                                    <Image src="/images/quiz/bonus-emocional.png" alt="Comer Emocional" fill className="object-contain drop-shadow-md" />
                                </div>
                                <div className="flex-1 mt-2 sm:mt-0">
                                    <h4 className="font-bold text-gray-900 border-b border-gray-200 pb-1 mb-2">🎁 2. COMER EMOCIONAL</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">Estratégias simples para blindar sua mente contra ataques de compulsão em momentos de estresse.</p>
                                </div>
                            </div>
                        </div>
                        <a href={CHECKOUT_LINK} className="block w-full max-w-sm mx-auto bg-[#F2994A] hover:bg-orange-500 text-white uppercase font-black text-lg py-4 rounded-xl shadow-lg transition-all mt-6">
                            INSCREVA-SE E ACESSE AGORA
                        </a>
                    </div>

                    {/* Garantia */}
                    <div className="text-center mt-10">
                        <h2 className="text-lg font-black uppercase text-gray-800 mb-6">
                            TESTE TUDO POR 7 DIAS
                        </h2>
                        <div className="flex flex-col items-center gap-6">
                            {/* Selo de Garantia Fake */}
                            <div className="w-40 h-40 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full p-2 shadow-2xl flex items-center justify-center border-4 border-[#1C1C1E]">
                                <div className="w-full h-full bg-[#1C1C1E] text-yellow-500 rounded-full flex flex-col items-center justify-center font-black text-center relative border-2 border-yellow-500 border-dashed">
                                    <span className="text-[10px] uppercase tracking-widest text-white mt-2">Garantia</span>
                                    <span className="text-sm uppercase tracking-wider text-yellow-300">Incondicional</span>
                                    <span className="text-4xl text-white">100%</span>
                                    <span className="text-[10px] uppercase tracking-widest text-white mb-2">Blindada</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 font-medium max-w-md">
                                Você não corre nenhum risco. Se por qualquer motivo não gostar do conteúdo, basta um clique e devolvemos 100% do seu investimento. O risco está todo nas minhas costas.
                            </p>
                            <a href={CHECKOUT_LINK} className="block w-full max-w-sm mx-auto bg-[#F2994A] hover:bg-orange-500 text-white uppercase font-black text-lg py-4 rounded-xl shadow-lg transition-all">
                                GARANTIR MINHA VAGA AGORA
                            </a>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="mt-12 bg-white rounded-2xl shadow-sm p-6 max-w-xl mx-auto w-full mb-10 border border-gray-100">
                        <h2 className="text-xl font-black text-center text-gray-800 mb-6">Perguntas Frequentes</h2>
                        <div className="space-y-4">
                            {FAQ_ITEMS.map((item, idx) => (
                                <div key={idx} className="border-b border-gray-100 pb-4">
                                    <button
                                        onClick={() => toggleFaq(idx)}
                                        className="w-full flex justify-between items-center text-left font-bold text-gray-800 focus:outline-none"
                                    >
                                        {item.question}
                                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaqIndex === idx ? 'transform rotate-180' : ''}`} />
                                    </button>
                                    {openFaqIndex === idx && (
                                        <div className="mt-3 text-sm text-gray-600 font-medium">
                                            {item.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer Warning */}
                    <div className="text-center text-xs text-gray-400 pb-10 max-w-xs mx-auto">
                        <p>Renova 30 © 2026 - Todos os direitos reservados.</p>
                        <p className="mt-2">Os resultados podem variar de pessoa para pessoa.</p>
                    </div>

                </div>
            </main>
        </div>
    );
}
