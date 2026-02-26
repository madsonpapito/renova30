# 🎯 Mapeamento Estratégico do Funil V2 (Referência InLead)

**Objetivo:** Recriar a arquitetura de vendas do projeto `Renova 30` utilizando a estrutura comprovada de alta conversão analisada pela sub-agente (crawler visual). 

## 1. Landing Page Principal (O Quiz)
A página inicial (`/`) deixa de ser uma página de vendas longa e foca **exclusivamente na captura de dados e engajamento via Quiz**.
- **Headline Central:** "ELIMINE 1KG POR SEMANA E TONIFIQUE OS MÚSCULOS NA MENOPAUSA"
- **Gatilho Principal:** "Com apenas 10 minutos por dia de Pilates em casa"

### Estrutura do Novo Quiz (19 Etapas):
Neste modelo, a usuária mergulha num funil de micro-compromissos focados na dor.
1. Identificação de Corpo (Imagens).
2. Percepção do Metabolismo (Acelerado vs Lento).
3. Quantos Kg quer perder?
4. *Intersticial:* Depoimento ("Valquíria secou X kg em 30 dias...").
5. Zonas de dor: Flacidez, Barriga, Braços.
6. Autoestima (o foco real do programa).
7. Impactos na menopausa (Calorões, Insônia).
8. etc...
*(A estrutura exata será codificada no componente `quiz/page.tsx` iterando sobre um array maior de perguntas e opções).*

## 2. Página Intermediária: O Diagnóstico
Após capturar os dados, um "Processamento Falso" com *delay* cria a urgência. 
A tela finaliza em:
- "CAUSA RAIZ IDENTIFICADA: BAIXA HORMONAL"
- Exibição de gráficos.
- CTA: `Ir para o plano de resgate >`

## 3. Página de Vendas (A VSL final)
A conversão final não usa textos longos da versão antiga (`v1.0`).
- Foco central é um vídeo (VSL) de formato vertical.
- Abaixo do VSL, usando *Delay* (só aparece após X minutos de vídeo), surge a oferta.
- **Preço Ancorado:** R$ 679
- **Preço Real:** Pagamento em R$ 67 (Link Atual Kiwify).
- **Conteúdo Focado:** Garantia incondicional, sem mensalidades.

---

### 👉 Próximas Ações do Squad
1. **@UX-Designer:** Criar os layouts dark-mode / clean com a paleta exigida.
2. **@Dev-Fullstack:** Substituir o `app/page.tsx` pela capa do Quiz e criar uma lógica assíncrona robusta para os 19 passos, que culmine em uma página `/vsl`.
