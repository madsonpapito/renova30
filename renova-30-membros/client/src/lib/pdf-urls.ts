// PDF URLs for Renova 30 bonus content
// Usando os PDFs gerados localmente (pasta public/pdfs)
export const PDF_URLS = {
  protocolo: '/pdfs/protocolo-personalizado.pdf',
  guiaCacaTesouro: '/pdfs/guia-compras.pdf',
  quebreOCiclo: '/pdfs/comer-emocional.pdf',
  intestinoSolto: '/pdfs/intestino-solto.pdf',
  chasSecaDesincham: '/pdfs/chas-seca.pdf',
};

export const BONUS_ITEMS = [
  {
    id: 1,
    titulo: 'Protocolo Renova 30',
    descricao: 'Seu protocolo personalizado de 12 semanas com plano de treino e alimentação',
    paginas: 20,
    tipo: 'PDF',
    url: PDF_URLS.protocolo,
  },
  {
    id: 2,
    titulo: 'Guia Caça ao Tesouro Hormonal',
    descricao: '32 páginas com os 7 nutrientes-chave, listas de compras prontas e dicas para economizar 30-40%',
    paginas: 32,
    tipo: 'PDF',
    url: PDF_URLS.guiaCacaTesouro,
  },
  {
    id: 3,
    titulo: 'Quebre o Ciclo',
    descricao: '40 páginas + 3 áudios guiados para controlar fome emocional e recuperar o controle total',
    paginas: 40,
    tipo: 'PDF + Áudio',
    url: PDF_URLS.quebreOCiclo,
  },
  {
    id: 4,
    titulo: 'Protocolo do Intestino Solto',
    descricao: '25 páginas com protocolo de 7 dias para limpar o intestino e perder até 6kg',
    paginas: 25,
    tipo: 'PDF',
    url: PDF_URLS.intestinoSolto,
  },
  {
    id: 5,
    titulo: 'Chás Seca e Desincham',
    descricao: '22 páginas com 8 receitas de chás para acelerar metabolismo e secar em 8 dias',
    paginas: 22,
    tipo: 'PDF',
    url: PDF_URLS.chasSecaDesincham,
  },
];
