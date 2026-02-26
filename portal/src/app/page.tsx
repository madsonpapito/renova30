"use client"

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Loader2, PlayCircle, ShieldCheck } from 'lucide-react';

const QUIZ_STEPS = [
    {
        id: 'meta_principal',
        question: 'Qual é o seu maior objetivo hoje?',
        options: ['Secar a Barriga da Menopausa', 'Aliviar Dores no Corpo', 'Ter Mais Energia e Disposição', 'Tonificar o Corpo todo']
    },
    {
        id: 'idade',
        question: 'Qual é a sua faixa etária?',
        options: ['35 a 45 anos', '46 a 55 anos', '56 a 65 anos', 'Mais de 65 anos']
    },
    {
        id: 'reacao_corpo',
        question: 'Como seu corpo responde a dietas ou exercícios hoje em dia?',
        options: ['Não responde mais (Travado)', 'Responde muito devagar', 'Até responde, mas não mantenho']
    },
    {
        id: 'gordura_localizada',
        question: 'Onde a gordura mais te incomoda hoje?',
        options: ['Barriga Estômago/Pochete', 'Braços e Costas', 'Pernas, Quadril e Culote', 'Corpo como um todo']
    },
    {
        id: 'energia',
        question: 'Como você se sente ao longo do dia?',
        options: ['Muito cansada, sem vontade de nada', 'Minha energia oscila muito', 'Normal, mas chego exausta à noite']
    },
    {
        id: 'dores',
        question: 'Quais dores físicas mais afetam sua rotina?',
        options: ['Costas e Lombar', 'Joelhos e Articulações', 'Pescoço e Ombros tensos', 'Felizmente, não tenho dores crônicas']
    },
    {
        id: 'metabolismo',
        question: 'Como você descreveria seu metabolismo após os 40?',
        options: ['Lento: Engordo só de olhar pra comida', 'Normal, mas sinto que freou', 'Acelerado, mas perco massa magra']
    },
    {
        id: 'tempo_livre',
        question: 'Quanto tempo você tem disponível por dia para você mesma?',
        options: ['Quase nada (10 a 15 minutos)', 'Cerca de 30 minutos', 'Mais de 1 hora']
    },
    {
        id: 'inchaco',
        question: 'Você sofre frequentemente com sensação de inchaço e retenção?',
        options: ['Sim, praticamente todos os dias', 'Só algumas vezes por mês', 'Raramente me sinto inchada']
    },
    {
        id: 'sono',
        question: 'Como está a qualidade do seu sono ultimamente?',
        options: ['Péssimo (Acordo várias vezes / Insônia)', 'Acordo já me sentindo cansada', 'Durmo razoavelmente bem']
    },
    {
        id: 'rotina',
        question: 'Como é a sua rotina de vida/trabalho?',
        options: ['Trabalho muito fora de casa', 'Trabalho em Home Office', 'Cuido da casa e família', 'Aposentada, mas muito ocupada']
    },
    {
        id: 'exercicios',
        question: 'Qual sua frequência atual de exercícios físicos?',
        options: ['Totalmente sedentária', 'Caminhadas esporádicas', 'Tento treinar 2 a 3 vezes na semana']
    },
    {
        id: 'sintoma_menopausa',
        question: 'Qual o sintoma da Menopausa ou pré-menopausa mais te incomoda?',
        options: ['Fogachos (Ondas de Calor absurdas)', 'Oscilações de Humor / Ansiedade', 'Ganho de Peso rápido e inexplicável', 'Baixa Libido e Cansaço']
    },
    {
        id: 'alimentacao',
        question: 'Na alimentação, qual é a sua "fraqueza"?',
        options: ['Doces e Carboidratos (Pão, massa)', 'Beliscar o dia inteirinho', 'Finais de semana exagerados', 'Como pouco, mas alimentos errados']
    },
    {
        id: 'crenca',
        question: 'Você acredita que 10 a 15 minutos por dia, com o método certo, podem transformar seu corpo?',
        options: ['Sim! Estou disposta a tentar hoje', 'Tenho dúvidas, mas quero ver', 'Não acredito muito']
    },
    {
        id: 'felicidade',
        question: 'O que te deixaria mais feliz e realizada hoje?',
        options: ['Voltar a vestir roupas que amo', 'Olhar no espelho e sentir orgulho', 'Ter fôlego para brincar com a família sem dor']
    },
    {
        id: 'futuro',
        question: 'Sinceramente, o que acontece se você não mudar nada hoje?',
        options: ['Minha saúde vai piorar drasticamente', 'Vou continuar frustrada comigo mesma', 'Tenho muito medo de doenças futuras']
    },
    {
        id: 'comprometimento',
        question: 'De 0 a 10, o quanto você está comprometida a mudar o rumo da sua saúde agora?',
        options: ['10! Preciso mudar isso agora mesmo', '8/9 - Quero muito mudar', 'Ainda estou pensando']
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

                <div className="space-y-4">
                    {QUIZ_STEPS[currentStep].options.map((option, idx) => {
                        const isSelected = answers[QUIZ_STEPS[currentStep].id] === option;
                        return (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(option)}
                                className={`w-full text-left p-5 rounded-2xl border-2 transition-all font-semibold text-[15px] sm:text-base flex items-center justify-between group
                                    ${isSelected
                                        ? 'border-[#F2994A] bg-[#F2994A]/10 text-gray-900'
                                        : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-[#F2994A]/40 hover:bg-white'}
                                `}
                            >
                                {option}
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
