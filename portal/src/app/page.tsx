"use client"

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Loader2, PlayCircle, ShieldCheck } from 'lucide-react';

type QuizOption = { label: string; image?: string };
type QuizStep = { id: string; question: string; options: QuizOption[] };

const QUIZ_STEPS: QuizStep[] = [
    {
        id: 'meta_principal',
        question: 'Qual é o seu maior objetivo hoje?',
        options: [
            { label: 'Secar a Barriga da Menopausa' },
            { label: 'Aliviar Dores no Corpo' },
            { label: 'Ter Mais Energia e Disposição' },
            { label: 'Tonificar o Corpo todo' }
        ]
    },
    {
        id: 'idade',
        question: 'Qual é a sua faixa etária?',
        options: [
            { label: '30-40 anos' },
            { label: '41-50 anos' },
            { label: '51-60 anos' },
            { label: '61-70 anos' }
        ]
    },
    {
        id: 'imagem_corpo',
        question: 'Qual imagem mais se aproxima do seu corpo hoje?',
        options: [
            { label: 'Falsa Magra (Pochete)', image: '/images/quiz/falsa-magra.webp' },
            { label: 'Muito Acima do peso', image: '/images/quiz/muito-acima.webp' }
        ]
    },
    {
        id: 'corpo_desejado',
        question: 'Qual imagem representa o corpo que você deseja alcançar?',
        options: [
            { label: 'Corpo Definido', image: '/images/quiz/corpo-definido.jpg' },
            { label: 'Corpo Magro', image: '/images/quiz/corpo-magro.jpg' }
        ]
    },
    {
        id: 'reacao_corpo',
        question: 'Como seu corpo responde a dietas ou exercícios hoje em dia?',
        options: [
            { label: 'Não responde mais (Travado)' },
            { label: 'Responde muito devagar' },
            { label: 'Até responde, mas não mantenho' }
        ]
    },
    {
        id: 'gordura_localizada',
        question: 'Onde a gordura mais te incomoda hoje?',
        options: [
            { label: 'Barriga Estômago/Pochete' },
            { label: 'Braços e Costas' },
            { label: 'Pernas, Quadril e Culote' },
            { label: 'Corpo como um todo' }
        ]
    },
    {
        id: 'energia',
        question: 'Como você se sente ao longo do dia?',
        options: [
            { label: 'Muito cansada, sem vontade de nada' },
            { label: 'Minha energia oscila muito' },
            { label: 'Normal, mas chego exausta à noite' }
        ]
    },
    {
        id: 'dores',
        question: 'Quais dores físicas mais afetam sua rotina?',
        options: [
            { label: 'Costas e Lombar' },
            { label: 'Joelhos e Articulações' },
            { label: 'Pescoço e Ombros tensos' },
            { label: 'Felizmente, não tenho dores crônicas' }
        ]
    },
    {
        id: 'metabolismo',
        question: 'Como você descreveria seu metabolismo após os 40?',
        options: [
            { label: 'Lento: Engordo só de olhar pra comida' },
            { label: 'Normal, mas sinto que freou' },
            { label: 'Acelerado, mas perco massa magra' }
        ]
    },
    {
        id: 'tempo_livre',
        question: 'Quanto tempo você tem disponível por dia para você mesma?',
        options: [
            { label: 'Quase nada (10 a 15 minutos)' },
            { label: 'Cerca de 30 minutos' },
            { label: 'Mais de 1 hora' }
        ]
    },
    {
        id: 'inchaco',
        question: 'Você sofre frequentemente com sensação de inchaço e retenção?',
        options: [
            { label: 'Sim, praticamente todos os dias' },
            { label: 'Só algumas vezes por mês' },
            { label: 'Raramente me sinto inchada' }
        ]
    },
    {
        id: 'sono',
        question: 'Como está a qualidade do seu sono ultimamente?',
        options: [
            { label: 'Péssimo (Acordo várias vezes / Insônia)' },
            { label: 'Acordo já me sentindo cansada' },
            { label: 'Durmo razoavelmente bem' }
        ]
    },
    {
        id: 'rotina',
        question: 'Como é a sua rotina de vida/trabalho?',
        options: [
            { label: 'Trabalho muito fora de casa' },
            { label: 'Trabalho em Home Office' },
            { label: 'Cuido da casa e família' },
            { label: 'Aposentada, mas muito ocupada' }
        ]
    },
    {
        id: 'exercicios',
        question: 'Qual sua frequência atual de exercícios físicos?',
        options: [
            { label: 'Totalmente sedentária' },
            { label: 'Caminhadas esporádicas' },
            { label: 'Tento treinar 2 a 3 vezes na semana' }
        ]
    },
    {
        id: 'sintoma_menopausa',
        question: 'Qual o sintoma da Menopausa ou pré-menopausa mais te incomoda?',
        options: [
            { label: 'Fogachos (Ondas de Calor absurdas)' },
            { label: 'Oscilações de Humor / Ansiedade' },
            { label: 'Ganho de Peso rápido e inexplicável' },
            { label: 'Baixa Libido e Cansaço' }
        ]
    },
    {
        id: 'alimentacao',
        question: 'Na alimentação, qual é a sua "fraqueza"?',
        options: [
            { label: 'Doces e Carboidratos (Pão, massa)' },
            { label: 'Beliscar o dia inteirinho' },
            { label: 'Finais de semana exagerados' },
            { label: 'Como pouco, mas alimentos errados' }
        ]
    },
    {
        id: 'crenca',
        question: 'Você acredita que 10 a 15 minutos por dia, com o método certo, podem transformar seu corpo?',
        options: [
            { label: 'Sim! Estou disposta a tentar hoje' },
            { label: 'Tenho dúvidas, mas quero ver' },
            { label: 'Não acredito muito' }
        ]
    },
    {
        id: 'felicidade',
        question: 'O que te deixaria mais feliz e realizada hoje?',
        options: [
            { label: 'Voltar a vestir roupas que amo' },
            { label: 'Olhar no espelho e sentir orgulho' },
            { label: 'Ter fôlego para brincar com a família sem dor' }
        ]
    },
    {
        id: 'futuro',
        question: 'Sinceramente, o que acontece se você não mudar nada hoje?',
        options: [
            { label: 'Minha saúde vai piorar drasticamente' },
            { label: 'Vou continuar frustrada comigo mesma' },
            { label: 'Tenho muito medo de doenças futuras' }
        ]
    },
    {
        id: 'comprometimento',
        question: 'De 0 a 10, o quanto você está comprometida a mudar o rumo da sua saúde agora?',
        options: [
            { label: '10! Preciso mudar isso agora mesmo' },
            { label: '8/9 - Quero muito mudar' },
            { label: 'Ainda estou pensando' }
        ]
    }
];

export default function HomeQuiz() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisProgress, setAnalysisProgress] = useState(0);

    const handleAnswer = (answer: string) => {
        setAnswers(prev => ({ ...prev, [QUIZ_STEPS[currentStep].id]: answer }));

        setTimeout(() => {
            if (currentStep < QUIZ_STEPS.length - 1) {
                // If it's step 3 (0-indexed -> 3 is 4th question), show an interstitial? 
                // Let's keep it simple for now to ensure smooth flow, or just go to next step
                setCurrentStep(prev => prev + 1);
            } else {
                startAnalysis();
            }
        }, 300);
    };

    const startAnalysis = () => {
        setIsAnalyzing(true);
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            setAnalysisProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    window.location.href = '/vsl';
                }, 800);
            }
        }, 150);
    };

    if (isAnalyzing) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl text-center border border-gray-100">
                    <Loader2 className="w-16 h-16 text-[#F2994A] animate-spin mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Analisando seu Perfil...</h2>

                    <div className="mt-6 text-left space-y-3">
                        <div className="flex items-center text-sm font-medium text-gray-600">
                            <ShieldCheck className={`w-5 h-5 mr-3 ${analysisProgress > 20 ? 'text-green-500' : 'text-gray-300'}`} />
                            Cruzando dados metabólicos...
                        </div>
                        <div className="flex items-center text-sm font-medium text-gray-600">
                            <ShieldCheck className={`w-5 h-5 mr-3 ${analysisProgress > 60 ? 'text-green-500' : 'text-gray-300'}`} />
                            Identificando causa da retenção...
                        </div>
                        <div className="flex items-center text-sm font-medium text-gray-600">
                            <ShieldCheck className={`w-5 h-5 mr-3 ${analysisProgress > 90 ? 'text-green-500' : 'text-gray-300'}`} />
                            Gerando Protocolo Personalizado...
                        </div>
                    </div>

                    <div className="w-full h-2 bg-gray-100 rounded-full mt-8 overflow-hidden">
                        <div className="h-full bg-[#F2994A] transition-all duration-300 ease-out" style={{ width: `${analysisProgress}%` }}></div>
                    </div>
                    <p className="mt-3 text-xs font-bold text-gray-400">{analysisProgress}% Concluído</p>
                </div>
            </div>
        );
    }

    const progressPercentage = ((currentStep) / QUIZ_STEPS.length) * 100;

    return (
        <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center py-10 px-4 font-sans text-gray-800">
            {/* Header Mínimo */}
            <div className="w-full max-w-2xl mb-6 flex items-center justify-between">
                {currentStep > 0 ? (
                    <button onClick={() => setCurrentStep(prev => prev - 1)} className="text-gray-400 hover:text-gray-600 transition flex items-center text-sm font-bold">
                        <ChevronLeft className="w-5 h-5 mr-1" /> Voltar
                    </button>
                ) : (
                    <div className="w-20"></div>
                )}
                <div className="text-sm font-black text-gray-300 tracking-widest">RENOVA 30</div>
                <div className="text-xs font-bold text-[#F2994A]">{currentStep + 1} / {QUIZ_STEPS.length}</div>
            </div>

            {/* Barra de Progresso */}
            <div className="w-full max-w-2xl mb-12">
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#F2994A] transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
                </div>
            </div>

            {/* Quiz Box */}
            <div className="w-full max-w-2xl bg-white p-6 sm:p-10 rounded-3xl shadow-lg border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-8 text-center leading-tight">
                    {QUIZ_STEPS[currentStep].question}
                </h1>

                <div className={`space-y-4 ${QUIZ_STEPS[currentStep].options.some(o => o.image) ? 'grid grid-cols-2 gap-4 space-y-0' : ''}`}>
                    {QUIZ_STEPS[currentStep].options.map((optionObj, idx) => {
                        const isSelected = answers[QUIZ_STEPS[currentStep].id] === optionObj.label;

                        if (optionObj.image) {
                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(optionObj.label)}
                                    className={`w-full flex !min-h-[220px] flex-col items-center rounded-2xl border-4 overflow-hidden shadow-sm transition-all group
                                        ${isSelected
                                            ? 'border-[#F2994A] bg-[#F2994A]/10 scale-[1.02]'
                                            : 'border-transparent bg-white hover:border-[#F2994A]/40'}
                                    `}
                                >
                                    <div className="w-full h-40 relative bg-gray-100 flex-grow">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={optionObj.image} alt={optionObj.label} className="w-full h-full object-cover pointer-events-none" />
                                    </div>
                                    <div className="p-3 bg-white w-full text-center font-bold text-gray-800 text-sm border-t border-gray-100 flex flex-col items-center gap-2">
                                        <span>{optionObj.label}</span>
                                        <div className={`w-5 h-5 rounded-full border-2 transition-colors ${isSelected ? 'border-[#F2994A] bg-[#F2994A]' : 'border-gray-300 group-hover:border-[#F2994A]/50'}`}></div>
                                    </div>
                                </button>
                            );
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(optionObj.label)}
                                className={`w-full text-left p-5 rounded-2xl border-2 transition-all font-semibold text-[15px] sm:text-base flex items-center justify-between group
                                    ${isSelected
                                        ? 'border-[#F2994A] bg-[#F2994A]/10 text-gray-900'
                                        : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-[#F2994A]/40 hover:bg-white'}
                                `}
                            >
                                {optionObj.label}
                                <div className={`w-5 h-5 rounded-full border-2 transition-colors ${isSelected ? 'border-[#F2994A] bg-[#F2994A]' : 'border-gray-300 group-hover:border-[#F2994A]/50'}`}></div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Footer Text */}
            <div className="mt-12 text-center text-xs text-gray-400 font-medium max-w-md">
                Suas respostas são 100% confidenciais e serão usadas apenas para personalizar a sua avaliação gratuita.
            </div>
        </div>
    );
}
