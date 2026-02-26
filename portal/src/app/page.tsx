import React from 'react';
import { PlayCircle, CheckCircle2, ShieldCheck, ChevronRight } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen">
            {/* HEADER / NAVIGATION (Minimal) */}
            <header className="bg-white px-6 py-4 shadow-sm flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    {/* Logo Placeholder */}
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                        R
                    </div>
                    <span className="font-serif font-bold text-2xl text-text-color tracking-tight">
                        Renova<span className="text-primary">30</span>
                    </span>
                </div>
                <a href="#comprar" className="text-sm font-semibold text-text-color hover:text-accent transition-colors">
                    Quero Começar
                </a>
            </header>

            <main>
                {/* HERO SECTION */}
                <section className="bg-gradient-to-br from-white to-gray-50 pt-16 pb-20 px-4 md:px-8 text-center border-b border-gray-100">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-text-color leading-tight">
                            Perca <span className="text-primary">até 1kg por Seman</span>a com Pilates de 10 Minutos em Casa.
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                            Protocolo desenhado exclusivamente para o metabolismo da mulher na menopausa. Queime gordura, acabe com as dores e recupere sua energia.
                        </p>

                        {/* VSL (Video Sales Letter) Placeholder */}
                        <div className="max-w-3xl mx-auto relative rounded-2xl overflow-hidden shadow-2xl mb-10 bg-gray-900 aspect-video flex items-center justify-center group cursor-pointer border-4 border-white">
                            {/* Faked Video Thumbnail Image */}
                            <div className="absolute inset-0 bg-secondary/20 mix-blend-overlay"></div>
                            <p className="absolute text-white/50 text-sm top-4 left-4 font-inter">Video Placeholder (Thumb da Laís)</p>
                            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <PlayCircle className="text-white w-10 h-10 ml-1" />
                            </div>
                        </div>

                        <a href="#comprar" className="btn-accent px-8 py-5 text-xl w-full max-w-md mx-auto group">
                            QUERO RENOVAR MEU CORPO AGORA (R$67)
                            <ChevronRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <div className="flex items-center justify-center mt-4 text-sm text-gray-500 font-medium">
                            <ShieldCheck className="w-4 h-4 mr-1 text-green-500" /> Compra 100% Segura | Garantia de 7 Dias
                        </div>
                    </div>
                </section>

                {/* PARA QUEM É O RENOVA 30? */}
                <section className="py-20 px-4 bg-white">
                    <div className="max-w-5xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-12">Você se identifica com essas situações?</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { title: 'Barriga da Menopausa', desc: 'Acúmulo de gordura abdominal teimosa que não sai com dietas.' },
                                { title: 'Baixa Energia', desc: 'Desânimo para atividades diárias e cansaço constante.' },
                                { title: 'Dores no Corpo', desc: 'Dores nas articulações, costas e perda de flexibilidade.' },
                                { title: 'Metabolismo Lento', desc: 'Dificuldade para emagrecer mesmo comendo pouco.' },
                            ].map((item, index) => (
                                <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle2 className="text-primary w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* OFERTA E CHECKOUT */}
                <section id="comprar" className="py-20 px-4 bg-gray-50 border-t border-gray-100">
                    <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                        <div className="bg-primary p-6 text-center text-white">
                            <h2 className="text-2xl font-bold font-serif">Renova 30</h2>
                            <p className="text-primary-100 mt-1">Acesso completo de 12 meses</p>
                        </div>

                        <div className="p-8">
                            <div className="flex justify-center items-baseline mb-6">
                                <span className="text-gray-400 line-through text-xl mr-2">R$ 197,00</span>
                                <span className="text-5xl font-bold text-text-color">R$ 67</span><span className="text-xl text-gray-500 font-medium">,00</span>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {['Protocolo Hormonal Personalizado', 'Treinos de 10 minutos (Iniciante ao Avançado)', 'Cardápios e Receitas', 'Acesso Comunidade VIP', 'Bônus: Guia Caça ao Tesouro'].map((benefit, i) => (
                                    <li key={i} className="flex items-center text-sm font-medium text-gray-700">
                                        <CheckCircle2 className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>

                            <a
                                href="https://pay.kiwify.com/tMxkqds"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-accent w-full py-4 text-lg mb-4 animate-[pulse_2s_ease-in-out_infinite]"
                            >
                                COMPRAR AGORA NA KIWIFY
                            </a>

                            <p className="text-center text-xs text-gray-400">
                                Pagamento 100% seguro processado pela Kiwify. Você receberá o acesso imediatamente por e-mail.
                            </p>
                        </div>
                    </div>
                </section>

            </main>

            <footer className="bg-text-color text-gray-400 py-8 px-4 text-center text-sm">
                <p>© 2026 Renova 30. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}
