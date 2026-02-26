import React from 'react';
import { PlayCircle, Award, Menu, Bell, Download, MonitorPlay } from 'lucide-react';

export default function Dashboard() {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#F8F9FA] text-[#2C3E50]">
            {/* SIDEBAR (Desktop) */}
            <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg sticky top-0 h-screen overflow-y-auto">
                <div className="p-6 border-b border-gray-100 flex items-center justify-center">
                    <span className="font-serif font-bold text-2xl tracking-tight text-center">
                        Renova<span className="text-[#87A96B]">30</span>
                    </span>
                </div>

                <nav className="flex-1 py-6 px-4 space-y-2">
                    {['Início', 'Meu Protocolo', 'Treinos 10 Min', 'Alimentação', 'Comunidade', 'Bônus extras'].map((item, idx) => (
                        <a
                            key={idx}
                            href="#"
                            className={`block px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${item === 'Início' ? 'bg-[#87A96B]/10 text-[#87A96B]' : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {item}
                        </a>
                    ))}
                </nav>

                <div className="p-6 border-t border-gray-100">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500 mr-3">
                            M
                        </div>
                        <div>
                            <p className="text-sm font-bold">Maria Silva</p>
                            <p className="text-xs text-gray-400">Plano Anual</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 overflow-y-auto">
                {/* TOPBAR (Mobile + Actions) */}
                <header className="bg-white px-6 py-4 shadow-sm flex items-center justify-between sticky top-0 md:static z-20">
                    <div className="md:hidden flex items-center gap-2">
                        <Menu className="w-6 h-6 text-gray-600" />
                        <span className="font-serif font-bold text-xl tracking-tight">
                            Renova<span className="text-[#87A96B]">30</span>
                        </span>
                    </div>

                    <div className="hidden md:block">
                        <h2 className="text-xl font-bold font-serif">Área de Membros</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF7F50] rounded-full"></span>
                        </button>
                    </div>
                </header>

                <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">

                    {/* WELCOME BANNER */}
                    <section className="bg-gradient-to-r from-[#87A96B] to-[#6e8a56] rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3"></div>

                        <h1 className="text-3xl font-bold font-serif mb-2 relative z-10">Bem-vinda de volta, Maria!</h1>
                        <p className="text-[#87A96B]-100 opacity-90 mb-6 relative z-10">Você está no <strong className="text-white">Dia 12</strong> do seu plano de transformação.</p>

                        <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm relative z-10 border border-white/10">
                            <div className="flex justify-between items-end mb-2">
                                <p className="font-semibold text-sm">Progresso Geral (Semana 2 de 12)</p>
                                <p className="font-bold text-xl">16%</p>
                            </div>
                            <div className="w-full h-3 bg-black/20 rounded-full overflow-hidden">
                                <div className="h-full bg-white rounded-full transition-all duration-1000 w-[16%]"></div>
                            </div>
                        </div>
                    </section>

                    {/* QUICK ACTIONS GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* ACTION 1: PRÓXIMO TREINO */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-[#FF7F50]/10 rounded-full flex items-center justify-center text-[#FF7F50]">
                                    <MonitorPlay className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-lg">Próximo Treino</h3>
                            </div>

                            <div className="flex-1 bg-gray-50 rounded-xl p-4 border border-gray-200 mb-6 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <PlayCircle className="w-12 h-12 text-white" />
                                </div>
                                <p className="text-xs font-bold text-[#87A96B] mb-1">SEMANA 2 • DIA 12</p>
                                <h4 className="font-bold mb-1">Pilates: Ativação Abdominal Profunda</h4>
                                <p className="text-xs text-gray-500">Duração: 10 Minutos</p>
                            </div>

                            <button className="w-full bg-[#FF7F50] hover:bg-[#e06c3f] text-white py-3 rounded-xl font-bold shadow-md shadow-[#FF7F50]/20 transition-all flex items-center justify-center">
                                <PlayCircle className="w-5 h-5 mr-2" /> INICIAR AGORA
                            </button>
                        </div>

                        {/* ACTION 2: PROTOCOLO & COMUNIDADE */}
                        <div className="space-y-6 flex flex-col">
                            {/* Protocolo */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col justify-center items-start relative overflow-hidden">
                                <div className="absolute top-0 right-0 pointer-events-none opacity-5">
                                    <Award className="w-48 h-48 -mt-10 -mr-10 text-gray-900" />
                                </div>
                                <h3 className="font-bold text-lg mb-2 relative z-10">Meu Protocolo</h3>
                                <p className="text-sm text-gray-500 mb-4 relative z-10 max-w-[80%]">
                                    Seu guia alimentar e de hábitos desenhado para seu perfil hormonal.
                                </p>
                                <button className="text-[#87A96B] font-bold text-sm flex items-center hover:underline relative z-10">
                                    <Download className="w-4 h-4 mr-2" />
                                    BAIXAR PDF PERSONALIZADO
                                </button>
                            </div>

                            {/* Comunidade */}
                            <div className="bg-gradient-to-br from-[#2C3E50] to-[#1a252f] p-6 rounded-2xl text-white shadow-sm flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold mb-1">Comunidade VIP</h3>
                                    <p className="text-xs text-gray-400">12 notificações novas</p>
                                </div>
                                <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold border border-white/20 transition-colors">
                                    Acessar
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            </main>
        </div>
    );
}
