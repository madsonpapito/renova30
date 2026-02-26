"use client"

import React, { useState } from 'react';
import { CheckCircle2, ChevronLeft, Loader2, Sparkles } from 'lucide-react';

const QUESTIONS = [
    {
        id: 'age',
        title: 'Qual é a sua faixa etária?',
        options: ['35 a 44 anos', '45 a 54 anos', '55 a 64 anos', '65 anos ou mais'],
    },
    {
        id: 'goal',
        title: 'Qual é o seu principal objetivo hoje?',
        options: ['Secar a barriga da menopausa', 'Acabar com as dores no corpo', 'Ter mais energia e disposição', 'Todas as opções acima'],
    },
    {
        id: 'activity',
        title: 'Como você descreve seu nível de atividade física?',
        options: ['Sou completamente sedentária', 'Faço caminhadas ocasionalmente', 'Pratico exercícios 1 a 2x na semana', 'Sou bastante ativa'],
    },
    {
        id: 'symptoms',
        title: 'Destes sintomas da menopausa, qual te incomoda mais?',
        options: ['Ondas de calor (fogachos)', 'Insônia e sono ruim', 'Irritabilidade / Ansiedade', 'Metabolismo lento (ganho de peso)'],
    }
];

export default function QuizPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isGenerating, setIsGenerating] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const handleSelect = (answer: string) => {
        setAnswers(prev => ({ ...prev, [QUESTIONS[currentStep].id]: answer }));

        // Auto-advance after a brief delay for UX
        setTimeout(() => {
            if (currentStep < QUESTIONS.length - 1) {
                setCurrentStep(prev => prev + 1);
            } else {
                handleFinish();
            }
        }, 400);
    };

    const handleFinish = () => {
        setIsGenerating(true);
        // Simular processamento do algoritmo para gerar PDF
        setTimeout(() => {
            setIsGenerating(false);
            setIsCompleted(true);
        }, 3000);
    };

    if (isGenerating) {
        return (
            <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-6 text-center">
                <Loader2 className="w-16 h-16 text-[#87A96B] animate-spin mb-6" />
                <h2 className="text-2xl font-serif font-bold text-[#2C3E50] mb-2">Montando o seu Protocolo...</h2>
                <p className="text-gray-500 max-w-sm">Nossa inteligência artificial está cruzando seus dados com o método Renova 30 para criar seu plano perfeito.</p>
            </div>
        );
    }

    if (isCompleted) {
        return (
            <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-[#2C3E50] mb-4">Seu Protocolo está Pronto! 🎯</h2>
                <p className="text-gray-500 max-w-md mb-8">
                    Descobrimos exatamente os ajustes alimentares e a sequência de treinos para reverter seu metabolismo e combater a baixa hormonal.
                </p>

                <div className="space-y-4 w-full max-w-xs">
                    <button
                        className="w-full bg-[#87A96B] hover:bg-[#6e8a56] text-white py-4 rounded-xl font-bold shadow-lg transition-colors flex items-center justify-center"
                        onClick={() => alert("Simulando: Download iniciado do Protocolo_Personalizado.pdf")}
                    >
                        <Sparkles className="w-5 h-5 mr-2" /> BAIXAR MEU PDF
                    </button>
                    <a
                        href="/dashboard"
                        className="block w-full bg-white hover:bg-gray-50 border border-gray-200 text-[#2C3E50] py-4 rounded-xl font-semibold transition-colors"
                    >
                        IR PARA A ÁREA DE ALUNAS
                    </a>
                </div>
            </div>
        );
    }

    const progressPercentage = ((currentStep) / QUESTIONS.length) * 100;

    return (
        <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center pt-16 px-4">

            <div className="w-full max-w-lg mb-8">
                <div className="flex items-center justify-between mb-4">
                    {currentStep > 0 ? (
                        <button onClick={() => setCurrentStep(prev => prev - 1)} className="text-gray-400 hover:text-[#2C3E50]">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                    ) : (
                        <div className="w-6" aria-hidden="true"></div>
                    )}
                    <span className="text-sm font-bold text-gray-400">PASSO {currentStep + 1} DE {QUESTIONS.length}</span>
                    <div className="w-6" aria-hidden="true"></div>
                </div>

                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#87A96B] transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>

            <div className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mt-4 animate-in fade-in zoom-in duration-300">
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#2C3E50] mb-8 text-center leading-tight">
                    {QUESTIONS[currentStep].title}
                </h1>

                <div className="space-y-4">
                    {QUESTIONS[currentStep].options.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleSelect(option)}
                            className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between group ${answers[QUESTIONS[currentStep].id] === option
                                ? 'border-[#87A96B] bg-[#87A96B]/5'
                                : 'border-gray-100 hover:border-[#87A96B]/30 hover:bg-gray-50'
                                }`}
                        >
                            <span className="font-medium text-[#2C3E50]">{option}</span>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${answers[QUESTIONS[currentStep].id] === option
                                ? 'border-[#87A96B] bg-[#87A96B]'
                                : 'border-gray-300 group-hover:border-[#87A96B]'
                                }`}>
                                {answers[QUESTIONS[currentStep].id] === option && <CheckCircle2 className="w-4 h-4 text-white" />}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <p className="mt-8 text-xs text-gray-400">
                Suas respostas são sigilosas e usamos apenas para personalizar o Renova 30.
            </p>
        </div>
    );
}
